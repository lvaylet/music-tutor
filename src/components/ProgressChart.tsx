import React from 'react'
import { SessionRecord } from '../types'
import { getRecentHistory, getPersonalRecord } from '../services/history'

interface ProgressChartProps {
  history: SessionRecord[]
}

export const ProgressChart: React.FC<ProgressChartProps> = ({ history }) => {
  if (history.length === 0) {
    return (
      <div
        data-testid="progress-chart"
        className="w-full bg-amber-50/80 border border-amber-200 rounded-2xl p-5 text-center mt-4"
      >
        <span className="text-3xl mb-1 block">🌱</span>
        <p className="text-amber-900 font-semibold text-sm sm:text-base">
          Prête pour ta première session ?
        </p>
        <p className="text-amber-700 text-xs sm:text-sm mt-0.5">
          Chaque minute d'entraînement apparaîtra ici pour suivre tes progrès !
        </p>
      </div>
    )
  }

  const recent = getRecentHistory(history, 15)
  const personalRecord = getPersonalRecord(history)

  const width = 460
  const height = 150
  const paddingLeft = 32
  const paddingRight = 20
  const paddingTop = 25
  const paddingBottom = 28

  const chartWidth = width - paddingLeft - paddingRight
  const chartHeight = height - paddingTop - paddingBottom

  const maxScore = Math.max(10, Math.ceil((personalRecord * 1.15) / 5) * 5)

  const barWidth = Math.max(12, Math.min(24, (chartWidth / recent.length) * 0.65))
  const stepX = chartWidth / Math.max(1, recent.length)

  // Record line Y
  const recordY = paddingTop + chartHeight - (personalRecord / maxScore) * chartHeight

  return (
    <div
      data-testid="progress-chart"
      className="w-full bg-white border border-amber-200 rounded-2xl p-4 shadow-xs mt-4"
    >
      <div className="flex items-center justify-between mb-2 px-1">
        <h3 className="text-xs sm:text-sm font-bold text-amber-950 uppercase tracking-wider flex items-center gap-1.5">
          <span>📈</span> Tes dernières sessions ({recent.length})
        </h3>
        {personalRecord > 0 && (
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            🏆 Record : {personalRecord}
          </span>
        )}
      </div>

      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto select-none"
        role="img"
        aria-label="Graphique d'évolution des scores"
      >
        {/* Baseline */}
        <line
          x1={paddingLeft}
          y1={paddingTop + chartHeight}
          x2={width - paddingRight}
          y2={paddingTop + chartHeight}
          stroke="#cbd5e1"
          strokeWidth="1.5"
        />

        {/* Record dashed guideline if personalRecord > 0 */}
        {personalRecord > 0 && (
          <g>
            <line
              x1={paddingLeft}
              y1={recordY}
              x2={width - paddingRight}
              y2={recordY}
              stroke="#10b981"
              strokeWidth="1.5"
              strokeDasharray="4 3"
              opacity="0.75"
            />
            <text
              x={paddingLeft - 4}
              y={recordY + 3.5}
              textAnchor="end"
              className="text-[10px] fill-emerald-600 font-bold"
            >
              {personalRecord}
            </text>
          </g>
        )}

        {/* 0 on Y axis */}
        <text
          x={paddingLeft - 6}
          y={paddingTop + chartHeight + 3}
          textAnchor="end"
          className="text-[10px] fill-slate-400 font-medium"
        >
          0
        </text>

        {/* Bars for each session */}
        {recent.map((session, index) => {
          const x = paddingLeft + index * stepX + (stepX - barWidth) / 2
          const bHeight = Math.max(3, (session.score / maxScore) * chartHeight)
          const y = paddingTop + chartHeight - bHeight
          const isRecord = session.score === personalRecord

          return (
            <g key={session.id || index}>
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={bHeight}
                rx="4"
                className={`transition-all duration-200 ${
                  isRecord ? 'fill-emerald-500' : 'fill-amber-400 hover:fill-amber-500'
                }`}
              />
              {/* Score text on top of bar */}
              <text
                x={x + barWidth / 2}
                y={y - 4}
                textAnchor="middle"
                className={`text-[9px] font-bold ${
                  isRecord ? 'fill-emerald-700' : 'fill-amber-900'
                }`}
              >
                {session.score}
              </text>
              {/* Session sequence number below */}
              <text
                x={x + barWidth / 2}
                y={paddingTop + chartHeight + 14}
                textAnchor="middle"
                className="text-[9px] fill-slate-500 font-medium"
              >
                #{index + 1}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

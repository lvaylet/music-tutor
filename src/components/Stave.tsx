import React from 'react'
import { NoteDefinition } from '../types'

interface StaveProps {
  currentNote: NoteDefinition
  noteX?: number
}

export const Stave: React.FC<StaveProps> = ({ currentNote, noteX = 260 }) => {
  // 5 lines for the treble staff
  const staffLines = [40, 60, 80, 100, 120]
  const width = 400
  const height = 180

  // Stem configuration
  // For notes below middle line (Si4), stem goes UP on the right side
  // For Si4, stem can also go up for consistency and friendliness
  const stemUp = true
  const stemX = stemUp ? noteX + 10.5 : noteX - 10.5
  const stemStartY = currentNote.yPosition
  const stemEndY = stemUp ? currentNote.yPosition - 50 : currentNote.yPosition + 50

  return (
    <div className="w-full max-w-md mx-auto flex justify-center items-center py-4">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto max-h-56 select-none drop-shadow-sm bg-white rounded-2xl border-2 border-amber-200 p-2"
        role="img"
        aria-label="Portée musicale en clé de Sol"
      >
        {/* Left vertical barline */}
        <line x1="30" y1="40" x2="30" y2="120" stroke="#334155" strokeWidth="2.5" />

        {/* 5 horizontal staff lines */}
        {staffLines.map((y, index) => (
          <line
            key={`staff-line-${index}`}
            x1="30"
            y1={y}
            x2={width - 30}
            y2={y}
            stroke="#475569"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
        ))}

        {/* Right vertical barline */}
        <line x1={width - 30} y1="40" x2={width - 30} y2="120" stroke="#334155" strokeWidth="2.5" />

        {/* Clé de Sol (Treble clef) */}
        <g transform="translate(42, 100)" className="text-slate-800">
          <path
            d="M 12 12 C 10 22 24 25 24 10 C 24 -15 0 -22 0 -45 C 0 -62 14 -72 20 -82 C 23 -87 21 -93 17 -93 C 12 -93 9 -86 8 -79 L 4 -79 C 5 -90 11 -98 20 -98 C 28 -98 33 -90 30 -78 C 25 -58 6 -50 6 -15 C 6 2 20 8 20 22 C 20 33 11 36 2 35 C -8 34 -12 25 -12 15 C -12 0 4 -3 10 -3 C 14 -3 16 -1 16 3 C 16 8 11 11 7 11 Z"
            fill="currentColor"
            transform="scale(0.55) translate(-4, 25)"
          />
        </g>

        {/* Ledger line for Do (y = 140) */}
        {currentNote.hasLedgerLine && (
          <line
            x1={noteX - 22}
            y1={currentNote.yPosition}
            x2={noteX + 22}
            y2={currentNote.yPosition}
            stroke="#334155"
            strokeWidth="2"
            strokeLinecap="round"
            data-testid="ledger-line"
          />
        )}

        {/* Note representation */}
        <g data-testid="stave-note">
          {/* Notehead (oval, slightly tilted) */}
          <ellipse
            cx={noteX}
            cy={currentNote.yPosition}
            rx="12.5"
            ry="9"
            transform={`rotate(-20 ${noteX} ${currentNote.yPosition})`}
            className="fill-slate-900"
          />

          {/* Stem (hampe) */}
          <line
            x1={stemX}
            y1={stemStartY}
            x2={stemX}
            y2={stemEndY}
            stroke="#0f172a"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </div>
  )
}

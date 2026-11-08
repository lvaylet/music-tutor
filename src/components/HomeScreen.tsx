import React from 'react'
import { SessionRecord } from '../types'
import { getPersonalRecord } from '../services/history'
import { ProgressChart } from './ProgressChart'

interface HomeScreenProps {
  onStart: () => void
  history: SessionRecord[]
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onStart, history }) => {
  const personalRecord = getPersonalRecord(history)

  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center px-4 max-w-lg mx-auto py-4 w-full">
      <div className="text-6xl mb-3 select-none animate-bounce">🎸</div>

      <h2 className="text-2xl sm:text-3xl font-extrabold text-amber-950 tracking-tight mb-2">
        Deviens une championne de la guitare !
      </h2>

      {personalRecord > 0 ? (
        <div
          data-testid="personal-record"
          className="inline-flex items-center gap-2 bg-emerald-100 border border-emerald-300 text-emerald-900 px-4 py-1.5 rounded-full font-bold text-sm sm:text-base mb-4 shadow-xs"
        >
          <span>🏆</span>
          <span>Ton record personnel :</span>
          <span className="text-emerald-700 font-black text-lg">{personalRecord}</span>
          <span>notes</span>
        </div>
      ) : (
        <p className="text-sm sm:text-base text-amber-800 font-medium mb-4 leading-relaxed">
          Une note s’affiche sur la portée en clé de Sol : trouve le bon nom en 1 minute !
        </p>
      )}

      <button
        type="button"
        onClick={onStart}
        className="
          w-full sm:w-auto px-10 py-4
          rounded-3xl
          bg-emerald-500 hover:bg-emerald-600 active:scale-95
          border-b-4 border-emerald-700
          text-white text-2xl sm:text-3xl font-black tracking-wide
          shadow-lg active:shadow-sm
          transition-all duration-150 cursor-pointer
          flex items-center justify-center gap-3 mb-2
        "
        aria-label="Démarrer la session"
      >
        <span>▶️</span>
        <span>Démarrer</span>
      </button>

      {/* Progress chart */}
      <ProgressChart history={history} />
    </div>
  )
}

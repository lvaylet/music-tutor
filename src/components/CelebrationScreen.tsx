import React from 'react'

interface CelebrationScreenProps {
  score: number
  isNewRecord?: boolean
  personalRecord?: number
  onReplay: () => void
}

export const CelebrationScreen: React.FC<CelebrationScreenProps> = ({
  score,
  isNewRecord = false,
  personalRecord = 0,
  onReplay,
}) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center px-4 max-w-lg mx-auto py-6">
      <div className="text-6xl sm:text-7xl mb-3 select-none animate-bounce">
        {isNewRecord ? '🏆' : '🎉'}
      </div>

      {isNewRecord && (
        <div
          data-testid="new-record-badge"
          className="inline-flex items-center gap-2 bg-amber-400 text-amber-950 px-4 py-1.5 rounded-full font-black text-sm sm:text-base mb-3 shadow-md border-2 border-amber-500 animate-pulse"
        >
          <span>⭐</span>
          <span>Nouveau Record Personnel !</span>
          <span>⭐</span>
        </div>
      )}

      <h2 className="text-3xl sm:text-4xl font-black text-amber-950 tracking-tight mb-2">
        {isNewRecord ? 'Exploit magique !' : 'Bravo ! Temps écoulé !'}
      </h2>

      <p className="text-base sm:text-lg text-amber-800 font-medium mb-6">
        {isNewRecord
          ? 'Tu as battu ton meilleur score de tous les temps !'
          : score >= 15
            ? 'Superbe session ! Tes doigts deviennent ultra rapides !'
            : 'Bel entraînement ! Chaque minute te rend plus forte !'}
      </p>

      {/* Score badge */}
      <div className="bg-amber-100 border-2 border-amber-300 rounded-3xl p-5 mb-6 w-full shadow-inner">
        <p className="text-xs sm:text-sm font-bold text-amber-800 uppercase tracking-wider mb-1">
          Notes reconnues
        </p>
        <div
          data-testid="final-score"
          className="text-6xl sm:text-7xl font-black text-amber-600 tracking-tight"
        >
          {score}
        </div>
        {!isNewRecord && personalRecord > 0 && (
          <p className="text-xs sm:text-sm text-amber-700 font-semibold mt-2">
            Ton record personnel : {personalRecord} notes
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={onReplay}
        className="
          w-full sm:w-auto px-10 py-4
          rounded-3xl
          bg-emerald-500 hover:bg-emerald-600 active:scale-95
          border-b-4 border-emerald-700
          text-white text-2xl sm:text-3xl font-black tracking-wide
          shadow-lg active:shadow-sm
          transition-all duration-150 cursor-pointer
          flex items-center justify-center gap-3
        "
        aria-label="Rejouer une session"
      >
        <span>🔄</span>
        <span>Rejouer</span>
      </button>
    </div>
  )
}

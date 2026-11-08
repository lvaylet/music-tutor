import React from 'react'

interface CelebrationScreenProps {
  score: number
  onReplay: () => void
}

export const CelebrationScreen: React.FC<CelebrationScreenProps> = ({ score, onReplay }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center px-4 max-w-lg mx-auto py-8">
      <div className="text-6xl sm:text-7xl mb-4 select-none">🎉</div>

      <h2 className="text-3xl sm:text-4xl font-black text-amber-950 tracking-tight mb-2">
        Bravo ! Temps écoulé !
      </h2>

      <p className="text-lg text-amber-800 font-medium mb-6">
        {score >= 20
          ? 'Incroyable performance ! Tu as des doigts de fée !'
          : score >= 10
            ? 'Super entraînement ! Tu progresses très vite !'
            : 'Bel effort ! Continue de t’entraîner chaque jour !'}
      </p>

      {/* Score badge */}
      <div className="bg-amber-100 border-2 border-amber-300 rounded-3xl p-6 mb-8 w-full shadow-inner">
        <p className="text-sm sm:text-base font-bold text-amber-800 uppercase tracking-wider mb-1">
          Notes reconnues
        </p>
        <div
          data-testid="final-score"
          className="text-6xl sm:text-7xl font-black text-amber-600 tracking-tight"
        >
          {score}
        </div>
      </div>

      <button
        type="button"
        onClick={onReplay}
        className="
          w-full sm:w-auto px-10 py-5
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

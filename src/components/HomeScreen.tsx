import React from 'react'

interface HomeScreenProps {
  onStart: () => void
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onStart }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center px-4 max-w-lg mx-auto py-8">
      <div className="text-7xl mb-6 select-none animate-bounce">🎸</div>

      <h2 className="text-2xl sm:text-3xl font-extrabold text-amber-950 tracking-tight mb-3">
        Deviens une championne de la guitare !
      </h2>

      <p className="text-base sm:text-lg text-amber-800 font-medium mb-8 leading-relaxed">
        Une note s’affiche sur la portée en clé de Sol : appuie sur le bon bouton le plus vite possible pendant 1 minute !
      </p>

      <button
        type="button"
        onClick={onStart}
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
        aria-label="Démarrer la session"
      >
        <span>▶️</span>
        <span>Démarrer</span>
      </button>
    </div>
  )
}

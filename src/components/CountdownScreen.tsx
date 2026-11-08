import React from 'react'

interface CountdownScreenProps {
  countdown: number
}

export const CountdownScreen: React.FC<CountdownScreenProps> = ({ countdown }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
      <p className="text-xl sm:text-2xl font-bold text-amber-800 mb-6 tracking-wide">
        Prépare-toi...
      </p>

      <div
        key={countdown}
        data-testid="countdown"
        className="
          text-8xl sm:text-9xl font-black text-amber-600
          drop-shadow-md select-none
          animate-scale-in
        "
      >
        {countdown}
      </div>
    </div>
  )
}

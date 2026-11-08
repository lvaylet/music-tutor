import React from 'react'
import { NoteName } from '../types'
import { NOTE_BUTTON_COLORS, ORDERED_NOTE_NAMES } from '../constants/notes'

interface NoteButtonsProps {
  onSelectNote: (note: NoteName) => void
  disabled?: boolean
}

export const NoteButtons: React.FC<NoteButtonsProps> = ({ onSelectNote, disabled = false }) => {
  return (
    <div className="w-full max-w-2xl mx-auto px-4 mt-6">
      <div className="grid grid-cols-4 sm:grid-cols-7 gap-2.5 sm:gap-3">
        {ORDERED_NOTE_NAMES.map((name) => {
          const colors = NOTE_BUTTON_COLORS[name]
          return (
            <button
              key={name}
              type="button"
              disabled={disabled}
              onClick={() => onSelectNote(name)}
              className={`
                flex items-center justify-center
                h-16 sm:h-20
                rounded-2xl
                text-2xl sm:text-3xl font-extrabold tracking-wide
                shadow-md active:scale-95 active:shadow-sm
                transition-all duration-150 cursor-pointer
                border-b-4
                disabled:opacity-50 disabled:cursor-not-allowed
                ${colors.bg} ${colors.hover} ${colors.border} ${colors.text}
              `}
              aria-label={`Note ${name}`}
            >
              {name}
            </button>
          )
        })}
      </div>
    </div>
  )
}

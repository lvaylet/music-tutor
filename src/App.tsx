import { useState, useRef, useEffect } from 'react'
import { NoteName } from './types'
import { NOTES } from './constants/notes'
import { Stave } from './components/Stave'
import { NoteButtons } from './components/NoteButtons'
import { getNextRandomNote } from './utils/notes'
import { playGuitarNote } from './services/audio'

export default function App() {
  const [score, setScore] = useState(0)
  const [currentNote, setCurrentNote] = useState(NOTES.Do)
  const [lastWrongNote, setLastWrongNote] = useState<NoteName | null>(null)
  const errorTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (errorTimeoutRef.current) {
        clearTimeout(errorTimeoutRef.current)
      }
    }
  }, [])

  const handleSelectNote = (selectedName: NoteName) => {
    if (selectedName === currentNote.name) {
      // Correct note
      setScore((prev) => prev + 1)
      setLastWrongNote(null)
      playGuitarNote(currentNote.frequency)
      setCurrentNote(getNextRandomNote(currentNote.name))
    } else {
      // Soft incorrect feedback: gentle shake, no score loss, retry enabled
      setLastWrongNote(selectedName)
      if (errorTimeoutRef.current) {
        clearTimeout(errorTimeoutRef.current)
      }
      errorTimeoutRef.current = setTimeout(() => {
        setLastWrongNote(null)
      }, 400)
    }
  }

  return (
    <main className="min-h-screen flex flex-col justify-between py-6 px-4 max-w-3xl mx-auto">
      <header className="text-center mb-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-amber-900 tracking-tight flex items-center justify-center gap-2">
          <span>🎸</span> Music Tutor
        </h1>
        <p className="text-sm sm:text-base text-amber-700 font-medium mt-1">
          Apprends les notes en clé de Sol
        </p>

        {/* Score display */}
        <div className="mt-3 flex justify-center">
          <div className="inline-flex items-center gap-2 text-base sm:text-lg font-bold text-amber-950 bg-amber-100/90 px-4 py-1.5 rounded-full border border-amber-300 shadow-xs">
            <span aria-hidden="true">⭐</span>
            <span>Score :</span>
            <span data-testid="score-counter" className="text-2xl font-black text-amber-700">
              {score}
            </span>
          </div>
        </div>
      </header>

      <section className="flex-1 flex flex-col justify-center items-center my-2">
        <Stave currentNote={currentNote} />
      </section>

      <footer className="w-full pb-4">
        <NoteButtons onSelectNote={handleSelectNote} lastWrongNote={lastWrongNote} />
      </footer>
    </main>
  )
}

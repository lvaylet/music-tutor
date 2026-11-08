import { useState } from 'react'
import { NoteName } from './types'
import { NOTES } from './constants/notes'
import { Stave } from './components/Stave'
import { NoteButtons } from './components/NoteButtons'

export default function App() {
  const [currentNote, setCurrentNote] = useState(NOTES.Do)

  const handleSelectNote = (selectedName: NoteName) => {
    // Basic interaction for ticket 01; full game loop & sound implemented in ticket 02
    if (selectedName === currentNote.name) {
      setCurrentNote(NOTES[selectedName])
    }
  }

  return (
    <main className="min-h-screen flex flex-col justify-between py-6 px-4 max-w-3xl mx-auto">
      <header className="text-center mb-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-amber-900 tracking-tight flex items-center justify-center gap-2">
          <span>🎸</span> Music Tutor
        </h1>
        <p className="text-sm sm:text-base text-amber-700 font-medium mt-1">
          Apprends les notes en clé de Sol
        </p>
      </header>

      <section className="flex-1 flex flex-col justify-center items-center my-4">
        <Stave currentNote={currentNote} />
      </section>

      <footer className="w-full pb-4">
        <NoteButtons onSelectNote={handleSelectNote} />
      </footer>
    </main>
  )
}

import { useState, useRef, useEffect, useCallback } from 'react'
import { NoteName, SessionState } from './types'
import { NOTES } from './constants/notes'
import { COUNTDOWN_SECONDS, SESSION_DURATION_SECONDS } from './constants/game'
import { Stave } from './components/Stave'
import { NoteButtons } from './components/NoteButtons'
import { HomeScreen } from './components/HomeScreen'
import { CountdownScreen } from './components/CountdownScreen'
import { CelebrationScreen } from './components/CelebrationScreen'
import { getNextRandomNote } from './utils/notes'
import { playGuitarNote } from './services/audio'

interface AppProps {
  initialState?: SessionState
}

export default function App({ initialState = 'IDLE' }: AppProps) {
  const [sessionState, setSessionState] = useState<SessionState>(initialState)
  const [countdown, setCountdown] = useState(COUNTDOWN_SECONDS)
  const [timeRemaining, setTimeRemaining] = useState(SESSION_DURATION_SECONDS)
  const [score, setScore] = useState(0)
  const [currentNote, setCurrentNote] = useState(NOTES.Do)
  const [lastWrongNote, setLastWrongNote] = useState<NoteName | null>(null)

  const errorTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const startSession = useCallback(() => {
    setScore(0)
    setCountdown(COUNTDOWN_SECONDS)
    setTimeRemaining(SESSION_DURATION_SECONDS)
    setCurrentNote(getNextRandomNote())
    setLastWrongNote(null)
    setSessionState('COUNTDOWN')
  }, [])

  // Countdown timer effect
  useEffect(() => {
    if (sessionState !== 'COUNTDOWN') return

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          setSessionState('PLAYING')
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [sessionState])

  // Active game timer effect (60s session)
  useEffect(() => {
    if (sessionState !== 'PLAYING') return

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          setSessionState('FINISHED')
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [sessionState])

  // Cleanup error timeout on unmount
  useEffect(() => {
    return () => {
      if (errorTimeoutRef.current) {
        clearTimeout(errorTimeoutRef.current)
      }
    }
  }, [])

  const handleSelectNote = (selectedName: NoteName) => {
    if (sessionState !== 'PLAYING') return

    if (selectedName === currentNote.name) {
      setScore((prev) => prev + 1)
      setLastWrongNote(null)
      playGuitarNote(currentNote.frequency)
      setCurrentNote(getNextRandomNote(currentNote.name))
    } else {
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

        {sessionState === 'PLAYING' && (
          <div className="mt-3 flex justify-center items-center gap-3">
            {/* Timer display */}
            <div className="inline-flex items-center gap-1.5 text-base sm:text-lg font-bold text-amber-950 bg-amber-100/90 px-3.5 py-1.5 rounded-full border border-amber-300 shadow-xs">
              <span aria-hidden="true">⏱️</span>
              <span data-testid="timer" className="text-xl sm:text-2xl font-black text-amber-800">
                {timeRemaining}
              </span>
              <span className="text-sm text-amber-700 font-semibold">s</span>
            </div>

            {/* Score display */}
            <div className="inline-flex items-center gap-1.5 text-base sm:text-lg font-bold text-amber-950 bg-amber-100/90 px-3.5 py-1.5 rounded-full border border-amber-300 shadow-xs">
              <span aria-hidden="true">⭐</span>
              <span>Score :</span>
              <span data-testid="score-counter" className="text-xl sm:text-2xl font-black text-amber-600">
                {score}
              </span>
            </div>
          </div>
        )}
      </header>

      {sessionState === 'IDLE' && <HomeScreen onStart={startSession} />}

      {sessionState === 'COUNTDOWN' && <CountdownScreen countdown={countdown} />}

      {sessionState === 'PLAYING' && (
        <>
          <section className="flex-1 flex flex-col justify-center items-center my-2">
            <Stave currentNote={currentNote} />
          </section>

          <footer className="w-full pb-4">
            <NoteButtons onSelectNote={handleSelectNote} lastWrongNote={lastWrongNote} />
          </footer>
        </>
      )}

      {sessionState === 'FINISHED' && (
        <CelebrationScreen score={score} onReplay={startSession} />
      )}
    </main>
  )
}

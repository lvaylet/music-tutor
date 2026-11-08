import { useState, useRef, useEffect, useCallback } from 'react'
import { NoteName, SessionRecord, SessionState } from './types'
import { NOTES } from './constants/notes'
import { COUNTDOWN_SECONDS, SESSION_DURATION_SECONDS } from './constants/game'
import { Stave } from './components/Stave'
import { NoteButtons } from './components/NoteButtons'
import { HomeScreen } from './components/HomeScreen'
import { CountdownScreen } from './components/CountdownScreen'
import { CelebrationScreen } from './components/CelebrationScreen'
import { getNextRandomNote } from './utils/notes'
import { playGuitarNote } from './services/audio'
import { loadHistory, saveSession, getPersonalRecord } from './services/history'

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

  // Mute audio state (persisted in localStorage)
  const [isMuted, setIsMuted] = useState(() => {
    try {
      return localStorage.getItem('music_tutor_muted') === 'true'
    } catch {
      return false
    }
  })

  // History & Record tracking
  const [history, setHistory] = useState<SessionRecord[]>([])
  const [isNewRecord, setIsNewRecord] = useState(false)

  const errorTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const scoreRef = useRef(score)
  scoreRef.current = score

  // Load history on mount
  useEffect(() => {
    setHistory(loadHistory())
  }, [])

  const toggleMute = () => {
    setIsMuted((prev) => {
      const next = !prev
      try {
        localStorage.setItem('music_tutor_muted', String(next))
      } catch {
        // Graceful handling
      }
      return next
    })
  }

  const startSession = useCallback(() => {
    setScore(0)
    setCountdown(COUNTDOWN_SECONDS)
    setTimeRemaining(SESSION_DURATION_SECONDS)
    setCurrentNote(getNextRandomNote())
    setLastWrongNote(null)
    setIsNewRecord(false)
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
          // Save session to localStorage
          const result = saveSession(scoreRef.current)
          setIsNewRecord(result.isNewRecord)
          setHistory(loadHistory())
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
      if (!isMuted) {
        playGuitarNote(currentNote.frequency)
      }
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

  const personalRecord = getPersonalRecord(history)

  return (
    <main className="min-h-screen flex flex-col justify-between py-5 px-4 max-w-3xl mx-auto">
      <header className="relative mb-2">
        {/* Audio Mute toggle in top-right */}
        <div className="absolute right-0 top-0">
          <button
            type="button"
            data-testid="audio-toggle"
            onClick={toggleMute}
            aria-label={isMuted ? 'Activer le son' : 'Couper le son'}
            className="
              inline-flex items-center justify-center
              w-10 h-10 sm:w-11 sm:h-11 rounded-full
              bg-amber-100/90 hover:bg-amber-200 active:scale-95
              border border-amber-300 shadow-xs
              text-lg sm:text-xl select-none
              transition-all duration-150 cursor-pointer
            "
          >
            {isMuted ? '🔇' : '🔊'}
          </button>
        </div>

        <div className="text-center px-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-amber-900 tracking-tight flex items-center justify-center gap-2">
            <span>🎸</span> Music Tutor
          </h1>
          <p className="text-sm sm:text-base text-amber-700 font-medium mt-1">
            Apprends les notes en clé de Sol
          </p>
        </div>

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

      {sessionState === 'IDLE' && (
        <HomeScreen onStart={startSession} history={history} />
      )}

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
        <CelebrationScreen
          score={score}
          isNewRecord={isNewRecord}
          personalRecord={personalRecord}
          onReplay={startSession}
        />
      )}
    </main>
  )
}

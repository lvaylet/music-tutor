import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, afterEach } from 'vitest'
import App from './App'
import * as audioService from './services/audio'

describe('App - Ticket 05: Contrôle audio Mute et persistance', () => {
  afterEach(() => {
    localStorage.clear()
    vi.restoreAllMocks()
  })

  it('renders audio toggle button in unmuted state by default', () => {
    render(<App />)
    const toggle = screen.getByTestId('audio-toggle')
    expect(toggle).toBeInTheDocument()
    expect(toggle).toHaveAttribute('aria-label', 'Couper le son')
    expect(toggle).toHaveTextContent('🔊')
  })

  it('toggles to muted state, saves to localStorage, and disables sound synthesis', async () => {
    const playAudioSpy = vi.spyOn(audioService, 'playGuitarNote').mockImplementation(() => {})
    render(<App initialState="PLAYING" />)

    const toggle = screen.getByTestId('audio-toggle')

    // Click Mute
    await userEvent.click(toggle)
    expect(toggle).toHaveAttribute('aria-label', 'Activer le son')
    expect(toggle).toHaveTextContent('🔇')
    expect(localStorage.getItem('music_tutor_muted')).toBe('true')

    // Click correct note (Do)
    const doButton = screen.getByRole('button', { name: 'Note Do' })
    await userEvent.click(doButton)

    // Score increments but audio was NOT called because muted
    expect(screen.getByTestId('score-counter')).toHaveTextContent('1')
    expect(playAudioSpy).not.toHaveBeenCalled()

    // Unmute
    await userEvent.click(toggle)
    expect(toggle).toHaveAttribute('aria-label', 'Couper le son')
    expect(toggle).toHaveTextContent('🔊')
    expect(localStorage.getItem('music_tutor_muted')).toBe('false')

    playAudioSpy.mockRestore()
  })

  it('restores muted state from localStorage on initial render', () => {
    localStorage.setItem('music_tutor_muted', 'true')
    render(<App />)

    const toggle = screen.getByTestId('audio-toggle')
    expect(toggle).toHaveAttribute('aria-label', 'Activer le son')
    expect(toggle).toHaveTextContent('🔇')
  })
})

describe('App - Ticket 04: Persistance et Record personnel', () => {
  afterEach(() => {
    vi.useRealTimers()
    localStorage.clear()
  })

  it('displays empty state encouragement when no sessions have been played', () => {
    render(<App />)
    expect(screen.getByTestId('progress-chart')).toHaveTextContent(/première session/i)
    expect(screen.queryByTestId('personal-record')).not.toBeInTheDocument()
  })

  it('persists a completed session to localStorage and displays new record badge', () => {
    vi.useFakeTimers()
    render(<App />)

    // Start session
    act(() => {
      screen.getByRole('button', { name: /démarrer/i }).click()
    })
    act(() => {
      vi.advanceTimersByTime(3000) // countdown to PLAYING
    })

    // Simulate clicking correct note
    const currentNoteName = screen.getByTestId('stave-note').getAttribute('data-note')
    const correctButton = screen.getByRole('button', { name: `Note ${currentNoteName}` })
    act(() => {
      correctButton.click()
    })

    // Advance 60s to finish
    act(() => {
      vi.advanceTimersByTime(60000)
    })

    // Finished screen shows New Record badge
    expect(screen.getByTestId('new-record-badge')).toBeInTheDocument()

    // localStorage contains the session
    const saved = JSON.parse(localStorage.getItem('music_tutor_history') || '[]')
    expect(saved).toHaveLength(1)
    expect(saved[0].score).toBe(1)
  })

  it('displays the personal record on home screen after reload', () => {
    localStorage.setItem(
      'music_tutor_history',
      JSON.stringify([{ id: '1', timestamp: Date.now(), score: 14 }])
    )

    render(<App />)

    expect(screen.getByTestId('personal-record')).toHaveTextContent('14')
    expect(screen.getByTestId('progress-chart')).toBeInTheDocument()
  })
})

describe('App - Ticket 03: Cycle de vie de la Session', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('starts on the home screen with a welcoming Démarrer button', () => {
    render(<App />)
    expect(screen.getByRole('button', { name: /démarrer/i })).toBeInTheDocument()
  })

  it('transitions to 3-2-1 countdown when Démarrer is clicked', () => {
    vi.useFakeTimers()
    render(<App />)

    const startButton = screen.getByRole('button', { name: /démarrer/i })
    act(() => {
      startButton.click()
    })

    expect(screen.getByTestId('countdown')).toHaveTextContent('3')

    act(() => {
      vi.advanceTimersByTime(1000)
    })
    expect(screen.getByTestId('countdown')).toHaveTextContent('2')

    act(() => {
      vi.advanceTimersByTime(1000)
    })
    expect(screen.getByTestId('countdown')).toHaveTextContent('1')

    act(() => {
      vi.advanceTimersByTime(1000)
    })
    // Countdown finished -> now PLAYING
    expect(screen.getByTestId('timer')).toHaveTextContent('60')
    expect(screen.getByTestId('stave-note')).toBeInTheDocument()

    vi.useRealTimers()
  })

  it('decrements the timer and transitions to FINISHED celebration screen at 00:00', () => {
    vi.useFakeTimers()
    render(<App />)

    // Start game
    act(() => {
      screen.getByRole('button', { name: /démarrer/i }).click()
    })
    // Advance countdown (3s)
    act(() => {
      vi.advanceTimersByTime(3000)
    })

    expect(screen.getByTestId('timer')).toHaveTextContent('60')

    // Advance by 30 seconds
    act(() => {
      vi.advanceTimersByTime(30000)
    })
    expect(screen.getByTestId('timer')).toHaveTextContent('30')

    // Advance remaining 30 seconds to finish
    act(() => {
      vi.advanceTimersByTime(30000)
    })

    // In FINISHED screen
    expect(screen.getByRole('heading', { name: /bravo/i })).toBeInTheDocument()
    expect(screen.getByTestId('final-score')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /rejouer/i })).toBeInTheDocument()

    vi.useRealTimers()
  })

  it('restarts a new session when Rejouer button is clicked', () => {
    vi.useFakeTimers()
    render(<App />)

    act(() => {
      screen.getByRole('button', { name: /démarrer/i }).click()
    })
    act(() => {
      vi.advanceTimersByTime(3000) // countdown to PLAYING
    })
    act(() => {
      vi.advanceTimersByTime(60000) // full 60s session to FINISHED
    })

    const replayButton = screen.getByRole('button', { name: /rejouer/i })
    act(() => {
      replayButton.click()
    })

    // Back in countdown
    expect(screen.getByTestId('countdown')).toBeInTheDocument()
  })
})

describe('App - Ticket 01 & 02: Initialisation et boucle de reconnaissance', () => {
  it('renders the Portée stave in SVG with accessibility label', () => {
    render(<App initialState="PLAYING" />)
    const stave = screen.getByRole('img', { name: /portée musicale/i })
    expect(stave).toBeInTheDocument()
  })

  it('renders all 7 note buttons in natural ascending musical order', () => {
    render(<App initialState="PLAYING" />)
    const noteNames = ['Do', 'Ré', 'Mi', 'Fa', 'Sol', 'La', 'Si']
    const buttons = screen.getAllByRole('button', { name: /^Note (Do|Ré|Mi|Fa|Sol|La|Si)$/i })
    expect(buttons).toHaveLength(7)
    buttons.forEach((button, index) => {
      expect(button).toHaveTextContent(noteNames[index])
    })
  })

  it('displays an initial note on the stave', () => {
    render(<App initialState="PLAYING" />)
    const currentNoteElement = screen.getByTestId('stave-note')
    expect(currentNoteElement).toBeInTheDocument()
  })

  it('displays the current score counter starting at 0', () => {
    render(<App initialState="PLAYING" />)
    expect(screen.getByTestId('score-counter')).toHaveTextContent('0')
  })

  it('increments score and updates note when the correct note is clicked', async () => {
    render(<App initialState="PLAYING" />)
    // Initial note is Do by default in App
    const doButton = screen.getByRole('button', { name: 'Note Do' })
    const initialNotehead = screen.getByTestId('stave-note').querySelector('ellipse')
    const initialCy = initialNotehead?.getAttribute('cy')

    // Click Do
    await userEvent.click(doButton)

    // Score should be 1
    expect(screen.getByTestId('score-counter')).toHaveTextContent('1')

    // New note should have a different vertical position (different cy)
    const nextNotehead = screen.getByTestId('stave-note').querySelector('ellipse')
    expect(nextNotehead?.getAttribute('cy')).not.toBe(initialCy)
  })

  it('does not penalize score or advance note when an incorrect note is clicked', async () => {
    render(<App initialState="PLAYING" />)
    // Initial note is Do
    const wrongButton = screen.getByRole('button', { name: 'Note Ré' })
    const initialNotehead = screen.getByTestId('stave-note').querySelector('ellipse')
    const initialCy = initialNotehead?.getAttribute('cy')

    // Click wrong note (Ré)
    await userEvent.click(wrongButton)

    // Score remains 0
    expect(screen.getByTestId('score-counter')).toHaveTextContent('0')

    // Note did NOT change
    const noteheadAfterWrong = screen.getByTestId('stave-note').querySelector('ellipse')
    expect(noteheadAfterWrong?.getAttribute('cy')).toBe(initialCy)

    // Error feedback is visible on the clicked button
    expect(wrongButton).toHaveAttribute('data-error', 'true')

    // Now click correct note (Do)
    const doButton = screen.getByRole('button', { name: 'Note Do' })
    await userEvent.click(doButton)

    // Score is now 1
    expect(screen.getByTestId('score-counter')).toHaveTextContent('1')
  })

  it('triggers guitar audio synthesis with the note frequency on correct answers', async () => {
    const playAudioSpy = vi.spyOn(audioService, 'playGuitarNote').mockImplementation(() => {})
    render(<App initialState="PLAYING" />)

    // Initial note is Do (frequency 261.63)
    const doButton = screen.getByRole('button', { name: 'Note Do' })
    await userEvent.click(doButton)

    expect(playAudioSpy).toHaveBeenCalledTimes(1)
    expect(playAudioSpy).toHaveBeenCalledWith(261.63)

    playAudioSpy.mockRestore()
  })
})

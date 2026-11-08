import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import App from './App'
import * as audioService from './services/audio'

describe('App - Ticket 01 & 02: Initialisation et boucle de reconnaissance', () => {
  it('renders the Portée stave in SVG with accessibility label', () => {
    render(<App />)
    const stave = screen.getByRole('img', { name: /portée musicale/i })
    expect(stave).toBeInTheDocument()
  })

  it('renders all 7 note buttons in natural ascending musical order', () => {
    render(<App />)
    const noteNames = ['Do', 'Ré', 'Mi', 'Fa', 'Sol', 'La', 'Si']
    const buttons = screen.getAllByRole('button', { name: /^Note (Do|Ré|Mi|Fa|Sol|La|Si)$/i })
    expect(buttons).toHaveLength(7)
    buttons.forEach((button, index) => {
      expect(button).toHaveTextContent(noteNames[index])
    })
  })

  it('displays an initial note on the stave', () => {
    render(<App />)
    const currentNoteElement = screen.getByTestId('stave-note')
    expect(currentNoteElement).toBeInTheDocument()
  })

  it('displays the current score counter starting at 0', () => {
    render(<App />)
    expect(screen.getByTestId('score-counter')).toHaveTextContent('0')
  })

  it('increments score and updates note when the correct note is clicked', async () => {
    render(<App />)
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
    render(<App />)
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
    render(<App />)

    // Initial note is Do (frequency 261.63)
    const doButton = screen.getByRole('button', { name: 'Note Do' })
    await userEvent.click(doButton)

    expect(playAudioSpy).toHaveBeenCalledTimes(1)
    expect(playAudioSpy).toHaveBeenCalledWith(261.63)

    playAudioSpy.mockRestore()
  })
})

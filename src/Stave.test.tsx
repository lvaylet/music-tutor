import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Stave } from './components/Stave'
import { NOTES } from './constants/notes'

describe('Stave Component', () => {
  it('renders a ledger line when the note is Do4', () => {
    render(<Stave currentNote={NOTES.Do} />)
    const ledgerLine = screen.getByTestId('ledger-line')
    expect(ledgerLine).toBeInTheDocument()
    expect(ledgerLine).toHaveAttribute('y1', '140')
    expect(ledgerLine).toHaveAttribute('y2', '140')
  })

  it('does not render a ledger line for notes on or inside the staff (Mi4, Sol4, Si4)', () => {
    const { rerender } = render(<Stave currentNote={NOTES.Mi} />)
    expect(screen.queryByTestId('ledger-line')).not.toBeInTheDocument()

    rerender(<Stave currentNote={NOTES.Sol} />)
    expect(screen.queryByTestId('ledger-line')).not.toBeInTheDocument()

    rerender(<Stave currentNote={NOTES.Si} />)
    expect(screen.queryByTestId('ledger-line')).not.toBeInTheDocument()
  })

  it('positions the notehead at the correct vertical position for each note', () => {
    const { rerender } = render(<Stave currentNote={NOTES.Do} />)
    const notehead = screen.getByTestId('stave-note').querySelector('ellipse')
    expect(notehead).toHaveAttribute('cy', '140')

    rerender(<Stave currentNote={NOTES.Ré} />)
    expect(screen.getByTestId('stave-note').querySelector('ellipse')).toHaveAttribute('cy', '130')

    rerender(<Stave currentNote={NOTES.Si} />)
    expect(screen.getByTestId('stave-note').querySelector('ellipse')).toHaveAttribute('cy', '80')
  })
})

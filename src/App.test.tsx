import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from './App'

describe('App - Ticket 01: Initialisation et rendu de la Portée', () => {
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
})

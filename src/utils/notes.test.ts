import { describe, it, expect } from 'vitest'
import { getNextRandomNote } from './notes'
import { ORDERED_NOTE_NAMES } from '../constants/notes'
import { NoteName } from '../types'

describe('getNextRandomNote', () => {
  it('never returns the current note as the next note', () => {
    ORDERED_NOTE_NAMES.forEach((noteName) => {
      for (let i = 0; i < 20; i++) {
        const nextNote = getNextRandomNote(noteName)
        expect(nextNote.name).not.toBe(noteName)
      }
    })
  })

  it('guarantees consecutive non-repetition across a sequence of 100 notes', () => {
    let currentNote = getNextRandomNote()
    for (let i = 0; i < 100; i++) {
      const nextNote = getNextRandomNote(currentNote.name)
      expect(nextNote.name).not.toBe(currentNote.name)
      currentNote = nextNote
    }
  })

  it('can generate all 7 natural notes over many trials', () => {
    const generated = new Set<NoteName>()
    let current = getNextRandomNote()
    for (let i = 0; i < 200; i++) {
      current = getNextRandomNote(current.name)
      generated.add(current.name)
    }
    expect(generated.size).toBe(7)
  })
})

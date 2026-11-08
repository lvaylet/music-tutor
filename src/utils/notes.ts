import { NoteDefinition, NoteName } from '../types'
import { NOTES, ORDERED_NOTE_NAMES } from '../constants/notes'

/**
 * Returns a uniformly chosen random note from the 7 natural notes,
 * guaranteeing that it is never the same as currentNoteName.
 */
export function getNextRandomNote(currentNoteName?: NoteName): NoteDefinition {
  const eligibleNotes = currentNoteName
    ? ORDERED_NOTE_NAMES.filter((name) => name !== currentNoteName)
    : ORDERED_NOTE_NAMES

  const randomIndex = Math.floor(Math.random() * eligibleNotes.length)
  const selectedName = eligibleNotes[randomIndex]
  return NOTES[selectedName]
}

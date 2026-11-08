import { NoteDefinition, NoteName } from '../types'

export const STAFF_LINE_SPACING = 20
export const STAFF_TOP_Y = 40

// Musical layout for treble staff:
// Line 5 (top): 40
// Line 4: 60
// Line 3 (Si4): 80
// Line 2 (Sol4): 100
// Line 1 (Mi4): 120
// Ledger line 1 below (Do4): 140

export const NOTES: Record<NoteName, NoteDefinition> = {
  Do: {
    name: 'Do',
    pitch: 'C4',
    frequency: 261.63,
    yPosition: 140,
    hasLedgerLine: true,
  },
  Ré: {
    name: 'Ré',
    pitch: 'D4',
    frequency: 293.66,
    yPosition: 130,
    hasLedgerLine: false,
  },
  Mi: {
    name: 'Mi',
    pitch: 'E4',
    frequency: 329.63,
    yPosition: 120,
    hasLedgerLine: false,
  },
  Fa: {
    name: 'Fa',
    pitch: 'F4',
    frequency: 349.23,
    yPosition: 110,
    hasLedgerLine: false,
  },
  Sol: {
    name: 'Sol',
    pitch: 'G4',
    frequency: 392.0,
    yPosition: 100,
    hasLedgerLine: false,
  },
  La: {
    name: 'La',
    pitch: 'A4',
    frequency: 440.0,
    yPosition: 90,
    hasLedgerLine: false,
  },
  Si: {
    name: 'Si',
    pitch: 'B4',
    frequency: 493.88,
    yPosition: 80,
    hasLedgerLine: false,
  },
}

export const ORDERED_NOTE_NAMES: NoteName[] = ['Do', 'Ré', 'Mi', 'Fa', 'Sol', 'La', 'Si']

export const NOTE_BUTTON_COLORS: Record<NoteName, { bg: string; hover: string; border: string; text: string }> = {
  Do: { bg: 'bg-rose-500', hover: 'hover:bg-rose-600', border: 'border-rose-600', text: 'text-white' },
  Ré: { bg: 'bg-orange-500', hover: 'hover:bg-orange-600', border: 'border-orange-600', text: 'text-white' },
  Mi: { bg: 'bg-amber-400', hover: 'hover:bg-amber-500', border: 'border-amber-500', text: 'text-amber-950' },
  Fa: { bg: 'bg-emerald-500', hover: 'hover:bg-emerald-600', border: 'border-emerald-600', text: 'text-white' },
  Sol: { bg: 'bg-teal-500', hover: 'hover:bg-teal-600', border: 'border-teal-600', text: 'text-white' },
  La: { bg: 'bg-blue-500', hover: 'hover:bg-blue-600', border: 'border-blue-600', text: 'text-white' },
  Si: { bg: 'bg-violet-500', hover: 'hover:bg-violet-600', border: 'border-violet-600', text: 'text-white' },
}

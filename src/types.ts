export type NoteName = 'Do' | 'Ré' | 'Mi' | 'Fa' | 'Sol' | 'La' | 'Si'

export type SessionState = 'IDLE' | 'COUNTDOWN' | 'PLAYING' | 'FINISHED'

export interface SessionRecord {
  id: string
  timestamp: number
  score: number
}

export interface NoteDefinition {
  name: NoteName
  pitch: string
  frequency: number
  yPosition: number
  hasLedgerLine?: boolean
}

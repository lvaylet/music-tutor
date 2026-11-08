export type NoteName = 'Do' | 'Ré' | 'Mi' | 'Fa' | 'Sol' | 'La' | 'Si'

export interface NoteDefinition {
  name: NoteName
  pitch: string
  frequency: number
  yPosition: number
  hasLedgerLine?: boolean
}

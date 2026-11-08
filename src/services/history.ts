import { SessionRecord } from '../types'

const STORAGE_KEY = 'music_tutor_history'

/**
 * Loads all recorded sessions from localStorage.
 * Returns an empty array if empty, uninitialized, or invalid.
 */
export function loadHistory(): SessionRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed
  } catch {
    return []
  }
}

/**
 * Calculates the personal record (highest score) from a history array.
 */
export function getPersonalRecord(history: SessionRecord[]): number {
  if (history.length === 0) return 0
  return Math.max(...history.map((s) => s.score))
}

/**
 * Returns the latest N sessions in chronological order for charting.
 */
export function getRecentHistory(history: SessionRecord[], limit = 20): SessionRecord[] {
  if (history.length <= limit) return [...history]
  return history.slice(history.length - limit)
}

/**
 * Saves a completed session to localStorage.
 * Returns the saved session and whether this session established a new personal record.
 */
export function saveSession(score: number): {
  session: SessionRecord
  isNewRecord: boolean
} {
  const history = loadHistory()
  const previousRecord = getPersonalRecord(history)
  const isNewRecord = score > 0 && score > previousRecord

  const session: SessionRecord = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    timestamp: Date.now(),
    score,
  }

  const updatedHistory = [...history, session]
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory))
  } catch {
    // Graceful fallback if localStorage quota exceeded
  }

  return { session, isNewRecord }
}

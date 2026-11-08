import { describe, it, expect, beforeEach } from 'vitest'
import { loadHistory, saveSession, getPersonalRecord, getRecentHistory } from './history'

describe('History Service', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('loads an empty array when localStorage is empty or invalid', () => {
    expect(loadHistory()).toEqual([])
    localStorage.setItem('music_tutor_history', 'invalid-json')
    expect(loadHistory()).toEqual([])
  })

  it('saves a completed session and flags first session as a new record if score > 0', () => {
    const result = saveSession(12)
    expect(result.isNewRecord).toBe(true)
    expect(result.session.score).toBe(12)

    const history = loadHistory()
    expect(history).toHaveLength(1)
    expect(history[0].score).toBe(12)
  })

  it('correctly detects whether a new score beats the previous personal record', () => {
    saveSession(10)
    // Score of 8 is lower than 10
    const second = saveSession(8)
    expect(second.isNewRecord).toBe(false)

    // Score of 15 beats 10
    const third = saveSession(15)
    expect(third.isNewRecord).toBe(true)
  })

  it('calculates the all-time maximum score as personal record', () => {
    expect(getPersonalRecord([])).toBe(0)
    saveSession(5)
    saveSession(14)
    saveSession(9)
    const history = loadHistory()
    expect(getPersonalRecord(history)).toBe(14)
  })

  it('returns the most recent sessions up to the requested limit', () => {
    for (let i = 1; i <= 25; i++) {
      saveSession(i)
    }
    const history = loadHistory()
    const recent = getRecentHistory(history, 15)
    expect(recent).toHaveLength(15)
    expect(recent[recent.length - 1].score).toBe(25)
  })
})

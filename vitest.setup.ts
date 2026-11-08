import '@testing-library/jest-dom/vitest'
import { vi } from 'vitest'

class MockAudioContext {
  state = 'running'
  currentTime = 0
  destination = {}
  createGain() {
    return {
      connect: vi.fn(),
      disconnect: vi.fn(),
      gain: {
        value: 1,
        setValueAtTime: vi.fn(),
        linearRampToValueAtTime: vi.fn(),
        exponentialRampToValueAtTime: vi.fn(),
        setTargetAtTime: vi.fn(),
      },
    }
  }
  createOscillator() {
    return {
      connect: vi.fn(),
      disconnect: vi.fn(),
      start: vi.fn(),
      stop: vi.fn(),
      frequency: {
        value: 440,
        setValueAtTime: vi.fn(),
      },
      type: 'sine',
    }
  }
  createBiquadFilter() {
    return {
      connect: vi.fn(),
      disconnect: vi.fn(),
      frequency: {
        value: 1000,
        setValueAtTime: vi.fn(),
        exponentialRampToValueAtTime: vi.fn(),
      },
      Q: { value: 1 },
      type: 'lowpass',
    }
  }
  createBufferSource() {
    return {
      connect: vi.fn(),
      disconnect: vi.fn(),
      start: vi.fn(),
      stop: vi.fn(),
      buffer: null,
    }
  }
  createBuffer() {
    return {
      getChannelData: vi.fn().mockReturnValue(new Float32Array(1024)),
    }
  }
  close = vi.fn().mockResolvedValue(undefined)
  resume = vi.fn().mockResolvedValue(undefined)
}

// @ts-expect-error mock window AudioContext
window.AudioContext = MockAudioContext
// @ts-expect-error mock window webkitAudioContext
window.webkitAudioContext = MockAudioContext


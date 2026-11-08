let audioCtx: AudioContext | null = null

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    audioCtx = new AudioContextClass()
  }
  if (audioCtx.state === 'suspended') {
    void audioCtx.resume()
  }
  return audioCtx
}

/**
 * Synthesizes an acoustic guitar plucked string sound at the given frequency using Web Audio API.
 * Combines warm fundamental tone, string harmonic partials, dynamic lowpass filter decay,
 * and a subtle plectrum pluck transient.
 */
export function playGuitarNote(frequency: number, duration: number = 1.2): void {
  try {
    const ctx = getAudioContext()
    const now = ctx.currentTime

    // Master envelope for the plucked string
    const masterGain = ctx.createGain()
    masterGain.gain.setValueAtTime(0.0001, now)
    // Instantaneous attack (5ms)
    masterGain.gain.linearRampToValueAtTime(0.35, now + 0.005)
    // Exponential decay of acoustic vibration
    masterGain.gain.exponentialRampToValueAtTime(0.0001, now + duration)
    masterGain.connect(ctx.destination)

    // Dynamic lowpass filter: higher harmonics damp out rapidly
    const filter = ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(frequency * 4.5, now)
    filter.frequency.exponentialRampToValueAtTime(Math.max(80, frequency * 0.9), now + duration)
    filter.connect(masterGain)

    // Fundamental oscillator (triangle wave gives warm hollow body)
    const osc1 = ctx.createOscillator()
    osc1.type = 'triangle'
    osc1.frequency.setValueAtTime(frequency, now)
    osc1.connect(filter)
    osc1.start(now)
    osc1.stop(now + duration)

    // 2nd harmonic (sawtooth adds metallic string shimmer)
    const osc2 = ctx.createOscillator()
    osc2.type = 'sawtooth'
    osc2.frequency.setValueAtTime(frequency * 2, now)
    const osc2Gain = ctx.createGain()
    osc2Gain.gain.setValueAtTime(0.12, now)
    osc2Gain.gain.exponentialRampToValueAtTime(0.0001, now + duration * 0.45)
    osc2.connect(osc2Gain)
    osc2Gain.connect(filter)
    osc2.start(now)
    osc2.stop(now + duration)

    // Pluck transient (finger/pick release)
    const noiseLength = 0.025
    const bufferSize = Math.floor(ctx.sampleRate * noiseLength)
    if (bufferSize > 0) {
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
      const output = noiseBuffer.getChannelData(0)
      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize)
      }
      const noiseSource = ctx.createBufferSource()
      noiseSource.buffer = noiseBuffer
      const noiseGain = ctx.createGain()
      noiseGain.gain.setValueAtTime(0.1, now)
      noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + noiseLength)
      noiseSource.connect(noiseGain)
      noiseGain.connect(masterGain)
      noiseSource.start(now)
    }
  } catch {
    // Gracefully ignore audio errors if Web Audio is unsupported or unavailable
  }
}

import { useEffect, useRef, useCallback } from 'react'

let audioContext = null
let isMutedGlobal = false
let bgMusicInterval = null

const audioCache = {}

const createAudioContext = () => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)()
  }
  return audioContext
}

const playNote = (frequency, duration, volume = 0.3, type = 'sine', delay = 0) => {
  if (isMutedGlobal) return
  try {
    const ctx = createAudioContext()
    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()
    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)
    oscillator.frequency.value = frequency
    oscillator.type = type
    const startTime = ctx.currentTime + delay
    gainNode.gain.setValueAtTime(0, startTime)
    gainNode.gain.linearRampToValueAtTime(volume, startTime + 0.02)
    gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration)
    oscillator.start(startTime)
    oscillator.stop(startTime + duration)
  } catch (e) { /* audio not supported */ }
}

const playWav = (src) => {
  if (isMutedGlobal) return
  try {
    if (!audioCache[src]) {
      audioCache[src] = new Audio(src)
    }
    const audio = audioCache[src]
    audio.currentTime = 0
    audio.play().catch(() => {})
  } catch (e) { /* ignore */ }
}

export const playSound = (soundName) => {
  if (isMutedGlobal) return
  
  switch (soundName) {
    case 'click':
      playNote(700, 0.06, 0.12, 'sine')
      playNote(900, 0.05, 0.1, 'sine', 0.03)
      break
    case 'hover':
      playNote(550, 0.03, 0.06, 'sine')
      break
    case 'success':
      playWav('/assets/backsound/Benar.wav')
      break
    case 'error':
      playWav('/assets/backsound/Salah.wav')
      break
    case 'quiz-start':
      playWav('/assets/backsound/Mulai Quiz.wav')
      break
    case 'score':
      playWav('/assets/backsound/Tampilan Nilai.wav')
      break
    case 'transition':
      playNote(350, 0.08, 0.1, 'sine')
      playNote(450, 0.08, 0.1, 'sine', 0.06)
      playNote(550, 0.1, 0.1, 'sine', 0.12)
      break
    default:
      playNote(440, 0.1, 0.12, 'sine')
  }
}

const playBackgroundLoop = () => {
  if (isMutedGlobal) return
  try {
    const melody = [
      { note: 392, dur: 0.4 },
      { note: 440, dur: 0.4 },
      { note: 494, dur: 0.4 },
      { note: 523, dur: 0.6 },
      { note: 0, dur: 0.3 },
      { note: 494, dur: 0.3 },
      { note: 440, dur: 0.3 },
      { note: 392, dur: 0.5 },
      { note: 0, dur: 0.4 },
      { note: 330, dur: 0.4 },
      { note: 392, dur: 0.4 },
      { note: 440, dur: 0.5 },
      { note: 392, dur: 0.6 },
      { note: 0, dur: 0.5 },
    ]
    let time = 0
    melody.forEach((item) => {
      if (item.note > 0) {
        playNote(item.note, item.dur * 0.85, 0.08, 'sine', time)
        playNote(item.note * 1.5, item.dur * 0.6, 0.03, 'sine', time + 0.02)
      }
      time += item.dur
    })
  } catch (e) { /* ignore */ }
}

export const playBgMusic = () => {
  if (isMutedGlobal || bgMusicInterval) return
  playBackgroundLoop()
  bgMusicInterval = setInterval(() => {
    if (!isMutedGlobal) playBackgroundLoop()
  }, 6000)
}

export const stopBgMusic = () => {
  if (bgMusicInterval) {
    clearInterval(bgMusicInterval)
    bgMusicInterval = null
  }
}

export const pauseBgMusic = () => stopBgMusic()

export const setMuted = (muted) => {
  isMutedGlobal = muted
  if (muted) stopBgMusic()
}

export const initSounds = () => {
  createAudioContext()
  // Pre-load wav files
  ;['/assets/backsound/Benar.wav', '/assets/backsound/Salah.wav', 
    '/assets/backsound/Mulai Quiz.wav', '/assets/backsound/Tampilan Nilai.wav'
  ].forEach(src => { audioCache[src] = new Audio(src) })
}

export const useAudio = (isMuted) => {
  const initialized = useRef(false)

  useEffect(() => {
    if (!initialized.current) {
      initSounds()
      initialized.current = true
    }
  }, [])

  useEffect(() => {
    setMuted(isMuted)
  }, [isMuted])

  const play = useCallback((soundName) => playSound(soundName), [])
  const startBgMusic = useCallback(() => playBgMusic(), [])
  const stopMusic = useCallback(() => stopBgMusic(), [])

  return { play, startBgMusic, stopMusic }
}

export default useAudio

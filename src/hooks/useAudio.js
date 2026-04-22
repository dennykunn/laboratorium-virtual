import { useEffect, useRef, useCallback } from 'react'

let audioContext = null
let isMutedGlobal = false
let bgMusicInterval = null
let activeNarration = null
let isBgMusicEnabledGlobal = true
let isOperatorEnabledGlobal = true

const audioCache = {}
const operatorBase = '/assets/backsound/Audio Operator'

const OPERATOR_AUDIO_MAP = {
  // Slide / screen narration
  'slide-start': `${operatorBase}/001.mp3`,
  'slide-profile': `${operatorBase}/002.mp3`,
  'slide-settings': `${operatorBase}/003.mp3`,
  'slide-exit': `${operatorBase}/004.mp3`,
  'slide-menu': `${operatorBase}/005.mp3`,
  'slide-cptp': `${operatorBase}/006a.mp3`,
  'slide-gerak-bertanya': `${operatorBase}/007.mp3`,
  'slide-gerak-coba-tebak': `${operatorBase}/008.mp3`,
  'slide-gerak-coba-tebak-pertanyaan': `${operatorBase}/009.mp3`,
  'slide-gerak-materi': `${operatorBase}/0010 A.mp3`,
  'slide-gerak-rumus': `${operatorBase}/0010 B.mp3`,
  'slide-gerak-analisis': `${operatorBase}/0012.mp3`,
  'slide-gerak-simpulkan': `${operatorBase}/0013.mp3`,
  'slide-gerak-quiz': `${operatorBase}/0014 awal.mp3`,
  'slide-gerak-score': `${operatorBase}/0015.mp3`,
  'slide-gaya-coba-tebak': `${operatorBase}/0016.mp3`,
  'slide-gaya-coba-tebak-pertanyaan': `${operatorBase}/0017.mp3`,
  'slide-gaya-materi': `${operatorBase}/0018 A.mp3`,
  'slide-gaya-newton': `${operatorBase}/0018 B.mp3`,
  'slide-gaya-newton-1': `${operatorBase}/0018 hukum 1.mp3`,
  'slide-gaya-newton-2': `${operatorBase}/0018 Hukum 2.mp3`,
  'slide-gaya-newton-3': `${operatorBase}/0018 Hukum 3.mp3`,
  'slide-gaya-rumus': `${operatorBase}/0019.mp3`,
  'slide-gaya-analisis': `${operatorBase}/0020.mp3`,
  'slide-gaya-simpulkan': `${operatorBase}/0021.mp3`,
  'slide-gaya-quiz': `${operatorBase}/0022.mp3`,

  // UI element narration
  'ui-play': `${operatorBase}/0023.mp3`,
  'ui-info': `${operatorBase}/0024.mp3`,
  'ui-settings': `${operatorBase}/0025.mp3`,
  'ui-exit': `${operatorBase}/0026.mp3`,
  'ui-next': `${operatorBase}/0027.mp3`,
  'ui-back': `${operatorBase}/0028.mp3`,
  'ui-close': `${operatorBase}/0029.mp3`,
  'ui-volume-on': `${operatorBase}/0030.mp3`,
  'ui-volume-off': `${operatorBase}/0031.mp3`,
  'ui-yes': `${operatorBase}/0032.mp3`,
  'ui-no': `${operatorBase}/0033.mp3`,
  'ui-panduan': `${operatorBase}/0034.mp3`,
  'ui-cptp': `${operatorBase}/0035.mp3`,
  'ui-ayo-belajar': `${operatorBase}/0036.mp3`,
  'ui-gerak': `${operatorBase}/0037.mp3`,
  'ui-gaya': `${operatorBase}/0038.mp3`,
  'ui-ayo-simak': `${operatorBase}/0039.mp3`,
  'ui-ayo-bertanya': `${operatorBase}/0040.mp3`,
  'ui-coba-tebak': `${operatorBase}/0041.mp3`,
  'ui-analisis': `${operatorBase}/0042.mp3`,
  'ui-simpulkan': `${operatorBase}/0043.mp3`,
  'ui-option-a': `${operatorBase}/0044.mp3`,
  'ui-option-b': `${operatorBase}/0045.mp3`,
  'ui-option-c': `${operatorBase}/0046.mp3`,
  'ui-option-d': `${operatorBase}/0047.mp3`,
  'ui-benar': `${operatorBase}/0048.mp3`,
  'ui-salah': `${operatorBase}/0049.mp3`,
}

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

const stopNarration = () => {
  if (activeNarration) {
    activeNarration.pause()
    activeNarration.currentTime = 0
    activeNarration = null
  }
}

const playNarrationSrc = (src, { interrupt = true } = {}) => {
  if (isMutedGlobal || !isOperatorEnabledGlobal || !src) return
  try {
    if (interrupt) stopNarration()
    const audio = new Audio(src)
    audio.volume = 1
    audio.play().catch(() => {})
    activeNarration = audio
    audio.onended = () => {
      if (activeNarration === audio) activeNarration = null
    }
  } catch (e) { /* ignore */ }
}

export const playNarration = (key, options) => {
  const src = OPERATOR_AUDIO_MAP[key] || key
  playNarrationSrc(src, options)
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
    case 'ui-info':
    case 'ui-settings':
    case 'ui-exit':
    case 'ui-play':
    case 'ui-next':
    case 'ui-back':
    case 'ui-close':
    case 'ui-volume-on':
    case 'ui-volume-off':
    case 'ui-yes':
    case 'ui-no':
    case 'ui-panduan':
    case 'ui-cptp':
    case 'ui-ayo-belajar':
    case 'ui-gerak':
    case 'ui-gaya':
    case 'ui-ayo-simak':
    case 'ui-ayo-bertanya':
    case 'ui-coba-tebak':
    case 'ui-analisis':
    case 'ui-simpulkan':
    case 'ui-option-a':
    case 'ui-option-b':
    case 'ui-option-c':
    case 'ui-option-d':
    case 'ui-benar':
    case 'ui-salah':
      playNarration(soundName)
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
  if (isMutedGlobal || !isBgMusicEnabledGlobal) return
  try {
    // Upbeat major melody for cheerful background.
    const melody = [
      { note: 523, dur: 0.22 }, { note: 659, dur: 0.22 }, { note: 784, dur: 0.22 }, { note: 659, dur: 0.22 },
      { note: 698, dur: 0.22 }, { note: 880, dur: 0.22 }, { note: 784, dur: 0.22 }, { note: 659, dur: 0.22 },
      { note: 587, dur: 0.22 }, { note: 659, dur: 0.22 }, { note: 698, dur: 0.22 }, { note: 784, dur: 0.32 },
      { note: 0, dur: 0.16 },
      { note: 784, dur: 0.22 }, { note: 880, dur: 0.22 }, { note: 988, dur: 0.22 }, { note: 880, dur: 0.22 },
      { note: 784, dur: 0.22 }, { note: 698, dur: 0.22 }, { note: 659, dur: 0.22 }, { note: 587, dur: 0.32 },
      { note: 0, dur: 0.2 },
    ]
    let time = 0
    melody.forEach((item) => {
      if (item.note > 0) {
        playNote(item.note, item.dur * 0.95, 0.065, 'triangle', time)
        playNote(item.note * 2, item.dur * 0.65, 0.025, 'sine', time + 0.01)
      }
      time += item.dur
    })
  } catch (e) { /* ignore */ }
}

export const playBgMusic = () => {
  if (isMutedGlobal || !isBgMusicEnabledGlobal || bgMusicInterval) return
  playBackgroundLoop()
  bgMusicInterval = setInterval(() => {
    if (!isMutedGlobal && isBgMusicEnabledGlobal) playBackgroundLoop()
  }, 5200)
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
  if (muted) {
    stopBgMusic()
    stopNarration()
  }
}

export const setBgMusicEnabled = (enabled) => {
  isBgMusicEnabledGlobal = enabled
  if (!enabled) stopBgMusic()
}

export const setOperatorEnabled = (enabled) => {
  isOperatorEnabledGlobal = enabled
  if (!enabled) stopNarration()
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

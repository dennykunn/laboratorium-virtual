import { useEffect, useRef, useCallback } from 'react'

// Web Audio API untuk generate sounds tanpa file external
let audioContext = null
let bgMusicOscillator = null
let bgMusicGain = null
let isMutedGlobal = false

const createAudioContext = () => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)()
  }
  return audioContext
}

// Generate a simple beep sound
const playBeep = (frequency = 440, duration = 0.1, volume = 0.3, type = 'sine') => {
  if (isMutedGlobal) return
  
  try {
    const ctx = createAudioContext()
    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)
    
    oscillator.frequency.value = frequency
    oscillator.type = type
    gainNode.gain.setValueAtTime(volume, ctx.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration)
    
    oscillator.start(ctx.currentTime)
    oscillator.stop(ctx.currentTime + duration)
  } catch (e) {
    console.log('Audio not supported')
  }
}

// Sound effects
export const playSound = (soundName) => {
  if (isMutedGlobal) return
  
  switch (soundName) {
    case 'click':
      playBeep(800, 0.08, 0.2, 'square')
      setTimeout(() => playBeep(1000, 0.05, 0.15, 'square'), 50)
      break
    case 'hover':
      playBeep(600, 0.03, 0.1, 'sine')
      break
    case 'success':
      playBeep(523, 0.15, 0.25, 'sine') // C
      setTimeout(() => playBeep(659, 0.15, 0.25, 'sine'), 100) // E
      setTimeout(() => playBeep(784, 0.2, 0.25, 'sine'), 200) // G
      break
    case 'error':
      playBeep(200, 0.2, 0.3, 'sawtooth')
      setTimeout(() => playBeep(150, 0.3, 0.25, 'sawtooth'), 150)
      break
    case 'transition':
      playBeep(400, 0.1, 0.15, 'sine')
      setTimeout(() => playBeep(500, 0.1, 0.15, 'sine'), 80)
      setTimeout(() => playBeep(600, 0.15, 0.15, 'sine'), 160)
      break
    default:
      playBeep(440, 0.1, 0.2, 'sine')
  }
}

// Background music using oscillators (simple ambient sound)
let bgMusicInterval = null

export const playBgMusic = () => {
  if (isMutedGlobal || bgMusicInterval) return
  
  try {
    const ctx = createAudioContext()
    
    // Create a simple ambient background sound
    const playAmbientNote = () => {
      if (isMutedGlobal) return
      
      const notes = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00] // C4 to A4
      const note = notes[Math.floor(Math.random() * notes.length)]
      
      const oscillator = ctx.createOscillator()
      const gainNode = ctx.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(ctx.destination)
      
      oscillator.frequency.value = note
      oscillator.type = 'sine'
      gainNode.gain.setValueAtTime(0.03, ctx.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 2)
      
      oscillator.start(ctx.currentTime)
      oscillator.stop(ctx.currentTime + 2)
    }
    
    // Play ambient notes at intervals
    bgMusicInterval = setInterval(playAmbientNote, 3000)
    playAmbientNote() // Play first note immediately
    
  } catch (e) {
    console.log('Background music not supported')
  }
}

export const stopBgMusic = () => {
  if (bgMusicInterval) {
    clearInterval(bgMusicInterval)
    bgMusicInterval = null
  }
}

export const pauseBgMusic = () => {
  stopBgMusic()
}

export const setMuted = (muted) => {
  isMutedGlobal = muted
  if (muted) {
    stopBgMusic()
  }
}

export const initSounds = () => {
  // Initialize audio context on first user interaction
  createAudioContext()
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

  const play = useCallback((soundName) => {
    playSound(soundName)
  }, [])

  const startBgMusic = useCallback(() => {
    playBgMusic()
  }, [])

  const stopMusic = useCallback(() => {
    stopBgMusic()
  }, [])

  return { play, startBgMusic, stopMusic }
}

export default useAudio

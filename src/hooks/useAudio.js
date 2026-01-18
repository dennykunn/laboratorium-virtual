import { useEffect, useRef, useCallback } from 'react'

// Web Audio API untuk generate sounds
let audioContext = null
let isMutedGlobal = false
let bgMusicInterval = null

const createAudioContext = () => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)()
  }
  return audioContext
}

// Generate a note with proper envelope
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
  } catch (e) {
    console.log('Audio not supported')
  }
}

// Sound effects
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
      playNote(523, 0.15, 0.18, 'sine')
      playNote(659, 0.15, 0.18, 'sine', 0.12)
      playNote(784, 0.15, 0.18, 'sine', 0.24)
      playNote(1047, 0.3, 0.2, 'sine', 0.36)
      break
    case 'error':
      playNote(280, 0.15, 0.18, 'triangle')
      playNote(220, 0.2, 0.15, 'triangle', 0.12)
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

// Pleasant background music - Soft and cheerful
const playBackgroundLoop = () => {
  if (isMutedGlobal) return
  
  try {
    // Simple, pleasant melody - soft xylophone style
    const melody = [
      { note: 392, dur: 0.4 },   // G4
      { note: 440, dur: 0.4 },   // A4
      { note: 494, dur: 0.4 },   // B4
      { note: 523, dur: 0.6 },   // C5
      { note: 0, dur: 0.3 },     // Rest
      { note: 494, dur: 0.3 },   // B4
      { note: 440, dur: 0.3 },   // A4
      { note: 392, dur: 0.5 },   // G4
      { note: 0, dur: 0.4 },     // Rest
      { note: 330, dur: 0.4 },   // E4
      { note: 392, dur: 0.4 },   // G4
      { note: 440, dur: 0.5 },   // A4
      { note: 392, dur: 0.6 },   // G4
      { note: 0, dur: 0.5 },     // Rest
    ]
    
    let time = 0
    melody.forEach((item) => {
      if (item.note > 0) {
        // Main melody - soft bell/xylophone sound
        playNote(item.note, item.dur * 0.85, 0.08, 'sine', time)
        // Soft harmony
        playNote(item.note * 1.5, item.dur * 0.6, 0.03, 'sine', time + 0.02)
      }
      time += item.dur
    })
    
  } catch (e) {
    console.log('Background music error')
  }
}

export const playBgMusic = () => {
  if (isMutedGlobal || bgMusicInterval) return
  
  // Play immediately
  playBackgroundLoop()
  
  // Repeat every 6 seconds
  bgMusicInterval = setInterval(() => {
    if (!isMutedGlobal) {
      playBackgroundLoop()
    }
  }, 6000)
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

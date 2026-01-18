/**
 * ============================================================================
 * USE-AUDIO.JS - SISTEM MANAJEMEN AUDIO
 * ============================================================================
 * 
 * File ini mengelola semua suara dalam aplikasi:
 * - Sound effects (klik, sukses, error, transisi)
 * - Background music
 * 
 * Menggunakan Web Audio API yang merupakan API bawaan browser untuk
 * menghasilkan dan memanipulasi suara secara programatis (tanpa file audio).
 * 
 * ============================================================================
 */

// Import React hooks
import { useEffect, useRef, useCallback } from 'react'

// ============================================================================
// VARIABEL GLOBAL - Menyimpan state audio di luar komponen React
// ============================================================================

/**
 * audioContext - Objek utama Web Audio API
 * Berfungsi sebagai "studio" untuk membuat dan memproses suara
 */
let audioContext = null

/**
 * isMutedGlobal - Status mute global
 * Jika true, semua suara tidak akan dimainkan
 */
let isMutedGlobal = false

/**
 * bgMusicInterval - Menyimpan ID interval untuk background music
 * Digunakan untuk menghentikan music loop
 */
let bgMusicInterval = null

// ============================================================================
// FUNGSI HELPER - Fungsi pembantu
// ============================================================================

/**
 * createAudioContext() - Membuat atau mengembalikan audioContext yang ada
 * AudioContext hanya boleh dibuat sekali per aplikasi
 * 
 * @returns {AudioContext} Objek AudioContext
 */
const createAudioContext = () => {
  if (!audioContext) {
    // Mendukung berbagai browser (webkit untuk Safari)
    audioContext = new (window.AudioContext || window.webkitAudioContext)()
  }
  return audioContext
}

/**
 * playNote() - Memainkan satu nada musik
 * 
 * Cara kerja:
 * 1. Membuat oscillator (penghasil gelombang suara)
 * 2. Mengatur frekuensi (tinggi-rendah nada)
 * 3. Mengatur volume dengan gain node
 * 4. Memainkan untuk durasi tertentu
 * 
 * @param {number} frequency - Frekuensi nada dalam Hz (misal: 440 = nada A)
 * @param {number} duration - Durasi dalam detik
 * @param {number} volume - Volume (0 sampai 1)
 * @param {string} type - Jenis gelombang: 'sine', 'square', 'triangle', 'sawtooth'
 * @param {number} delay - Delay sebelum memainkan (dalam detik)
 */
const playNote = (frequency, duration, volume = 0.3, type = 'sine', delay = 0) => {
  // Jangan mainkan jika muted
  if (isMutedGlobal) return
  
  try {
    const ctx = createAudioContext()
    
    // Oscillator menghasilkan gelombang suara
    const oscillator = ctx.createOscillator()
    
    // Gain node mengatur volume
    const gainNode = ctx.createGain()
    
    // Hubungkan: oscillator -> gainNode -> speaker (destination)
    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)
    
    // Atur properti suara
    oscillator.frequency.value = frequency  // Tinggi nada
    oscillator.type = type                  // Jenis gelombang
    
    // Atur volume dengan envelope (fade in dan fade out)
    const startTime = ctx.currentTime + delay
    gainNode.gain.setValueAtTime(0, startTime)  // Mulai dari 0
    gainNode.gain.linearRampToValueAtTime(volume, startTime + 0.02)  // Fade in cepat
    gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration)  // Fade out
    
    // Mainkan oscillator
    oscillator.start(startTime)
    oscillator.stop(startTime + duration)
  } catch (e) {
    console.log('Audio not supported')
  }
}

// ============================================================================
// SOUND EFFECTS - Efek suara untuk berbagai aksi
// ============================================================================

/**
 * playSound() - Memainkan sound effect berdasarkan nama
 * 
 * @param {string} soundName - Nama sound: 'click', 'hover', 'success', 'error', 'transition'
 */
export const playSound = (soundName) => {
  if (isMutedGlobal) return
  
  switch (soundName) {
    case 'click':
      // Suara klik: 2 nada pendek naik
      playNote(700, 0.06, 0.12, 'sine')
      playNote(900, 0.05, 0.1, 'sine', 0.03)
      break
      
    case 'hover':
      // Suara hover: 1 nada sangat pendek
      playNote(550, 0.03, 0.06, 'sine')
      break
      
    case 'success':
      // Suara sukses: chord naik C-E-G-C (happy sound)
      playNote(523, 0.15, 0.18, 'sine')        // C5
      playNote(659, 0.15, 0.18, 'sine', 0.12)  // E5
      playNote(784, 0.15, 0.18, 'sine', 0.24)  // G5
      playNote(1047, 0.3, 0.2, 'sine', 0.36)   // C6
      break
      
    case 'error':
      // Suara error: 2 nada turun (sedih)
      playNote(280, 0.15, 0.18, 'triangle')
      playNote(220, 0.2, 0.15, 'triangle', 0.12)
      break
      
    case 'transition':
      // Suara transisi: 3 nada naik cepat
      playNote(350, 0.08, 0.1, 'sine')
      playNote(450, 0.08, 0.1, 'sine', 0.06)
      playNote(550, 0.1, 0.1, 'sine', 0.12)
      break
      
    default:
      // Suara default
      playNote(440, 0.1, 0.12, 'sine')
  }
}

// ============================================================================
// BACKGROUND MUSIC - Musik latar yang berputar terus
// ============================================================================

/**
 * playBackgroundLoop() - Memainkan satu loop melodi background
 * 
 * Melodi yang dimainkan:
 * G-A-B-C (naik) -> B-A-G (turun) -> E-G-A-G (variasi)
 * 
 * Menggunakan nada-nada dalam tangga nada C mayor untuk kesan ceria
 */
const playBackgroundLoop = () => {
  if (isMutedGlobal) return
  
  try {
    // Definisi melodi: note = frekuensi, dur = durasi
    // Frekuensi nada: C4=262, D4=294, E4=330, G4=392, A4=440, B4=494, C5=523
    const melody = [
      { note: 392, dur: 0.4 },   // G4
      { note: 440, dur: 0.4 },   // A4
      { note: 494, dur: 0.4 },   // B4
      { note: 523, dur: 0.6 },   // C5
      { note: 0, dur: 0.3 },     // Rest (istirahat)
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
    
    // Mainkan setiap nada dengan timing yang tepat
    let time = 0
    melody.forEach((item) => {
      if (item.note > 0) {  // Jangan mainkan jika rest (note = 0)
        // Melodi utama
        playNote(item.note, item.dur * 0.85, 0.08, 'sine', time)
        // Harmoni (nada 1.5x lebih tinggi, volume lebih kecil)
        playNote(item.note * 1.5, item.dur * 0.6, 0.03, 'sine', time + 0.02)
      }
      time += item.dur  // Tambah waktu untuk nada berikutnya
    })
    
  } catch (e) {
    console.log('Background music error')
  }
}

/**
 * playBgMusic() - Memulai background music loop
 * Akan memanggil playBackgroundLoop() setiap 6 detik
 */
export const playBgMusic = () => {
  // Jangan mulai jika muted atau sudah berjalan
  if (isMutedGlobal || bgMusicInterval) return
  
  // Mainkan langsung
  playBackgroundLoop()
  
  // Ulangi setiap 6 detik
  bgMusicInterval = setInterval(() => {
    if (!isMutedGlobal) {
      playBackgroundLoop()
    }
  }, 6000)
}

/**
 * stopBgMusic() - Menghentikan background music
 */
export const stopBgMusic = () => {
  if (bgMusicInterval) {
    clearInterval(bgMusicInterval)  // Hentikan interval
    bgMusicInterval = null
  }
}

/**
 * pauseBgMusic() - Alias untuk stopBgMusic
 */
export const pauseBgMusic = () => {
  stopBgMusic()
}

/**
 * setMuted() - Mengatur status mute global
 * @param {boolean} muted - true untuk mute, false untuk unmute
 */
export const setMuted = (muted) => {
  isMutedGlobal = muted
  if (muted) {
    stopBgMusic()  // Hentikan musik jika dimute
  }
}

/**
 * initSounds() - Inisialisasi sistem audio
 * Harus dipanggil setelah user berinteraksi dengan halaman
 */
export const initSounds = () => {
  createAudioContext()
}

// ============================================================================
// CUSTOM HOOK - Hook React untuk menggunakan audio dalam komponen
// ============================================================================

/**
 * useAudio() - Custom hook untuk manajemen audio dalam komponen React
 * 
 * @param {boolean} isMuted - Status mute dari komponen
 * @returns {object} Object berisi fungsi-fungsi audio
 * 
 * Contoh penggunaan:
 * const { play, startBgMusic, stopMusic } = useAudio(isMuted)
 * play('click')  // Mainkan suara klik
 */
export const useAudio = (isMuted) => {
  // useRef menyimpan nilai yang tidak menyebabkan re-render
  const initialized = useRef(false)

  // Inisialisasi sekali saat mount
  useEffect(() => {
    if (!initialized.current) {
      initSounds()
      initialized.current = true
    }
  }, [])

  // Update status mute saat prop berubah
  useEffect(() => {
    setMuted(isMuted)
  }, [isMuted])

  // useCallback meng-cache fungsi agar tidak dibuat ulang setiap render
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

// Export default
export default useAudio

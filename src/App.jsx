import { useState, useEffect, createContext, useContext } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import LoadingScreen from './components/LoadingScreen'
import StartScreen from './components/StartScreen'
import MainMenu from './components/MainMenu'
import PanduanScreen from './components/PanduanScreen'
import CPTPScreen from './components/CPTPScreen'
import AyoBelajarScreen from './components/AyoBelajarScreen'
import TopicFlow from './components/TopicFlow'

import {
  initSounds, playBgMusic, stopBgMusic,
  setMuted as setAudioMuted, playSound
} from './hooks/useAudio'

import './App.css'

export const AppContext = createContext()
export const useApp = () => useContext(AppContext)

const requestFullscreen = () => {
  const elem = document.documentElement
  if (elem.requestFullscreen) elem.requestFullscreen()
  else if (elem.webkitRequestFullscreen) elem.webkitRequestFullscreen()
  else if (elem.msRequestFullscreen) elem.msRequestFullscreen()
}

const exitFullscreen = () => {
  if (document.exitFullscreen) document.exitFullscreen()
  else if (document.webkitExitFullscreen) document.webkitExitFullscreen()
  else if (document.msExitFullscreen) document.msExitFullscreen()
}

const isFullscreen = () => {
  return !!(document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement)
}

function App() {
  const [currentScreen, setCurrentScreen] = useState('loading')
  const [isMuted, setIsMuted] = useState(false)
  const [audioInitialized, setAudioInitialized] = useState(false)
  const [isFullscreenMode, setIsFullscreenMode] = useState(false)
  const [currentTopic, setCurrentTopic] = useState(null)

  useEffect(() => {
    const handleFullscreenChange = () => setIsFullscreenMode(isFullscreen())
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange)
    document.addEventListener('msfullscreenchange', handleFullscreenChange)
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange)
      document.removeEventListener('msfullscreenchange', handleFullscreenChange)
    }
  }, [])

  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!audioInitialized) {
        initSounds()
        setAudioInitialized(true)
        if (!isFullscreen()) requestFullscreen()
        document.removeEventListener('click', handleFirstInteraction)
        document.removeEventListener('touchstart', handleFirstInteraction)
      }
    }
    document.addEventListener('click', handleFirstInteraction)
    document.addEventListener('touchstart', handleFirstInteraction)
    return () => {
      document.removeEventListener('click', handleFirstInteraction)
      document.removeEventListener('touchstart', handleFirstInteraction)
    }
  }, [audioInitialized])

  useEffect(() => { setAudioMuted(isMuted) }, [isMuted])

  useEffect(() => {
    if (currentScreen !== 'loading' && audioInitialized && !isMuted) playBgMusic()
    return () => { if (currentScreen === 'loading') stopBgMusic() }
  }, [currentScreen, audioInitialized, isMuted])

  const navigateTo = (screen) => {
    if (audioInitialized) playSound('transition')
    setCurrentScreen(screen)
  }

  const toggleMute = () => {
    if (audioInitialized) playSound('click')
    const newMuted = !isMuted
    setIsMuted(newMuted)
    if (!newMuted && currentScreen !== 'loading') setTimeout(() => playBgMusic(), 100)
  }

  const toggleFullscreen = () => {
    if (audioInitialized) playSound('click')
    if (isFullscreen()) exitFullscreen()
    else requestFullscreen()
  }

  const contextValue = {
    currentScreen, navigateTo, isMuted, setIsMuted,
    audioInitialized, isFullscreenMode, toggleFullscreen,
    currentTopic, setCurrentTopic,
    playSound: (sound) => audioInitialized && playSound(sound)
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case 'loading': return <LoadingScreen key="loading" />
      case 'start': return <StartScreen key="start" />
      case 'menu': return <MainMenu key="menu" />
      case 'panduan': return <PanduanScreen key="panduan" />
      case 'cptp': return <CPTPScreen key="cptp" />
      case 'ayo-belajar': return <AyoBelajarScreen key="ayo-belajar" />
      case 'topic-gerak': return <TopicFlow key="topic-gerak" topic="gerak" />
      case 'topic-gaya': return <TopicFlow key="topic-gaya" topic="gaya" />
      default: return <LoadingScreen key="loading" />
    }
  }

  return (
    <AppContext.Provider value={contextValue}>
      <div className="w-screen h-screen relative overflow-hidden bg-sky-300">
        <AnimatePresence mode="wait">
          {renderScreen()}
        </AnimatePresence>

        {!['loading', 'topic-gerak', 'topic-gaya'].includes(currentScreen) && (
          <div className="fixed bottom-4 left-4 flex gap-3 z-999">
            <motion.img
              src={isMuted ? '/assets/elemen/Volume Mati.png' : '/assets/elemen/Volume Hidup.png'}
              alt="Toggle Sound"
              className="w-[50px] h-[50px] cursor-pointer drop-shadow-[2px_4px_6px_rgba(0,0,0,0.3)]"
              onClick={toggleMute}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
            />
            <motion.div
              className="w-[50px] h-[50px] bg-white/90 rounded-full flex items-center justify-center cursor-pointer text-2xl text-gray-800 shadow-[2px_4px_10px_rgba(0,0,0,0.25)] hover:bg-white"
              onClick={toggleFullscreen}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              title={isFullscreenMode ? 'Exit Fullscreen' : 'Fullscreen'}
            >
              {isFullscreenMode ? '⧉ ' : '⛶'}
            </motion.div>
          </div>
        )}
      </div>
    </AppContext.Provider>
  )
}

export default App

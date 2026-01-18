import { useState, useEffect, createContext, useContext } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import LoadingScreen from './components/LoadingScreen'
import StartScreen from './components/StartScreen'
import MainMenu from './components/MainMenu'
import PanduanScreen from './components/PanduanScreen'
import CPTPScreen from './components/CPTPScreen'
import MateriScreen from './components/MateriScreen'
import PraktikumMenu from './components/PraktikumMenu'
import PetunjukPraktikum from './components/PetunjukPraktikum'
import PraktikumLab from './components/PraktikumLab'
import QuizScreen from './components/QuizScreen'
import ScoreScreen from './components/ScoreScreen'
import { initSounds, playBgMusic, stopBgMusic, setMuted as setAudioMuted, playSound } from './hooks/useAudio'
import './App.css'

// Context untuk state global
export const AppContext = createContext()

export const useApp = () => useContext(AppContext)

// Fullscreen helper functions
const requestFullscreen = () => {
  const elem = document.documentElement
  if (elem.requestFullscreen) {
    elem.requestFullscreen()
  } else if (elem.webkitRequestFullscreen) {
    elem.webkitRequestFullscreen()
  } else if (elem.msRequestFullscreen) {
    elem.msRequestFullscreen()
  }
}

const exitFullscreen = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen()
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen()
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen()
  }
}

const isFullscreen = () => {
  return !!(document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement)
}

function App() {
  const [currentScreen, setCurrentScreen] = useState('loading')
  const [isMuted, setIsMuted] = useState(false)
  const [quizScore, setQuizScore] = useState(0)
  const [audioInitialized, setAudioInitialized] = useState(false)
  const [isFullscreenMode, setIsFullscreenMode] = useState(false)

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreenMode(isFullscreen())
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange)
    document.addEventListener('msfullscreenchange', handleFullscreenChange)

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange)
      document.removeEventListener('msfullscreenchange', handleFullscreenChange)
    }
  }, [])

  // Initialize sounds and request fullscreen on first user interaction
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!audioInitialized) {
        initSounds()
        setAudioInitialized(true)
        
        // Request fullscreen on first interaction
        if (!isFullscreen()) {
          requestFullscreen()
        }
        
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

  // Handle mute state
  useEffect(() => {
    setAudioMuted(isMuted)
  }, [isMuted])

  // Start background music when leaving loading screen
  useEffect(() => {
    if (currentScreen !== 'loading' && audioInitialized && !isMuted) {
      playBgMusic()
    }
    return () => {
      if (currentScreen === 'loading') {
        stopBgMusic()
      }
    }
  }, [currentScreen, audioInitialized, isMuted])

  const navigateTo = (screen) => {
    if (audioInitialized) {
      playSound('transition')
    }
    setCurrentScreen(screen)
  }

  const toggleMute = () => {
    if (audioInitialized) {
      playSound('click')
    }
    const newMuted = !isMuted
    setIsMuted(newMuted)
    if (!newMuted && currentScreen !== 'loading') {
      setTimeout(() => playBgMusic(), 100)
    }
  }

  const toggleFullscreen = () => {
    if (audioInitialized) {
      playSound('click')
    }
    if (isFullscreen()) {
      exitFullscreen()
    } else {
      requestFullscreen()
    }
  }

  const contextValue = {
    currentScreen,
    navigateTo,
    isMuted,
    setIsMuted,
    quizScore,
    setQuizScore,
    audioInitialized,
    isFullscreenMode,
    toggleFullscreen,
    playSound: (sound) => audioInitialized && playSound(sound)
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case 'loading':
        return <LoadingScreen key="loading" />
      case 'start':
        return <StartScreen key="start" />
      case 'menu':
        return <MainMenu key="menu" />
      case 'panduan':
        return <PanduanScreen key="panduan" />
      case 'cptp':
        return <CPTPScreen key="cptp" />
      case 'materi':
        return <MateriScreen key="materi" />
      case 'praktikum-menu':
        return <PraktikumMenu key="praktikum-menu" />
      case 'petunjuk-praktikum':
        return <PetunjukPraktikum key="petunjuk-praktikum" />
      case 'praktikum-lab':
        return <PraktikumLab key="praktikum-lab" />
      case 'quiz':
        return <QuizScreen key="quiz" />
      case 'score':
        return <ScoreScreen key="score" />
      default:
        return <LoadingScreen key="loading" />
    }
  }

  return (
    <AppContext.Provider value={contextValue}>
      <div className="app-container">
        <AnimatePresence mode="wait">
          {renderScreen()}
        </AnimatePresence>

        {/* Bottom Left Controls */}
        {currentScreen !== 'loading' && (
          <div className="bottom-controls">
            <motion.img 
              src={isMuted ? '/assets/elemen/Volume Mati.png' : '/assets/elemen/Volume Hidup.png'}
              alt="Toggle Sound"
              className="control-btn"
              onClick={toggleMute}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
            />
            <motion.div
              className="fullscreen-btn"
              onClick={toggleFullscreen}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              title={isFullscreenMode ? 'Exit Fullscreen' : 'Fullscreen'}
            >
              {isFullscreenMode ? '⊠' : '⛶'}
            </motion.div>
          </div>
        )}
      </div>
    </AppContext.Provider>
  )
}

export default App

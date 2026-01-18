import { useState, useEffect, useRef, createContext, useContext } from 'react'
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

// Hook untuk scaling container
const useContainerScale = () => {
  const [scale, setScale] = useState(1)
  const containerRef = useRef(null)

  useEffect(() => {
    const calculateScale = () => {
      const designWidth = 1920
      const designHeight = 1080
      
      const windowWidth = window.innerWidth
      const windowHeight = window.innerHeight
      
      const scaleX = windowWidth / designWidth
      const scaleY = windowHeight / designHeight
      
      // Use the smaller scale to fit the container
      const newScale = Math.min(scaleX, scaleY)
      setScale(newScale)
    }

    calculateScale()
    window.addEventListener('resize', calculateScale)
    
    return () => window.removeEventListener('resize', calculateScale)
  }, [])

  return { scale, containerRef }
}

function App() {
  const [currentScreen, setCurrentScreen] = useState('loading')
  const [isMuted, setIsMuted] = useState(false)
  const [quizScore, setQuizScore] = useState(0)
  const [audioInitialized, setAudioInitialized] = useState(false)
  const { scale, containerRef } = useContainerScale()

  // Initialize sounds on first user interaction
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!audioInitialized) {
        initSounds()
        setAudioInitialized(true)
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
    setIsMuted(!isMuted)
  }

  const contextValue = {
    currentScreen,
    navigateTo,
    isMuted,
    setIsMuted,
    quizScore,
    setQuizScore,
    audioInitialized,
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
      <div 
        ref={containerRef}
        className="app-container"
        style={{
          transform: `scale(${scale})`,
        }}
      >
        <AnimatePresence mode="wait">
          {renderScreen()}
        </AnimatePresence>

        {/* Mute Toggle Button - Always visible except on loading */}
        {currentScreen !== 'loading' && (
          <motion.img 
            src={isMuted ? '/assets/elemen/Volume Mati.png' : '/assets/elemen/Volume Hidup.png'}
            alt="Toggle Sound"
            className="mute-toggle"
            onClick={toggleMute}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          />
        )}
      </div>
    </AppContext.Provider>
  )
}

export default App

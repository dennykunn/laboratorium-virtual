import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useApp } from '../App'
import './LoadingScreen.css'

function LoadingScreen() {
  const { navigateTo } = useApp()
  const videoRef = useRef(null)

  useEffect(() => {
    // Auto navigate after loading animation
    const timeout = setTimeout(() => {
      navigateTo('start')
    }, 4000)
    
    return () => {
      clearTimeout(timeout)
    }
  }, [navigateTo])

  const handleSkip = () => {
    navigateTo('start')
  }

  return (
    <motion.div 
      className="screen loading-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="loading-background">
        <img 
          src="/assets/latar-slide/1.jpg" 
          alt="Background"
          className="loading-bg-image"
        />
      </div>
      
      <div className="loading-content">
        <motion.div 
          className="loading-logo"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img 
            src="/assets/elemen/Gerak & Gaya.png" 
            alt="Gerak & Gaya"
            className="logo-gerak-gaya"
          />
        </motion.div>
        
        <motion.div 
          className="loading-subtitle"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <img 
            src="/assets/elemen/IPA-SMPMTs kelas VII.png" 
            alt="IPA SMP/MTs Kelas VII"
            className="subtitle-image"
          />
        </motion.div>
        
        <motion.div 
          className="loading-bar-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="loading-bar">
            <motion.div 
              className="loading-bar-fill"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 3.5, ease: 'linear' }}
            />
          </div>
          <p className="loading-text">Memuat...</p>
        </motion.div>
      </div>

      <motion.button 
        className="skip-button" 
        onClick={handleSkip}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Lewati →
      </motion.button>
    </motion.div>
  )
}

export default LoadingScreen

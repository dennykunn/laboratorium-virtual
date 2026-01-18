import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useApp } from '../App'
import './ScoreScreen.css'

function ScoreScreen() {
  const { navigateTo, quizScore, playSound } = useApp()

  useEffect(() => {
    // Play success sound when score screen appears
    playSound('success')
  }, [playSound])

  const handleButtonClick = (action) => {
    playSound('click')
    action()
  }

  return (
    <motion.div 
      className="screen score-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="score-background">
        <img src="/assets/latar-slide/5.jpg" alt="Lab Background" className="score-bg-image" />
      </div>

      {/* Header Left - Menu */}
      <div className="score-header-left">
        <motion.img 
          src="/assets/elemen/Balik Menu Utama.png" 
          alt="Menu"
          className="btn-icon"
          onClick={() => handleButtonClick(() => navigateTo('menu'))}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        />
      </div>

      {/* Score Board */}
      <motion.div 
        className="score-board-container"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
      >
        <div className="score-board">
          <motion.h2 
            className="score-title"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            KEREN!!
          </motion.h2>
          
          <motion.p 
            className="score-message"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            KAMU SUDAH PAHAM DENGAN MATERI GAYA
          </motion.p>
          
          <motion.p 
            className="score-subtitle"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            DENGAN SKOR QUIZ
          </motion.p>
          
          <motion.div 
            className="score-value"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.7, type: 'spring', stiffness: 150 }}
          >
            <span>{quizScore}</span>
          </motion.div>

          <motion.div 
            className="score-buttons"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <motion.button
              className="btn-retry"
              onClick={() => handleButtonClick(() => navigateTo('praktikum-lab'))}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Ulangi Praktikum
            </motion.button>
            
            <motion.button
              className="btn-menu"
              onClick={() => handleButtonClick(() => navigateTo('menu'))}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Menu Utama
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* Confetti Effect */}
      <div className="confetti-container">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="confetti"
            style={{
              left: `${Math.random() * 100}%`,
              backgroundColor: ['#f39c12', '#e74c3c', '#3498db', '#2ecc71', '#9b59b6'][Math.floor(Math.random() * 5)]
            }}
            initial={{ y: -50, opacity: 0 }}
            animate={{ 
              y: '100vh', 
              opacity: [0, 1, 1, 0],
              rotate: Math.random() * 360
            }}
            transition={{ 
              duration: 3 + Math.random() * 2, 
              delay: Math.random() * 2,
              repeat: Infinity,
              repeatDelay: Math.random() * 3
            }}
          />
        ))}
      </div>
    </motion.div>
  )
}

export default ScoreScreen

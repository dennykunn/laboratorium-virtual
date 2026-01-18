import { motion } from 'framer-motion'
import { playSound } from '../../hooks/useAudio'

function SoundButton({ 
  children, 
  onClick, 
  className = '', 
  soundType = 'click',
  hoverSound = true,
  ...props 
}) {
  const handleClick = (e) => {
    playSound(soundType)
    if (onClick) onClick(e)
  }

  const handleHover = () => {
    if (hoverSound) {
      playSound('hover')
    }
  }

  return (
    <motion.div
      className={className}
      onClick={handleClick}
      onHoverStart={handleHover}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default SoundButton

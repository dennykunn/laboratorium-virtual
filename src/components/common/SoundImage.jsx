import { motion } from 'framer-motion'
import { playSound } from '../../hooks/useAudio'

function SoundImage({ 
  src, 
  alt, 
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
    <motion.img
      src={src}
      alt={alt}
      className={className}
      onClick={handleClick}
      onHoverStart={handleHover}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      style={{ cursor: 'pointer' }}
      {...props}
    />
  )
}

export default SoundImage

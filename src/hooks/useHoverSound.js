import { useRef } from 'react'

export default function useHoverSound(playSound) {
  const lastHoverRef = useRef({ key: '', at: 0 })

  return (key, sound = 'click') => {
    if (!playSound) return
    const now = Date.now()
    const sameKey = lastHoverRef.current.key === key
    const tooSoon = now - lastHoverRef.current.at < 250
    if (sameKey && tooSoon) return
    lastHoverRef.current = { key, at: now }
    playSound(sound)
  }
}

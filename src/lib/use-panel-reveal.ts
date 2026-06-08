import { useEffect, useState } from 'react'

export function usePanelReveal(panelKey: string) {
  const [isRevealed, setIsRevealed] = useState(false)

  useEffect(() => {
    setIsRevealed(false)
    const frame = requestAnimationFrame(() => setIsRevealed(true))
    return () => cancelAnimationFrame(frame)
  }, [panelKey])

  return isRevealed
}

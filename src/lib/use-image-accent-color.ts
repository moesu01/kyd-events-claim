import { useEffect, useState } from 'react'
import { extractImageAccentColor, resolveAccentColor } from './image-accent-color'

export function useImageAccentColor(imageUrl: string, presetColor?: string) {
  const [accentColor, setAccentColor] = useState(() => resolveAccentColor(presetColor))

  useEffect(() => {
    if (presetColor) {
      setAccentColor(resolveAccentColor(presetColor))
      return
    }

    let isCancelled = false

    extractImageAccentColor(imageUrl).then((color) => {
      if (!isCancelled) setAccentColor(color)
    })

    return () => {
      isCancelled = true
    }
  }, [imageUrl, presetColor])

  return accentColor
}

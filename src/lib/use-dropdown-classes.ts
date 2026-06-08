import { useEffect, useRef, useState } from 'react'
import { mergeClassNames } from './merge-class-names'

function getDropdownCloseMs() {
  if (typeof window === 'undefined') return 150
  const raw = getComputedStyle(document.documentElement).getPropertyValue('--dropdown-close-dur')
  return parseFloat(raw) || 150
}

export function useDropdownClasses(isOpen: boolean) {
  const [isClosing, setIsClosing] = useState(false)
  const [isOpening, setIsOpening] = useState(false)
  const wasOpenRef = useRef(isOpen)

  useEffect(() => {
    if (isOpen) {
      wasOpenRef.current = true
      setIsClosing(false)
      setIsOpening(false)
      const frame = requestAnimationFrame(() => setIsOpening(true))
      return () => cancelAnimationFrame(frame)
    }

    if (!wasOpenRef.current) return

    wasOpenRef.current = false
    setIsOpening(false)
    setIsClosing(true)

    const timer = setTimeout(() => setIsClosing(false), getDropdownCloseMs())
    return () => clearTimeout(timer)
  }, [isOpen])

  const className = mergeClassNames(
    't-dropdown',
    isOpen && isOpening ? 'is-open' : '',
    isClosing ? 'is-closing' : '',
  )

  const isVisible = isOpen || isClosing

  return { className, isVisible }
}

import { useCallback, useEffect, useRef, useState } from 'react'
import { mergeClassNames } from './merge-class-names'

const STAGGER_HIDE_MS = 200

export function useStaggerReveal(isActive: boolean) {
  const [isShown, setIsShown] = useState(false)
  const [isHiding, setIsHiding] = useState(false)
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!isActive) {
      setIsShown(false)
      setIsHiding(false)
    }
  }, [isActive])

  useEffect(() => {
    return () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
    }
  }, [])

  const handleEnterComplete = useCallback(() => {
    if (isActive) setIsShown(true)
  }, [isActive])

  const beginCollapse = useCallback((onComplete: () => void) => {
    setIsShown(false)
    setIsHiding(true)

    if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
    hideTimerRef.current = setTimeout(() => {
      setIsHiding(false)
      onComplete()
    }, STAGGER_HIDE_MS)
  }, [])

  const staggerClassName = mergeClassNames(
    't-stagger',
    isShown ? 'is-shown' : '',
    isHiding ? 'is-hiding' : '',
  )

  return { staggerClassName, handleEnterComplete, beginCollapse }
}

import { useCallback, useLayoutEffect, useRef } from 'react'

interface UseTabsPillOptions {
  activeValue: string
}

export function useTabsPill({ activeValue }: UseTabsPillOptions) {
  const listRef = useRef<HTMLDivElement>(null)
  const pillRef = useRef<HTMLSpanElement>(null)
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map())

  const registerTab = useCallback((value: string, element: HTMLButtonElement | null) => {
    if (element) tabRefs.current.set(value, element)
    else tabRefs.current.delete(value)
  }, [])

  const movePill = useCallback((animate: boolean) => {
    const pill = pillRef.current
    const tab = tabRefs.current.get(activeValue)
    if (!pill || !tab) return

    if (!animate) {
      const prev = pill.style.transition
      pill.style.transition = 'none'
      pill.style.transform = `translateX(${tab.offsetLeft}px)`
      pill.style.width = `${tab.offsetWidth}px`
      void pill.offsetWidth
      pill.style.transition = prev
      return
    }

    pill.style.transform = `translateX(${tab.offsetLeft}px)`
    pill.style.width = `${tab.offsetWidth}px`
  }, [activeValue])

  useLayoutEffect(() => {
    movePill(false)
    const frame = requestAnimationFrame(() => movePill(false))
    return () => cancelAnimationFrame(frame)
  }, [movePill])

  useLayoutEffect(() => {
    movePill(true)
  }, [activeValue, movePill])

  useLayoutEffect(() => {
    const handleResize = () => movePill(false)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [movePill])

  return { listRef, pillRef, registerTab }
}

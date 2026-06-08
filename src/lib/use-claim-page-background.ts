import { useEffect } from 'react'
import { getClaimPageBackground } from './claim-page-background'

const PAGE_BACKGROUND_TARGETS = ['html', 'body', '#root'] as const

export function useClaimPageBackground() {
  useEffect(() => {
    const background = getClaimPageBackground()

    for (const selector of PAGE_BACKGROUND_TARGETS) {
      const element = document.querySelector<HTMLElement>(selector)
      if (!element) continue

      element.style.background = background
      element.style.backgroundAttachment = 'fixed'
      element.style.minHeight = selector === '#root' ? '100vh' : '100%'
    }

    return () => {
      for (const selector of PAGE_BACKGROUND_TARGETS) {
        const element = document.querySelector<HTMLElement>(selector)
        if (!element) continue

        element.style.background = ''
        element.style.backgroundAttachment = ''
        element.style.minHeight = ''
      }
    }
  }, [])
}

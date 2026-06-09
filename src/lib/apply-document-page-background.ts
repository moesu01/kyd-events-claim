import { isIosDevice } from './is-safari-browser'

const PAGE_BACKGROUND_TARGETS = ['html', 'body', '#root'] as const

const PAGE_BACKGROUND_FALLBACK_COLOR = 'oklch(0 0 0)'

export function applyDocumentPageBackground(background: string): () => void {
  const useFixedAttachment = !isIosDevice()

  for (const selector of PAGE_BACKGROUND_TARGETS) {
    const element = document.querySelector<HTMLElement>(selector)
    if (!element) continue

    element.style.background = background
    element.style.backgroundColor = PAGE_BACKGROUND_FALLBACK_COLOR
    element.style.backgroundAttachment = useFixedAttachment ? 'fixed' : 'scroll'

    if (selector === '#root') {
      element.style.minHeight = useFixedAttachment ? '100vh' : '100dvh'
      continue
    }

    element.style.minHeight = useFixedAttachment ? '100%' : '100dvh'
  }

  return () => {
    for (const selector of PAGE_BACKGROUND_TARGETS) {
      const element = document.querySelector<HTMLElement>(selector)
      if (!element) continue

      element.style.background = ''
      element.style.backgroundColor = ''
      element.style.backgroundAttachment = ''
      element.style.minHeight = ''
    }
  }
}

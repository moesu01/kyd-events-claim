import { isIosDevice } from './is-safari-browser'

const PAGE_BACKGROUND_LAYER_ID = 'page-background'
const PAGE_BACKGROUND_TARGETS = ['html', 'body', '#root'] as const
const PAGE_BACKGROUND_FALLBACK_COLOR = 'oklch(0 0 0)'

function ensurePageBackgroundLayer(): HTMLElement {
  let layer = document.getElementById(PAGE_BACKGROUND_LAYER_ID)
  if (layer) return layer

  layer = document.createElement('div')
  layer.id = PAGE_BACKGROUND_LAYER_ID
  layer.setAttribute('aria-hidden', 'true')
  document.body.prepend(layer)
  return layer
}

function removePageBackgroundLayer() {
  document.getElementById(PAGE_BACKGROUND_LAYER_ID)?.remove()
}

function clearPageBackgroundTargets() {
  for (const selector of PAGE_BACKGROUND_TARGETS) {
    const element = document.querySelector<HTMLElement>(selector)
    if (!element) continue

    element.style.background = ''
    element.style.backgroundColor = ''
    element.style.backgroundAttachment = ''
    element.style.minHeight = ''
    element.style.position = ''
    element.style.zIndex = ''
  }
}

function applyIosViewportBackground(background: string) {
  const layer = ensurePageBackgroundLayer()

  layer.style.position = 'fixed'
  layer.style.inset = '0'
  layer.style.zIndex = '0'
  layer.style.pointerEvents = 'none'
  layer.style.width = '100%'
  layer.style.minHeight = '100dvh'
  layer.style.background = background
  layer.style.backgroundColor = PAGE_BACKGROUND_FALLBACK_COLOR

  const html = document.documentElement
  html.style.backgroundColor = PAGE_BACKGROUND_FALLBACK_COLOR

  const body = document.body
  body.style.background = 'transparent'
  body.style.backgroundColor = 'transparent'
  body.style.backgroundAttachment = ''
  body.style.minHeight = '100dvh'

  const root = document.getElementById('root')
  if (root) {
    root.style.position = 'relative'
    root.style.zIndex = '1'
    root.style.background = 'transparent'
    root.style.backgroundColor = 'transparent'
    root.style.backgroundAttachment = ''
    root.style.minHeight = '100dvh'
  }
}

function applyFixedDocumentBackground(background: string) {
  removePageBackgroundLayer()

  for (const selector of PAGE_BACKGROUND_TARGETS) {
    const element = document.querySelector<HTMLElement>(selector)
    if (!element) continue

    element.style.background = background
    element.style.backgroundColor = PAGE_BACKGROUND_FALLBACK_COLOR
    element.style.backgroundAttachment = 'fixed'
    element.style.minHeight = selector === '#root' ? '100vh' : '100%'
    element.style.position = ''
    element.style.zIndex = ''
  }
}

export function applyDocumentPageBackground(background: string): () => void {
  if (isIosDevice()) applyIosViewportBackground(background)
  else applyFixedDocumentBackground(background)

  return () => {
    removePageBackgroundLayer()
    clearPageBackgroundTargets()
  }
}

import { FALLBACK_ACCENT_OKLCH, GRADIENT_MID_OKLCH } from './oklch-color'

export const EVENT_PAGE_ACCENT_VAR = '--event-page-accent'

export function getEventPageBackground(
  tintColor: string = FALLBACK_ACCENT_OKLCH,
): string {
  return `linear-gradient(322.9deg, ${tintColor} 0%, ${GRADIENT_MID_OKLCH} 30.1%, ${tintColor} 97.31%)`
}

export function applyEventPageAccentVar(
  accentColor: string = FALLBACK_ACCENT_OKLCH,
  target: HTMLElement = document.documentElement,
): void {
  target.style.setProperty(EVENT_PAGE_ACCENT_VAR, accentColor)
}

export function clearEventPageAccentVar(
  target: HTMLElement = document.documentElement,
): void {
  target.style.removeProperty(EVENT_PAGE_ACCENT_VAR)
}

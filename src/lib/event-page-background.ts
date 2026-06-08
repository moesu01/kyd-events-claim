import { FALLBACK_ACCENT_OKLCH, GRADIENT_MID_OKLCH } from './oklch-color'

export function getEventPageBackground(
  tintColor: string = FALLBACK_ACCENT_OKLCH,
): string {
  return `linear-gradient(322.9deg, ${tintColor} 0%, ${GRADIENT_MID_OKLCH} 30.1%, ${tintColor} 97.31%)`
}

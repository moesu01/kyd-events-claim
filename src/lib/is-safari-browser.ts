/** Shine contrast tuned for WebKit — inline style must set this (CSS !important loses to React style). */
export const SAFARI_SHINE_CONTRAST = 1.12

/** iOS WebKit cannot paint `background-attachment: fixed` across the full viewport. */
export function isIosDevice(): boolean {
  if (typeof navigator === 'undefined') return false

  return (
    /iPhone|iPad|iPod/i.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  )
}

export function isSafariBrowser(): boolean {
  if (typeof navigator === 'undefined') return false

  const ua = navigator.userAgent
  return /Safari/i.test(ua) && !/Chrome|Chromium|CriOS|Edg|OPR|Firefox|FxiOS|EdgiOS/i.test(ua)
}

export function getEffectiveShineContrast(shineContrast: number): number {
  return isSafariBrowser() ? SAFARI_SHINE_CONTRAST : shineContrast
}

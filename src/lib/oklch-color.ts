interface Rgb {
  r: number
  g: number
  b: number
}

interface Oklch {
  l: number
  c: number
  h: number
}

const ACCENT_LIGHTNESS = 0.24
const ACCENT_CHROMA_FLOOR = 0.07
const ACCENT_CHROMA_CEILING = 0.11

function linearizeChannel(channel: number): number {
  const normalized = channel / 255
  return normalized <= 0.04045
    ? normalized / 12.92
    : ((normalized + 0.055) / 1.055) ** 2.4
}

export function rgbToOklch({ r, g, b }: Rgb): Oklch {
  const lr = linearizeChannel(r)
  const lg = linearizeChannel(g)
  const lb = linearizeChannel(b)

  const l = 0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb
  const m = 0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb
  const s = 0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb

  const lRoot = l ** (1 / 3)
  const mRoot = m ** (1 / 3)
  const sRoot = s ** (1 / 3)

  const lightness =
    0.2104542553 * lRoot + 0.793617785 * mRoot - 0.0040720468 * sRoot
  const a = 1.9779984951 * lRoot - 2.428592205 * mRoot + 0.4505937099 * sRoot
  const bAxis = 0.0259040371 * lRoot + 0.7827717662 * mRoot - 0.808675766 * sRoot

  const chroma = Math.hypot(a, bAxis)
  let hue = (Math.atan2(bAxis, a) * 180) / Math.PI
  if (hue < 0) hue += 360

  return { l: lightness, c: chroma, h: hue }
}

function formatChannel(value: number): string {
  return value
    .toFixed(3)
    .replace(/(\.\d*?)0+$/, '$1')
    .replace(/\.$/, '')
}

export function formatOklch({ l, c, h }: Oklch): string {
  if (c < 0.0001) return `oklch(${formatChannel(l)} 0 0)`

  return `oklch(${formatChannel(l)} ${formatChannel(c)} ${formatChannel(h)})`
}

export function formatOklchWithAlpha({ l, c, h }: Oklch, alpha: number): string {
  if (c < 0.0001) return `oklch(${formatChannel(l)} 0 0 / ${formatChannel(alpha)})`

  return `oklch(${formatChannel(l)} ${formatChannel(c)} ${formatChannel(h)} / ${formatChannel(alpha)})`
}

export function parseOklch(value: string): Oklch | null {
  const match = value.match(/oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)/i)
  if (!match) return null

  return {
    l: Number.parseFloat(match[1]),
    c: Number.parseFloat(match[2]),
    h: Number.parseFloat(match[3]),
  }
}

export function getTicketCardBorderShadow(accentColor: string, isSelected: boolean): string {
  const hue = parseOklch(accentColor)?.h ?? 268

  if (isSelected) {
    const border = formatOklch({ l: 0.88, c: 0.06, h: hue })
    const accentGlowNear = formatOklchWithAlpha({ l: 0.62, c: 0.1, h: hue }, 0.28)
    const accentGlowFar = formatOklchWithAlpha({ l: 0.5, c: 0.08, h: hue }, 0.18)

    return [
      `inset 0 0 0 1px ${border}`,
      `0 1px 2px -1px rgba(0, 0, 0, 0.5)`,
      `0 4px 12px -2px rgba(0, 0, 0, 0.55)`,
      `0 12px 28px -4px rgba(0, 0, 0, 0.45)`,
      `0 0 0 1px ${formatOklchWithAlpha({ l: 0.88, c: 0.06, h: hue }, 0.08)}`,
      `0 8px 20px -4px ${accentGlowNear}`,
      `0 20px 48px -12px ${accentGlowFar}`,
    ].join(', ')
  }

  const border = formatOklchWithAlpha({ l: 0.88, c: 0.04, h: hue }, 0.5)
  return `inset 0 0 0 1px ${border}`
}

export function getAccentMutedTextColor(accentColor: string): string {
  const hue = parseOklch(accentColor)?.h ?? 268

  return formatOklch({ l: 0.746, c: 0.03, h: hue })
}

export function getAccentMutedTextColorLight(accentColor: string): string {
  const hue = parseOklch(accentColor)?.h ?? 268

  return formatOklch({ l: 0.869, c: 0.019, h: hue })
}

const CLAIM_INK = rgbToOklch({ r: 66, g: 62, b: 0 })
const CLAIM_SURFACE = rgbToOklch({ r: 240, g: 240, b: 240 })

function getAccentHue(accentColor: string): number {
  return parseOklch(accentColor)?.h ?? CLAIM_INK.h
}

function retintClaimColor(accentColor: string, alpha?: number): string {
  const tinted = { l: CLAIM_INK.l, c: CLAIM_INK.c, h: getAccentHue(accentColor) }

  if (alpha === undefined) return formatOklch(tinted)

  return formatOklchWithAlpha(tinted, alpha)
}

export interface ClaimTicketColors {
  titleColor: string
  labelColor: string
  valueColor: string
  borderColor: string
  surfaceBg: string
}

export function getClaimTicketColors(accentColor: string): ClaimTicketColors {
  const surfaceChroma = Math.max(CLAIM_SURFACE.c, 0.012)

  return {
    titleColor: retintClaimColor(accentColor),
    labelColor: retintClaimColor(accentColor, 0.75),
    valueColor: retintClaimColor(accentColor, 0.9),
    borderColor: retintClaimColor(accentColor, 0.15),
    surfaceBg: formatOklch({
      l: CLAIM_SURFACE.l,
      c: surfaceChroma,
      h: getAccentHue(accentColor),
    }),
  }
}

export interface ClaimedGlowAlphas {
  greenAlpha: number
  blueAlpha: number
  yellowAlpha: number
  softAlpha: number
}

/** Neon green stamp asset — hue-rotate shifts from this toward the event accent. */
const CLAIMED_STAMP_BASE_HUE = 120
const CLAIMED_STAMP_ACCENT_TINT_MIX = 0.72

function getShortestHueDelta(fromHue: number, toHue: number): number {
  let delta = toHue - fromHue
  if (delta > 180) delta -= 360
  if (delta < -180) delta += 360
  return delta
}

export function buildClaimedStampAccentCssVars(accentColor: string): Record<string, string> {
  const accentHue = getAccentHue(accentColor)
  const hueRotate = getShortestHueDelta(CLAIMED_STAMP_BASE_HUE, accentHue) * CLAIMED_STAMP_ACCENT_TINT_MIX

  return {
    '--stamp-hue-rotate': `${hueRotate}deg`,
    '--stamp-saturate': '1.08',
  }
}

export function buildClaimedGlowAccentCssVars(
  accentColor: string,
  alphas: ClaimedGlowAlphas,
): Record<string, string> {
  const accent = parseOklch(accentColor)
  const hue = accent?.h ?? 268
  const chromaBase = Math.min(Math.max(accent?.c ?? 0.09, 0.06), 0.18)

  return {
    '--claimed-glow-green': formatOklchWithAlpha(
      { l: 0.62, c: chromaBase * 1.15, h: hue },
      alphas.greenAlpha,
    ),
    '--claimed-glow-blue': formatOklchWithAlpha({ l: 0.55, c: chromaBase, h: hue }, alphas.blueAlpha),
    '--claimed-glow-yellow': formatOklchWithAlpha(
      { l: 0.72, c: chromaBase * 0.85, h: hue },
      alphas.yellowAlpha,
    ),
    '--claimed-glow-soft': formatOklchWithAlpha(
      { l: 0.88, c: chromaBase * 0.55, h: hue },
      alphas.softAlpha,
    ),
  }
}

function clampChromaForLightness(chroma: number, lightness: number): number {
  const maxChroma = 0.04 + (0.5 - Math.abs(lightness - 0.5)) * 0.22
  return Math.min(chroma, maxChroma)
}

export function toGradientAccentOklch(rgb: Rgb): string {
  const sampled = rgbToOklch(rgb)
  const chroma = clampChromaForLightness(
    Math.min(
      Math.max(sampled.c * 0.9 + 0.035, ACCENT_CHROMA_FLOOR),
      ACCENT_CHROMA_CEILING,
    ),
    ACCENT_LIGHTNESS,
  )

  return formatOklch({
    l: ACCENT_LIGHTNESS,
    c: chroma,
    h: sampled.h,
  })
}

export function hexToRgb(hex: string): Rgb | null {
  const normalized = hex.replace('#', '')
  if (!/^[0-9a-f]{6}$/i.test(normalized)) return null

  return {
    r: parseInt(normalized.slice(0, 2), 16),
    g: parseInt(normalized.slice(2, 4), 16),
    b: parseInt(normalized.slice(4, 6), 16),
  }
}

export function hexToGradientAccentOklch(hex: string): string | null {
  const rgb = hexToRgb(hex)
  if (!rgb) return null

  return toGradientAccentOklch(rgb)
}

export const FALLBACK_ACCENT_OKLCH = formatOklch({
  l: ACCENT_LIGHTNESS,
  c: 0.095,
  h: 268,
})

export const GRADIENT_MID_OKLCH = formatOklch({ l: 0.178, c: 0, h: 0 })

export type { Oklch, Rgb }

import {
  FALLBACK_ACCENT_OKLCH,
  hexToGradientAccentOklch,
  toGradientAccentOklch,
  type Rgb,
} from './oklch-color'

function sampleAccentFromImageData(data: Uint8ClampedArray): Rgb | null {
  let rSum = 0
  let gSum = 0
  let bSum = 0
  let weightSum = 0

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    const alpha = data[i + 3]

    if (alpha < 128) continue

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    const lightness = (max + min) / 510
    const saturation =
      max === min ? 0 : (max - min) / (255 - Math.abs(2 * ((max + min) / 2) - 255))

    if (lightness < 0.08 || lightness > 0.9 || saturation < 0.12) continue

    const weight = saturation * saturation
    rSum += r * weight
    gSum += g * weight
    bSum += b * weight
    weightSum += weight
  }

  if (weightSum === 0) return null

  return {
    r: rSum / weightSum,
    g: gSum / weightSum,
    b: bSum / weightSum,
  }
}

export function extractImageAccentColor(imageUrl: string): Promise<string> {
  return new Promise((resolve) => {
    const image = new Image()
    image.crossOrigin = 'anonymous'
    image.decoding = 'async'

    image.onload = () => {
      try {
        const canvas = document.createElement('canvas')
        const sampleSize = 48
        canvas.width = sampleSize
        canvas.height = sampleSize

        const context = canvas.getContext('2d', { willReadFrequently: true })
        if (!context) {
          resolve(FALLBACK_ACCENT_OKLCH)
          return
        }

        context.drawImage(image, 0, 0, sampleSize, sampleSize)
        const sampled = sampleAccentFromImageData(
          context.getImageData(0, 0, sampleSize, sampleSize).data,
        )

        resolve(sampled ? toGradientAccentOklch(sampled) : FALLBACK_ACCENT_OKLCH)
      } catch {
        resolve(FALLBACK_ACCENT_OKLCH)
      }
    }

    image.onerror = () => resolve(FALLBACK_ACCENT_OKLCH)
    image.src = imageUrl
  })
}

export function resolveAccentColor(presetColor?: string): string {
  if (!presetColor) return FALLBACK_ACCENT_OKLCH

  if (presetColor.startsWith('oklch(')) return presetColor

  return hexToGradientAccentOklch(presetColor) ?? FALLBACK_ACCENT_OKLCH
}

export { FALLBACK_ACCENT_OKLCH as FALLBACK_TINT }

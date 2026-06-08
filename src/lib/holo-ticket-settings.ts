import type { CSSProperties } from 'react'

export type HoloFoilPreset =
  | 'ticket'
  | 'amazingRare'
  | 'regularHolo'
  | 'cosmosHolo'
  | 'rainbowSecret'
  | 'radiantHolo'

export const HOLO_FOIL_PRESET_OPTIONS: { value: HoloFoilPreset; label: string }[] = [
  { value: 'ticket', label: 'Ticket (simple)' },
  { value: 'amazingRare', label: 'Amazing Rare' },
  { value: 'regularHolo', label: 'Regular Holo' },
  { value: 'cosmosHolo', label: 'Cosmos Holo' },
  { value: 'rainbowSecret', label: 'Rainbow Secret' },
  { value: 'radiantHolo', label: 'Radiant Holo' },
]

export function getHoloFoilPresetClass(preset: HoloFoilPreset): string {
  const classMap: Record<HoloFoilPreset, string> = {
    ticket: 'is-foil-ticket',
    amazingRare: 'is-foil-amazing-rare',
    regularHolo: 'is-foil-regular-holo',
    cosmosHolo: 'is-foil-cosmos-holo',
    rainbowSecret: 'is-foil-rainbow-secret',
    radiantHolo: 'is-foil-radiant-holo',
  }

  return classMap[preset]
}

export interface HoloTicketFoilSettings {
  preset: HoloFoilPreset
  idleOpacity: number
  activeOpacity: number
  glareMultiplier: number
  gradientSize: number
  shimmerDuration: number
  oliveAlpha: number
  goldAlpha: number
  cyanAlpha: number
  idleShimmer: boolean
  idleOpacityPulse: boolean
  glitterSize: number
  pillarAngle: number
  pillarSpace: number
  embossOpacity: number
  shineBrightness: number
  shineContrast: number
  shineSaturation: number
  pillarBrightnessBase: number
  pillarBrightnessRange: number
  pillarTrackStrength: number
  glareContrast: number
  idleShimmerRange: number
}

export interface HoloTicketInteractiveSettings {
  perspective: number
  maxTilt: number
  floatTranslateY: number
  floatRotate: number
  floatDuration: number
  interactLift: number
  interactScale: number
  idleFloat: boolean
}

export interface HoloTicketSettings {
  enabled: boolean
  foil: HoloTicketFoilSettings
  interactive3d: HoloTicketInteractiveSettings
}

export const DEFAULT_HOLO_TICKET_SETTINGS: HoloTicketSettings = {
  enabled: true,
  foil: {
    preset: 'cosmosHolo',
    idleOpacity: 0.63,
    activeOpacity: 0.57,
    glareMultiplier: 0.84,
    gradientSize: 239,
    shimmerDuration: 5,
    oliveAlpha: 0.5,
    goldAlpha: 0.5,
    cyanAlpha: 0.5,
    idleShimmer: false,
    idleOpacityPulse: false,
    glitterSize: 31,
    pillarAngle: 98,
    pillarSpace: 3,
    embossOpacity: 0.32,
    shineBrightness: 0.85,
    shineContrast: 2.32,
    shineSaturation: 1.23,
    pillarBrightnessBase: 0.88,
    pillarBrightnessRange: 0.5,
    pillarTrackStrength: 2.2,
    glareContrast: 2.4,
    idleShimmerRange: 8,
  },
  interactive3d: {
    perspective: 200,
    maxTilt: 5.5,
    floatTranslateY: 4,
    floatRotate: 1.5,
    floatDuration: 6,
    interactLift: 11,
    interactScale: 1.02,
    idleFloat: true,
  },
}

export function buildHoloTicketCssVars(settings: HoloTicketSettings): CSSProperties {
  const { foil, interactive3d } = settings

  return {
    '--holo-perspective': `${interactive3d.perspective}px`,
    '--holo-max-tilt': `${interactive3d.maxTilt}deg`,
    '--holo-idle-opacity': `${foil.idleOpacity}`,
    '--holo-active-opacity': `${foil.activeOpacity}`,
    '--holo-glare-multiplier': `${foil.glareMultiplier}`,
    '--holo-gradient-size': `${foil.gradientSize}%`,
    '--holo-shimmer-duration': `${foil.shimmerDuration}s`,
    '--holo-float-duration': `${interactive3d.floatDuration}s`,
    '--holo-float-y': `${interactive3d.floatTranslateY}px`,
    '--holo-float-rotate': `${interactive3d.floatRotate}deg`,
    '--holo-interact-lift': `${interactive3d.interactLift}px`,
    '--holo-interact-scale': `${interactive3d.interactScale}`,
    '--holo-foil-olive': `${foil.oliveAlpha}`,
    '--holo-foil-gold': `${foil.goldAlpha}`,
    '--holo-foil-cyan': `${foil.cyanAlpha}`,
    '--holo-glitter-size': `${foil.glitterSize}%`,
    '--holo-pillar-angle': `${foil.pillarAngle}deg`,
    '--holo-pillar-space': `${foil.pillarSpace}%`,
    '--holo-emboss-opacity': `${foil.embossOpacity}`,
    '--holo-shine-brightness': `${foil.shineBrightness}`,
    '--holo-shine-contrast': `${foil.shineContrast}`,
    '--holo-shine-saturation': `${foil.shineSaturation}`,
    '--holo-pillar-brightness-base': `${foil.pillarBrightnessBase}`,
    '--holo-pillar-brightness-range': `${foil.pillarBrightnessRange}`,
    '--holo-pillar-track': `${foil.pillarTrackStrength}`,
    '--holo-glare-contrast': `${foil.glareContrast}`,
    '--holo-idle-shimmer-range': `${foil.idleShimmerRange}%`,
  } as CSSProperties
}

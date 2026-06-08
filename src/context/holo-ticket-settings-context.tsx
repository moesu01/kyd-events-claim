import { useDialKit } from 'dialkit'
import { createContext, useContext, useMemo, type ReactNode } from 'react'
import {
  DEFAULT_HOLO_TICKET_SETTINGS,
  HOLO_FOIL_PRESET_OPTIONS,
  type HoloFoilPreset,
  type HoloTicketSettings,
} from '../lib/holo-ticket-settings'

const HoloTicketSettingsContext = createContext<HoloTicketSettings>(DEFAULT_HOLO_TICKET_SETTINGS)

function useHoloTicketDialKit() {
  return useDialKit('Holo Ticket', {
    enabled: true,
    foil: {
      preset: {
        type: 'select',
        options: HOLO_FOIL_PRESET_OPTIONS,
        default: 'cosmosHolo',
      },
      idleOpacity: [0.63, 0, 1, 0.01],
      activeOpacity: [0.57, 0, 1, 0.01],
      glareMultiplier: [0.84, 0, 1, 0.01],
      gradientSize: [239, 100, 400, 1],
      shimmerDuration: [5, 1, 20, 0.5],
      oliveAlpha: [0.5, 0, 0.5, 0.01],
      goldAlpha: [0.5, 0, 0.5, 0.01],
      cyanAlpha: [0.5, 0, 0.5, 0.01],
      idleShimmer: false,
      idleOpacityPulse: false,
      glitterSize: [31, 8, 60, 1],
      pillarAngle: [98, 90, 180, 1],
      pillarSpace: [3, 2, 12, 0.5],
      embossOpacity: [0.32, 0, 1, 0.01],
      shineBrightness: [0.85, 0.5, 2, 0.01],
      shineContrast: [2.32, 0.5, 3, 0.01],
      shineSaturation: [1.23, 0, 2, 0.01],
      pillarBrightnessBase: [0.88, 0.2, 1.2, 0.01],
      pillarBrightnessRange: [0.5, 0, 1, 0.01],
      pillarTrackStrength: [2.2, 1, 6, 0.1],
      glareContrast: [2.4, 0.5, 4, 0.05],
      idleShimmerRange: [8, 8, 60, 1],
    },
    interactive3d: {
      perspective: [200, 200, 1200, 10],
      maxTilt: [5.5, 0, 25, 0.5],
      floatTranslateY: [4, 0, 12, 0.5],
      floatRotate: [1.5, 0, 8, 0.1],
      floatDuration: [6, 2, 15, 0.5],
      interactLift: [11, 0, 40, 1],
      interactScale: [1.02, 1, 1.15, 0.01],
      idleFloat: true,
    },
  })
}

interface HoloTicketSettingsProviderProps {
  children: ReactNode
}

export function HoloTicketSettingsProvider({ children }: HoloTicketSettingsProviderProps) {
  const dial = useHoloTicketDialKit()

  const settings = useMemo<HoloTicketSettings>(
    () => ({
      enabled: dial.enabled,
      foil: {
        preset: dial.foil.preset as HoloFoilPreset,
        idleOpacity: dial.foil.idleOpacity,
        activeOpacity: dial.foil.activeOpacity,
        glareMultiplier: dial.foil.glareMultiplier,
        gradientSize: dial.foil.gradientSize,
        shimmerDuration: dial.foil.shimmerDuration,
        oliveAlpha: dial.foil.oliveAlpha,
        goldAlpha: dial.foil.goldAlpha,
        cyanAlpha: dial.foil.cyanAlpha,
        idleShimmer: dial.foil.idleShimmer,
        idleOpacityPulse: dial.foil.idleOpacityPulse,
        glitterSize: dial.foil.glitterSize,
        pillarAngle: dial.foil.pillarAngle,
        pillarSpace: dial.foil.pillarSpace,
        embossOpacity: dial.foil.embossOpacity,
        shineBrightness: dial.foil.shineBrightness,
        shineContrast: dial.foil.shineContrast,
        shineSaturation: dial.foil.shineSaturation,
        pillarBrightnessBase: dial.foil.pillarBrightnessBase,
        pillarBrightnessRange: dial.foil.pillarBrightnessRange,
        pillarTrackStrength: dial.foil.pillarTrackStrength,
        glareContrast: dial.foil.glareContrast,
        idleShimmerRange: dial.foil.idleShimmerRange,
      },
      interactive3d: {
        perspective: dial.interactive3d.perspective,
        maxTilt: dial.interactive3d.maxTilt,
        floatTranslateY: dial.interactive3d.floatTranslateY,
        floatRotate: dial.interactive3d.floatRotate,
        floatDuration: dial.interactive3d.floatDuration,
        interactLift: dial.interactive3d.interactLift,
        interactScale: dial.interactive3d.interactScale,
        idleFloat: dial.interactive3d.idleFloat,
      },
    }),
    [dial],
  )

  return (
    <HoloTicketSettingsContext.Provider value={settings}>{children}</HoloTicketSettingsContext.Provider>
  )
}

export function useHoloTicketSettings() {
  return useContext(HoloTicketSettingsContext)
}

import { useCallback, useEffect, useRef, useState, type CSSProperties, type RefObject } from 'react'
import { useHoloTicketSettings } from '../context/holo-ticket-settings-context'
import type { HoloTicketSettings } from './holo-ticket-settings'
import { useReducedMotion } from './use-reduced-motion'

interface HoloTiltVars {
  '--rotate-x': string
  '--rotate-y': string
  '--pointer-x': string
  '--pointer-y': string
  '--pointer-from-center': string
  '--pointer-from-top': string
  '--pointer-from-left': string
  '--background-x': string
  '--background-y': string
  '--card-opacity': string
  '--card-scale': string
  '--translate-z': string
}

interface PendingUpdate {
  rotateX: number
  rotateY: number
  pointerX: number
  pointerY: number
  pointerFromCenter: number
  pointerFromTop: number
  pointerFromLeft: number
  backgroundX: number
  backgroundY: number
  cardOpacity: number
  cardScale: number
  translateZ: number
}

const STATIC_VARS: HoloTiltVars = {
  '--rotate-x': '0deg',
  '--rotate-y': '0deg',
  '--pointer-x': '50%',
  '--pointer-y': '50%',
  '--pointer-from-center': '0.35',
  '--pointer-from-top': '0.5',
  '--pointer-from-left': '0.5',
  '--background-x': '50%',
  '--background-y': '50%',
  '--card-opacity': '0.35',
  '--card-scale': '1',
  '--translate-z': '0px',
}

function computePointerFromCenter(pointerX: number, pointerY: number) {
  return clamp(Math.sqrt((pointerY - 50) ** 2 + (pointerX - 50) ** 2) / 50, 0, 1)
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function round(value: number, precision = 0) {
  const factor = 10 ** precision
  return Math.round(value * factor) / factor
}

function adjust(value: number, fromMin: number, fromMax: number, toMin: number, toMax: number) {
  return toMin + ((value - fromMin) * (toMax - toMin)) / (fromMax - fromMin)
}

function computeIdleCardOpacity(settings: HoloTicketSettings, sin: number) {
  const { idleOpacity, activeOpacity, idleOpacityPulse } = settings.foil
  if (!idleOpacityPulse) return idleOpacity

  const minOpacity = Math.min(idleOpacity, activeOpacity)
  const maxOpacity = Math.max(idleOpacity, activeOpacity)
  const pulseBlend = (sin + 1) / 2

  return round(minOpacity + (maxOpacity - minOpacity) * pulseBlend, 3)
}

function toCssVars(update: PendingUpdate): HoloTiltVars {
  return {
    '--rotate-x': `${update.rotateX}deg`,
    '--rotate-y': `${update.rotateY}deg`,
    '--pointer-x': `${update.pointerX}%`,
    '--pointer-y': `${update.pointerY}%`,
    '--pointer-from-center': `${update.pointerFromCenter}`,
    '--pointer-from-top': `${update.pointerFromTop}`,
    '--pointer-from-left': `${update.pointerFromLeft}`,
    '--background-x': `${update.backgroundX}%`,
    '--background-y': `${update.backgroundY}%`,
    '--card-opacity': `${update.cardOpacity}`,
    '--card-scale': `${update.cardScale}`,
    '--translate-z': `${update.translateZ}px`,
  }
}

export function useHoloTilt(ref: RefObject<HTMLElement | null>) {
  const settings = useHoloTicketSettings()
  const prefersReducedMotion = useReducedMotion()
  const [cssVars, setCssVars] = useState<HoloTiltVars>(STATIC_VARS)
  const [isInteracting, setIsInteracting] = useState(false)
  const rafIdRef = useRef<number | null>(null)
  const pendingRef = useRef<PendingUpdate | null>(null)

  const isEffectEnabled = settings.enabled && !prefersReducedMotion

  const getIdleVars = useCallback((): PendingUpdate => {
    return {
      rotateX: 0,
      rotateY: 0,
      pointerX: 50,
      pointerY: 50,
      pointerFromCenter: 0.35,
      pointerFromTop: 0.5,
      pointerFromLeft: 0.5,
      backgroundX: 50,
      backgroundY: 50,
      cardOpacity: settings.foil.idleOpacity,
      cardScale: 1,
      translateZ: 0,
    }
  }, [settings.foil.idleOpacity])

  const computeIdleFloat = useCallback(
    (elapsedMs: number): PendingUpdate => {
      const durationMs = settings.interactive3d.floatDuration * 1000
      const phase = (elapsedMs % durationMs) / durationMs
      const angle = phase * Math.PI * 2
      const sin = Math.sin(angle)
      const cos = Math.cos(angle)
      const pointerSweep = 14 + settings.interactive3d.floatRotate * 2
      const pointerX = clamp(round(50 + sin * pointerSweep), 0, 100)
      const pointerY = clamp(round(50 + cos * pointerSweep), 0, 100)

      return {
        rotateX: 0,
        rotateY: 0,
        pointerX,
        pointerY,
        pointerFromCenter: round(computePointerFromCenter(pointerX, pointerY), 3),
        pointerFromTop: round(pointerY / 100, 3),
        pointerFromLeft: round(pointerX / 100, 3),
        backgroundX: round(adjust(pointerX, 0, 100, 37, 63)),
        backgroundY: round(adjust(pointerY, 0, 100, 33, 67)),
        cardOpacity: computeIdleCardOpacity(settings, sin),
        cardScale: 1,
        translateZ: 0,
      }
    },
    [settings],
  )

  const computeInteraction = useCallback(
    (clientX: number, clientY: number, rect: DOMRect): PendingUpdate => {
      const maxRotation = settings.interactive3d.maxTilt
      const absoluteX = clientX - rect.left
      const absoluteY = clientY - rect.top
      const percentX = clamp(round((100 / rect.width) * absoluteX), 0, 100)
      const percentY = clamp(round((100 / rect.height) * absoluteY), 0, 100)
      const centerX = percentX - 50
      const centerY = percentY - 50

      return {
        rotateX: round(-(centerX / (50 / maxRotation))),
        rotateY: round(centerY / (50 / maxRotation)),
        pointerX: percentX,
        pointerY: percentY,
        pointerFromCenter: round(computePointerFromCenter(percentX, percentY), 3),
        pointerFromTop: round(percentY / 100, 3),
        pointerFromLeft: round(percentX / 100, 3),
        backgroundX: round(adjust(percentX, 0, 100, 37, 63)),
        backgroundY: round(adjust(percentY, 0, 100, 33, 67)),
        cardOpacity: settings.foil.activeOpacity,
        cardScale: settings.interactive3d.interactScale,
        translateZ: settings.interactive3d.interactLift,
      }
    },
    [settings],
  )

  const flushPending = useCallback(() => {
    rafIdRef.current = null
    if (!pendingRef.current) return
    setCssVars(toCssVars(pendingRef.current))
    pendingRef.current = null
  }, [])

  const scheduleUpdate = useCallback(
    (update: PendingUpdate) => {
      pendingRef.current = update
      if (rafIdRef.current !== null) return
      rafIdRef.current = requestAnimationFrame(flushPending)
    },
    [flushPending],
  )

  const resetInteraction = useCallback(() => {
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current)
      rafIdRef.current = null
    }
    pendingRef.current = null
    setIsInteracting(false)
    setCssVars(toCssVars(getIdleVars()))
  }, [getIdleVars])

  const handlePointerMove = useCallback(
    (event: PointerEvent) => {
      const element = ref.current
      if (!element || !isEffectEnabled) return

      setIsInteracting(true)
      const rect = element.getBoundingClientRect()
      scheduleUpdate(computeInteraction(event.clientX, event.clientY, rect))
    },
    [computeInteraction, isEffectEnabled, ref, scheduleUpdate],
  )

  const handlePointerDown = useCallback(
    (event: PointerEvent) => {
      if (!isEffectEnabled) return
      setIsInteracting(true)
      handlePointerMove(event)
    },
    [handlePointerMove, isEffectEnabled],
  )

  const handlePointerUp = useCallback(() => {
    resetInteraction()
  }, [resetInteraction])

  const handlePointerLeave = useCallback(() => {
    resetInteraction()
  }, [resetInteraction])

  useEffect(() => {
    const element = ref.current
    if (!element || !isEffectEnabled) {
      setCssVars(STATIC_VARS)
      setIsInteracting(false)
      return
    }

    if (!settings.interactive3d.idleFloat) {
      setCssVars(toCssVars(getIdleVars()))
    }

    element.addEventListener('pointerdown', handlePointerDown)
    element.addEventListener('pointermove', handlePointerMove)
    element.addEventListener('pointerup', handlePointerUp)
    element.addEventListener('pointerleave', handlePointerLeave)
    element.addEventListener('pointercancel', handlePointerUp)

    return () => {
      element.removeEventListener('pointerdown', handlePointerDown)
      element.removeEventListener('pointermove', handlePointerMove)
      element.removeEventListener('pointerup', handlePointerUp)
      element.removeEventListener('pointerleave', handlePointerLeave)
      element.removeEventListener('pointercancel', handlePointerUp)

      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current)
        rafIdRef.current = null
      }
    }
  }, [
    getIdleVars,
    handlePointerDown,
    handlePointerLeave,
    handlePointerMove,
    handlePointerUp,
    isEffectEnabled,
    ref,
    settings.interactive3d.idleFloat,
  ])

  useEffect(() => {
    if (!isEffectEnabled || isInteracting || settings.interactive3d.idleFloat) return
    setCssVars(toCssVars(getIdleVars()))
  }, [getIdleVars, isEffectEnabled, isInteracting, settings.interactive3d.idleFloat])

  useEffect(() => {
    if (!isEffectEnabled || isInteracting || !settings.interactive3d.idleFloat) return

    const startTime = performance.now()
    let frameId = 0

    const tick = (now: number) => {
      setCssVars(toCssVars(computeIdleFloat(now - startTime)))
      frameId = requestAnimationFrame(tick)
    }

    frameId = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(frameId)
    }
  }, [computeIdleFloat, isEffectEnabled, isInteracting, settings.interactive3d.idleFloat])

  return {
    cssVars: cssVars as CSSProperties,
    isInteracting,
    prefersReducedMotion,
    settings,
  }
}

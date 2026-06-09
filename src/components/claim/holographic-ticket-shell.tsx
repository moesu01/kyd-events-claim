import { Box } from '@chakra-ui/react'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { useEventAccent } from '../../context/event-accent-context'
import { buildClaimedGlowAccentCssVars } from '../../lib/oklch-color'
import { buildHoloTicketCssVars, getHoloFoilPresetClass } from '../../lib/holo-ticket-settings'
import { mergeClassNames } from '../../lib/merge-class-names'
import { useHoloTilt } from '../../lib/use-holo-tilt'

interface HolographicTicketShellProps {
  children: ReactNode
  /** Idle float, foil preset, shimmer — on as soon as the ticket is claimed. */
  isHoloActive?: boolean
  /** Accent drop-shadow glow — ramps in after the stamp. */
  isGlowActive?: boolean
  /** Whole ticket is a link — show pointer cursor over holo layers. */
  isTicketLink?: boolean
}

export function HolographicTicketShell({
  children,
  isHoloActive = false,
  isGlowActive = false,
  isTicketLink = false,
}: HolographicTicketShellProps) {
  const shellRef = useRef<HTMLDivElement>(null)
  const [glowRampActive, setGlowRampActive] = useState(false)
  const { cssVars, isInteracting, settings, prefersReducedMotion } = useHoloTilt(shellRef, {
    interactive: false,
    active: isHoloActive,
  })
  const { accentColor } = useEventAccent()
  const tuningVars = buildHoloTicketCssVars(settings)
  const claimedGlowAccentVars = buildClaimedGlowAccentCssVars(accentColor, settings.claimedGlow)
  const showHolo = isHoloActive && settings.enabled && !prefersReducedMotion

  useEffect(() => {
    if (!isGlowActive) {
      setGlowRampActive(false)
      return
    }

    if (prefersReducedMotion) {
      setGlowRampActive(true)
      return
    }

    const frame = requestAnimationFrame(() => setGlowRampActive(true))
    return () => cancelAnimationFrame(frame)
  }, [isGlowActive, prefersReducedMotion])

  return (
    <Box
      ref={shellRef}
      className={mergeClassNames(
        'holo-ticket',
        't-claimed-glow',
        glowRampActive ? 'is-claimed-glow-active' : '',
        isInteracting ? 'is-interacting' : '',
        showHolo ? 'is-holo-enabled' : '',
        showHolo && settings.interactive3d.idleFloat ? 'is-idle-float' : '',
        showHolo && settings.foil.idleShimmer ? 'is-shimmer-idle' : '',
        showHolo ? getHoloFoilPresetClass(settings.foil.preset) : '',
        isTicketLink ? 'is-ticket-link' : '',
      )}
      style={{ ...tuningVars, ...claimedGlowAccentVars, ...cssVars }}
      w="full"
    >
      <Box className="holo-ticket__translator">
        <Box className="holo-ticket__rotator">
          <Box className="holo-ticket__content">{children}</Box>
        </Box>
      </Box>
    </Box>
  )
}

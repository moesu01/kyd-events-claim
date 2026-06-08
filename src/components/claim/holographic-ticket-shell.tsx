import { Box } from '@chakra-ui/react'
import { useRef, type ReactNode } from 'react'
import { buildHoloTicketCssVars, getHoloFoilPresetClass } from '../../lib/holo-ticket-settings'
import { mergeClassNames } from '../../lib/merge-class-names'
import { useHoloTilt } from '../../lib/use-holo-tilt'

interface HolographicTicketShellProps {
  children: ReactNode
}

export function HolographicTicketShell({ children }: HolographicTicketShellProps) {
  const shellRef = useRef<HTMLDivElement>(null)
  const { cssVars, isInteracting, settings } = useHoloTilt(shellRef)
  const tuningVars = buildHoloTicketCssVars(settings)

  return (
    <Box
      ref={shellRef}
      className={mergeClassNames(
        'holo-ticket',
        isInteracting ? 'is-interacting' : '',
        settings.enabled ? 'is-holo-enabled' : '',
        settings.interactive3d.idleFloat ? 'is-idle-float' : '',
        getHoloFoilPresetClass(settings.foil.preset),
        settings.foil.idleShimmer ? 'is-shimmer-idle' : '',
      )}
      style={{ ...tuningVars, ...cssVars }}
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

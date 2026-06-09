import { Box } from '@chakra-ui/react'
import type { ReactNode } from 'react'
import { useHoloTicketSettings } from '../../context/holo-ticket-settings-context'
import { mergeClassNames } from '../../lib/merge-class-names'
import { useReducedMotion } from '../../lib/use-reduced-motion'

interface HolographicSurfaceProps {
  children: ReactNode
  variant: 'topBody' | 'bottomStub'
  showFoil?: boolean
  isClaimedGlow?: boolean
}

export function HolographicSurface({
  children,
  variant,
  showFoil = false,
  isClaimedGlow = false,
}: HolographicSurfaceProps) {
  const prefersReducedMotion = useReducedMotion()
  const settings = useHoloTicketSettings()
  const showFoilLayers = showFoil && settings.enabled && !prefersReducedMotion

  return (
    <Box
      className={mergeClassNames(
        'holo-ticket__surface',
        variant === 'topBody' ? 'holo-ticket__surface--top-body' : 'holo-ticket__surface--bottom-stub',
        isClaimedGlow ? 'is-claimed-glow' : '',
      )}
      position="relative"
      w="full"
    >
      <Box
        className={mergeClassNames('holo-ticket__piece', isClaimedGlow ? 'is-claimed-glow' : '')}
        overflow="visible"
      >
        <Box className="holo-ticket__surface-content">{children}</Box>
      </Box>
      {showFoilLayers ? (
        <>
          <Box className="holo-ticket__shine" aria-hidden="true" />
          <Box className="holo-ticket__glare" aria-hidden="true" />
        </>
      ) : null}
    </Box>
  )
}

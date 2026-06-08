import { Box } from '@chakra-ui/react'
import type { ReactNode } from 'react'
import { useHoloTicketSettings } from '../../context/holo-ticket-settings-context'
import { mergeClassNames } from '../../lib/merge-class-names'
import { useReducedMotion } from '../../lib/use-reduced-motion'

interface HolographicSurfaceProps {
  children: ReactNode
  variant: 'topBody' | 'bottomStub'
}

export function HolographicSurface({ children, variant }: HolographicSurfaceProps) {
  const prefersReducedMotion = useReducedMotion()
  const settings = useHoloTicketSettings()
  const showFoil = settings.enabled && !prefersReducedMotion

  return (
    <Box
      className={mergeClassNames(
        'holo-ticket__surface',
        variant === 'topBody' ? 'holo-ticket__surface--top-body' : 'holo-ticket__surface--bottom-stub',
      )}
      position="relative"
      w="full"
    >
      <Box className="holo-ticket__surface-content">{children}</Box>
      {showFoil ? (
        <>
          <Box className="holo-ticket__shine" aria-hidden="true" />
          <Box className="holo-ticket__glare" aria-hidden="true" />
        </>
      ) : null}
    </Box>
  )
}

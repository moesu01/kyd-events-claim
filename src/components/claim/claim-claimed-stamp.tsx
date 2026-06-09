import { Box, Image } from '@chakra-ui/react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useEventAccent } from '../../context/event-accent-context'
import { assetUrl } from '../../lib/asset-url'
import { buildClaimedStampAccentCssVars } from '../../lib/oklch-color'
import { mergeClassNames } from '../../lib/merge-class-names'
import { useReducedMotion } from '../../lib/use-reduced-motion'

export const CLAIMED_STAMP_URLS = {
  original: assetUrl('/assets/claim/claimed-stamp.png'),
  v2: assetUrl('/assets/claim/claimed-stamp-v2.png'),
} as const

const ACTIVE_CLAIMED_STAMP_URL = CLAIMED_STAMP_URLS.v2

interface ClaimClaimedStampProps {
  isClaimed: boolean
  isReady?: boolean
  onStampComplete?: () => void
}

export function ClaimClaimedStamp({
  isClaimed,
  isReady = false,
  onStampComplete,
}: ClaimClaimedStampProps) {
  const { accentColor } = useEventAccent()
  const stampAccentVars = useMemo(() => buildClaimedStampAccentCssVars(accentColor), [accentColor])
  const prefersReducedMotion = useReducedMotion()
  const [isStamped, setIsStamped] = useState(false)
  const hasCompletedRef = useRef(false)

  const completeStamp = useCallback(() => {
    if (hasCompletedRef.current) return
    hasCompletedRef.current = true
    onStampComplete?.()
  }, [onStampComplete])

  useEffect(() => {
    if (!isClaimed || !isReady) {
      setIsStamped(false)
      hasCompletedRef.current = false
      return
    }

    if (prefersReducedMotion) {
      setIsStamped(true)
      completeStamp()
      return
    }

    const frame = requestAnimationFrame(() => setIsStamped(true))
    return () => cancelAnimationFrame(frame)
  }, [completeStamp, isClaimed, isReady, prefersReducedMotion])

  const handleAnimationEnd = (event: React.AnimationEvent<HTMLImageElement>) => {
    if (event.animationName !== 't-stamp-pop') return
    completeStamp()
  }

  if (!isClaimed || !isReady) return null

  return (
    <Box
      className={mergeClassNames('t-claimed-stamp', isStamped ? 'is-stamped' : '')}
      style={stampAccentVars}
      aria-hidden="true"
    >
      <Image
        className="t-claimed-stamp__mark"
        src={ACTIVE_CLAIMED_STAMP_URL}
        alt=""
        draggable={false}
        onAnimationEnd={handleAnimationEnd}
      />
    </Box>
  )
}

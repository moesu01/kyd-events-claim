import { Box, VStack } from '@chakra-ui/react'
import { AnimatePresence, motion } from 'motion/react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { ClaimAuthDialog } from '../components/claim/claim-auth-dialog'
import { ClaimDisclaimer } from '../components/claim/claim-disclaimer'
import { ClaimFooter } from '../components/claim/claim-footer'
import { ClaimExpiryBadge } from '../components/claim/claim-expiry-badge'
import { ClaimHeroHeader } from '../components/claim/claim-hero-header'
import { ClaimTicketCard } from '../components/claim/claim-ticket-card'
import { useClaimFlow } from '../context/claim-flow-context'
import { EventAccentProvider } from '../context/event-accent-context'
import { HoloTicketSettingsProvider } from '../context/holo-ticket-settings-context'
import { mockClaim } from '../data/mock-claim'
import { mergeClassNames } from '../lib/merge-class-names'
import { useClaimPageBackground } from '../lib/use-claim-page-background'
import { useImageAccentColor } from '../lib/use-image-accent-color'
import { useReducedMotion } from '../lib/use-reduced-motion'

const MotionBox = motion.create(Box)

function revealStagger(onReveal: () => void) {
  requestAnimationFrame(() => {
    requestAnimationFrame(onReveal)
  })
}

/** Wait for modal dismiss + ticket stagger before stamp / holo claim sequence. */
const CLAIM_POST_AUTH_ANIMATION_DELAY_MS = 620
const CLAIM_SECTION_GAP = '40px'

export function ClaimPage() {
  const { claimStatus, completeClaim, resetToken, replayToken } = useClaimFlow()
  const prefersReducedMotion = useReducedMotion()
  const [authOpen, setAuthOpen] = useState(false)
  const [staggerShown, setStaggerShown] = useState(false)
  const [staggerHiding, setStaggerHiding] = useState(false)
  const [contentKey, setContentKey] = useState(0)
  const [claimAnimationKey, setClaimAnimationKey] = useState(0)
  const [claimAnimationsReady, setClaimAnimationsReady] = useState(false)
  const hadAuthSessionRef = useRef(false)
  const skipClaimAnimationDelayRef = useRef(false)

  const isClaimed = claimStatus === 'claimed'
  const headline = isClaimed ? mockClaim.claimedHeadline : mockClaim.headline
  const accentColor = useImageAccentColor(mockClaim.posterUrl)

  useClaimPageBackground()

  useEffect(() => {
    revealStagger(() => setStaggerShown(true))
  }, [])

  useEffect(() => {
    if (!authOpen) return

    hadAuthSessionRef.current = true
    setStaggerShown(false)
    setStaggerHiding(true)
  }, [authOpen])

  const handleAuthDismissed = useCallback(() => {
    if (!hadAuthSessionRef.current) return

    setStaggerHiding(false)
    setStaggerShown(false)
    setContentKey((key) => key + 1)

    if (prefersReducedMotion) {
      setStaggerShown(true)
      return
    }

    revealStagger(() => setStaggerShown(true))
  }, [prefersReducedMotion])

  useEffect(() => {
    if (resetToken === 0) return

    setAuthOpen(false)
    hadAuthSessionRef.current = false
    setStaggerHiding(false)
    setClaimAnimationsReady(false)
    setClaimAnimationKey(0)
    setContentKey((key) => key + 1)
    setStaggerShown(false)

    if (prefersReducedMotion) {
      setStaggerShown(true)
      return
    }

    revealStagger(() => setStaggerShown(true))
  }, [prefersReducedMotion, resetToken])

  useEffect(() => {
    if (replayToken === 0) return
    if (claimStatus !== 'claimed') return

    skipClaimAnimationDelayRef.current = true
    setClaimAnimationsReady(false)
    setClaimAnimationKey((key) => key + 1)
  }, [claimStatus, replayToken])

  useEffect(() => {
    if (!isClaimed) {
      setClaimAnimationsReady(false)
      return
    }

    if (!staggerShown) return

    if (prefersReducedMotion) {
      setClaimAnimationsReady(true)
      skipClaimAnimationDelayRef.current = false
      return
    }

    const delay = skipClaimAnimationDelayRef.current ? 80 : CLAIM_POST_AUTH_ANIMATION_DELAY_MS
    skipClaimAnimationDelayRef.current = false

    const timer = window.setTimeout(() => setClaimAnimationsReady(true), delay)
    return () => window.clearTimeout(timer)
  }, [claimAnimationKey, isClaimed, prefersReducedMotion, staggerShown])

  const staggerClassName = mergeClassNames(
    't-stagger',
    staggerShown ? 'is-shown' : '',
    staggerHiding ? 'is-hiding' : '',
  )

  return (
    <EventAccentProvider accentColor={accentColor}>
    <HoloTicketSettingsProvider>
      <Box
        color="text.primary"
        minH="100vh"
        maxW="mobile"
        mx="auto"
        w="full"
        px="24px"
        py="15px"
        css={{
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
        }}
      >
      <Box w="full">
        <VStack gap={CLAIM_SECTION_GAP} align="center" w="full">
          <Box key={contentKey} className={staggerClassName} w="full">
            <VStack gap={isClaimed ? CLAIM_SECTION_GAP : '24px'} align="center" w="full">
              <Box className="t-stagger-line" w="full">
                <ClaimHeroHeader
                  partnerLogoUrl={mockClaim.partnerLogoUrl}
                  partner={mockClaim.partner}
                  headline={headline}
                  isClaimed={isClaimed}
                />
              </Box>

              <AnimatePresence initial={false}>
                {!isClaimed ? (
                  <MotionBox
                    key="expiry-badge"
                    className="t-stagger-line t-stagger-line--2"
                    initial={prefersReducedMotion ? false : { opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={
                      prefersReducedMotion
                        ? { opacity: 0 }
                        : { opacity: 0, height: 0, marginTop: 0 }
                    }
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    overflow="hidden"
                  >
                    <ClaimExpiryBadge expiresLabel={mockClaim.expiresLabel} />
                  </MotionBox>
                ) : null}
              </AnimatePresence>

              <Box className="t-stagger-line t-stagger-line--3" w="full" overflow="visible">
                <ClaimTicketCard
                  key={claimAnimationKey}
                  claim={mockClaim}
                  claimStatus={claimStatus}
                  claimAnimationsReady={claimAnimationsReady}
                  onClaim={() => setAuthOpen(true)}
                />
              </Box>

              {!isClaimed ? (
                <Box className="t-stagger-line t-stagger-line--4" w="full" maxW="330px" mx="auto">
                  <ClaimDisclaimer text={mockClaim.disclaimer} />
                </Box>
              ) : null}
            </VStack>
          </Box>

          <ClaimFooter />
        </VStack>
      </Box>

      <ClaimAuthDialog
        open={authOpen}
        onOpenChange={setAuthOpen}
        onDismissed={handleAuthDismissed}
        claim={mockClaim}
        onComplete={completeClaim}
      />
    </Box>
    </HoloTicketSettingsProvider>
    </EventAccentProvider>
  )
}

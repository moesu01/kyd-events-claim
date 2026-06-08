import { Box, VStack } from '@chakra-ui/react'
import { AnimatePresence, motion } from 'motion/react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { ClaimAuthDialog } from '../components/claim/claim-auth-dialog'
import { ClaimExpiryBadge } from '../components/claim/claim-expiry-badge'
import { ClaimHeroHeader } from '../components/claim/claim-hero-header'
import { ClaimTicketCard } from '../components/claim/claim-ticket-card'
import { useClaimFlow } from '../context/claim-flow-context'
import { HoloTicketSettingsProvider } from '../context/holo-ticket-settings-context'
import { mockClaim } from '../data/mock-claim'
import { mergeClassNames } from '../lib/merge-class-names'
import { useClaimPageBackground } from '../lib/use-claim-page-background'
import { useReducedMotion } from '../lib/use-reduced-motion'

const MotionBox = motion.create(Box)

function revealStagger(onReveal: () => void) {
  requestAnimationFrame(() => {
    requestAnimationFrame(onReveal)
  })
}

export function ClaimPage() {
  const { claimStatus, completeClaim } = useClaimFlow()
  const prefersReducedMotion = useReducedMotion()
  const [authOpen, setAuthOpen] = useState(false)
  const [staggerShown, setStaggerShown] = useState(false)
  const [staggerHiding, setStaggerHiding] = useState(false)
  const [contentKey, setContentKey] = useState(0)
  const hadAuthSessionRef = useRef(false)

  const isClaimed = claimStatus === 'claimed'
  const headline = isClaimed ? mockClaim.claimedHeadline : mockClaim.headline

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

  const staggerClassName = mergeClassNames(
    't-stagger',
    staggerShown ? 'is-shown' : '',
    staggerHiding ? 'is-hiding' : '',
  )

  return (
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
        <VStack gap="24px" align="center" w="full">
          <Box key={contentKey} className={staggerClassName} w="full">
            <VStack gap="24px" align="center" w="full">
              <Box className="t-stagger-line" w="full">
                <ClaimHeroHeader
                  partnerLogoUrl={mockClaim.partnerLogoUrl}
                  partner={mockClaim.partner}
                  headline={headline}
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

              <Box className="t-stagger-line t-stagger-line--3" w="full">
                <ClaimTicketCard
                  claim={mockClaim}
                  claimStatus={claimStatus}
                  onClaim={() => setAuthOpen(true)}
                />
              </Box>
            </VStack>
          </Box>
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
  )
}

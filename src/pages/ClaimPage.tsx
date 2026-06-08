import { Box, Text, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { ClaimExpiryBadge } from '../components/claim/claim-expiry-badge'
import { ClaimHeroHeader } from '../components/claim/claim-hero-header'
import { ClaimSignInDialog } from '../components/claim/claim-sign-in-dialog'
import { ClaimTicketCard } from '../components/claim/claim-ticket-card'
import { mockClaim } from '../data/mock-claim'
import { mergeClassNames } from '../lib/merge-class-names'
import { useClaimPageBackground } from '../lib/use-claim-page-background'

const MOCK_AUTH_DELAY_MS = 800

export function ClaimPage() {
  const [signInOpen, setSignInOpen] = useState(false)
  const [claimSuccess, setClaimSuccess] = useState(false)
  const [staggerShown, setStaggerShown] = useState(false)

  useClaimPageBackground()

  useEffect(() => {
    const frame = requestAnimationFrame(() => setStaggerShown(true))
    return () => cancelAnimationFrame(frame)
  }, [])

  const handleMockSignIn = async () => {
    await new Promise((resolve) => setTimeout(resolve, MOCK_AUTH_DELAY_MS))
    setSignInOpen(false)
    setClaimSuccess(true)
  }

  const staggerClassName = mergeClassNames('t-stagger', staggerShown ? 'is-shown' : '')

  return (
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
      <VStack gap="24px" align="center" w="full">
        <Box className={staggerClassName} w="full">
          <VStack gap="24px" align="center" w="full">
            <Box className="t-stagger-line" w="full">
              <ClaimHeroHeader
                partnerLogoUrl={mockClaim.partnerLogoUrl}
                partner={mockClaim.partner}
                headline={mockClaim.headline}
              />
            </Box>

            <Box className="t-stagger-line t-stagger-line--2">
              <ClaimExpiryBadge expiresLabel={mockClaim.expiresLabel} />
            </Box>

            <Box className="t-stagger-line t-stagger-line--3" w="full">
              <ClaimTicketCard claim={mockClaim} onClaim={() => setSignInOpen(true)} />
            </Box>
          </VStack>
        </Box>

        {claimSuccess ? (
          <Box
            w="full"
            px="12px"
            py="10px"
            borderRadius="8px"
            bg="rgba(255,255,255,0.08)"
            border="1px solid"
            borderColor="border.subtle"
          >
            <Text fontSize="14px" fontWeight="500" lineHeight="1.4" color="text.primary" textAlign="center">
              Signed in — ticket claim pending.
            </Text>
          </Box>
        ) : null}
      </VStack>

      <ClaimSignInDialog
        open={signInOpen}
        onOpenChange={setSignInOpen}
        claim={mockClaim}
        onContinue={handleMockSignIn}
      />
    </Box>
  )
}

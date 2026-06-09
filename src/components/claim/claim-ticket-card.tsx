import { Box, Image, Text, VStack } from '@chakra-ui/react'
import { AnimatePresence, motion } from 'motion/react'
import { useCallback, useEffect, useState } from 'react'
import type { ClaimStatus, ClaimTicket } from '../../types/claim'
import { useEventAccent } from '../../context/event-accent-context'
import { useReducedMotion } from '../../lib/use-reduced-motion'
import { ClaimClaimedStamp } from './claim-claimed-stamp'
import { ClaimDetailRow } from './claim-detail-row'
import { ClaimTicketButton } from './claim-ticket-button'
import { HolographicSurface } from './holographic-surface'
import { HolographicTicketShell } from './holographic-ticket-shell'

interface ClaimTicketCardProps {
  claim: ClaimTicket
  claimStatus: ClaimStatus
  claimAnimationsReady?: boolean
  onClaim: () => void
}

const MotionBox = motion.create(Box)

export function ClaimTicketCard({
  claim,
  claimStatus,
  claimAnimationsReady = false,
  onClaim,
}: ClaimTicketCardProps) {
  const prefersReducedMotion = useReducedMotion()
  const { claimTicketColors } = useEventAccent()
  const quantityLabel = `${claim.quantity}x`
  const isClaimed = claimStatus === 'claimed'
  const [isHoloActivated, setIsHoloActivated] = useState(false)
  const ctaLabel = isClaimed ? claim.ctaViewTickets : claim.ctaClaim

  useEffect(() => {
    if (!isClaimed) setIsHoloActivated(false)
  }, [isClaimed])

  const handleStampComplete = useCallback(() => {
    setIsHoloActivated(true)
  }, [])

  return (
    <Box w="full" maxW="330px" mx="auto" position="relative" overflow="visible">
      <HolographicTicketShell
        isHoloActive={isClaimed}
        isGlowActive={isHoloActivated}
        isTicketLink={isClaimed}
      >
        <HolographicSurface variant="topBody" showFoil={isClaimed} isClaimedGlow={isHoloActivated}>
          <Box
            position="relative"
            bg={claimTicketColors.surfaceBg}
            borderWidth="1px"
            borderStyle="solid"
            borderColor={claimTicketColors.borderColor}
            borderBottom="none"
            borderTopRadius="8px"
            borderBottomRadius="16px"
            overflow="hidden"
          >
            <Box py="12px" px="12px">
              <VStack gap="12px" align="stretch" w="full">
                <Box
                  w="full"
                  aspectRatio="1"
                  borderRadius="8px"
                  overflow="hidden"
                  flexShrink={0}
                  outline="1px solid rgba(0,0,0,0.1)"
                  outlineOffset="-1px"
                >
                  <Image
                    src={claim.posterUrl}
                    alt=""
                    w="full"
                    h="full"
                    objectFit="cover"
                    objectPosition="center"
                    draggable={false}
                    pointerEvents="none"
                  />
                </Box>

                <VStack gap="12px" align="stretch" w="full">
                  <Box position="relative" w="full">
                    <Text
                      fontSize="16px"
                      fontWeight="700"
                      lineHeight="1.3"
                      color={claimTicketColors.titleColor}
                      textWrap="balance"
                      pointerEvents="none"
                    >
                      {claim.title}
                    </Text>

                    <ClaimClaimedStamp
                      isClaimed={isClaimed}
                      isReady={claimAnimationsReady}
                      onStampComplete={handleStampComplete}
                    />
                  </Box>

                  <VStack gap="12px" align="stretch" w="full">
                    <ClaimDetailRow
                      label="TICKET"
                      primaryValue={claim.ticketType}
                      secondaryValue={quantityLabel}
                    />
                    <ClaimDetailRow
                      label="DATE"
                      primaryValue={claim.date}
                      secondaryValue={claim.time}
                    />
                    <ClaimDetailRow
                      label="VENUE"
                      primaryValue={claim.venue}
                      secondaryValue={claim.city}
                    />
                  </VStack>
                </VStack>
              </VStack>
            </Box>
          </Box>
        </HolographicSurface>

        <HolographicSurface variant="bottomStub" isClaimedGlow={isHoloActivated}>
          <Box
            position="relative"
            bg={claimTicketColors.surfaceBg}
            borderWidth="1px"
            borderStyle="solid"
            borderColor={claimTicketColors.borderColor}
            borderTopRadius="16px"
            borderBottomRadius="2px"
            overflow="hidden"
          >
            <Box p="12px">
              <AnimatePresence mode="wait" initial={false}>
                <MotionBox
                  key={ctaLabel}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ClaimTicketButton
                    label={ctaLabel}
                    onClick={isClaimed ? undefined : onClaim}
                    displayOnly={isClaimed}
                    isProminent={isHoloActivated}
                  />
                </MotionBox>
              </AnimatePresence>
            </Box>
          </Box>
        </HolographicSurface>
      </HolographicTicketShell>

      {isClaimed ? (
        <a
          href={claim.viewTicketsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="claim-ticket-hit-layer"
          aria-label={ctaLabel}
        />
      ) : null}
    </Box>
  )
}

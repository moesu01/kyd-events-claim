import { Box, Image, Text, VStack } from '@chakra-ui/react'
import { AnimatePresence, motion } from 'motion/react'
import type { ClaimStatus, ClaimTicket } from '../../types/claim'
import { useReducedMotion } from '../../lib/use-reduced-motion'
import { ClaimDetailRow } from './claim-detail-row'
import { ClaimDisclaimer } from './claim-disclaimer'
import { ClaimTicketButton } from './claim-ticket-button'
import { HolographicSurface } from './holographic-surface'
import { HolographicTicketShell } from './holographic-ticket-shell'

interface ClaimTicketCardProps {
  claim: ClaimTicket
  claimStatus: ClaimStatus
  onClaim: () => void
}

const ticketBorderColor = 'rgba(66,62,0,0.15)'
const ticketSurfaceBg = '#f0f0f0'

const MotionBox = motion.create(Box)

export function ClaimTicketCard({ claim, claimStatus, onClaim }: ClaimTicketCardProps) {
  const prefersReducedMotion = useReducedMotion()
  const quantityLabel = `${claim.quantity}x`
  const isClaimed = claimStatus === 'claimed'
  const ctaLabel = isClaimed ? claim.ctaViewTickets : claim.ctaClaim

  return (
    <Box w="full" maxW="330px" mx="auto">
      <HolographicTicketShell>
        <HolographicSurface variant="topBody">
          <Box
            position="relative"
            bg={ticketSurfaceBg}
            borderWidth="1px"
            borderStyle="solid"
            borderColor={ticketBorderColor}
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
                    draggable={false}
                  />
                </Box>

                <VStack gap="12px" align="stretch" w="full">
                  <Text
                    fontSize="16px"
                    fontWeight="700"
                    lineHeight="1.3"
                    color="#423e00"
                    textTransform="capitalize"
                    textWrap="balance"
                  >
                    {claim.title}
                  </Text>

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

        <HolographicSurface variant="bottomStub">
          <Box
            position="relative"
            bg={ticketSurfaceBg}
            borderWidth="1px"
            borderStyle="solid"
            borderColor={ticketBorderColor}
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
                    isInactive={isClaimed}
                    isProminent={isClaimed}
                  />
                </MotionBox>
              </AnimatePresence>
            </Box>
          </Box>
        </HolographicSurface>
      </HolographicTicketShell>

      {!isClaimed ? <ClaimDisclaimer text={claim.disclaimer} /> : null}
    </Box>
  )
}

import { Box, Image, Text, VStack } from '@chakra-ui/react'
import type { ClaimTicket } from '../../types/claim'
import { ClaimDetailRow } from './claim-detail-row'
import { ClaimDisclaimer } from './claim-disclaimer'
import { ClaimTicketButton } from './claim-ticket-button'

interface ClaimTicketCardProps {
  claim: ClaimTicket
  onClaim: () => void
}

const ticketBorderColor = 'rgba(66,62,0,0.15)'
const ticketSurfaceBg = '#f0f0f0'
const ticketInsetShadow = 'inset 0 4px 37.6px #f0f0f0'
const ticketDropShadow =
  'drop-shadow(0 4px 4px rgba(0,0,0,0.1)) drop-shadow(0 20px 12.5px rgba(0,0,0,0.05))'

export function ClaimTicketCard({ claim, onClaim }: ClaimTicketCardProps) {
  const quantityLabel = `${claim.quantity}x`

  return (
    <Box
      w="full"
      maxW="330px"
      mx="auto"
      css={{ filter: ticketDropShadow }}
    >
      <Box
        position="relative"
        bg={ticketSurfaceBg}
        borderWidth="1px"
        borderStyle="solid"
        borderColor={ticketBorderColor}
        borderBottom="none"
        borderTopRadius="8px"
        borderBottomRadius="16px"
        py="12px"
        overflow="hidden"
        boxShadow={ticketInsetShadow}
      >
        <VStack gap="12px" align="stretch" px="12px" w="full">
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
          </VStack>

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
      </Box>

      <Box
        position="relative"
        bg={ticketSurfaceBg}
        borderWidth="1px"
        borderStyle="solid"
        borderColor={ticketBorderColor}
        borderTopRadius="16px"
        borderBottomRadius="2px"
        p="12px"
        overflow="hidden"
        boxShadow={ticketInsetShadow}
      >
        <ClaimTicketButton label={claim.cta} onClick={onClaim} />
      </Box>

      <ClaimDisclaimer text={claim.disclaimer} />
    </Box>
  )
}

import { Image, Text, VStack } from '@chakra-ui/react'
import { AnimatedPresencePanel } from '../ui/animated-presence-panel'
import { ClaimClaimedSubtext } from './claim-claimed-subtext'

interface ClaimHeroHeaderProps {
  partnerLogoUrl: string
  partner: string
  headline: string
  isClaimed?: boolean
}

export function ClaimHeroHeader({
  partnerLogoUrl,
  partner,
  headline,
  isClaimed = false,
}: ClaimHeroHeaderProps) {
  return (
    <VStack gap="16px" align="center" w="full">
      <Image
        src={partnerLogoUrl}
        alt={partner}
        w="88px"
        h="40px"
        objectFit="contain"
        flexShrink={0}
      />

      <AnimatedPresencePanel panelKey={headline} mode="wait">
        <VStack gap={isClaimed ? '12px' : '8px'} align="center" w="full">
          <Text
            fontSize="28px"
            fontWeight="700"
            lineHeight="1.1"
            color="#ffffff"
            textAlign="center"
            letterSpacing="-0.28px"
            fontFamily="heading"
            textWrap="balance"
          >
            {headline}
          </Text>

          {isClaimed ? <ClaimClaimedSubtext /> : null}
        </VStack>
      </AnimatedPresencePanel>
    </VStack>
  )
}

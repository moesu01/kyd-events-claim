import { Image, Text, VStack, chakra } from '@chakra-ui/react'
import { useClaimDevTools } from '../../context/claim-dev-tools-context'
import { AnimatedPresencePanel } from '../ui/animated-presence-panel'
import { ClaimClaimedSubtext } from './claim-claimed-subtext'

const PartnerLogoButton = chakra('button')

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
  const { toggleVisible } = useClaimDevTools()
  const isDev = import.meta.env.DEV

  const partnerLogo = (
    <Image
      src={partnerLogoUrl}
      alt={partner}
      w="88px"
      h="40px"
      objectFit="contain"
      flexShrink={0}
      pointerEvents="none"
    />
  )

  return (
    <VStack gap="16px" align="center" w="full">
      {isDev ? (
        <PartnerLogoButton
          type="button"
          aria-label="Toggle developer tools"
          onClick={toggleVisible}
          bg="transparent"
          border="none"
          p={0}
          cursor="pointer"
          flexShrink={0}
          transition="transform 0.15s ease"
          transitionProperty="transform"
          _active={{ transform: 'scale(0.96)' }}
        >
          {partnerLogo}
        </PartnerLogoButton>
      ) : (
        partnerLogo
      )}

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

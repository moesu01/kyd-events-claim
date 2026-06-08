import { Image, Text, VStack } from '@chakra-ui/react'

interface ClaimHeroHeaderProps {
  partnerLogoUrl: string
  partner: string
  headline: string
}

export function ClaimHeroHeader({ partnerLogoUrl, partner, headline }: ClaimHeroHeaderProps) {
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

      <Text
        fontSize="28px"
        fontWeight="700"
        lineHeight="1.1"
        color="#ffffff"
        textAlign="center"
        letterSpacing="-0.28px"
        fontFamily="heading"
      >
        {headline}
      </Text>
    </VStack>
  )
}

import { Flex, HStack, Image, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { assetUrl } from '../../lib/asset-url'

const TIX_LOGO_URL = assetUrl('/assets/claim/tix-logo.svg')
const TIX_LOGO_FALLBACK_URL = assetUrl('/assets/claim/tix-logo.png')

export function ClaimFooter() {
  const [logoUrl, setLogoUrl] = useState(TIX_LOGO_URL)

  const handleLogoError = () => {
    if (logoUrl === TIX_LOGO_URL) setLogoUrl(TIX_LOGO_FALLBACK_URL)
  }

  return (
    <Flex
      as="footer"
      w="full"
      pt="12px"
      borderTopWidth="1px"
      borderTopColor="rgba(255,255,255,0.15)"
      align="center"
      justify="space-between"
      gap="12px"
    >
      <HStack gap="8px" align="center" flexShrink={0}>
        <Text
          fontSize="11px"
          fontWeight="500"
          lineHeight="1.4"
          color="white"
          opacity={0.85}
          letterSpacing="1.1px"
          whiteSpace="nowrap"
        >
          POWERED BY
        </Text>
        <Image
          src={logoUrl}
          alt="TIX"
          w="58.23px"
          h="18px"
          objectFit="contain"
          flexShrink={0}
          onError={handleLogoError}
        />
      </HStack>

      <Text
        fontSize="11px"
        fontWeight="500"
        lineHeight="1.4"
        color="white"
        opacity={0.85}
        whiteSpace="pre"
        textAlign="right"
        flexShrink={0}
      >
        {'© 2026  TIX.XYZ'}
      </Text>
    </Flex>
  )
}

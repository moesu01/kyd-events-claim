import { HStack, Image, Text, VStack, chakra } from '@chakra-ui/react'
import { useState } from 'react'
import { assetUrl } from '../../lib/asset-url'

const FooterLink = chakra('a')

interface SiteFooterProps {
  version?: string
  logoUrl?: string
}

const FOOTER_LINKS = [
  'Terms Of Service',
  'Privacy Policy',
  'FAQ',
  'Help',
] as const

const KYD_LABS_LOGO_URL = assetUrl('/assets/kyd-logo-white.png')

export function SiteFooter({
  version = 'v2.0.6',
  logoUrl = KYD_LABS_LOGO_URL,
}: SiteFooterProps) {
  const [hasLogoError, setHasLogoError] = useState(false)

  const handleLinkClick = (label: string) => {
    console.log(`${label} clicked`)
  }

  return (
    <VStack
      as="footer"
      gap="12px"
      py="20px"
      px="pageX"
      w="full"
      align="center"
      textAlign="center"
    >
      {hasLogoError ? (
        <Text
          fontSize="14px"
          fontWeight="600"
          lineHeight="1"
          letterSpacing="0.02em"
          color="text.primary"
          w="75px"
          h="37px"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          KYD Labs
        </Text>
      ) : (
        <Image
          src={logoUrl}
          alt="KYD Labs"
          w="72px"
          h="auto"
          objectFit="contain"
          onError={() => setHasLogoError(true)}
        />
      )}

      <HStack gap="8px" flexWrap="wrap" justify="center">
        {FOOTER_LINKS.map((label, index) => (
          <HStack key={label} gap="8px">
            {index > 0 ? (
              <Text fontSize="12px" lineHeight="1.3" color="text.secondary">
                |
              </Text>
            ) : null}
            <FooterLink
              href="#"
              fontSize="12px"
              lineHeight="1.3"
              color="text.secondary"
              textDecoration="none"
              _hover={{ textDecoration: 'underline' }}
              onClick={() => handleLinkClick(label)}
            >
              {label}
            </FooterLink>
          </HStack>
        ))}
      </HStack>

      <HStack gap="8px" flexWrap="wrap" justify="center">
        <Text fontSize="12px" lineHeight="1.3" color="text.secondary">
          © 2025 KYD Labs Inc.
        </Text>
        <Text fontSize="12px" lineHeight="1.3" color="text.secondary">
          {version}
        </Text>
      </HStack>
    </VStack>
  )
}

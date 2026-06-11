import { InstagramLogo, SpotifyLogo, TiktokLogo } from '@phosphor-icons/react'
import { Flex, Image, Text, chakra } from '@chakra-ui/react'
import { useState, type MouseEvent, type ReactNode } from 'react'
import type { Artist } from '../../types/event'

const SocialLink = chakra('a')

interface LineupArtistRowProps {
  artist: Artist
}

const PLACEHOLDER_COLORS = ['#6366f1', '#ec4899', '#14b8a6', '#f59e0b', '#8b5cf6']

function getPlaceholderColor(id: string) {
  const index =
    id.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0) %
    PLACEHOLDER_COLORS.length
  return PLACEHOLDER_COLORS[index]
}

interface SocialIconButtonProps {
  href: string
  label: string
  children: ReactNode
}

function SocialIconButton({ href, label, children }: SocialIconButtonProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.stopPropagation()
    window.open(href, '_blank', 'noopener,noreferrer')
  }

  return (
    <SocialLink
      href={href}
      aria-label={label}
      display="flex"
      alignItems="center"
      justifyContent="center"
      w="32px"
      h="32px"
      borderRadius="pill"
      bg="bg.surface"
      flexShrink={0}
      onClick={handleClick}
    >
      {children}
    </SocialLink>
  )
}

export function LineupArtistRow({ artist }: LineupArtistRowProps) {
  const [hasError, setHasError] = useState(false)
  const { socials } = artist

  return (
    <Flex align="center" gap="12px" w="full" minH="52px" py="6px">
      <Flex
        align="center"
        justify="center"
        w="54px"
        h="54px"
        borderRadius="pill"
        overflow="hidden"
        flexShrink={0}
        bg={hasError ? getPlaceholderColor(artist.id) : undefined}
      >
        {!hasError ? (
          <Image
            src={artist.imageUrl}
            alt=""
            w="full"
            h="full"
            objectFit="cover"
            onError={() => setHasError(true)}
          />
        ) : (
          <Text fontSize="18px" fontWeight="700" lineHeight="1" color="text.primary">
            {artist.name.charAt(0).toUpperCase()}
          </Text>
        )}
      </Flex>

      <Flex direction="column" gap="6px" flex={1} minW={0}>
        <Text fontSize="16px" fontWeight="700" lineHeight="1.3" color="text.primary" truncate>
          {artist.name}
        </Text>
        <Flex align="center" gap="8px">
          {socials?.instagram ? (
            <SocialIconButton href={socials.instagram} label={`${artist.name} on Instagram`}>
              <InstagramLogo size={16} weight="fill" aria-hidden />
            </SocialIconButton>
          ) : null}
          {socials?.spotify ? (
            <SocialIconButton href={socials.spotify} label={`${artist.name} on Spotify`}>
              <SpotifyLogo size={16} weight="fill" aria-hidden />
            </SocialIconButton>
          ) : null}
          {socials?.tiktok ? (
            <SocialIconButton href={socials.tiktok} label={`${artist.name} on TikTok`}>
              <TiktokLogo size={16} weight="fill" aria-hidden />
            </SocialIconButton>
          ) : null}
        </Flex>
      </Flex>

      {artist.setTime ? (
        <Text
          fontSize="12px"
          fontWeight="400"
          lineHeight="1.3"
          color="text.primary"
          flexShrink={0}
        >
          {artist.setTime}
        </Text>
      ) : null}
    </Flex>
  )
}

import { InstagramLogo, SpotifyLogo, TiktokLogo } from '@phosphor-icons/react'
import { Box, Flex, Image, Text, chakra } from '@chakra-ui/react'
import { useMemo, useState, type MouseEvent, type ReactNode } from 'react'
import { useEventAccent } from '../../context/event-accent-context'
import { getQuantitySelectorBg } from '../../lib/oklch-color'
import type { Artist } from '../../types/event'
import { ARTIST_AVATAR_BORDER_SHADOW } from './lineup-avatar-styles'

const SocialLink = chakra('a')

const SOCIAL_ICON_BORDER_SHADOW = '0 0 0 1px rgba(255, 255, 255, 0.1)'

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
  inactiveBg: string
  activeBg: string
  children: ReactNode
}

function SocialIconButton({ href, label, inactiveBg, activeBg, children }: SocialIconButtonProps) {
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
      bg={inactiveBg}
      color="text.primary"
      boxShadow={SOCIAL_ICON_BORDER_SHADOW}
      flexShrink={0}
      transitionProperty="background-color"
      transitionDuration="150ms"
      transitionTimingFunction="ease-out"
      _hover={{ bg: activeBg }}
      _focusVisible={{ bg: activeBg, outline: '2px solid', outlineColor: 'text.primary', outlineOffset: '2px' }}
      css={{
        '& svg': {
          opacity: 0.75,
          transitionProperty: 'opacity',
          transitionDuration: '150ms',
          transitionTimingFunction: 'ease-out',
        },
        '&:hover svg, &:focus-visible svg': {
          opacity: 1,
        },
      }}
      onClick={handleClick}
    >
      {children}
    </SocialLink>
  )
}

export function LineupArtistRow({ artist }: LineupArtistRowProps) {
  const [hasError, setHasError] = useState(false)
  const { accentColor } = useEventAccent()
  const { socials } = artist
  const socialIconInactiveBg = useMemo(
    () => getQuantitySelectorBg(accentColor, false),
    [accentColor],
  )
  const socialIconActiveBg = useMemo(
    () => getQuantitySelectorBg(accentColor, true),
    [accentColor],
  )

  return (
    <Flex align="center" gap="12px" w="full" minH="52px" py="10px">
      <Flex
        align="center"
        justify="center"
        position="relative"
        w="60px"
        h="60px"
        borderRadius="pill"
        overflow="hidden"
        boxShadow={hasError ? ARTIST_AVATAR_BORDER_SHADOW : undefined}
        flexShrink={0}
        bg={hasError ? getPlaceholderColor(artist.id) : undefined}
      >
        {!hasError ? (
          <>
            <Image
              src={artist.imageUrl}
              alt=""
              w="full"
              h="full"
              objectFit="cover"
              onError={() => setHasError(true)}
            />
            <Box
              position="absolute"
              inset={0}
              borderRadius="pill"
              pointerEvents="none"
              boxShadow={ARTIST_AVATAR_BORDER_SHADOW}
              aria-hidden
            />
          </>
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
            <SocialIconButton
              href={socials.instagram}
              label={`${artist.name} on Instagram`}
              inactiveBg={socialIconInactiveBg}
              activeBg={socialIconActiveBg}
            >
              <InstagramLogo size={16} weight="fill" aria-hidden />
            </SocialIconButton>
          ) : null}
          {socials?.spotify ? (
            <SocialIconButton
              href={socials.spotify}
              label={`${artist.name} on Spotify`}
              inactiveBg={socialIconInactiveBg}
              activeBg={socialIconActiveBg}
            >
              <SpotifyLogo size={16} weight="fill" aria-hidden />
            </SocialIconButton>
          ) : null}
          {socials?.tiktok ? (
            <SocialIconButton
              href={socials.tiktok}
              label={`${artist.name} on TikTok`}
              inactiveBg={socialIconInactiveBg}
              activeBg={socialIconActiveBg}
            >
              <TiktokLogo size={16} weight="fill" aria-hidden />
            </SocialIconButton>
          ) : null}
        </Flex>
      </Flex>

      {artist.setTime ? (
        <Text
          fontSize="14px"
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

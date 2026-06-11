import { Box, Flex, Image, Text } from '@chakra-ui/react'
import { useState } from 'react'
import type { Artist } from '../../types/event'
import { ARTIST_AVATAR_BORDER_SHADOW } from './lineup-avatar-styles'

interface LineupCollapsedProps {
  artists: Artist[]
}

const AVATAR_SIZE = '54px'
const AVATAR_OVERLAP = '-16px'

const PLACEHOLDER_COLORS = ['#6366f1', '#ec4899', '#14b8a6', '#f59e0b', '#8b5cf6']

function getPlaceholderColor(id: string) {
  const index =
    id.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0) %
    PLACEHOLDER_COLORS.length
  return PLACEHOLDER_COLORS[index]
}

interface CollapsedAvatarProps {
  artist: Artist
  index: number
}

function CollapsedAvatar({ artist, index }: CollapsedAvatarProps) {
  const [hasError, setHasError] = useState(false)

  return (
    <Flex
      align="center"
      justify="center"
      w={AVATAR_SIZE}
      h={AVATAR_SIZE}
      borderRadius="pill"
      border="2px solid"
      borderColor="bg.page"
      bg={hasError ? getPlaceholderColor(artist.id) : undefined}
      boxShadow={hasError ? ARTIST_AVATAR_BORDER_SHADOW : undefined}
      overflow="hidden"
      flexShrink={0}
      ml={index === 0 ? '0' : AVATAR_OVERLAP}
      zIndex={index}
      position="relative"
      aria-hidden
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
  )
}

export function LineupCollapsed({ artists }: LineupCollapsedProps) {
  const names = artists.map((artist) => artist.name).join(', ')

  return (
    <Flex align="center" w="full" gap="12px">
      <Text
        flex={1}
        minW={0}
        fontSize="14px"
        fontWeight="400"
        lineHeight="1.3"
        color="text.primary"
      >
        {names}
      </Text>
      <Flex align="center" flexShrink={0}>
        {artists.map((artist, index) => (
          <CollapsedAvatar key={artist.id} artist={artist} index={index} />
        ))}
      </Flex>
    </Flex>
  )
}

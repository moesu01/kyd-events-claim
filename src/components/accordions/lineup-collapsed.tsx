import { Flex, Image, Text } from '@chakra-ui/react'
import { useState } from 'react'
import type { Artist } from '../../types/event'

interface LineupCollapsedProps {
  artists: Artist[]
}

const AVATAR_SIZE = '44px'
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
      overflow="hidden"
      flexShrink={0}
      ml={index === 0 ? '0' : AVATAR_OVERLAP}
      zIndex={index}
      position="relative"
      aria-hidden
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
  )
}

export function LineupCollapsed({ artists }: LineupCollapsedProps) {
  const names = artists.map((artist) => artist.name).join(', ')

  return (
    <Flex direction="column" gap="12px" w="full">
      <Flex align="center" w="full">
        {artists.map((artist, index) => (
          <CollapsedAvatar key={artist.id} artist={artist} index={index} />
        ))}
      </Flex>
      <Text fontSize="12px" fontWeight="400" lineHeight="1.5" color="text.secondary">
        {names}
      </Text>
    </Flex>
  )
}

import { Box, Image, VStack, chakra } from '@chakra-ui/react'
import type { KeyboardEvent } from 'react'
import { CarouselIndicator } from './carousel-indicator'

const PosterButton = chakra('button')

interface EventPosterProps {
  posterUrl: string
  activeSlide: number
  totalSlides: number
  onAdvance: () => void
}

export function EventPoster({
  posterUrl,
  activeSlide,
  totalSlides,
  onAdvance,
}: EventPosterProps) {
  const handleClick = () => {
    onAdvance()
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onAdvance()
    }
  }

  return (
    <VStack gap="10px" px="24px" align="center" w="full">
      <CarouselIndicator totalSlides={totalSlides} activeSlide={activeSlide} />

      <PosterButton
        type="button"
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        aria-label={`Event poster ${activeSlide + 1} of ${totalSlides}. Tap to view next poster.`}
        display="flex"
        p="0"
        border="none"
        bg="transparent"
        cursor="pointer"
        borderRadius="8px"
        transition="transform 0.15s ease"
        transitionProperty="transform"
        _active={{ transform: 'scale(0.98)' }}
      >
        <Box
          w="220px"
          h="220px"
          borderRadius="8px"
          overflow="hidden"
          boxShadow="0 0 0 1px rgba(255,255,255,0.1)"
        >
          <Image
            src={posterUrl}
            alt=""
            w="full"
            h="full"
            objectFit="cover"
            pointerEvents="none"
            draggable={false}
          />
        </Box>
      </PosterButton>
    </VStack>
  )
}

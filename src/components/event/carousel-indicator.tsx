import { Box, HStack } from '@chakra-ui/react'

interface CarouselIndicatorProps {
  totalSlides?: number
  activeSlide?: number
}

export function CarouselIndicator({
  totalSlides = 3,
  activeSlide = 0,
}: CarouselIndicatorProps) {
  return (
    <HStack
      gap="8px"
      w="219px"
      aria-label={`Slide ${activeSlide + 1} of ${totalSlides}`}
      role="group"
    >
      {Array.from({ length: totalSlides }, (_, index) => (
        <Box
          key={index}
          flex="1"
          h="3px"
          borderRadius="full"
          bg={index === activeSlide ? '#ffffff' : 'rgba(255,255,255,0.2)'}
          aria-hidden={index !== activeSlide}
        />
      ))}
    </HStack>
  )
}

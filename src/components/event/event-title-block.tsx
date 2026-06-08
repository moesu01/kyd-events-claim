import { Box, Text, VStack } from '@chakra-ui/react'

interface EventTitleBlockProps {
  title: string
  subtitle: string
  presenter: string
}

export function EventTitleBlock({ title, subtitle, presenter }: EventTitleBlockProps) {
  return (
    <VStack gap="7px" px="pageX" textAlign="center" w="full">
      <Box>
        <Text
          fontSize="18px"
          fontWeight="700"
          lineHeight="1.15"
          color="text.primary"
          textWrap="balance"
        >
          {title}
        </Text>
        <Text
          fontSize="18px"
          fontWeight="700"
          lineHeight="1.15"
          color="text.primary"
          textWrap="balance"
        >
          {subtitle}
        </Text>
      </Box>
      <Text
        fontSize="14px"
        fontWeight="500"
        lineHeight="1"
        color="rgba(255,255,255,0.74)"
      >
        {presenter}
      </Text>
    </VStack>
  )
}

import { Ticket } from '@phosphor-icons/react'
import { Box, Flex, Text } from '@chakra-ui/react'

interface TicketsSimpleHeaderProps {
  ageRestriction: string
}

const iconProps = {
  size: 18,
  color: 'currentColor',
  weight: 'regular' as const,
}

export function TicketsSimpleHeader({ ageRestriction }: TicketsSimpleHeaderProps) {
  return (
    <Flex
      align="center"
      justify="space-between"
      w="full"
      pt="12px"
      px="pageX"
      gap="12px"
    >
      <Flex align="center" gap="6px" minW={0}>
        <Box display="flex" flexShrink={0}>
          <Ticket {...iconProps} aria-hidden />
        </Box>
        <Text fontSize="14px" fontWeight="700" lineHeight="1" color="text.primary">
          Tickets
        </Text>
      </Flex>
      <Text
        fontSize="12px"
        fontWeight="500"
        lineHeight="1.3"
        color="text.secondary"
        flexShrink={0}
        whiteSpace="nowrap"
      >
        Ages: {ageRestriction}
      </Text>
    </Flex>
  )
}

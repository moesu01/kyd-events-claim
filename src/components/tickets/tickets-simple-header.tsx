import { Ticket } from '@phosphor-icons/react'
import { Box, Flex, Text } from '@chakra-ui/react'
import { PromoCodeLink } from './promo-code-link'

const iconProps = {
  size: 14,
  color: 'currentColor',
  weight: 'regular' as const,
}

export function TicketsSimpleHeader() {
  return (
    <Flex
      align="center"
      justify="space-between"
      w="full"
      pt="12px"
      px="pageX"
      gap="12px"
    >
      <Flex align="center" gap="8px" minW={0}>
        <Box display="flex" flexShrink={0}>
          <Ticket {...iconProps} aria-hidden />
        </Box>
        <Text fontSize="14px" fontWeight="700" lineHeight="1" color="text.primary">
          Tickets
        </Text>
      </Flex>
      <PromoCodeLink variant="inline" />
    </Flex>
  )
}

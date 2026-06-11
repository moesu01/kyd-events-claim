import { Box, Flex, Text } from '@chakra-ui/react'
import { useEventAccent } from '../../context/event-accent-context'

interface SoldOutRowProps {
  name: string
  isFirst?: boolean
  isLast?: boolean
}

export function SoldOutRow({ name, isFirst, isLast }: SoldOutRowProps) {
  const { mutedTextColorLight } = useEventAccent()

  return (
    <Box
      w="full"
      p="4px"
      borderStyle="solid"
      borderColor="rgba(255,255,255,0.1)"
      borderTopWidth="1px"
      borderLeftWidth="1px"
      borderRightWidth="1px"
      borderBottomWidth={isLast ? '1px' : '0'}
      borderTopRadius={isFirst ? 'ticketCard' : undefined}
      borderBottomRadius={isLast ? 'ticketCard' : undefined}
    >
      <Flex
        align="center"
        justify="space-between"
        w="full"
        p="8px"
      >
        <Text fontSize="16px" fontWeight="500" lineHeight="24px" color={mutedTextColorLight}>
          {name}
        </Text>
        <Text fontSize="16px" fontWeight="500" lineHeight="24px" color={mutedTextColorLight}>
          Sold Out
        </Text>
      </Flex>
    </Box>
  )
}

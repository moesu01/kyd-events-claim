import { Box, Flex, Text } from '@chakra-ui/react'
import { useEventAccent } from '../../context/event-accent-context'

interface SoldOutRowProps {
  name: string
  isFirst?: boolean
  isLast?: boolean
}

export function SoldOutRow({ name, isFirst, isLast }: SoldOutRowProps) {
  const { mutedTextColor, mutedTextColorLight } = useEventAccent()

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
      borderTopRadius={isFirst ? '8px' : undefined}
      borderBottomRadius={isLast ? '8px' : undefined}
    >
      <Flex
        align="center"
        justify="space-between"
        w="full"
        p="8px"
        borderRadius="5px"
      >
        <Text fontSize="16px" fontWeight="500" lineHeight="24px" color={mutedTextColorLight}>
          {name}
        </Text>
        <Text fontSize="16px" fontWeight="500" lineHeight="24px" color={mutedTextColor}>
          Sold Out
        </Text>
      </Flex>
    </Box>
  )
}

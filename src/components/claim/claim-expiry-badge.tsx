import { Clock } from '@phosphor-icons/react'
import { Flex, Text } from '@chakra-ui/react'

interface ClaimExpiryBadgeProps {
  expiresLabel: string
}

export function ClaimExpiryBadge({ expiresLabel }: ClaimExpiryBadgeProps) {
  return (
    <Flex
      align="center"
      justify="center"
      gap="10px"
      px="12px"
      py="12px"
      borderRadius="16px"
      bg="#000000"
      border="1px solid"
      borderColor="rgba(197,197,197,0.36)"
      w="fit-content"
      mx="auto"
    >
      <Clock size={14} weight="regular" color="#ffffff" aria-hidden />
      <Text fontSize="14px" fontWeight="500" lineHeight="1" color="#ffffff" whiteSpace="nowrap">
        {expiresLabel}
      </Text>
    </Flex>
  )
}

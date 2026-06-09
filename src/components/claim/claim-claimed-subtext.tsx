import { CheckCircle } from '@phosphor-icons/react'
import { Flex, Text } from '@chakra-ui/react'

export function ClaimClaimedSubtext() {
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
      <Flex flexShrink={0} align="center">
        <CheckCircle size={18} weight="fill" color="#4ade80" aria-hidden />
      </Flex>
      <Text fontSize="14px" fontWeight="500" lineHeight="1" color="#ffffff" textWrap="balance">
        Tap your ticket to view it on KYD Labs
      </Text>
    </Flex>
  )
}

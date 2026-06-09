import { Flex, Text, VStack } from '@chakra-ui/react'
import { useEventAccent } from '../../context/event-accent-context'

interface ClaimDetailRowProps {
  label: string
  primaryValue: string
  secondaryValue: string
}

export function ClaimDetailRow({ label, primaryValue, secondaryValue }: ClaimDetailRowProps) {
  const { claimTicketColors } = useEventAccent()

  return (
    <VStack
      align="stretch"
      gap="6px"
      pt="8px"
      borderTop="1px solid"
      borderColor={claimTicketColors.borderColor}
      w="full"
    >
      <Text
        fontSize="12px"
        fontWeight="500"
        lineHeight="1"
        color={claimTicketColors.labelColor}
      >
        {label}
      </Text>

      <Flex align="center" justify="space-between" gap="8px" w="full">
        <Text
          fontSize="14px"
          fontWeight="600"
          lineHeight="1"
          color={claimTicketColors.valueColor}
          truncate
          minW={0}
        >
          {primaryValue}
        </Text>
        <Text
          fontSize="14px"
          fontWeight="600"
          lineHeight="1"
          color={claimTicketColors.valueColor}
          flexShrink={0}
          whiteSpace="nowrap"
          fontVariantNumeric="tabular-nums"
          letterSpacing="-0.42px"
        >
          {secondaryValue}
        </Text>
      </Flex>
    </VStack>
  )
}

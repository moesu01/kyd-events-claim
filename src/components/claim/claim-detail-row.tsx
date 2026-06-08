import { Flex, Text, VStack } from '@chakra-ui/react'

interface ClaimDetailRowProps {
  label: string
  primaryValue: string
  secondaryValue: string
}

const labelColor = 'rgba(66,62,0,0.75)'
const valueColor = 'rgba(66,62,0,0.9)'
const borderColor = 'rgba(66,62,0,0.15)'

export function ClaimDetailRow({ label, primaryValue, secondaryValue }: ClaimDetailRowProps) {
  return (
    <VStack
      align="stretch"
      gap="6px"
      pt="8px"
      borderTop="1px solid"
      borderColor={borderColor}
      w="full"
    >
      <Text
        fontSize="12px"
        fontWeight="500"
        lineHeight="1"
        color={labelColor}
      >
        {label}
      </Text>

      <Flex align="center" justify="space-between" gap="8px" w="full">
        <Text
          fontSize="14px"
          fontWeight="600"
          lineHeight="1"
          color={valueColor}
          truncate
          minW={0}
        >
          {primaryValue}
        </Text>
        <Text
          fontSize="14px"
          fontWeight="600"
          lineHeight="1"
          color={valueColor}
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

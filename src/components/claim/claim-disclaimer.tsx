import { Text } from '@chakra-ui/react'

interface ClaimDisclaimerProps {
  text: string
}

export function ClaimDisclaimer({ text }: ClaimDisclaimerProps) {
  return (
    <Text
      fontSize="13px"
      fontWeight="500"
      lineHeight="1.4"
      color="#ffffff"
      textAlign="center"
      w="full"
      pt="12px"
      whiteSpace="pre-line"
    >
      {text}
    </Text>
  )
}

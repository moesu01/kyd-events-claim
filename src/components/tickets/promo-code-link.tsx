import { Text, chakra } from '@chakra-ui/react'

const PromoButton = chakra('button')

interface PromoCodeLinkProps {
  onClick?: () => void
}

export function PromoCodeLink({ onClick }: PromoCodeLinkProps) {
  const handleClick = () => {
    if (onClick) {
      onClick()
      return
    }
    console.log('Got a code? clicked')
  }

  return (
    <PromoButton
      type="button"
      w="full"
      py="8px"
      bg="transparent"
      border="none"
      cursor="pointer"
      onClick={handleClick}
      aria-label="Enter promo code"
    >
      <Text
        fontSize="14px"
        fontWeight="400"
        lineHeight="1.3"
        color="text.primary"
        textAlign="center"
        textDecoration="underline"
        textUnderlineOffset="2px"
      >
        Got a code?
      </Text>
    </PromoButton>
  )
}

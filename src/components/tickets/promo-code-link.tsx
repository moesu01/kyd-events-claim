import { Text, chakra } from '@chakra-ui/react'
import { useEventAccent } from '../../context/event-accent-context'

const PromoButton = chakra('button')

interface PromoCodeLinkProps {
  onClick?: () => void
  variant?: 'stacked' | 'inline'
}

export function PromoCodeLink({ onClick, variant = 'stacked' }: PromoCodeLinkProps) {
  const { linkTextColor } = useEventAccent()
  const isInline = variant === 'inline'
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
      w={isInline ? 'auto' : 'full'}
      py={isInline ? '0' : '8px'}
      bg="transparent"
      border="none"
      cursor="pointer"
      flexShrink={0}
      onClick={handleClick}
      aria-label="Enter promo code"
    >
      <Text
        fontSize={isInline ? '13px' : '14px'}
        fontWeight="400"
        lineHeight="1"
        letterSpacing={isInline ? '-0.13px' : undefined}
        color={linkTextColor}
        textAlign={isInline ? 'right' : 'center'}
        textDecoration="underline"
        textUnderlineOffset="2px"
        whiteSpace="nowrap"
      >
        Got a code?
      </Text>
    </PromoButton>
  )
}

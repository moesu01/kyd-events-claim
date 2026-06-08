import { ShoppingCart } from '@phosphor-icons/react'
import { Flex, Text, chakra } from '@chakra-ui/react'

const PurchaseButtonRoot = chakra('button')

export function getPurchaseLabel(ticketCount: number): string {
  if (ticketCount === 1) return 'Get 1 Ticket'
  return `Get ${ticketCount} Tickets`
}

interface PurchaseButtonProps {
  ticketCount: number
  onPurchase?: () => void
  isDisabled?: boolean
}

export function PurchaseButton({
  ticketCount,
  onPurchase,
  isDisabled,
}: PurchaseButtonProps) {
  const disabled = isDisabled ?? ticketCount === 0

  const handleClick = () => {
    if (disabled) return
    if (onPurchase) {
      onPurchase()
      return
    }
    console.log('checkout')
  }

  return (
    <PurchaseButtonRoot
      type="button"
      display="flex"
      alignItems="center"
      justifyContent="center"
      gap="8px"
      w="full"
      h="50px"
      px="16px"
      borderRadius="12px"
      bg="cta.bg"
      color="cta.fg"
      border="none"
      cursor={disabled ? 'not-allowed' : 'pointer'}
      opacity={disabled ? 0.5 : 1}
      disabled={disabled}
      onClick={handleClick}
      aria-label={getPurchaseLabel(ticketCount)}
      transition="transform 0.15s ease"
      transitionProperty="transform"
      _active={disabled ? undefined : { transform: 'scale(0.96)' }}
    >
      <Text
        fontSize="18px"
        fontWeight="700"
        lineHeight="1.1"
        color="cta.fg"
        fontVariantNumeric="tabular-nums"
      >
        {getPurchaseLabel(ticketCount)}
      </Text>
      <Flex align="center" justify="center" flexShrink={0}>
        <ShoppingCart size={16} weight="bold" color="currentColor" aria-hidden />
      </Flex>
    </PurchaseButtonRoot>
  )
}

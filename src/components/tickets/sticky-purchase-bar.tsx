import { Box } from '@chakra-ui/react'
import type { RefObject } from 'react'
import { useTicketCart } from '../../context/ticket-cart-context'
import { PurchaseButton } from './purchase-button'

interface StickyPurchaseBarProps {
  ticketsSectionRef: RefObject<HTMLElement | null>
}

export function StickyPurchaseBar({ ticketsSectionRef }: StickyPurchaseBarProps) {
  const { totalTickets } = useTicketCart()

  const handlePurchase = () => {
    if (totalTickets === 0) {
      ticketsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }
    console.log('checkout')
  }

  return (
    <Box
      position="fixed"
      bottom="0"
      left="0"
      right="0"
      w="full"
      pt="32px"
      pb="17px"
      zIndex={10}
      pointerEvents="none"
      className="t-sticky-purchase-bar"
    >
      <Box maxW="mobile" mx="auto" w="full" px="pageX" pointerEvents="auto">
        <PurchaseButton ticketCount={totalTickets} onPurchase={handlePurchase} />
      </Box>
    </Box>
  )
}

import { Box } from '@chakra-ui/react'
import { useTicketCart } from '../../context/ticket-cart-context'
import { PurchaseButton } from './purchase-button'

export function StickyPurchaseBar() {
  const { totalTickets } = useTicketCart()

  if (totalTickets === 0) return null

  return (
    <Box
      position="fixed"
      bottom="0"
      left="50%"
      transform="translateX(-50%)"
      w="full"
      maxW="mobile"
      bg="bg.page"
      py="17px"
      px="pageX"
      zIndex={10}
      boxShadow="0 -4px 12px rgba(0,0,0,0.25)"
    >
      <PurchaseButton ticketCount={totalTickets} />
    </Box>
  )
}

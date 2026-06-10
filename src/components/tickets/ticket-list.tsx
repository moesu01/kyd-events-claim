import { VStack } from '@chakra-ui/react'
import type { TicketTier } from '../../types/event'
import { useTicketCart } from '../../context/ticket-cart-context'
import { PromoCodeLink } from './promo-code-link'
import { SoldOutRow } from './sold-out-row'
import { TicketCard } from './ticket-card'

interface TicketListProps {
  tiers: TicketTier[]
}

export function TicketList({ tiers }: TicketListProps) {
  const { quantities, setQuantity } = useTicketCart()

  const activeTiers = tiers.filter((tier) => tier.status !== 'sold_out')
  const soldOutTiers = tiers.filter((tier) => tier.status === 'sold_out')

  return (
    <VStack gap="12px" w="full" px="pageX" py="12px">
      {activeTiers.map((tier) => (
        <TicketCard
          key={tier.id}
          tier={tier}
          quantity={quantities[tier.id] ?? 0}
          onQuantityChange={(qty) => setQuantity(tier.id, qty)}
        />
      ))}

      {soldOutTiers.length > 0 ? (
        <VStack gap="0" w="full">
          {soldOutTiers.map((tier, index) => (
            <SoldOutRow
              key={tier.id}
              name={tier.name}
              isFirst={index === 0}
              isLast={index === soldOutTiers.length - 1}
            />
          ))}
        </VStack>
      ) : null}

      <PromoCodeLink />
    </VStack>
  )
}

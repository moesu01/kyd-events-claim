import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { mockEvent, defaultTicketQuantities } from '../data/mock-event'

interface TicketCartContextValue {
  quantities: Record<string, number>
  setQuantity: (tierId: string, qty: number) => void
  totalTickets: number
  totalPrice: number
}

const TicketCartContext = createContext<TicketCartContextValue | null>(null)

interface TicketCartProviderProps {
  children: ReactNode
  initialQuantities?: Record<string, number>
}

export function TicketCartProvider({
  children,
  initialQuantities = defaultTicketQuantities,
}: TicketCartProviderProps) {
  const [quantities, setQuantities] = useState<Record<string, number>>(initialQuantities)

  const setQuantity = useCallback((tierId: string, qty: number) => {
    const tier = mockEvent.ticketTiers.find((t) => t.id === tierId)
    if (!tier || tier.status !== 'available') return

    const maxQty = tier.maxQuantity ?? 10
    const clampedQty = Math.max(0, Math.min(qty, maxQty))

    setQuantities((prev) => ({
      ...prev,
      [tierId]: clampedQty,
    }))
  }, [])

  const { totalTickets, totalPrice } = useMemo(() => {
    let tickets = 0
    let price = 0

    for (const tier of mockEvent.ticketTiers) {
      const qty = quantities[tier.id] ?? 0
      if (tier.status === 'available' && qty > 0) {
        tickets += qty
        price += tier.price * qty
      }
    }

    return { totalTickets: tickets, totalPrice: price }
  }, [quantities])

  const value = useMemo(
    () => ({
      quantities,
      setQuantity,
      totalTickets,
      totalPrice,
    }),
    [quantities, setQuantity, totalTickets, totalPrice],
  )

  return (
    <TicketCartContext.Provider value={value}>{children}</TicketCartContext.Provider>
  )
}

export function useTicketCart(): TicketCartContextValue {
  const context = useContext(TicketCartContext)
  if (!context) {
    throw new Error('useTicketCart must be used within a TicketCartProvider')
  }
  return context
}

import { Box, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { EventInfoAccordion } from '../components/accordions/event-info-accordion'
import { LineUpAccordion } from '../components/accordions/lineup-accordion'
import { EventMetaRows } from '../components/event/event-meta-rows'
import { EventPoster } from '../components/event/event-poster'
import { EventTitleBlock } from '../components/event/event-title-block'
import { SiteFooter } from '../components/footer/site-footer'
import { AppHeader } from '../components/header/app-header'
import type { MyTicketsDestination } from '../components/header/my-tickets-menu'
import { StickyPurchaseBar } from '../components/tickets/sticky-purchase-bar'
import { TicketsSection } from '../components/tickets/tickets-section'
import { useTicketCart } from '../context/ticket-cart-context'
import { EventAccentProvider } from '../context/event-accent-context'
import { mockEvent } from '../data/mock-event'
import { useDocumentPageBackground } from '../lib/use-document-page-background'
import { useImageAccentColor } from '../lib/use-image-accent-color'

interface EventPageProps {
  onNavigate?: (destination: MyTicketsDestination) => void
}

export function EventPage({ onNavigate }: EventPageProps) {
  const { totalTickets } = useTicketCart()
  const posterUrls = mockEvent.posterUrls ?? [mockEvent.posterUrl]
  const [activePosterIndex, setActivePosterIndex] = useState(0)
  const activePosterUrl = posterUrls[activePosterIndex] ?? mockEvent.posterUrl

  const accentColor = useImageAccentColor(activePosterUrl, mockEvent.accentColor)
  useDocumentPageBackground(accentColor)

  const handleAdvancePoster = () => {
    setActivePosterIndex((index) => (index + 1) % posterUrls.length)
  }

  return (
    <EventAccentProvider accentColor={accentColor}>
      <Box
        color="text.primary"
        minH="100vh"
        maxW="mobile"
        mx="auto"
        w="full"
        position="relative"
        css={{
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
        }}
      >
      <AppHeader ticketCount={totalTickets} onNavigate={onNavigate} />

      <Box as="main" w="full">
        <VStack gap={0} align="stretch" w="full" pt="8px" pb={totalTickets > 0 ? '100px' : undefined}>
          <EventPoster
            posterUrl={activePosterUrl}
            activeSlide={activePosterIndex}
            totalSlides={posterUrls.length}
            onAdvance={handleAdvancePoster}
          />

          <Box pt="18px">
            <EventTitleBlock
              title={mockEvent.title}
              subtitle={mockEvent.subtitle}
              presenter={mockEvent.presenter}
            />
          </Box>

          <EventMetaRows
            date={mockEvent.date}
            timeRange={mockEvent.timeRange}
            venue={mockEvent.venue}
            city={mockEvent.city}
          />

          <Box pt="12px" w="full">
            <TicketsSection />
          </Box>

          <Box mt="10px" w="full">
            <EventInfoAccordion description={mockEvent.description} />
            <LineUpAccordion artists={mockEvent.artists} />
          </Box>

          <Box pt="20px" w="full">
            <SiteFooter />
          </Box>
        </VStack>
      </Box>

      <StickyPurchaseBar />
      </Box>
    </EventAccentProvider>
  )
}

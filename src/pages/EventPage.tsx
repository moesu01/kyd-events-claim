import { Box, VStack } from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { EventInfoAccordion } from '../components/accordions/event-info-accordion'
import { LineUpAccordion } from '../components/accordions/lineup-accordion'
import { EventMetaRows } from '../components/event/event-meta-rows'
import { EventPoster } from '../components/event/event-poster'
import { EventTitleBlock } from '../components/event/event-title-block'
import { SiteFooter } from '../components/footer/site-footer'
import { AppHeader } from '../components/header/app-header'
import { StickyPurchaseBar } from '../components/tickets/sticky-purchase-bar'
import { TicketsSection } from '../components/tickets/tickets-section'
import { useTicketCart } from '../context/ticket-cart-context'
import { EventAccentProvider } from '../context/event-accent-context'
import { mockEvent } from '../data/mock-event'
import { useDocumentPageBackground } from '../lib/use-document-page-background'
import { useImageAccentColor } from '../lib/use-image-accent-color'

export function EventPage() {
  const { totalTickets } = useTicketCart()
  const ticketsSectionRef = useRef<HTMLDivElement>(null)
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
      <Box minH="100vh" w="full" position="relative">
        <Box
          color="text.primary"
          maxW="mobile"
          mx="auto"
          w="full"
          css={{
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
          }}
        >
          <AppHeader ticketCount={totalTickets} />

          <Box as="main" w="full">
            <VStack gap={0} align="stretch" w="full" pt="8px" pb="116px">
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
                showTime={mockEvent.showTime}
                ageRestriction={mockEvent.ageRestriction}
                venue={mockEvent.venue}
                city={mockEvent.city}
              />

              <Box
                ref={ticketsSectionRef}
                pt="12px"
                w="full"
                css={{ scrollMarginBottom: '116px' }}
              >
                <TicketsSection />
              </Box>

              <Box mt="10px" w="full">
                <EventInfoAccordion eventInfo={mockEvent.eventInfo} />
                <LineUpAccordion artists={mockEvent.artists} />
              </Box>

              <Box pt="20px" w="full">
                <SiteFooter />
              </Box>
            </VStack>
          </Box>
        </Box>

        <StickyPurchaseBar ticketsSectionRef={ticketsSectionRef} />
      </Box>
    </EventAccentProvider>
  )
}

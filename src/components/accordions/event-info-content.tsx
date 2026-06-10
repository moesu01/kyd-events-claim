import { Box, Text, VStack, chakra } from '@chakra-ui/react'
import type { EventInfo, EventInfoLink, EventInfoSection } from '../../types/event'

const InfoLink = chakra('a')

const bodyTextProps = {
  fontSize: '12px',
  fontWeight: '400',
  lineHeight: '1.5',
  color: 'text.secondary',
  css: { textWrap: 'pretty' },
} as const

const sectionTitleProps = {
  fontSize: '12px',
  fontWeight: '700',
  lineHeight: '1.4',
  color: 'text.primary',
} as const

const subsectionTitleProps = {
  fontSize: '12px',
  fontWeight: '600',
  lineHeight: '1.4',
  color: 'text.primary',
} as const

interface EventInfoContentProps {
  eventInfo: EventInfo
}

export function EventInfoContent({ eventInfo }: EventInfoContentProps) {
  return (
    <VStack align="stretch" gap="12px" w="full">
      <EventInfoSummary
        headline={eventInfo.headline}
        venueAndDate={eventInfo.venueAndDate}
        schedule={eventInfo.schedule}
      />

      {eventInfo.links.length > 0 ? (
        <VStack align="stretch" gap="6px" as="nav" aria-label="Event links">
          {eventInfo.links.map((link) => (
            <EventInfoExternalLink key={link.href} link={link} />
          ))}
        </VStack>
      ) : null}

      {eventInfo.sections.map((section) => (
        <EventInfoSectionBlock key={section.title} section={section} />
      ))}

      <Text
        {...bodyTextProps}
        pt="8px"
        borderTopWidth="1px"
        borderTopColor="border.subtle"
      >
        {eventInfo.policy}
      </Text>
    </VStack>
  )
}

interface EventInfoSummaryProps {
  headline: string
  venueAndDate: string
  schedule: string
}

function EventInfoSummary({ headline, venueAndDate, schedule }: EventInfoSummaryProps) {
  return (
    <Box>
      <Text
        fontSize="12px"
        fontWeight="600"
        lineHeight="1.4"
        color="text.primary"
        css={{ textWrap: 'balance' }}
      >
        {headline}
      </Text>
      <Text {...bodyTextProps} mt="6px">
        {venueAndDate}
      </Text>
      <Text {...bodyTextProps} mt="4px" fontVariantNumeric="tabular-nums">
        {schedule}
      </Text>
    </Box>
  )
}

interface EventInfoExternalLinkProps {
  link: EventInfoLink
}

function EventInfoExternalLink({ link }: EventInfoExternalLinkProps) {
  return (
    <InfoLink
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      fontSize="12px"
      fontWeight="500"
      lineHeight="1.5"
      color="text.primary"
      textDecoration="underline"
      textUnderlineOffset="2px"
      css={{ textWrap: 'pretty' }}
      _hover={{ opacity: 0.8 }}
    >
      {link.label}
    </InfoLink>
  )
}

interface EventInfoSectionBlockProps {
  section: EventInfoSection
}

function EventInfoSectionBlock({ section }: EventInfoSectionBlockProps) {
  return (
    <Box>
      <Text {...sectionTitleProps}>{section.title}</Text>

      {section.intro ? (
        <Text {...bodyTextProps} mt="6px">
          {section.intro}
        </Text>
      ) : null}

      {section.bullets && section.bullets.length > 0 ? (
        <Box as="ul" mt="6px" pl="16px" css={{ listStyle: 'disc', marginBlockEnd: 0 }}>
          {section.bullets.map((bullet) => (
            <Box as="li" key={bullet} mb="4px" _last={{ mb: 0 }}>
              <Text {...bodyTextProps}>{bullet}</Text>
            </Box>
          ))}
        </Box>
      ) : null}

      {section.subsections?.map((subsection) => (
        <Box key={subsection.title} mt="8px">
          <Text {...subsectionTitleProps}>{subsection.title}</Text>
          <Text {...bodyTextProps} mt="4px">
            {subsection.body}
          </Text>
        </Box>
      ))}
    </Box>
  )
}

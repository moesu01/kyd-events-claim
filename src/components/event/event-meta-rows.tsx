import { CalendarDots, MapPinSimpleArea } from '@phosphor-icons/react'
import { Box, Flex, Separator, Text, VStack } from '@chakra-ui/react'
import type { ReactNode } from 'react'
import { formatEventDateTimeLabel } from '../../lib/format'

interface EventMetaRowsProps {
  date: string
  showTime: string
  ageRestriction: string
  venue: string
  city: string
}

interface MetaRowProps {
  icon: ReactNode
  leftText: string
  rightText: string
  rightTextColor?: string
}

function MetaRow({
  icon,
  leftText,
  rightText,
  rightTextColor = 'rgba(255,255,255,0.75)',
}: MetaRowProps) {
  return (
    <Flex align="center" gap="8px" w="full" px="8px" py="4px" borderRadius="10px">
      <Box display="flex" flexShrink={0}>
        {icon}
      </Box>
      <Flex align="center" justify="space-between" gap="8px" flex={1} minW={0}>
        <Text
          fontSize="13px"
          fontWeight="500"
          lineHeight="1"
          letterSpacing="-0.13px"
          color="text.primary"
          truncate
        >
          {leftText}
        </Text>
        <Text
          fontSize="13px"
          fontWeight="400"
          lineHeight="1"
          letterSpacing="-0.13px"
          color={rightTextColor}
          flexShrink={0}
          whiteSpace="nowrap"
        >
          {rightText}
        </Text>
      </Flex>
    </Flex>
  )
}

export function EventMetaRows({
  date,
  showTime,
  ageRestriction,
  venue,
  city,
}: EventMetaRowsProps) {
  const iconProps = {
    size: 14,
    color: 'currentColor',
    weight: 'regular' as const,
  }

  return (
    <VStack gap="8px" pt="12px" w="full">
      <Separator orientation="horizontal" borderColor="border.subtle" w="full" />

      <MetaRow
        icon={<CalendarDots {...iconProps} aria-hidden />}
        leftText={formatEventDateTimeLabel(date, showTime)}
        rightText={`Ages: ${ageRestriction}`}
        rightTextColor="text.primary"
      />

      <Separator orientation="horizontal" borderColor="border.subtle" w="full" />

      <MetaRow
        icon={<MapPinSimpleArea {...iconProps} aria-hidden />}
        leftText={venue}
        rightText={city}
      />
    </VStack>
  )
}

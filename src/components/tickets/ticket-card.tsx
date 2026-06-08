import { Box, Flex, Text, chakra } from '@chakra-ui/react'
import { useMemo, useState } from 'react'
import { useEventAccent } from '../../context/event-accent-context'
import type { TicketTier } from '../../types/event'
import { formatPrice } from '../../lib/format'
import { getTicketCardBorderShadow } from '../../lib/oklch-color'
import { QuantitySelector } from './quantity-selector'

const WaitlistButton = chakra('button')
const ReadMoreButton = chakra('button')

const READ_MORE_SUFFIX = '... Read more'

const selectedCardBg = '#000000'
const unselectedCardBg = 'rgba(255,255,255,0.01)'

interface TicketCardProps {
  tier: TicketTier
  quantity: number
  onQuantityChange: (qty: number) => void
}

function getExpandedDescription(description: string): string {
  if (!description.includes(READ_MORE_SUFFIX)) return description

  const base = description.replace(READ_MORE_SUFFIX, '').trim()
  return `${base} All ticket holders must be present at the venue. No refunds or exchanges.`
}

export function TicketCard({ tier, quantity, onQuantityChange }: TicketCardProps) {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)
  const { accentColor, mutedTextColor } = useEventAccent()
  const hasReadMore = tier.description.includes(READ_MORE_SUFFIX)
  const displayDescription = isDescriptionExpanded
    ? getExpandedDescription(tier.description)
    : tier.description
  const defaultBorderShadow = useMemo(
    () => getTicketCardBorderShadow(accentColor, false),
    [accentColor],
  )
  const selectedBorderShadow = useMemo(
    () => getTicketCardBorderShadow(accentColor, true),
    [accentColor],
  )

  if (tier.status === 'waitlist') {
    return (
      <Box
        position="relative"
        w="full"
        p="12px"
        borderRadius="8px"
        bg={unselectedCardBg}
        boxShadow={defaultBorderShadow}
        className="t-ticket-card"
      >
        <Flex align="center" justify="space-between" gap="12px" w="full">
          <Box flex={1} minW={0} py="4px">
            <Text fontSize="16px" fontWeight="500" lineHeight="1" color="text.primary">
              {tier.name}
            </Text>
            <Text
              mt="4px"
              fontSize="16px"
              fontWeight="700"
              lineHeight="1"
              color="text.primary"
              fontVariantNumeric="tabular-nums"
            >
              {formatPrice(tier.price)}
            </Text>
          </Box>
          <WaitlistButton
            type="button"
            flexShrink={0}
            px="12px"
            py="10px"
            borderRadius="8px"
            border="1px solid"
            borderColor="border.subtle"
            bg="transparent"
            color="text.primary"
            fontSize="14px"
            fontWeight="700"
            lineHeight="24px"
            cursor="pointer"
            onClick={() => console.log(`Join waitlist: ${tier.id}`)}
            aria-label={`Join waitlist for ${tier.name}`}
            transition="transform 0.15s ease"
            transitionProperty="transform"
            _active={{ transform: 'scale(0.96)' }}
          >
            Join Waitlist
          </WaitlistButton>
        </Flex>
        {tier.description ? (
          <Text
            mt="8px"
            fontSize="11px"
            fontWeight="400"
            lineHeight="1.25"
            color={mutedTextColor}
            whiteSpace="pre-wrap"
          >
            {displayDescription}
          </Text>
        ) : null}
      </Box>
    )
  }

  const isSelected = quantity > 0

  return (
    <Box
      position="relative"
      w="full"
      p="12px"
      borderRadius="8px"
      bg={isSelected ? selectedCardBg : unselectedCardBg}
      boxShadow={isSelected ? selectedBorderShadow : defaultBorderShadow}
      className="t-ticket-card"
    >
      <Flex align="center" justify="space-between" gap="12px" w="full">
        <Box flex={1} minW={0} py="4px">
          <Text fontSize="16px" fontWeight="500" lineHeight="1" color="text.primary">
            {tier.name}
          </Text>
          <Text
            mt="4px"
            fontSize="16px"
            fontWeight="700"
            lineHeight="1"
            color="text.primary"
            fontVariantNumeric="tabular-nums"
          >
            {formatPrice(tier.price)}
          </Text>
        </Box>
        <QuantitySelector
          value={quantity}
          max={tier.maxQuantity ?? 10}
          onChange={onQuantityChange}
          ariaLabel={`Quantity for ${tier.name}`}
          isSelected={isSelected}
        />
      </Flex>
      {tier.description ? (
        <Text
          mt="8px"
          fontSize="11px"
          fontWeight="400"
          lineHeight="1.25"
          color={mutedTextColor}
          whiteSpace="pre-wrap"
        >
          {hasReadMore && !isDescriptionExpanded
            ? displayDescription.replace(READ_MORE_SUFFIX, '')
            : displayDescription}
          {hasReadMore ? (
            <>
              {!isDescriptionExpanded ? '... ' : ' '}
              <ReadMoreButton
                type="button"
                display="inline"
                bg="transparent"
                border="none"
                p={0}
                color="text.primary"
                fontSize="11px"
                fontWeight="400"
                cursor="pointer"
                textDecoration="underline"
                onClick={() => setIsDescriptionExpanded((prev) => !prev)}
                aria-expanded={isDescriptionExpanded}
              >
                {isDescriptionExpanded ? 'Show less' : 'Read more'}
              </ReadMoreButton>
            </>
          ) : null}
        </Text>
      ) : null}
    </Box>
  )
}

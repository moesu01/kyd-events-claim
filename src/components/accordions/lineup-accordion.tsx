import { Star } from '@phosphor-icons/react'
import { Separator, VStack } from '@chakra-ui/react'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import type { Artist } from '../../types/event'
import {
  lineupListVariants,
  lineupReducedListVariants,
  lineupReducedRowVariants,
  lineupReducedViewVariants,
  lineupRowVariants,
  lineupViewVariants,
} from '../../lib/motion-presets'
import { useReducedMotion } from '../../lib/use-reduced-motion'
import { KydAccordionSection } from '../ui/kyd-accordion-section'
import { LineupArtistRow } from './lineup-artist-row'
import { LineupCollapsed } from './lineup-collapsed'

interface LineUpAccordionProps {
  artists: Artist[]
  defaultExpanded?: boolean
}

const ITEM_VALUE = 'lineup'

interface LineupExpandedListProps {
  artists: Artist[]
  listVariants: typeof lineupListVariants
  rowVariants: typeof lineupRowVariants
}

function LineupExpandedList({ artists, listVariants, rowVariants }: LineupExpandedListProps) {
  return (
    <motion.div variants={listVariants} initial="hidden" animate="visible">
      <VStack gap="0" align="stretch" w="full">
        {artists.map((artist, index) => (
          <VStack key={artist.id} gap="0" align="stretch" w="full">
            <motion.div variants={rowVariants}>
              <LineupArtistRow artist={artist} />
            </motion.div>
            {index < artists.length - 1 ? (
              <Separator orientation="horizontal" borderColor="border.subtle" />
            ) : null}
          </VStack>
        ))}
      </VStack>
    </motion.div>
  )
}

export function LineUpAccordion({ artists, defaultExpanded = false }: LineUpAccordionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)
  const prefersReducedMotion = useReducedMotion()

  const viewVariants = prefersReducedMotion ? lineupReducedViewVariants : lineupViewVariants
  const listVariants = prefersReducedMotion ? lineupReducedListVariants : lineupListVariants
  const rowVariants = prefersReducedMotion ? lineupReducedRowVariants : lineupRowVariants

  return (
    <KydAccordionSection
      itemValue={ITEM_VALUE}
      icon={<Star size={18} weight="regular" aria-hidden />}
      title="Line-up"
      open={isExpanded}
      onOpenChange={setIsExpanded}
      previewMode
    >
      <AnimatePresence initial={false} mode="wait">
        {isExpanded ? (
          <motion.div
            key="expanded"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={viewVariants}
          >
            <LineupExpandedList
              artists={artists}
              listVariants={listVariants}
              rowVariants={rowVariants}
            />
          </motion.div>
        ) : (
          <motion.div
            key="collapsed"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={viewVariants}
          >
            <LineupCollapsed artists={artists} />
          </motion.div>
        )}
      </AnimatePresence>
    </KydAccordionSection>
  )
}

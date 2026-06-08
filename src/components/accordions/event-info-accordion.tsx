import { Info } from '@phosphor-icons/react'
import { Text } from '@chakra-ui/react'
import { useLayoutEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../../lib/use-reduced-motion'
import { KydAccordionSection } from '../ui/kyd-accordion-section'

interface EventInfoAccordionProps {
  description: string
  defaultExpanded?: boolean
}

const ITEM_VALUE = 'event-info'

const TEXT_FONT_SIZE_PX = 12
const TEXT_LINE_HEIGHT = 1.5
const PREVIEW_LINES = 3
const COLLAPSED_HEIGHT = TEXT_FONT_SIZE_PX * TEXT_LINE_HEIGHT * PREVIEW_LINES

const textProps = {
  fontSize: '12px',
  fontWeight: '400',
  lineHeight: '1.5',
  color: 'text.secondary',
} as const

export function EventInfoAccordion({
  description,
  defaultExpanded = false,
}: EventInfoAccordionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)
  const [fullHeight, setFullHeight] = useState(COLLAPSED_HEIGHT)
  const contentRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useLayoutEffect(() => {
    const element = contentRef.current
    if (!element) return

    const updateHeight = () => setFullHeight(element.scrollHeight)

    updateHeight()
    const observer = new ResizeObserver(updateHeight)
    observer.observe(element)
    return () => observer.disconnect()
  }, [description])

  const height = isExpanded ? fullHeight : COLLAPSED_HEIGHT

  return (
    <KydAccordionSection
      itemValue={ITEM_VALUE}
      icon={<Info size={18} weight="regular" aria-hidden />}
      title="Event Info"
      open={isExpanded}
      onOpenChange={setIsExpanded}
      previewMode
    >
      <div
        className={prefersReducedMotion ? undefined : 't-resize'}
        style={{
          overflow: 'hidden',
          height: prefersReducedMotion && isExpanded ? 'auto' : height,
        }}
      >
        <div ref={contentRef}>
          <Text {...textProps}>{description}</Text>
        </div>
      </div>
    </KydAccordionSection>
  )
}

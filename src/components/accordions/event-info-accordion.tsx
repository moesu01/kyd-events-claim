import { Info } from '@phosphor-icons/react'
import { useLayoutEffect, useRef, useState } from 'react'
import type { EventInfo } from '../../types/event'
import { useReducedMotion } from '../../lib/use-reduced-motion'
import { EventInfoContent } from './event-info-content'
import { KydAccordionSection } from '../ui/kyd-accordion-section'

interface EventInfoAccordionProps {
  eventInfo: EventInfo
  defaultExpanded?: boolean
}

const ITEM_VALUE = 'event-info'

const TEXT_FONT_SIZE_PX = 14
const TEXT_LINE_HEIGHT = 1.5
const PREVIEW_LINES = 3
const COLLAPSED_HEIGHT = TEXT_FONT_SIZE_PX * TEXT_LINE_HEIGHT * PREVIEW_LINES

export function EventInfoAccordion({
  eventInfo,
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
  }, [eventInfo])

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
          <EventInfoContent eventInfo={eventInfo} />
        </div>
      </div>
    </KydAccordionSection>
  )
}

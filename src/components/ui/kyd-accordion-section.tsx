import { Accordion } from '@base-ui/react/accordion'
import { CaretDown } from '@phosphor-icons/react'
import { Box, Flex, Text, chakra } from '@chakra-ui/react'
import type { ReactNode } from 'react'
import { mergeClassNames } from '../../lib/merge-class-names'

interface KydAccordionSectionProps {
  itemValue: string
  icon: ReactNode
  title: string
  open: boolean
  onOpenChange: (open: boolean) => void
  children: ReactNode
  keepMounted?: boolean
  /** Keeps panel visible when collapsed (e.g. Event Info 3-line preview). */
  previewMode?: boolean
}

export function KydAccordionSection({
  itemValue,
  icon,
  title,
  open,
  onOpenChange,
  children,
  keepMounted = true,
  previewMode = false,
}: KydAccordionSectionProps) {
  const accordionValue = previewMode || open ? [itemValue] : []

  return (
    <Box w="full" borderTopWidth="1px" borderTopColor="border.subtle">
      <Accordion.Root
        value={accordionValue}
        onValueChange={(nextValue) => {
          if (previewMode) {
            onOpenChange(!open)
            return
          }
          onOpenChange(nextValue.includes(itemValue))
        }}
        keepMounted={keepMounted}
      >
        <Accordion.Item value={itemValue}>
          <Accordion.Header>
            <Accordion.Trigger
              render={(props) => (
                <chakra.button
                  type="button"
                  display="flex"
                  alignItems="center"
                  w="full"
                  px="pageX"
                  py="13px"
                  bg="transparent"
                  border="none"
                  cursor="pointer"
                  color="text.primary"
                  {...props}
                  aria-expanded={open}
                  transition="transform 0.15s ease"
                  transitionProperty="transform"
                  _active={{ transform: 'scale(0.96)' }}
                >
                  <Flex align="center" justify="space-between" w="full" gap="8px">
                    <Flex align="center" gap="8px" minW={0}>
                      {icon}
                      <Text fontSize="14px" fontWeight="700" lineHeight="1.3">
                        {title}
                      </Text>
                    </Flex>
                    <CaretDown
                      size={16}
                      weight="bold"
                      aria-hidden
                      className="kyd-accordion-caret"
                      data-open={open ? '' : undefined}
                    />
                  </Flex>
                </chakra.button>
              )}
            />
          </Accordion.Header>
          <Accordion.Panel
            keepMounted={keepMounted}
            hiddenUntilFound={false}
            render={(props) => (
              <chakra.div
                {...props}
                px="pageX"
                pb="13px"
                style={{ ...props.style }}
                className={mergeClassNames(
                  previewMode ? undefined : 'kyd-accordion-panel t-resize',
                  props.className,
                )}
              />
            )}
          >
            {children}
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion.Root>
    </Box>
  )
}

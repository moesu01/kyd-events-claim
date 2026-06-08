import { Flex, chakra } from '@chakra-ui/react'
import { useRef, type ClipboardEvent } from 'react'

const DigitInput = chakra('input')

interface ClaimOtpInputProps {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  onComplete?: (value: string) => void
  length?: number
}

export function ClaimOtpInput({
  id,
  label,
  value,
  onChange,
  onComplete,
  length = 4,
}: ClaimOtpInputProps) {
  const inputRefs = useRef<Array<HTMLInputElement | null>>([])
  const digits = Array.from({ length }, (_, index) => value[index] ?? '')

  const focusInput = (index: number) => {
    inputRefs.current[index]?.focus()
  }

  const updateValue = (nextDigits: string[]) => {
    const nextValue = nextDigits.join('').slice(0, length)
    onChange(nextValue)

    if (nextValue.length === length) {
      onComplete?.(nextValue)
    }

    return nextValue
  }

  const handleDigitChange = (index: number, nextChar: string) => {
    const sanitized = nextChar.replace(/\D/g, '')
    const nextDigits = [...digits]

    if (!sanitized) {
      nextDigits[index] = ''
      updateValue(nextDigits)
      return
    }

    const char = sanitized[sanitized.length - 1]
    nextDigits[index] = char
    const nextValue = updateValue(nextDigits)

    if (index < length - 1) {
      focusInput(index + 1)
      return
    }

    if (nextValue.length === length) {
      inputRefs.current[index]?.blur()
    }
  }

  const handleKeyDown = (index: number, key: string) => {
    if (key !== 'Backspace') return
    if (digits[index]) return

    if (index > 0) {
      const nextDigits = [...digits]
      nextDigits[index - 1] = ''
      updateValue(nextDigits)
      focusInput(index - 1)
    }
  }

  const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault()
    const pasted = event.clipboardData.getData('text').replace(/\D/g, '').slice(0, length)
    if (!pasted) return

    onChange(pasted)
    const focusIndex = Math.min(pasted.length, length - 1)
    focusInput(focusIndex)

    if (pasted.length === length) {
      onComplete?.(pasted)
    }
  }

  return (
    <Flex direction="column" gap="8px" w="full" textAlign="left">
      <chakra.label
        htmlFor={`${id}-0`}
        fontSize="14px"
        fontWeight="500"
        lineHeight="1.4"
        color="text.primary"
      >
        {label}
      </chakra.label>

      <Flex gap="8px" justify="center" w="full" aria-label={label}>
        {digits.map((digit, index) => (
          <DigitInput
            key={`${id}-${index}`}
            id={index === 0 ? `${id}-0` : undefined}
            ref={(element: HTMLInputElement | null) => {
              inputRefs.current[index] = element
            }}
            type="text"
            inputMode="numeric"
            autoComplete={index === 0 ? 'one-time-code' : 'off'}
            value={digit}
            maxLength={1}
            onChange={(event) => handleDigitChange(index, event.target.value)}
            onKeyDown={(event) => handleKeyDown(index, event.key)}
            onPaste={handlePaste}
            onFocus={(event) => event.target.select()}
            w="56px"
            h="56px"
            borderRadius="8px"
            border="1px solid"
            borderColor="border.subtle"
            bg="rgba(255,255,255,0.05)"
            color="text.primary"
            fontSize="20px"
            fontWeight="600"
            lineHeight="1"
            textAlign="center"
            fontVariantNumeric="tabular-nums"
            _focusVisible={{
              outline: '2px solid',
              outlineColor: 'rgba(255,255,255,0.4)',
              outlineOffset: '1px',
            }}
          />
        ))}
      </Flex>
    </Flex>
  )
}

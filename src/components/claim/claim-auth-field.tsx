import { Box, chakra } from '@chakra-ui/react'

const AuthInput = chakra('input')
const FieldLabel = chakra('label')

interface ClaimAuthFieldProps {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  inputMode?: 'tel' | 'numeric' | 'text'
  autoComplete?: string
  maxLength?: number
}

export function ClaimAuthField({
  id,
  label,
  value,
  onChange,
  placeholder,
  inputMode = 'text',
  autoComplete,
  maxLength,
}: ClaimAuthFieldProps) {
  return (
    <Box w="full" textAlign="left">
      <FieldLabel
        htmlFor={id}
        display="block"
        fontSize="14px"
        fontWeight="500"
        lineHeight="1.4"
        color="text.primary"
        mb="8px"
      >
        {label}
      </FieldLabel>
      <AuthInput
        id={id}
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        inputMode={inputMode}
        autoComplete={autoComplete}
        maxLength={maxLength}
        w="full"
        h="48px"
        px="14px"
        borderRadius="8px"
        border="1px solid"
        borderColor="border.subtle"
        bg="rgba(255,255,255,0.05)"
        color="text.primary"
        fontSize="16px"
        fontWeight="400"
        lineHeight="1.2"
        _placeholder={{ color: 'rgba(255,255,255,0.35)' }}
        _focusVisible={{
          outline: '2px solid',
          outlineColor: 'rgba(255,255,255,0.4)',
          outlineOffset: '1px',
        }}
      />
    </Box>
  )
}

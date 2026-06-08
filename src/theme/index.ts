import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'
import { getEventPageBackground } from '../lib/event-page-background'

const config = defineConfig({
  theme: {
    tokens: {
      fonts: {
        body: { value: "'Inter', sans-serif" },
        heading: { value: "'Inter', sans-serif" },
      },
      radii: {
        card: { value: '12px' },
        pill: { value: '9999px' },
      },
      spacing: {
        pageX: { value: '12px' },
      },
      sizes: {
        mobile: { value: '375px' },
      },
    },
    semanticTokens: {
      colors: {
        bg: {
          page: { value: '#0a1219' },
          surface: { value: 'rgba(255,255,255,0.05)' },
        },
        border: {
          subtle: { value: 'rgba(255,255,255,0.2)' },
        },
        text: {
          primary: { value: '#ffffff' },
          secondary: { value: 'rgba(255,255,255,0.6)' },
        },
        cta: {
          bg: { value: '#ffffff' },
          fg: { value: '#0a1219' },
        },
      },
    },
  },
  globalCss: {
    'html, body, #root': {
      margin: 0,
      padding: 0,
      minHeight: '100vh',
      background: getEventPageBackground(),
      backgroundAttachment: 'fixed',
      color: 'text.primary',
      fontFamily: 'body',
    },
  },
})

export const system = createSystem(defaultConfig, config)

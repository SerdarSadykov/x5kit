import { TypographyTokenGroup } from './types'

const base = {
  fontFamily: '"X5 Sans UI", Roboto, Arial, Helvetica, sans-serif',
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
}

export const typography: TypographyTokenGroup = {
  base,
  h1: {
    ...base,
    fontSize: '36px',
    lineHeight: '44px',
    fontWeight: '400',
    letterSpacing: '-0.2px',
  },
  h2: {
    ...base,
    fontSize: '28px',
    lineHeight: '36px',
    fontWeight: '500',
    letterSpacing: '0',
  },
  h3: {
    ...base,
    fontSize: '20px',
    lineHeight: '24px',
    fontWeight: '500',
    letterSpacing: '0.12px',
  },
  h4: {
    ...base,
    fontSize: '16px',
    lineHeight: '20px',
    fontWeight: '500',
    letterSpacing: '0.12px',
  },
  h5: {
    ...base,
    fontSize: '14px',
    lineHeight: '16px',
    fontWeight: '500',
    letterSpacing: '0.08px',
  },
  h6: {
    ...base,
    fontSize: '12px',
    lineHeight: '16px',
    fontWeight: '500',
    letterSpacing: '1.2px',
    textTransform: 'uppercase',
  },
  p1: {
    ...base,
    fontSize: '16px',
    lineHeight: '24px',
    fontWeight: '400',
    letterSpacing: '0.12px',
  },
  p1compact: {
    ...base,
    fontSize: '16px',
    lineHeight: '20px',
    fontWeight: '400',
    letterSpacing: '0.12px',
  },
  p2: {
    ...base,
    fontSize: '14px',
    lineHeight: '16px',
    fontWeight: '400',
    letterSpacing: '0.08px',
  },
  p3: {
    ...base,
    fontSize: '12px',
    lineHeight: '16px',
    fontWeight: '400',
    letterSpacing: '0.08px',
  },
} as const

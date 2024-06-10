import {SizeTokenValue} from 'tokens/sizes';
import { ShadowTokenGroup } from './types'

const small = '0px 0px 8px rgba(80, 86, 94, 0.08), 0px 1px 2px rgba(80, 86, 94, 0.32)'
const medium =
  '0px 6px 10px rgba(80, 86, 94, 0.02), 0px 2px 18px rgba(80, 86, 94, 0.12), 0px 4px 5px rgba(80, 86, 94, 0.12)'
const large =
  '0px 24px 38px rgba(80, 86, 94, 0.04), 0px 9px 46px rgba(80, 86, 94, 0.04), 0px 11px 15px rgba(80, 86, 94, 0.1)'

export const shadows: ShadowTokenGroup = {
  [SizeTokenValue.Small]: small,
  [SizeTokenValue.Medium]: medium,
  [SizeTokenValue.Large]: large,
} as const

// TODO: убрать варнинги в 10, 20, 100 в следующей версии
function warn(prev: unknown, next: unknown) {
  console.warn(
    `%c Warning %c theme.shadows[${prev}] is deprecated; use theme.shadows.${next}`,
    'color: red; font-weight: bold;',
    'color: #282828;',
  )
}

const descriptor = (value: number) => ({
  get() {
    const normalizedValue = parseInt(value as unknown as string)

    if (normalizedValue === 10) {
      warn(10, 'small')
      return small
    }

    if (normalizedValue === 20) {
      warn(20, 'medium')
      return medium
    }

    if (normalizedValue === 100) {
      warn(100, 'large')
      return large
    }
  },
})

Object.defineProperty(shadows, 10, descriptor(10))
Object.defineProperty(shadows, 20, descriptor(20))
Object.defineProperty(shadows, 100, descriptor(100))

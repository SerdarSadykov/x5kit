import { SelectChipProps, SelectAdornmentProps } from './types'
import { inputSizes } from '../Input'
import { PREFIX, restyled, doSelectors } from '../styles'
import { inputSelectors } from '../Input/styles'
import styled from '@emotion/styled';

export const selectClasses = {
  input: `${PREFIX}-select-input`,
} as const

export const selectChipClasses = {
  count: `${PREFIX}-select-chip-count`,
  close: `${PREFIX}-select-chip-close`,
} as const

export const selectHintClasses = {
  close: `${PREFIX}-select-hint-close`,
  icon: `${PREFIX}-select-hint-icon`,
  content: `${PREFIX}-select-hint-content`,
} as const

export const selectAdornmentClasses = {
  clear: `${PREFIX}-select-adornment-clear`,
} as const

export const selectMenuClasses = {
  root: `${PREFIX}-select-menu-root`,
  label: `${PREFIX}-select-menu-label`,
  header: `${PREFIX}-select-menu-header`,
  footer: `${PREFIX}-select-menu-footer`,
} as const

const selectAdornmentSelectors = doSelectors(selectAdornmentClasses)
const selectMenuSelectors = doSelectors(selectMenuClasses)


export const StyledSelectMenu = restyled.div<{ isTree: boolean }>(
  ({ theme: { colors, spaces, typography }, isTree }) => ({
    [selectMenuSelectors.root]: {
      listStyle: 'none',
      overflowY: 'auto',
      margin: 0,
      paddingBottom: isTree ? spaces.x4 : null,
      maxHeight: 224, // 32 * 7
      color: colors.grey[100],
      ':focus': {
        outline: 'none',
      },
    },
    [selectMenuSelectors.label]: {
      padding: spaces.join('x4', 'x6', 'x2'),
      color: colors.grey['70'],
      ...typography.h6,
    },
    [selectMenuSelectors.header]: {
      padding: spaces.join('x2', 'x6', 'x6'),
      borderBottom: `1px solid ${colors.grey[20]}`,
    },
    [selectMenuSelectors.footer]: {
      padding: spaces.join('x6', 'x6', 'x2', 'x6'),
      borderTop: `1px solid ${colors.grey[20]}`,
    },
  }),
)

export const StyledSelectAdornment = restyled.div<Partial<SelectAdornmentProps>>(({ theme: { spaces, colors } }) => ({
  display: 'flex',
  alignItems: 'center',
  [selectAdornmentSelectors.clear]: {
    marginRight: spaces.x1,
    padding: spaces.x2,
    borderRadius: spaces.x2,
    cursor: 'pointer',
    ':hover': {
      backgroundColor: colors.grey[20],
    },
    ':hover:active': {
      backgroundColor: colors.grey[40],
    },
  },
}))


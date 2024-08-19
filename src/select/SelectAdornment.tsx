import React, { FC } from 'react'
import { ArrowUp as ArrowUpIcon, ArrowDown as ArrowDownIcon, Close as CloseIcon } from '@x5-react-uikit/icons'
import { sizeTokenValues } from '@x5-react-uikit/tokens'
import { SelectAdornmentProps } from './types'
import { StyledSelectAdornment, selectAdornmentClasses } from './styles'

export const DoubleAdornment: FC<SelectAdornmentProps> = ({ clearable, opened, ...props }) => {
  const AdornmentIcon = opened ? ArrowUpIcon : ArrowDownIcon
  return (
    <StyledSelectAdornment>
      {clearable && <CloseIcon className={selectAdornmentClasses.clear} aria-label="close" {...props} />}
      <AdornmentIcon size={sizeTokenValues.small} />
    </StyledSelectAdornment>
  )
}

export default DoubleAdornment

import styled from '@emotion/styled';
import {Loader} from 'loader';

import {SizeTokenValue, theme} from 'theme';
import {Close} from 'icons';

import {InputInternalProps, InputStyles} from '../types';

export const InputButton = styled.button<Pick<InputStyles, 'isSmall' | 'isDisabled'>>`
  flex-shrink: 0;
  padding: 0;
  margin-right: -4px;
  border: 0;
  outline: none;
  background: none;
  cursor: pointer;
  border-radius: 4px;
  line-height: 0;

  :hover {
    background-color: ${theme.colors.grey[20]};
  }

  :active {
    background-color: ${theme.colors.grey[30]};
  }

  ${props => {
    const size = props.isSmall ? 16 : 32;
    const color = theme.colors.grey[props.isDisabled ? 40 : 60];
    const pointerEvents = props.isDisabled ? 'none' : undefined;

    return {color, pointerEvents, width: size, height: size};
  }}
`;

export const EndAdornment: React.FC<InputInternalProps> = props => {
  const {
    endAdornment,
    onClearClick,
    style: {isDisabled, isReadOnly, isSmall, isLoading, isFilled},
  } = props;

  const iconSize = isSmall ? SizeTokenValue.Small : SizeTokenValue.Medium;

  if (isLoading) {
    return (
      <>
        <Loader size={iconSize} />
        {endAdornment}
      </>
    );
  }

  if (!isDisabled && !isReadOnly && isFilled && onClearClick) {
    return (
      <>
        <InputButton onClick={onClearClick} isSmall={isSmall}>
          <Close size={iconSize} />
        </InputButton>
        {endAdornment}
      </>
    );
  }

  return endAdornment;
};

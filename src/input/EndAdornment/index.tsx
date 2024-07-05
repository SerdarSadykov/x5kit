import styled from '@emotion/styled';
import {Loader} from 'loader';

import {SizeTokenValue, theme} from 'theme';
import {Close} from 'icons';

import {InputProps, MaskedInputProps} from '../types';

const Button = styled.button<Pick<InputProps, 'size'>>`
  padding: 0;
  margin-right: -4px;
  border: 0;
  outline: none;
  background: none;
  cursor: pointer;
  border-radius: 4px;
  color: ${theme.colors.grey[60]};

  &:hover {
    background-color: ${theme.colors.grey[20]};
  }

  &:active {
    background-color: ${theme.colors.grey[30]};
  }

  ${props => {
    const size = props.size === SizeTokenValue.Small ? 16 : 32;

    return {width: size, height: size};
  }}
`;

export const EndAdornment: React.FC<InputProps | MaskedInputProps> = props => {
  const {endAdornment, loading, filled, onClearClick} = props;

  const size = props.size === SizeTokenValue.Small ? SizeTokenValue.Small : SizeTokenValue.Medium;

  if (endAdornment) {
    return endAdornment;
  }

  if (loading) {
    return <Loader size={size} />;
  }

  if (filled && onClearClick) {
    return (
      <Button size={props.size} onClick={onClearClick}>
        <Close size={size} />
      </Button>
    );
  }

  return null;
};

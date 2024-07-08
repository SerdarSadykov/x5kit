import styled from '@emotion/styled';
import {Loader} from 'loader';

import {SizeTokenValue, theme} from 'theme';
import {Close} from 'icons';

import {InputInternalProps, InputStyles} from '../types';

const Button = styled.button<Pick<InputStyles, 'isSmall'>>`
  flex-shrink: 0;
  padding: 0;
  margin-right: -4px;
  border: 0;
  outline: none;
  background: none;
  cursor: pointer;
  border-radius: 4px;
  line-height: 0;
  color: ${theme.colors.grey[60]};

  &:hover {
    background-color: ${theme.colors.grey[20]};
  }

  &:active {
    background-color: ${theme.colors.grey[30]};
  }

  ${props => {
    const size = props.isSmall ? 16 : 32;

    return {width: size, height: size};
  }}
`;

export const EndAdornment: React.FC<InputInternalProps> = props => {
  const {
    endAdornment,
    onClearClick,
    style: {isSmall, isLoading, isFilled},
  } = props;

  const iconSize = isSmall ? SizeTokenValue.Small : SizeTokenValue.Medium;

  if (endAdornment) {
    return endAdornment;
  }

  if (isLoading) {
    return <Loader size={iconSize} />;
  }

  if (isFilled && onClearClick) {
    return (
      <Button onClick={onClearClick} isSmall={isSmall}>
        <Close size={iconSize} />
      </Button>
    );
  }

  return null;
};

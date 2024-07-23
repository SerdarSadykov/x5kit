import {MouseEventHandler} from 'react';
import styled from '@emotion/styled';

import {SizeTokenValue, theme} from 'theme';
import {Close} from 'icons';

import {ChipProps} from '../types';

export const Button = styled.button`
  flex-shrink: 0;
  padding: 0;
  border: 0;
  outline: none;
  background: none;
  cursor: pointer;
  border-radius: 4px;
  line-height: 0;
  color: ${theme.colors.grey[60]};

  :hover {
    color: ${theme.colors.grey[80]};
  }

  :active {
    color: ${theme.colors.grey[60]};
  }
`;

export const EndAdornment: React.FC<ChipProps> = ({endAdornment, onDelete}) => {
  if (onDelete) {
    const onClick: MouseEventHandler = e => {
      e.stopPropagation();
      onDelete();
    };

    return (
      <>
        {endAdornment}
        <Button onClickCapture={onClick}>
          <Close size={SizeTokenValue.Small} />
        </Button>
      </>
    );
  }

  return endAdornment;
};

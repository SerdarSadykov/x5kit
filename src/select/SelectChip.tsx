import {forwardRef} from 'react';
import styled from '@emotion/styled';

import {Close} from 'icons';
import {SizeTokenValue, theme} from 'theme';

import {SelectProps} from './types';

export type SelectChipProps = {count: number} & Pick<SelectProps, 'size' | 'disabled' | 'onClearClick'>;

const Container = styled.div<Partial<SelectChipProps>>`
  position: absolute;
  display: flex;
  padding: 2px;
  border-radius: 2px;
  align-items: center;

  div {
  }

  button {
    width: 16px;
    height: 16px;
    padding: 0;
    box-sizing: border-box;
    outline: none;
    border: 0;
    background-color: transparent;
    cursor: pointer;
  }

  ${({disabled}) => {
    return {
      ...theme.typography.p2,

      backgroundColor: theme.colors.grey[disabled ? 20 : 70],
      color: disabled ? theme.colors.grey[40] : theme.colors.white,
    };
  }}
`;

export const SelectChip = forwardRef<HTMLDivElement, SelectChipProps>((props, ref) => {
  const {count, size, disabled, onClearClick} = props;

  if (!count) {
    return null;
  }

  return (
    <Container ref={ref} size={size} disabled={disabled}>
      <div>{count}</div>

      <button type="button" onClick={onClearClick}>
        <Close size={SizeTokenValue.Small} />
      </button>
    </Container>
  );
});

export default SelectChip;

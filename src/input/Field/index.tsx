import {useEffect, useRef} from 'react';
import styled from '@emotion/styled';
import {MaskInput} from 'maska';

import {theme} from 'theme';

import type {InputInternalProps, InputStyles} from '../types';

const InputComponent = styled.input<InputStyles>`
  position: relative;
  width: 100%;
  box-sizing: border-box;
  padding: 0;
  outline: none;
  border: none;
  font-size: ${theme.spaces.x8}px;
  line-height: ${theme.spaces.x12}px;
  letter-spacing: 0.12px;

  ${({isSmall, isFocused, isFilled, isLabeled}) => ({
    minHeight: isSmall ? 32 : 48,
    paddingTop: isFilled && isLabeled && !isSmall ? 14 : 0,
    textOverflow: !isFocused ? 'ellipsis' : undefined,
  })}
`;

const Placeholder = styled.div<InputStyles>`
  position: absolute;
  left: 0;
  top: 0;
  pointer-events: none;
  user-select: none;
  background-color: transparent;
  font-size: ${theme.spaces.x8}px;
  letter-spacing: 0.12px;
  white-space: pre-wrap;
  color: ${theme.colors.grey[60]};
  box-sizing: border-box;

  div:first-child {
    visibility: hidden;
  }

  ${({isSmall, isFilled, isFocused, isLabeled}) => ({
    display: isFocused || isFilled  ? 'flex' : 'none',
    paddingTop: isLabeled && isFilled && !isSmall ? 8 : 0,
    height: isSmall ? 32 : 48,
    lineHeight: isSmall ? '32px' : '48px',
  })}
`;

const MaskedField: React.FC<InputInternalProps> = props => {
  const {mask, value, onChange, style, inputProps} = props;

  const maska = useRef<MaskInput>();

  const ref = (target: HTMLInputElement) => {
    if (maska.current) {
      return;
    }

    maska.current = new MaskInput(target, {eager: true, ...mask});
  };

  useEffect(() => {
    return () => {
      maska.current?.destroy();
      maska.current = undefined;
    };
  }, []);

  const placeHolder = typeof mask.mask === 'string' && (
    <Placeholder {...style}>
      <div>{value}</div>
      <div>{mask.mask.substring(value?.length ?? 0)}</div>
    </Placeholder>
  );

  return (
    <>
      <InputComponent onInput={onChange} ref={ref} {...inputProps} {...style} />
      {placeHolder}
    </>
  );
};

export const Field: React.FC<InputInternalProps> = props => {
  const {inputProps, style, onChange} = props;

  if (style.isMasked) {
    return <MaskedField {...props} />;
  }

  return <InputComponent onChange={onChange} {...style} {...inputProps} />;
};

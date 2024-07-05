import {useEffect, useRef} from 'react';
import styled from '@emotion/styled';
import {MaskInput} from 'maska';

import {SizeTokenValue, theme} from 'theme';

import type {InputProps} from '../types';

const InputComponent = styled.input<InputProps>`
  position: relative;
  width: 100%;
  box-sizing: border-box;
  padding: 0;
  outline: none;
  border: none;
  font-size: ${theme.spaces.x8}px;
  line-height: ${theme.spaces.x12}px;
  letter-spacing: 0.12px;

  ${({size, filled, label}) => ({
    minHeight: size === SizeTokenValue.Small ? 32 : 48,
    paddingTop: filled && !!label && size !== SizeTokenValue.Small ? 14 : 0,
  })}
`;

const Placeholder = styled.div<InputProps>`
  position: absolute;
  display: ${props => props.filled || props.focused ? 'flex' : 'none'};
  left: 0;
  top: 0;
  pointer-events: none;
  user-select: none;
  background-color: transparent;
  font-size: ${theme.spaces.x8}px;
  letter-spacing: 0.12px;
  white-space: pre-wrap;
  color: ${theme.colors.grey[60]};

  div:first-child {
    visibility: hidden;
  }

  ${({size, filled, label}) => ({
    lineHeight: filled && !!label && size !== SizeTokenValue.Small ? '34px' : '32px',
    paddingTop: filled && !!label && size !== SizeTokenValue.Small ? 14 : 0,
  })}
`;

export const Field: React.FC<InputProps> = props => {
  return <InputComponent {...props} />;
};

export const MaskedField: React.FC<InputProps & Required<Pick<InputProps, 'mask'>>> = props => {
  const {mask, value, onChange} = props;

  const maska = useRef<MaskInput>();

  const ref = (target: HTMLInputElement) => {
    if (maska.current) {
      return;
    }

    maska.current = new MaskInput(target, {eager: true, ...mask,});
  };

  useEffect(() => {
    return () => {
      maska.current?.destroy();
      maska.current = undefined;
    };
  }, []);

  const placeHolder =
    typeof mask.mask !== 'string' ? null : (
      <Placeholder {...props}>
        <div>{value}</div>
        <div>{mask.mask.substring(value?.length ?? 0)}</div>
      </Placeholder>
    );

  return (
    <>
      <InputComponent onInput={onChange} {...props} ref={ref} />
      {placeHolder}
    </>
  );
};

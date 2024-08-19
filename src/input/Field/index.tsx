import {useEffect, useRef} from 'react';
import styled from '@emotion/styled';
import {MaskInput} from 'maska';

import {theme} from 'theme';

import type {InputInternalProps, InputStyles} from '../types';

export const FieldComponent = styled.input<InputStyles>`
  position: relative;
  width: 100%;
  box-sizing: border-box;
  padding: 0;
  outline: none;
  border: none;

  ${theme.typography.p1}

  ::selection {
    background-color: ${theme.colors.accent[10]};
  }

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
  white-space: pre-wrap;
  color: ${theme.colors.grey[60]};
  box-sizing: border-box;

  ${theme.typography.p1}

  div:first-child {
    visibility: hidden;
  }

  ${({isSmall, isFilled, isFocused, isLabeled}) => ({
    display: isFocused || isFilled ? 'flex' : 'none',
    paddingTop: isLabeled && isFilled && !isSmall ? 8 : 0,
    height: isSmall ? 32 : 48,
    lineHeight: isSmall ? '32px' : '48px',
  })}
`;

const MaskedField: React.FC<InputInternalProps> = props => {
  const {mask, value, style, inputProps} = props;

  const maska = useRef<MaskInput>();

  const ref = (target: HTMLInputElement) => {
    if (maska.current) {
      return;
    }

    maska.current = new MaskInput(target, {eager: true, ...mask});

    inputProps?.ref?.(target);
  };

  useEffect(() => {
    return () => {
      maska.current?.destroy();
      maska.current = undefined;
    };
  }, []);

  const placeHolder = typeof mask?.mask === 'string' && (
    <Placeholder {...style}>
      <div>{value}</div>
      <div>{mask.mask.substring(value?.length ?? 0)}</div>
    </Placeholder>
  );

  const componentProsp = {
    ...inputProps,
    ...style,

    ref,
    value,
    type: props.type,
    onInput: props.onChange,
  };

  return (
    <>
      <FieldComponent {...componentProsp} />
      {placeHolder}
    </>
  );
};

export const Field: React.FC<InputInternalProps> = props => {
  if (props.style.isMasked) {
    return <MaskedField {...props} />;
  }

  const componentProsp = {
    ...props.inputProps,
    ...props.style,

    value: props.value,
    type: props.type,
    onInput: props.onChange,
  };

  return <FieldComponent {...componentProsp} />;
};

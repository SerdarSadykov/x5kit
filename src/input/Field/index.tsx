import {useEffect, useRef, useState} from 'react';
import styled from '@emotion/styled';
import {MaskInput} from 'maska';

import {theme} from 'theme';
import {Tooltip} from 'tooltip';

import type {InputInternalProps, InputStyles} from '../types';

export const FieldComponent = styled.input<InputStyles>`
  position: relative;
  width: 100%;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  outline: none;
  border: none;
  background-color: transparent;
  vertical-align: top;

  ${theme.typography.p1}

  ::selection {
    background-color: ${theme.colors.accent[10]};
  }

  ${({isSmall, isFocused, isFilled, isDisabled, isLabeled, isReadOnly}) => ({
    minHeight: isSmall ? 32 : 48,
    paddingTop: isFilled && isLabeled && !isSmall ? 14 : 0,
    textOverflow: !isFocused ? 'ellipsis' : undefined,
    cursor: isReadOnly ? 'default' : undefined,
    color: theme.colors.grey[isDisabled ? 40 : 100],
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

  const componentProps = {
    ...inputProps,
    ...style,

    type: props.type,
    onInput: props.onChange,
  };

  return (
    <>
      <FieldComponent ref={ref} {...componentProps} />
      {placeHolder}
    </>
  );
};

const BasicField: React.FC<InputInternalProps> = props => {
  const {value, style, inputProps} = props;

  const [isOverflown, setIsOverflown] = useState<boolean>(false);
  const ref = useRef<HTMLInputElement>(null);

  const componentProps = {
    ...inputProps,
    ...style,
  };

  const child = <FieldComponent ref={ref} {...componentProps} />;

  useEffect(() => {
    if (!style.isOverflowTooltip || !ref.current) {
      return;
    }

    setIsOverflown(ref.current.scrollWidth > ref.current.clientWidth);
  }, [value, style.isOverflowTooltip]);

  if (!style.isOverflowTooltip) {
    return child;
  }

  const noTooltip = style.isFocused || !isOverflown ? false : undefined;

  return (
    <Tooltip isPortal isOpen={noTooltip} content={value}>
      {child}
    </Tooltip>
  );
};

export const Field: React.FC<InputInternalProps> = props => {
  const Component = props.style.isMasked ? MaskedField : BasicField;

  return <Component {...props} />;
};

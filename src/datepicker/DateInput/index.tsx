import React, {
  ChangeEventHandler,
  FocusEventHandler,
  InputHTMLAttributes,
  KeyboardEventHandler,
  useRef,
  useState,
} from 'react';
import {isValid, parse} from 'date-fns';

import {Calendar} from 'icons';
import {SizeTokenValue, theme} from 'theme';
import {Input, InputButton, InputInternalProps, InputProps, InputStyles} from 'input';

import {DatepickerProps} from '../types';
import styled from '@emotion/styled';

export type TDateInput = DatepickerProps & {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const DATE_FORMAT = 'dd.mm.yyyy';
const DATE_LABEL = 'дд.мм.гггг';

const Value = styled.div<InputStyles>`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
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

type ValueItemProps = {
  isCurrent: boolean;
  isFilled: boolean;
};

const ValueItem = styled.span<ValueItemProps>`
  color: ${props => theme.colors.grey[props.isFilled ? 100 : 60]};

  span {
    background-color: ${props => (props.isCurrent ? theme.colors.accent[10] : 'transparent')};
  }
`;

const HiddenInput = styled.input`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
  border: 0;
  outline: none;
  opacity: 0;
`;

const InputComponent: React.FC<InputInternalProps> = props => {
  const [viewValue, setViewValue] = useState<string[]>(['', '', '']);
  const [inputValue, setInputValue] = useState<string>('');

  const [step, setStep] = useState<number>();

  const onFocus: FocusEventHandler<HTMLInputElement> = e => {
    props.inputProps?.onFocus?.(e);

    setStep(0);
  };

  const onBlur: FocusEventHandler<HTMLInputElement> = e => {
    props.inputProps?.onFocus?.(e);

    setStep(undefined);
    setInputValue('');
  };

  const onKeyDown: KeyboardEventHandler = ({key}) => {
    if (key === 'ArrowLeft' && step && step > 0) {
      setStep(step - 1);
      return;
    }

    if (key === 'ArrowRight' && step && step < 2) {
      setStep(step + 1);
      return;
    }
  };

  const onInput: ChangeEventHandler<HTMLInputElement> = ({target}) => {
    const newValue = target.value.replace(/[^\d]+/, '');

    const newViewValue = viewValue ? [...viewValue] : ['', '', ''];
    newViewValue[step ?? 0] = newValue;

    setViewValue(newViewValue);

    if ((step === 0 || step === 1) && newValue.length >= 2) {
      setInputValue('');
      setStep(step + 1);
      return;
    }

    if (step === 2 && newValue.length >= 4) {
      setInputValue('');
      return;
    }

    setInputValue(target.value);
  };

  const componentProsp: InputHTMLAttributes<HTMLInputElement> = {
    ...props.inputProps,

    onInput,
    onKeyDown,
    onFocus,
    onBlur,

    value: inputValue,
  };

  const items = viewValue.map((item, indx) => {
    let textContent = '';

    switch (indx) {
      case 0:
        textContent = item.padEnd(2, 'д');
        break;

      case 1:
        textContent = item.padEnd(2, 'м');
        break;

      case 2:
        textContent = item.padEnd(4, 'г');
        break;
    }

    return (
      <ValueItem key={indx} isFilled={!!item} isCurrent={step === indx}>
        <span>{textContent}</span>
        {indx === 2 ? '' : '.'}
      </ValueItem>
    );
  });

  return (
    <>
      <Value {...props.style}>{items}</Value>
      <HiddenInput {...componentProsp} />
    </>
  );
};

export const DateInput: React.FC<TDateInput> = props => {
  const {size, isOpen, setIsOpen} = props;

  const onInputChange: InputProps['onChange'] = ({target}) => {
    // const date = parse(target.value, DATE_FORMAT, new Date());
    // if (isValid(date)) {
    //   onChange(date);
    // }
  };

  const endAdornment = (
    <InputButton isSmall={size === SizeTokenValue.Small} onClick={() => setIsOpen(!isOpen)}>
      <Calendar size={size} color={theme.colors.grey[60]} />
    </InputButton>
  );

  const inputProps: InputProps = {
    ...props,

    endAdornment,
    value: '',
    onChange: onInputChange,

    inputComponent: InputComponent,
    filled: true,
  };

  return <Input {...inputProps} />;
};

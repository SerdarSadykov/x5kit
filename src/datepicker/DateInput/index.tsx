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
  white-space: pre;
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

const useInputComponent = (dates: number, props: InputInternalProps) => {
  const [viewValue, setViewValue] = useState<string[]>(() => Array(dates * 3).fill(''));
  const [inputValue, setInputValue] = useState<string>('');

  const [step, setStepValue] = useState<number>(-1);

  const setStep = (newStep: number) => {
    const maxStep = dates * 3 - 1;

    if (newStep < 0) {
      newStep = 0;
    } else if (newStep >= maxStep) {
      newStep = maxStep;
    }

    setStepValue(newStep);
  };

  const onFocus: FocusEventHandler<HTMLInputElement> = e => {
    props.inputProps?.onFocus?.(e);

    setStepValue(0);
  };

  const onBlur: FocusEventHandler<HTMLInputElement> = e => {
    props.inputProps?.onFocus?.(e);

    setStepValue(-1);
    setInputValue('');
  };

  const onKeyDown: KeyboardEventHandler = ({key}) => {
    if (key === 'ArrowLeft' && step > 0) {
      setStep(step - 1);
      return;
    }

    if (key === 'ArrowRight') {
      setStep(step + 1);
      return;
    }

    if (key === 'Backspace' && !inputValue) {
      const newViewValue = [...viewValue];

      if (viewValue[step]) {
        newViewValue[step] = '';
      } else {
        newViewValue[step ? step - 1 : 0] = '';
      }

      setViewValue(newViewValue);
      setStep(step - 1);

      return;
    }

    if (key === 'Escape') {
      (window.document.activeElement as HTMLInputElement)?.blur();
    }
  };

  const onChange: ChangeEventHandler<HTMLInputElement> = ({target}) => {
    const newValue = target.value.replace(/[^\d]+/, '');

    const newViewValue = [...viewValue];
    newViewValue[step] = newValue;

    setViewValue(newViewValue);

    const isStepEnd = newValue.length >= (step === 2 || step === 5 ? 4 : 2);

    if (isStepEnd) {
      setInputValue('');
      setStep(step + 1);
      return;
    }

    setInputValue(target.value);
  };

  const componentProsp: InputHTMLAttributes<HTMLInputElement> = {
    ...props.inputProps,

    onChange,
    onKeyDown,
    onFocus,
    onBlur,

    value: inputValue,
  };

  const items = viewValue.map((item, indx) => {
    let textContent = '';
    let isYear = false;

    switch (indx) {
      case 0:
      case 3:
        textContent = item.padEnd(2, 'д');
        break;

      case 1:
      case 4:
        textContent = item.padEnd(2, 'м');
        break;

      default:
        textContent = item.padEnd(4, 'г');
        isYear = true;
        break;
    }

    return (
      <ValueItem key={indx} isFilled={!!item} isCurrent={step === indx}>
        {indx === 3 ? ' — ' : undefined}
        <span>{textContent}</span>
        {!isYear ? '.' : undefined}
      </ValueItem>
    );
  });

  return {componentProsp, items};
};

const InputComponent: React.FC<InputInternalProps> = props => {
  const {items, componentProsp} = useInputComponent(1, props);

  return (
    <>
      <Value {...props.style}>{items}</Value>
      <HiddenInput {...componentProsp} />
    </>
  );
};

const RangeInputComponent: React.FC<InputInternalProps> = props => {
  const {items, componentProsp} = useInputComponent(2, props);

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

    inputComponent: RangeInputComponent,
    filled: true,
  };

  return <Input {...inputProps} />;
};

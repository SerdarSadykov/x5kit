import {useContext} from 'react';
import styled from '@emotion/styled';

import {Calendar} from 'icons';
import {SizeTokenValue, theme} from 'theme';

import {Input, InputButton, Label} from 'input';
import {DatepickerContext} from 'datepicker';

import {useInputComponent} from './utils';

import type {InputInternalProps, InputProps, InputStyles} from 'input';

const Container = styled.div`
  position: relative;
  flex-grow: 1;
  height: 100%;
`;

const Value = styled.div<InputStyles>`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 0;
  outline: none;
  border: none;

  ${theme.typography.p1}

  ${({isSmall, isFocused, isFilled, isLabeled}) => ({
    opacity: !isLabeled || isFocused || isFilled ? 1 : 0,
    minHeight: isSmall ? 32 : 48,
    paddingTop: isLabeled && !isSmall ? 14 : 0,
    textOverflow: !isFocused ? 'ellipsis' : undefined,
  })}
`;

const ValueItem = styled.span<{isCurrent: boolean; isFilled: boolean}>`
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

const InputComponent: React.FC<InputInternalProps> = props => {
  const {inputProps, style} = props;

  const {step, componentProps, segments} = useInputComponent(inputProps);

  const items = segments.map(({label, end, value}, indx) => {
    const textContent = value.padEnd(label.length, label[0]);

    return (
      <ValueItem key={indx} isFilled={!!value} isCurrent={step === indx}>
        <span>{textContent}</span>
        {end}
      </ValueItem>
    );
  });

  return (
    <Container>
      <Label {...props} style={{...style, isFilled: style.isFocused || style.isFilled}} />
      <Value {...style}>{items}</Value>
      <HiddenInput {...componentProps} />
    </Container>
  );
};

export const DateInput: React.FC = () => {
  const context = useContext(DatepickerContext);
  const {isOpen, setIsOpen, size, value, disabled, readOnly, floating, endAdornment: parentEndAdornment} = context;

  const endAdornment = (
    <>
      {parentEndAdornment}
      <InputButton
        isDisabled={disabled || readOnly}
        isSmall={size === SizeTokenValue.Small}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Calendar size={size} />
      </InputButton>
    </>
  );

  const inputProps: InputProps = {
    ...context,

    endAdornment,
    inputComponent: InputComponent,

    value: value[0] || value[1] ? 'filled' : '',
    onChange: () => {},

    containerRef: floating.refs.setReference,
  };

  return <Input {...inputProps} />;
};

import {useContext} from 'react';
import styled from '@emotion/styled';

import {Calendar} from 'icons';
import {SizeTokenValue, theme} from 'theme';
import {Input, InputButton, InputInternalProps, InputProps, InputStyles, Label} from 'input';
import {DatepickerContext} from 'datepicker';

import {useInputComponent} from './utils';

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
    opacity: !isLabeled || isFocused || isFilled ? 1 : 0,
    minHeight: isSmall ? 32 : 48,
    paddingTop: isLabeled && !isSmall ? 14 : 0,
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

const inputComponent: React.FC<InputInternalProps> = props => {
  const {inputProps, style} = props;

  const {step, componentProps, segments} = useInputComponent(inputProps);

  const items = segments.map((item, indx) => {
    const textContent = item.value.padEnd(item.label.length, item.label[0]);

    return (
      <ValueItem key={indx} isFilled={!!item} isCurrent={step === indx}>
        <span>{textContent}</span>
        {item.end}
      </ValueItem>
    );
  });

  return (
    <>
      <Label {...props} style={{...style, isFilled: style.isFocused || style.isFilled}} />
      <Value {...style}>{items}</Value>
      <HiddenInput {...componentProps} />
    </>
  );
};

export const DateInput: React.FC = () => {
  const context = useContext(DatepickerContext);
  const {isOpen, setIsOpen, size, value} = context;

  const endAdornment = (
    <InputButton isSmall={size === SizeTokenValue.Small} onClick={() => setIsOpen(!isOpen)}>
      <Calendar size={size} color={theme.colors.grey[60]} />
    </InputButton>
  );

  const inputProps: InputProps = {
    ...context,

    inputComponent,
    endAdornment,

    value: value[0] || value[1] ? 'filled' : '',
    onChange: () => {},
  };

  return <Input {...inputProps} />;
};

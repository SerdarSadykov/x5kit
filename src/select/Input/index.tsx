import {forwardRef, ReactNode, useContext, useEffect, useState} from 'react';
import styled from '@emotion/styled';

import {SizeTokenValue, theme} from 'theme';
import {Close} from 'icons';
import {Chip, ChipVariant} from 'chip';
import {Input as BaseInput, InputProps, Label, FieldComponent as BaseFieldComponent} from 'input';

import {SelectContext} from '../Select';
import {SelectOption} from '../types';

import {useInput} from './hook';
import {findOptions} from './utils';

const Container = styled.div`
  position: relative;
  flex-grow: 1;
  height: 100%;

  input:read-only {
    cursor: default;
  }
`;

const FieldComponent = styled(BaseFieldComponent)`
  display: flex;
  align-items: center;
  gap: 4px;
  flex-wrap: wrap;
  padding: ${props => (props.isFilled && props.isLabeled && !props.isSmall ? '20px 0 4px' : 0)};
`;

const InputComponent = styled.input`
  width: 0;
  min-width: 30px;
  margin: 0;
  padding: 0;
  flex-grow: 1;
  border: none;
  outline: none;
  background-color: transparent;

  ${theme.typography.p1}
`;

const ChipContainer = styled.div<Pick<InputProps, 'disabled' | 'readOnly'>>`
  display: flex;
  padding: 2px;
  border-radius: 2px;
  align-items: center;

  div {
    padding: 0 4px;
  }

  button {
    width: 16px;
    height: 16px;
    padding: 0;
    box-sizing: border-box;
    outline: none;
    border: 0;
    border-radius: 1px;
    cursor: pointer;
    color: ${theme.colors.grey[40]};
    background-color: transparent;

    :hover {
      background-color: ${theme.colors.grey[60]};
    }
  }

  ${props => {
    const disabled = props.disabled || props.readOnly;

    return {
      ...theme.typography.p2,

      color: disabled ? theme.colors.grey[40] : theme.colors.white,
      backgroundColor: theme.colors.grey[disabled ? 20 : 70],
      pointerEvents: disabled ? 'none' : undefined,
    };
  }}
`;

const InputChips: InputProps['inputComponent'] = props => {
  const {value, options, onClear, showChips, onChange} = useContext(SelectContext);
  const [labels, setLabels] = useState<SelectOption[]>([]);

  let child: ReactNode;

  if (showChips) {
    child = labels.map(option => {
      const onDelete = () => {
        onChange(value.filter(item => item !== option.value));
      };

      return (
        <Chip key={option.value} variant={ChipVariant.filled} size={SizeTokenValue.Small} onDelete={onDelete}>
          {option.label}
        </Chip>
      );
    });
  } else if (value.length) {
    child = (
      <ChipContainer disabled={props.disabled}>
        <div>{value.length}</div>

        <button type="button" onClick={onClear}>
          <Close size={SizeTokenValue.Small} />
        </button>
      </ChipContainer>
    );
  }

  const inputProps = {
    ...props.inputProps,

    value: props.value,
    type: props.type,
    onInput: props.onChange,
  };

  useEffect(() => {
    if (showChips) {
      setLabels(findOptions(options.all, value));
    }
  }, [value]);

  return (
    <Container>
      <Label {...props} />
      <FieldComponent as="div" {...props.style}>
        {child}
        <InputComponent {...inputProps} />
      </FieldComponent>
    </Container>
  );
};

export const Input = forwardRef<HTMLInputElement, Omit<InputProps, 'value' | 'onChange'>>((props, ref) => {
  const {inputProps, multiple} = useInput(props, ref);

  const inputComponent = multiple ? InputChips : undefined;

  return <BaseInput inputComponent={inputComponent} {...inputProps} />;
});

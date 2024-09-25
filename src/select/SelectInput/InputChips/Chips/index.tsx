import styled from '@emotion/styled';
import {InputProps} from 'input';
import React, {useContext, useEffect, useState} from 'react';

import {Close} from 'icons';
import {SizeTokenValue, theme} from 'theme';
import {Chip, ChipProps, ChipVariant} from 'chip';

import {SelectContext} from 'select/Select';
import {findOptions} from 'select/utils';
import {SelectOption} from 'select/types';

const ChipContainer = styled.div<Pick<InputProps, 'disabled'>>`
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
    if (props.disabled) {
      return {
        ...theme.typography.p2,

        color: theme.colors.grey[40],
        backgroundColor: theme.colors.grey[20],
        pointerEvents: 'none',
      };
    }

    return {
      ...theme.typography.p2,

      color: theme.colors.white,
      backgroundColor: theme.colors.grey[70],
    };
  }}
`;

const ChipsMultiple: React.FC = () => {
  const {value, options, onChange, disabled, readOnly, showChips = 1} = useContext(SelectContext);
  const [labels, setLabels] = useState<SelectOption[]>([]);

  const chipProps: ChipProps = {
    variant: ChipVariant.filled,
    size: SizeTokenValue.Small,
    disabled: disabled || readOnly,
  };

  const child = labels.slice(0, showChips).map(option => {
    const onDelete = () => {
      onChange(value.filter(item => item !== option.value));
    };

    return (
      <Chip key={option.value} onDelete={onDelete} {...chipProps}>
        {option.label}
      </Chip>
    );
  });

  if (labels.length > showChips) {
    child.push(
      <Chip key="rest" {...chipProps}>
        {`+${labels.length - showChips}`}
      </Chip>
    );
  }

  useEffect(() => {
    setLabels(findOptions(options, value));
  }, [value]);

  return child;
};

export const Chips: React.FC = () => {
  const {value, onClear, showChips, disabled, readOnly} = useContext(SelectContext);

  if (!value.length) {
    return null;
  }

  if (showChips && showChips > 0) {
    return <ChipsMultiple />;
  }

  return (
    <ChipContainer disabled={disabled || readOnly}>
      <div>{value.length}</div>

      <button type="button" onClick={onClear}>
        <Close size={SizeTokenValue.Small} />
      </button>
    </ChipContainer>
  );
};

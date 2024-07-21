import type {Meta} from '@storybook/react';

import {Done} from 'icons';

import {Chip as BaseChip} from './Chip';
import {ChipProps, ChipVariant} from './types';
import styled from '@emotion/styled';
import {SizeTokenValue, theme} from 'theme';

const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;

  &::after {
    content: '';
    display: block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: ${theme.colors.yellow[50]};
  }
`;

export const Chip: React.FC<ChipProps> = props => {
  const startAdornment = props.startAdornment ? <Icon /> : undefined;
  const endAdornment = props.endAdornment ? <Done size={SizeTokenValue.Small} /> : undefined;

  const resultProps = {
    ...props,

    startAdornment,
    endAdornment,
  };

  return <BaseChip {...resultProps} />;
};

const meta = {
  title: 'Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
  },

  argTypes: {
    label: {
      type: 'string',
      control: 'text',
      description: 'Контент',
    },

    whiteSpace: {
      type: 'string',
      control: 'select',
      options: ['pre', 'pre-wrap', 'pre-line'],
    },

    size: {
      type: 'SizeTokenValue' as never,
      control: 'select',
      options: [SizeTokenValue.Small, SizeTokenValue.Medium],
      description: 'Размер',
    },

    variant: {
      type: 'ChipVariant' as never,
      control: 'select',
      options: [ChipVariant.filled, ChipVariant.outlined],
      description: 'Вариант',
    },

    checked: {
      type: 'boolean',
      control: 'boolean',
    },


    error: {
      type: 'boolean',
      control: 'boolean',
    },

    startAdornment: {
      type: 'boolean',
      control: 'boolean',
    },

    endAdornment: {
      type: 'boolean',
      control: 'boolean',
    },
  },
  args: {},
} satisfies Meta<typeof Chip>;

export default meta;

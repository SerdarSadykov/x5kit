import type {Meta} from '@storybook/react';
import styled from '@emotion/styled';

import {SizeTokenValue, theme} from 'theme';
import {Done} from 'icons';

import {Chip as BaseChip} from './Chip';
import {ChipProps, ChipVariant} from './types';

const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;

  ::after {
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

  const onClick = props.onClick ? () => alert('onClick') : undefined;
  const onDelete = props.onDelete ? () => alert('onDelete') : undefined;
  const maxLengthFunc = props.maxLengthFunc ? (label: string) => label.slice(0, 3) + '...' + label.slice(7) : undefined;

  const resultProps = {
    ...props,

    onClick,
    onDelete,
    maxLengthFunc,
    startAdornment,
    endAdornment,
  };

  return (
    <div style={{display: 'flex', gap: 16}}>
      <BaseChip {...resultProps} />
      <BaseChip {...resultProps} label={undefined}>
        Подробнее <a href="#">Сссылк</a>
      </BaseChip>
    </div>
  );
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

    tooltip: {
      type: 'string',
      control: 'text',
      description: 'Tooltip',
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

    maxWidth: {
      type: 'number',
      control: 'number',
    },

    maxLength: {
      type: 'number',
      control: 'number',
    },

    maxLengthFunc: {
      type: '(label: string) => string' as never,
      control: 'boolean',
      description: 'Контроль длины',
    },

    checked: {
      type: 'boolean',
      control: 'boolean',
    },

    disabled: {
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

    onClick: {
      type: 'MouseEventHandler<HTMLDivElement>' as never,
      control: 'boolean',
    },

    onDelete: {
      type: '() => void' as never,
      control: 'boolean',
    },

    qa: {type: 'string', control: 'text'},
  },
  args: {
    label: 'Label',
    maxLength: 25,
  },
} satisfies Meta<typeof Chip>;

export default meta;

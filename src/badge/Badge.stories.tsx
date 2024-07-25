import type {ArgTypes, Meta} from '@storybook/react';

import {SizeTokenValue, theme} from 'theme';
import {ShoppingCart} from 'icons';

import {Badge as BaseBadge} from './Badge';
import {BadgeProps, BadgeVariant} from './types';

export const Badge: React.FC<BadgeProps> = props => (
  <div style={{position: 'relative', color: theme.colors.grey[60]}}>
    <ShoppingCart />
    <div style={{position: 'absolute', top: -6, left: 12}}>
      <BaseBadge {...props} />
    </div>
  </div>
);

const commonArgTypes: ArgTypes = {
  variant: {
    type: 'BadgeType' as never,
    control: 'select',
    options: [BadgeVariant.red, BadgeVariant.accent, BadgeVariant.grey, BadgeVariant.disabled],
    description: 'Вариант',
  },

  hasStroke: {
    type: 'boolean',
    control: 'boolean',
    description: 'Обводка',
  },

  backgroundColor: {
    type: 'string',
    control: 'color',
    description: 'Цвет фона',
  },

  borderColor: {
    type: 'string',
    control: 'color',
    description: 'Цвет границы',
  },

  qa: {type: 'string', control: 'text'},
};

const meta = {
  commonArgTypes,

  title: 'Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },

  argTypes: {
    children: {
      type: 'string',
      control: 'text',
      description: 'Контент',
    },

    size: {
      type: 'SizeTokenValue' as never,
      control: 'select',
      options: [SizeTokenValue.Small, SizeTokenValue.Medium, SizeTokenValue.Large],
      description: 'Размер',
    },

    color: {
      type: 'string',
      control: 'color',
      description: 'Цвет текста',
    },

    ...commonArgTypes,
  },
  args: {
    children: '999+',
    hasStroke: true,
    size: SizeTokenValue.Medium,
    borderColor: theme.colors.grey[5],
  },
} as Meta<typeof Badge>;

export default meta;

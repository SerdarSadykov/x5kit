import type {Meta} from '@storybook/react';

import {SizeTokenValue, theme} from 'theme';

import {Badge as BaseBadge} from './Badge';
import {BadgeProps, BadgeVariant} from './types';
import {ShoppingCart} from 'icons';

export const Badge: React.FC<BadgeProps> = props => {
  const resultProps = {
    ...props,
  };

  return (
    <div style={{position: 'relative', color: theme.colors.grey[60]}}>
      <ShoppingCart />
      <div style={{position: 'absolute', top: -6, left: 12}}>
        <BaseBadge {...resultProps} />
      </div>
    </div>
  );
};

const meta = {
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

    color: {
      type: 'string',
      control: 'color',
      description: 'Цвет текста',
    },

    backgroundColor: {
      type: 'string',
      control: 'color',
      description: 'Цвет фона',
    },

    borderColor: {
      type: 'string',
      control: 'color',
      description: 'Цвет фона',
    },
  },
  args: {
    children: '999+',
    hasStroke: true,
    size: SizeTokenValue.Medium,
    borderColor: theme.colors.grey[5],
  },
} satisfies Meta<typeof Badge>;

export default meta;

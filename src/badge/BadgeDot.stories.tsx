import type {Meta} from '@storybook/react';

import {theme} from 'theme';
import {ShoppingCart} from 'icons';

import {BadgeDot as BaseBadgeDot} from './BadgeDot';
import badgeStory from './Badge.stories';
import {BadgeDotSize, BadgeDotProps} from './types';

export const BadgeDot: React.FC<BadgeDotProps> = props => (
  <div style={{position: 'relative', color: theme.colors.grey[60]}}>
    <ShoppingCart />
    <div style={{position: 'absolute', top: 0, right: 0}}>
      <BaseBadgeDot {...props} />
    </div>
  </div>
);

const meta = {
  title: 'BadgeDot',
  component: BadgeDot,
  parameters: {
    layout: 'centered',
  },

  argTypes: {
    ...badgeStory['commonArgTypes'],

    size: {
      type: 'BadgeDotSize' as never,
      control: 'select',
      options: [BadgeDotSize.l, BadgeDotSize.m, BadgeDotSize.s, BadgeDotSize.xs],
      description: 'Размер',
    },
  },
  args: {
    hasStroke: true,
    size: BadgeDotSize.l,
    borderColor: theme.colors.grey[5],
  },
} satisfies Meta<typeof BadgeDot>;

export default meta;

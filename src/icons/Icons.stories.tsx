import type {Meta} from '@storybook/react';

import {colors, SizeTokenValue} from 'theme';

import * as components from './components';
import type {IconProps} from './types';

export const Icons = (props: IconProps) => {
  const childs = Object.entries(components).map(([key, Component]) => {
    if (key === 'SVG') {
      return null;
    }

    return (
      <div key={key} style={{border: '1px solid #ccc', padding: 10, textAlign: 'center'}}>
        <div>
          <Component {...props} />
        </div>
        <div>{key}</div>
      </div>
    );
  });

  return <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10}}>{childs}</div>;
};

const meta = {
  title: 'Icons',
  component: Icons,
  parameters: {
    layout: 'centered',
  },

  argTypes: {
    size: {
      type: 'SizeTokenValue' as never,
      control: 'select',
      options: [
        SizeTokenValue.XXSmall,
        SizeTokenValue.XSmall,
        SizeTokenValue.Small,
        SizeTokenValue.Medium,
        SizeTokenValue.Large,
        SizeTokenValue.XLarge,
      ],
      description: 'Размер',
    },

    color: {
      type: 'string',
      control: 'color',
    },
  },
  args: {
    size: SizeTokenValue.Large,
    color: colors.grey[80],
  },
} satisfies Meta<typeof Icons>;

export default meta;

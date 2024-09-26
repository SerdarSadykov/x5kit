import type {Meta} from '@storybook/react';

import {SizeTokenValue, theme} from 'theme';

import {Loader as BaseLoader} from './Loader';
import {LoaderBlock as BaseLoaderBlock} from './LoaderBlock';
import {LoaderBlockProps, LoaderProps} from './types';

export const Loader: React.FC<LoaderProps> = props => {
  return (
    <div style={{position: 'relative', color: theme.colors.grey[60]}}>
      <BaseLoader {...props} />
    </div>
  );
};

export const LoaderBlock: React.FC<LoaderBlockProps> = props => {
  return (
    <div style={{position: 'relative', color: theme.colors.grey[60]}}>
      <BaseLoaderBlock {...props} />
    </div>
  );
};

const meta = {
  title: 'Loader',
  component: Loader,
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

    qa: {type: 'string', control: 'text'},
  },
  args: {
    children: 'Пояснительный текст...',
  },
} as Meta<typeof Loader>;

export default meta;

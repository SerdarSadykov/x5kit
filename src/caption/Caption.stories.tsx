import type {Meta} from '@storybook/react';

import {Caption as BaseCaption} from './Caption';
import {CaptionProps} from './types';

export const Caption = (props: CaptionProps) => <BaseCaption {...props} />;

const meta = {
  title: 'Caption',
  component: BaseCaption,
  parameters: {
    layout: 'centered',
  },

  argTypes: {
    children: {
      type: 'ReactNode' as never,
      control: 'text',
    },
  },
  args: {
    children:
      'Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмысленного текста рыбы на русском языке, а начинающему оратору отточить навык публичных выступлений в домашних условиях',

  },
} satisfies Meta<typeof BaseCaption>;

export default meta;

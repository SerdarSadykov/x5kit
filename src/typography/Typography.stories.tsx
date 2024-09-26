import type {Meta} from '@storybook/react';

import {theme} from 'theme';

import {Typography as BaseTypography, TypographyProps} from './Typography';

export const Typography = (props: TypographyProps) => <BaseTypography {...props} />;

const meta = {
  title: 'Typography',
  component: BaseTypography,
  parameters: {
    layout: 'centered',
  },

  argTypes: {
    children: {
      type: 'ReactNode' as never,
      control: 'text',
    },

    variant: {
      type: 'string' as never,
      control: 'select',
      options: Object.keys(theme.typography) as TypographyProps['variant'][],
      description: 'Вариант шрифта',
    },

    as: {
      type: 'ElementType' as never,
      control: 'text',
    },
  },
  args: {
    children:
      'Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмысленного текста рыбы на русском языке, а начинающему оратору отточить навык публичных выступлений в домашних условиях',
    variant: 'p1',
  },
} satisfies Meta<typeof BaseTypography>;

export default meta;

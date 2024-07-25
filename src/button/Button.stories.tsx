import {CSSProperties} from 'react';
import type {ArgTypes, Meta} from '@storybook/react';

import {SizeTokenValue} from 'theme';
import {ChevronDown, Done} from 'icons';

import {Button as BaseButton, buttonVariantStyle} from './Button';
import {ButtonProps, ButtonVariant} from './types';

type ButtonStoryProps = {
  color: string;
  backgroundColor: string;
  borderColor: string;
} & ButtonProps;

export const Button: React.FC<ButtonStoryProps> = ({
  color,
  backgroundColor,
  borderColor,

  variant = ButtonVariant.primary,
  ...props
}) => {
  const startAdornment = props.startAdornment ? <Done size={SizeTokenValue.Small} /> : undefined;
  const endAdornment = props.endAdornment ? <ChevronDown size={SizeTokenValue.Small} /> : undefined;
  const onClick = props.onClick ? () => alert('onClick') : undefined;

  const resultProps = {
    ...props,

    startAdornment,
    endAdornment,
    onClick,
    variant,

    style: {...buttonVariantStyle[variant]},
  };

  if (color) {
    resultProps.style.default.color = color;
  }

  if (backgroundColor) {
    resultProps.style.default.backgroundColor = backgroundColor;
  }

  if (borderColor) {
    resultProps.style.default.borderColor = borderColor;
  }

  return <BaseButton {...resultProps} />;
};

const commonArgTypes: ArgTypes = {
  tooltip: {
    type: 'string',
    control: 'text',
    description: 'Tooltip',
  },

  variant: {
    type: 'ButtonVariant' as never,
    control: 'select',
    options: [
      ButtonVariant.primary,
      ButtonVariant.secondary,
      ButtonVariant.outlined,
      ButtonVariant.text,
      ButtonVariant.dangerPrimary,
      ButtonVariant.dangerSecondary,
      ButtonVariant.dangerOutlined,
      ButtonVariant.dangerText,
      ButtonVariant.inner,
      ButtonVariant.innerInput,
    ],
    description: 'Вариант',
  },

  size: {
    type: 'SizeTokenValue' as never,
    control: 'select',
    options: [
      SizeTokenValue.Large,
      SizeTokenValue.Medium,
      SizeTokenValue.Small,
      SizeTokenValue.XSmall,
      SizeTokenValue.XXSmall,
    ],
    description: 'Размер',
  },

  as: {
    type: 'React.ElementType' as never,
    control: 'select',
    options: ['button', 'a'],
    description: 'Элемент',
  },

  href: {
    type: 'string',
    control: 'text',
    description: 'Ссылка',
  },

  target: {
    type: 'HTMLAttributeAnchorTarget' as never,
    control: 'select',
    options: ['_self', '_blank'],
    description: 'Target',
  },

  disabled: {
    type: 'boolean',
    control: 'boolean',
  },

  loading: {
    type: 'boolean',
    control: 'boolean',
  },

  width: {
    type: 'string',
    control: 'text',
    description: 'Ширина',
  },

  fontSize: {
    type: 'string',
    control: 'text',
  },

  lineHeight: {
    type: 'string',
    control: 'text',
  },

  justifyContent: {
    type: 'string',
    control: 'select',
    options: ['flex-start', 'flex-end', 'center', 'space-between'] as CSSProperties['justifyContent'][],
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
    description: 'Цвет границы',
  },

  onClick: {
    type: 'MouseEventHandler<HTMLButtonElement>' as never,
    control: 'boolean',
  },
};

const meta = {
  commonArgTypes,

  title: 'Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },

  argTypes: {
    ...commonArgTypes,

    children: {
      type: 'string',
      control: 'text',
      description: 'Контент',
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
  args: {
    children: 'Кнопка',
  },
} as Meta<typeof Button>;

export default meta;

import type {Meta} from '@storybook/react';

import {SizeTokenValue} from 'theme';
import {EditOn} from 'icons';

import {IconButton as BaseIconButton, buttonVariantStyle} from './Button';
import ButtonStory from './Button.stories';
import {IconButtonProps, ButtonVariant} from './types';

type IconButtonStoryProps = {
  color: string;
  backgroundColor: string;
  borderColor: string;
} & IconButtonProps;

export const IconButton: React.FC<IconButtonStoryProps> = ({
  color,
  backgroundColor,
  borderColor,

  variant = ButtonVariant.primary,
  ...props
}) => {
  const onClick = props.onClick ? () => alert('onClick') : undefined;

  const resultProps = {
    ...props,

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

  return (
    <BaseIconButton {...resultProps}>
      <EditOn size={props.size === SizeTokenValue.Small ? SizeTokenValue.Small : SizeTokenValue.Medium} />
    </BaseIconButton>
  );
};

const meta = {
  title: 'IconButton',
  component: IconButton,
  parameters: {
    layout: 'centered',
  },

  argTypes: {
    ...ButtonStory['commonArgTypes'],
  },
  args: {},
} as Meta<typeof IconButton>;

export default meta;

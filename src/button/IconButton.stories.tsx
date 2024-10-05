import type {Meta} from '@storybook/react';

import {SizeTokenValue} from 'theme';
import {EditOn} from 'icons';

import {IconButton as BaseIconButton, variantBehavior} from './Button';
import ButtonStory from './Button.stories';
import type {IconButtonProps} from './types';
import {ButtonVariant} from './types';

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

    behavior: {...variantBehavior[variant]},
  };

  if (color) {
    resultProps.behavior.default.color = color;
  }

  if (backgroundColor) {
    resultProps.behavior.default.backgroundColor = backgroundColor;
  }

  if (borderColor) {
    resultProps.behavior.default.borderColor = borderColor;
  }

  return (
    <BaseIconButton {...resultProps}>
      <EditOn size={props.size === SizeTokenValue.Large ? SizeTokenValue.Medium : props.size} />
    </BaseIconButton>
  );
};

const meta = {
  title: 'Button',
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

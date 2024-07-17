import {useState} from 'react';
import type {Meta} from '@storybook/react';

import {SizeTokenValue} from 'theme';
import {ArrowNavigationBackward, ArrowNavigationForward} from 'icons';

import {Input as BaseInput} from './Input';
import {InputProps} from './types';

type InputStoryProps = Omit<InputProps, 'onClearClick'> & {
  startAdornment: boolean;
  endAdornment: boolean;
  onClearClick: boolean;
  mask: string;
};

export const Input: React.FC<InputStoryProps> = props => {
  const [value, setValue] = useState<string>();

  const onChange: InputProps['onChange'] = ({target}) => {
    setValue(target.value);
  };

  const startAdornment = props.startAdornment ? <ArrowNavigationBackward /> : undefined;
  const endAdornment = props.endAdornment ? <ArrowNavigationForward /> : undefined;
  const onClearClick = props.onClearClick ? () => setValue('') : undefined;

  const resultProps: InputProps = {
    ...props,
    value,
    onChange,
    startAdornment,
    endAdornment,
    onClearClick,
  };

  if (props.mask) {
    resultProps.mask = {mask: props.mask};
  }

  return <BaseInput {...resultProps} />;
};

const meta = {
  title: 'Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    label: {
      type: 'string',
      control: 'text',
      description: 'Label',
    },

    caption: {
      type: 'string',
      control: 'text',
      description: 'Подпись',
    },

    size: {
      type: 'SizeTokenValue' as never,
      control: 'select',
      options: [SizeTokenValue.Small, SizeTokenValue.Medium, SizeTokenValue.Large],
      description: 'Ширина',
    },

    width: {
      type: 'string',
      control: 'text',
      description: 'Ширина',
    },
    mask: {
      type: 'string',
      control: 'text',
      description: 'Маска https://beholdr.github.io/maska/v3/#/tokens',
    },

    error: {
      type: 'string',
      control: 'text',
      description: 'Ошибка',
    },

    disabled: {
      type: 'boolean',
      control: 'boolean',
    },

    required: {
      type: 'boolean',
      control: 'boolean',
    },


    readOnly: {
      type: 'boolean',
      control: 'boolean',
    },

    filled: {
      type: 'boolean',
      control: 'boolean',
    },

    unborder: {
      type: 'boolean',
      control: 'boolean',
    },

    loading: {
      type: 'boolean',
      control: 'boolean',
    },

    onClearClick: {
      type: 'boolean',
      control: 'boolean',
    },

    autoFocus: {
      type: 'boolean',
      control: 'boolean',
    },

    absoluteCaption: {
      type: 'boolean',
      control: 'boolean',
    },

    startAdornment: {
      type: 'boolean',
      control: 'boolean',
    },

    endAdornment: {
      type: 'boolean',
      control: 'boolean',
    },

    mask: {
      type: 'string',
      control: 'text',
      description: 'Маска https://beholdr.github.io/maska/v3/#/tokens',
    },
  },
  args: {
    label: 'Label',
    caption: 'hint',
    width: '248px',
  },
} satisfies Meta<typeof Input>;

export default meta;

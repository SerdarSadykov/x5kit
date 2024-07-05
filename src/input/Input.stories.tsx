import {useState} from 'react';
import type {Meta} from '@storybook/react';

import {SizeTokenValue} from 'theme';
import {ArrowNavigationBackward, ArrowNavigationForward} from 'icons';

import {Input as BaseInput} from './Input';
import {InputProps, MaskedInputProps} from './types';

export const Input: React.FC<InputProps> = props => {
  const [value, setValue] = useState<string>();

  const onChange: InputProps['onChange'] = ({target}) => {
    console.log('target.value', target.value);
    setValue(target.value);
  };

  const startAdornment = props.startAdornment ? <ArrowNavigationBackward /> : undefined;
  const endAdornment = props.endAdornment ? <ArrowNavigationForward /> : undefined;
  const onClearClick = props.onClearClick ? () => setValue('') : undefined;

  const resultProps = {
    ...props,
    value,
    onChange,
    startAdornment,
    endAdornment,
    onClearClick,
  };

  const mask: MaskedInputProps['mask'] = {
    mask: '+7 (000) 000 - 00 - 00',
    eager: true,
    tokens: {'0': {pattern: /[0-9]/}},
  }

  return <BaseInput {...resultProps} mask={mask} />;
};

const meta = {
  title: 'Input',
  component: BaseInput,
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
      description: 'Маска',
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

    readOnly: {
      type: 'boolean',
      control: 'boolean',
    },

    onClearClick: {
      type: 'boolean',
      control: 'boolean',
    },

    autoComplete: {
      type: 'boolean',
      control: 'boolean',
    },

    autoFocus: {
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
  },
  args: {
    label: 'Label',
    caption: 'hint',
    width: '248px',
  },
} satisfies Meta<typeof BaseInput>;

export default meta;

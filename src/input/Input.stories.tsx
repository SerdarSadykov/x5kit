import {useState} from 'react';
import type {Meta} from '@storybook/react';

import {Input as BaseInput, InputProps} from './Input';

export const Input: React.FC<InputProps> = props => {
  const [value, setValue] = useState<string>();

  const onChange: InputProps['onChange'] = ({target}) => {
    setValue(target.value);
  };

  return <BaseInput {...props} value={value} onChange={onChange} />;
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

    width: {
      type: 'string',
      control: 'text',
      description: 'Ширина',
    },

    error: {
      type: 'string',
      control: 'text',
      description: 'Ошибка',
    },
  },
} satisfies Meta<typeof BaseInput>;

export default meta;

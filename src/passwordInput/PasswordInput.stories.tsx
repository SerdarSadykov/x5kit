import {useState} from 'react';
import type {Meta} from '@storybook/react';

import {ArrowNavigationUpward} from 'icons';

import inputStory from 'input/Input.stories';

import {PasswordInput as BaseInput} from './PasswordInput';
import {PasswordInputProps} from './types';

type PasswordInputStoryProps = Omit<PasswordInputProps, 'onClearClick'> & {
  endAdornment: boolean;
  onClearClick: boolean;
  mask: string;
};

export const PasswordInput: React.FC<PasswordInputStoryProps> = props => {
  const [value, setValue] = useState<string>();

  const onChange: PasswordInputProps['onChange'] = ({target}) => {
    setValue(target.value);
  };

  const startAdornment = props.startAdornment ? <ArrowNavigationUpward /> : undefined;
  const onClearClick = props.onClearClick ? () => setValue('') : undefined;

  const resultProps: PasswordInputProps = {
    ...props,
    value,
    onChange,
    startAdornment,
    onClearClick,
  };

  if (props.mask) {
    resultProps.mask = {mask: props.mask};
  }

  return <BaseInput {...resultProps} />;
};

const meta = {
  title: 'Input',
  component: PasswordInput,
  parameters: {
    layout: 'centered',
  },
  argTypes: inputStory.argTypes,
  args: {
    label: 'Label',
    caption: 'hint',
    width: '248px',
  },
} satisfies Meta<typeof PasswordInput>;

export default meta;

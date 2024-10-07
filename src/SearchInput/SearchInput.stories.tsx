import {useState} from 'react';
import type {Meta} from '@storybook/react';

import {ArrowNavigationForward} from 'icons';

import inputStory from 'Input/Input.stories';

import {SearchInput as BaseInput} from './SearchInput';
import type {SearchInputProps} from './types';

type SearchInputStoryProps = Omit<SearchInputProps, 'onClearClick'> & {
  endAdornment: boolean;
  onClearClick: boolean;
  mask: string;
};

export const SearchInput: React.FC<SearchInputStoryProps> = props => {
  const [value, setValue] = useState<string>();

  const onChange: SearchInputProps['onChange'] = ({target}) => {
    setValue(target.value);
  };

  const endAdornment = props.endAdornment ? <ArrowNavigationForward /> : undefined;
  const onClearClick = props.onClearClick ? () => setValue('') : undefined;

  const resultProps: SearchInputProps = {
    ...props,
    value,
    onChange,
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
  component: SearchInput,
  parameters: {
    layout: 'centered',
  },
  argTypes: inputStory.argTypes,
  args: {
    label: 'Label',
    caption: 'hint',
    width: '248px',
  },
} satisfies Meta<typeof SearchInput>;

export default meta;

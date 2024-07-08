import {useState} from 'react';
import type {Meta} from '@storybook/react';

import {ArrowNavigationForward} from 'icons';

import inputStory from 'input/Input.stories';

import {Datepicker as BaseDatepicker} from './Datepicker';
import {DatepickerProps} from './types';

type DatepickerStoryProps = Omit<DatepickerProps, 'onClearClick'> & {
  endAdornment: boolean;
  onClearClick: boolean;
  mask: string;
};

export const Datepicker: React.FC<DatepickerStoryProps> = props => {
  const [value, setValue] = useState<string>();

  const onChange: DatepickerProps['onChange'] = ({target}) => {
    setValue(target.value);
  };

  const endAdornment = props.endAdornment ? <ArrowNavigationForward /> : undefined;
  const onClearClick = props.onClearClick ? () => setValue('') : undefined;

  const resultProps: DatepickerStoryProps = {
    ...props,
    value,
    onChange,
    // endAdornment,
    // onClearClick,
  };

  if (props.mask) {
    // resultProps.mask = {mask: props.mask};
  }

  return <BaseDatepicker {...resultProps} />;
};

const meta = {
  title: 'Datepicker',
  component: Datepicker,
  parameters: {
    layout: 'centered',
  },
  argTypes: inputStory.argTypes,
  args: {
    label: 'Label',
    caption: 'hint',
    width: '248px',
  },
} satisfies Meta<typeof Datepicker>;

export default meta;

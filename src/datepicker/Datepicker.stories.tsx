import {useState} from 'react';
import type {Meta} from '@storybook/react';

import {ArrowNavigationBackward} from 'icons';

import inputStory from 'input/Input.stories';

import {Datepicker as BaseDatepicker} from './Datepicker';
import {DatepickerProps} from './types';

type DatepickerStoryProps = Omit<DatepickerProps, 'onClearClick'> & {
  startAdornment: boolean;
  onClearClick: boolean;
  mask: string;
};

export const Datepicker: React.FC<DatepickerStoryProps> = props => {
  const [value, setValue] = useState<Date>();

  const startAdornment = props.endAdornment ? <ArrowNavigationBackward /> : undefined;

  const resultProps: DatepickerProps = {
    ...props,
    value,
    startAdornment,
    onChange: setValue,
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

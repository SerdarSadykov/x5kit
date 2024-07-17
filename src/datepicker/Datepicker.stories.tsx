import {useState} from 'react';
import type {ArgTypes, Meta} from '@storybook/react';

import {ArrowNavigationBackward} from 'icons';
import {CalendarValue} from 'calendar';

import inputStory from 'input/Input.stories';

import {Datepicker as BaseDatepicker} from './Datepicker';
import {DatepickerProps} from './types';

type DatepickerStoryProps = Omit<DatepickerProps, 'onClearClick'> & {
  startAdornment: boolean;
  onClearClick: boolean;
  mask: string;
};

export const Datepicker: React.FC<DatepickerStoryProps> = props => {
  const [value, setValue] = useState<CalendarValue>();

  const startAdornment = props.endAdornment ? <ArrowNavigationBackward /> : undefined;

  const resultProps: DatepickerProps = {
    ...props,

    value,
    startAdornment,
    onChange: setValue,
  };
  console.log('value', value);
  return <BaseDatepicker {...resultProps} />;
};

const argTypes: Partial<typeof inputStory.argTypes> & Partial<ArgTypes<DatepickerProps>> = {
  ...inputStory.argTypes,

  format: {
    type: 'string',
    control: 'text',
    description: 'Формат, поддерживает д,d,м,m,г,y',
  },
};

delete argTypes.mask;
delete argTypes.endAdornment;

const meta = {
  title: 'Datepicker',
  component: Datepicker,
  parameters: {
    layout: 'centered',
  },
  argTypes: argTypes,
  args: {
    label: 'Label',
    caption: 'hint',
    width: '248px',
  },
} satisfies Meta<typeof Datepicker>;

export default meta;

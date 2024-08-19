import {useState} from 'react';
import type {Meta} from '@storybook/react';

import inputStory from 'input/Input.stories';

import {Select as BaseSelect} from './Select';
import {SelectListOnChange, SelectOption, SelectProps, SelectValue} from './types';
import {containsFilter} from './Filters';

export const Select: React.FC<SelectProps> = props => {
  const [value, setValue] = useState<SelectValue>([]);

  const onChange: SelectListOnChange = newValue => {
    setValue(newValue);
  };

  const resultProps: SelectProps = {
    ...props,

    value: value as never,
    onChange,

    filter: containsFilter
  };

  return <BaseSelect {...resultProps} />;
};

const options: SelectOption[] = [
  {label: 'Davletshin', value: 'davletshin', disabled: false},
  {label: 'Andreev', value: 'andreev', disabled: false},
  {label: 'Glebov', value: 'glebov', disabled: false},
  {label: 'Sevostyanov', value: 'sevostyanov', disabled: false},
  {label: 'Uvarova', value: 'uvarova', disabled: true},
  {label: 'Okulov', value: 'okulov', disabled: false},
  {label: 'Antipin', value: 'antipin', disabled: false},
  {label: 'Kuzmina', value: 'kuzmina', disabled: false},
  {label: 'Korotkikh', value: 'korotkikh', disabled: true},
  {label: 'Shiganova', value: 'shiganova', disabled: false},
  {label: 'Shorova', value: 'shorova', disabled: false},
  {label: 'Shevkun', value: 'shevkun', disabled: true},
  {label: 'Ovcharenko', value: 'ovcharenko', disabled: false},
];

const meta = {
  title: 'Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },

  argTypes: {
    ...inputStory['commonArgTypes'],

    // whiteSpace: {
    //   type: 'string',
    //   control: 'select',
    //   options: ['pre', 'pre-wrap', 'pre-line'],
    // },

    // startAdornment: {
    //   type: 'boolean',
    //   control: 'boolean',
    // },

    // endAdornment: {
    //   type: 'boolean',
    //   control: 'boolean',
    // },

    qa: {type: 'string', control: 'text'},
  },
  args: {
    options,

    label: 'Выберите варианты',

    multiple: true,
  },
} satisfies Meta<typeof Select>;

export default meta;

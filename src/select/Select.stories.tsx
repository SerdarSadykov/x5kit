import {useState} from 'react';
import type {Meta, StoryObj} from '@storybook/react';

import inputStory from 'input/Input.stories';

import CheckboxTreeStory from 'checkboxTree/CheckboxTree.stories';

import {Select as BaseSelect} from './Select';
import {containsFilter} from './Filters';
import {SelectListOnChange, SelectOption, SelectProps, SelectValue} from './types';

export const Select: React.FC<SelectProps> = props => {
  const [value, setValue] = useState<SelectValue>([]);

  const onChange: SelectListOnChange = newValue => {
    setValue(newValue);
  };

  const resultProps: SelectProps = {
    ...props,

    value: value as never,
    onChange,

    filter: containsFilter,
  };

  return (
    <div style={{display: 'flex', width: 400}}>
      <BaseSelect {...resultProps} />
    </div>
  );
};

const getOptions = (i): SelectOption[] => [
  {label: `Andreev0Andreev0AndraaaAA${i}`, value: `davletshin${i}`, disabled: false},
  {label: `Andreev0A ndreev 0An draa aAA ndreev 0An draa aAA ndreev 0An draa aAA ndreev 0An draa aAA${i}`, value: `andreev${i}`, disabled: false},
  {label: `Glebov${i}`, value: `glebov${i}`, disabled: false},
  {label: `Sevostyanov${i}`, value: `sevostyanov${i}`, disabled: false},
  {label: `Uvarova${i}`, value: `uvarova${i}`, disabled: true},
  {label: `Okulov${i}`, value: `okulov${i}`, disabled: false},
  {label: `Antipin${i}`, value: `antipin${i}`, disabled: false},
  {label: `Kuzmina${i}`, value: `kuzmina${i}`, disabled: false},
  {label: `Korotkikh${i}`, value: `korotkikh${i}`, disabled: true},
  {label: `Shiganova${i}`, value: `shiganova${i}`, disabled: false},
  {label: `Shorova${i}`, value: `shorova${i}`, disabled: false},
  {label: `Shevkun${i}`, value: `shevkun${i}`, disabled: true},
  {label: `Ovcharenko${i}`, value: `ovcharenko${i}`, disabled: false},
];

const meta = {
  title: 'Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },

  argTypes: {
    ...inputStory['commonArgTypes'],

    hint: {
      type: 'string',
      control: 'text',
      description: 'Подсказка',
    },

    showChips: {
      type: 'boolean',
      control: 'boolean',
      description: 'Названия выбранных элементов вместо кол-ва',
    },

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
    options: getOptions(0),
    multiple: true,

    label: 'Выберите варианты',
  },
} satisfies Meta<typeof Select>;

export const SelectTree: StoryObj<typeof Select> = {
  args: {
    options: CheckboxTreeStory.args.options,
    multiple: true,

    label: 'Выберите варианты',
  },
};

export const SelectVirtualized: StoryObj<typeof Select> = {
  // argTypes: {
  //   options: undefined,
  // },
  args: {
    options: Array(500).fill(1).flatMap((_, i) => getOptions(i)),
    multiple: true,
    virtualize: true,

    label: 'Выберите варианты',
  },
};

export default meta;

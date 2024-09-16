import {useState} from 'react';
import type {Meta, StoryObj} from '@storybook/react';

import {ArrowNavigationBackward, ArrowNavigationForward} from 'icons';

import inputStory from 'input/Input.stories';
import CheckboxTreeStory from 'checkboxTree/CheckboxTree.stories';

import {Select as BaseSelect} from './Select';
import {containsFilter} from './Filters';
import {SelectListOnChange, SelectOption, SelectProps, SelectValue} from './types';

export const Select: React.FC<SelectProps> = props => {
  const [value, setValue] = useState<SelectValue>([]);

  const startAdornment = props.startAdornment ? <ArrowNavigationBackward /> : undefined;
  const endAdornment = props.endAdornment ? <ArrowNavigationForward /> : undefined;
  const filter = typeof props.filter === 'boolean' ? (props.filter ? containsFilter : undefined) : props.filter;

  const onChange: SelectListOnChange = newValue => {
    setValue(newValue);
  };

  const resultProps: SelectProps = {
    ...props,

    onChange,
    startAdornment,
    endAdornment,
    filter,

    value: value as never,
  };

  return (
    <div style={{display: 'flex', width: 400}}>
      <BaseSelect {...resultProps} />
    </div>
  );
};

type FetchedItem = {
  id: string;
  title: string;
};

export const SelectFetch: React.FC<SelectProps> = props => {
  const [options, setOptions] = useState<SelectOption[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onFocus = () => {
    setIsLoading(true);
    fetch('https://jsonplaceholder.org/posts')
      .then<FetchedItem[]>(resp => resp.json())
      .then(resp => {
        const newOptions = resp.map<SelectOption>(item => ({
          label: item.title,
          value: item.id,
        }));

        setOptions(newOptions);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return <Select {...props} options={options} onFocus={onFocus} loading={isLoading} />;
};

const getOptions = (i): SelectOption[] => [
  {label: `Andreev${i}`, value: `davletshin${i}`, disabled: false},
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

    filter: {
      type: 'SelectFilter',
      control: 'boolean',
      description: 'Колбэк поиска',
    },

    multiple: {
      type: 'boolean',
      control: 'boolean',
    },

    showChips: {
      type: 'number',
      control: 'number',
      description: 'Названия выбранных элементов вместо кол-ва',
    },

    // whiteSpace: {
    //   type: 'string',
    //   control: 'select',
    //   options: ['pre', 'pre-wrap', 'pre-line'],
    // },

    startAdornment: {
      type: 'boolean',
      control: 'boolean',
    },

    endAdornment: {
      type: 'boolean',
      control: 'boolean',
    },

    qa: {type: 'string', control: 'text'},
  },
  args: {
    options: getOptions(0),

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
  argTypes: {
    options: {
      control: false,
    },
  },
  args: {
    options: Array(500)
      .fill(1)
      .flatMap((_, i) => getOptions(i)),
    virtualize: true,

    label: 'Выберите варианты',
  },
};

export default meta;

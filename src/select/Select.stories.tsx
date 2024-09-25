import React, {useState} from 'react';
import type {Meta, StoryObj} from '@storybook/react';

import {ArrowNavigationBackward, ArrowNavigationForward} from 'icons';

import inputStory from 'input/Input.stories';
import CheckboxTreeStory from 'checkboxTree/CheckboxTree.stories';

import {Select as BaseSelect} from './Select';
import {containsFilter} from './Filters';
import {header, footer} from './SelectStory';
import {LastResult, LoadMore, SelectFilter, SelectListOnChange, SelectOption, SelectProps, SelectValue} from './types';

export const Select: React.FC<SelectProps> = props => {
  const [value, setValue] = useState<SelectValue>(() => {
    const iVal = props.options[0]?.value;
    return iVal ? [iVal] : [];
  });

  const startAdornment = props.startAdornment ? <ArrowNavigationBackward /> : undefined;
  const endAdornment = props.endAdornment ? <ArrowNavigationForward /> : undefined;
  const filter = typeof props.filter === 'boolean' ? (props.filter ? containsFilter : undefined) : props.filter;

  const onChange: SelectListOnChange = newValue => {
    setValue(newValue);
  };

  const resultProps = {
    ...props,

    dropdownProps: props['dropdownProps.maxHeight'] ? {maxHeight: props['dropdownProps.maxHeight']} : undefined,

    components: {
      hint: props['components.hint'],
      header: props['components.header'] ? header : undefined,
      footer: props['components.footer'] ? footer : undefined,
    },

    onChange,
    startAdornment,
    endAdornment,
    filter,

    value,
  } as SelectProps;

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

const convertResp = (item: FetchedItem): SelectOption => ({
  label: `[${item.id}] ${item.title.slice(0, 60)}`,
  value: item.id,
});

export const SelectFetch: React.FC<SelectProps> = props => {
  const [value, setValue] = useState<SelectValue>([]);
  const [options, setOptions] = useState<SelectOption[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchItems = () => {
    return fetch('https://jsonplaceholder.org/posts')
      .then<FetchedItem[]>(resp => resp.json())
      .then(items => items.map(convertResp));
  };

  const onFocus = () => {
    if (options.length) {
      return;
    }

    setIsLoading(true);

    fetchItems()
      .then(resp => setOptions(resp.slice(0, 10)))
      .finally(() => setIsLoading(false));
  };

  const onChange: SelectListOnChange = newValue => {
    setValue(newValue);
  };

  const onLoadMore: LoadMore<{indx: number} & LastResult> = (_, lr) => {
    setIsLoading(true);

    return fetchItems()
      .then(items => {
        const indx = lr?.indx ?? 10;

        const options = items.slice(indx ?? 0, indx + 10);
        return {options, indx: indx + 10};
      })
      .finally(() => setIsLoading(false));
  };

  const filter: SelectFilter<{indx: number} & LastResult> = {
    cb: (query, _, lr) =>
      new Promise(res => {
        setIsLoading(true);

        setTimeout(() => {
          const indx = lr?.indx ?? 0;

          fetchItems()
            .then(items => items.filter(item => item.label.toLowerCase().includes(query.toLowerCase())))
            .then(items => {
              const options = items.slice(indx ?? 0, indx + 10);
              res({options, indx: indx + 10});
            })
            .finally(() => setIsLoading(false));
        }, 500);
      }),
  };

  const resultProps = {
    ...props,

    dropdownProps: props['dropdownProps.maxHeight'] ? {maxHeight: props['dropdownProps.maxHeight']} : undefined,

    components: {
      hint: props['components.hint'],
      header: props['components.header'] ? header : undefined,
      footer: props['components.footer'] ? footer : undefined,
    },

    onLoadMore,
    options,
    onFocus,
    onChange,
    filter,
    value,
    loading: isLoading,
  };

  return (
    <div style={{display: 'flex', width: 400}}>
      <BaseSelect {...resultProps} />
    </div>
  );
};

const getOptions = (i): SelectOption[] => [
  {label: `Andreev${i}`, value: `davletshin${i}`, disabled: false, tooltip: 'Вот такой тултип'},
  {label: `Glebov${i}`, value: `glebov${i}`, disabled: false},
  {label: `Sevostyanov${i}`, value: `sevostyanov${i}`, disabled: false},
  {label: `Uvarova${i}`, value: `uvarova${i}`, disabled: true, tooltip: 'Недоступно по причине'},
  {label: `Okulov${i}`, value: `okulov${i}`, disabled: false},
  {label: `Antipin${i}`, value: `antipin${i}`, disabled: true},
  {label: `Kuzmina${i}`, value: `kuzmina${i}`, disabled: false},
  {label: `Korotkikh${i}`, value: `korotkikh${i}`, disabled: true},
  {label: `Shiganova${i}`, value: `shiganova${i}`, disabled: false},
  {label: `Shorova${i}`, value: `shorova${i}`, disabled: false},
  {label: `Shevkun${i}`, value: `shevkun${i}`, disabled: true},
  {label: `Ovcharenko Ovcharenko Ovcharenko Ovcharenko${i}`, value: `ovcharenko${i}`, disabled: false},
];

const meta = {
  title: 'Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },

  argTypes: {
    ...inputStory['commonArgTypes'],

    'components.hint': {
      type: 'string',
      control: 'text',
      description: 'Подсказка',
    },

    'components.header': {
      type: 'boolean',
      control: 'boolean',
    },

    'components.footer': {
      type: 'boolean',
      control: 'boolean',
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

    noWrap: {
      type: 'boolean',
      control: 'boolean',
      description: 'Не переносить текст',
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

    'dropdownProps.maxHeight': {
      type: 'number',
      control: 'number',
      description: 'Высота dropdown',
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
    filter: true,

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

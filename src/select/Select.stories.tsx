import React, {useState} from 'react';
import type {Meta, StoryObj} from '@storybook/react';

import {ArrowNavigationBackward, ArrowNavigationForward} from 'icons';

import inputStory from 'input/Input.stories';
import CheckboxTreeStory from 'checkboxTree/CheckboxTree.stories';

import {Select as BaseSelect} from './Select';
import {containsFilter} from './Filters';
import {SelectFilter, SelectListOnChange, SelectOption, SelectProps, SelectValue} from './types';
import {Button, ButtonVariant} from 'button';
import {SizeTokenValue} from 'theme';

export type SelectStoryProps = {
  hint: string;
  footer: boolean;
  header: boolean;
} & SelectProps;

// const Header: React.FC = () => {
//   return (
//     <div style={{borderTop: '1px solid #ccc', padding: 15}}>
//       {/* <Button size={SizeTokenValue.Small} value={ButtonVariant.outlined}>
//         Отмена
//       </Button>
//       <Button size={SizeTokenValue.Small}>Применить</Button> */}
//     </div>
//   );
// };

export const Select: React.FC<SelectStoryProps> = props => {
  const [value, setValue] = useState<SelectValue>([]);

  const startAdornment = props.startAdornment ? <ArrowNavigationBackward /> : undefined;
  const endAdornment = props.endAdornment ? <ArrowNavigationForward /> : undefined;
  const filter = typeof props.filter === 'boolean' ? (props.filter ? containsFilter : undefined) : props.filter;

  const onChange: SelectListOnChange = newValue => {
    setValue(newValue);
  };

  const components: SelectProps['components'] = {};

  if (props.hint) {
    components.hint = props.hint;
  }

  if (props.header) {
    // components.header = <Header />;
    // delete props.header;
  }

  const resultProps = {
    ...props,

    onChange,
    startAdornment,
    endAdornment,
    filter,
    components: {
      // header: <div />,
    },

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
  comment: string;
};

const convertResp = (item: FetchedItem): SelectOption => ({
  label: `[${item.id}] ${item.comment.slice(0, 60)}`,
  value: item.id,
});

export const SelectFetch: React.FC<SelectProps> = props => {
  const [value, setValue] = useState<SelectValue>([]);
  const [options, setOptions] = useState<SelectOption[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onFocus = () => {
    if (options.length) {
      return;
    }

    setIsLoading(true);
    fetch('https://jsonplaceholder.org/comments')
      .then<FetchedItem[]>(resp => resp.json())
      .then(resp => setOptions(resp.slice(10).map(convertResp)))
      .finally(() => setIsLoading(false));
  };

  const onChange: SelectListOnChange = newValue => {
    setValue(newValue);
  };

  const filter: SelectFilter = {
    callback: query =>
      new Promise(res => {
        setTimeout(() => {
          fetch(`https://jsonplaceholder.org/comments`)
            .then<FetchedItem[]>(resp => resp.json())
            .then(items => items.filter(item => item.comment.toLowerCase().startsWith(query.toLowerCase())))
            .then(resp => res(resp.map(convertResp)));
        }, 500);
      }),
  };

  const resultProps = {
    ...props,

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

    hint: {
      type: 'string',
      control: 'text',
      description: 'Подсказка',
    },

    header: {
      type: 'boolean',
      control: 'boolean',
    },

    footer: {
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

import {useState} from 'react';
import type {Meta} from '@storybook/react';

import {CheckboxTree as BaseCheckboxTree} from './CheckboxTree';
import {CheckboxTreeOptionValue, CheckboxTreeProps} from './types';

export const CheckboxTree: React.FC<CheckboxTreeProps> = props => {
  const [value, setValue] = useState<CheckboxTreeOptionValue[]>();

  const onChange: CheckboxTreeProps['onChange'] = newValue => {
    setValue(newValue);

    if (props.onChange as unknown) {
      alert('onChange console.log');
      console.log(newValue);
    }
  };

  const toggleOpened = props.toggleOpened ? toggleValue => alert(toggleValue) : undefined;

  const resultProps: CheckboxTreeProps = {
    ...props,

    value,
    onChange,
    toggleOpened,
  };

  return <BaseCheckboxTree {...resultProps} />;
};

const options: CheckboxTreeProps['options'] = [
  {
    label: 'Столицы',
    value: 'capitalies',
  },
  {
    label: 'Страны',
    value: 'countries',

    childs: [
      {
        label: 'Россия',
        value: 'RU',

        childs: [
          {
            label: 'Москва и область',
            value: 'mow-obl',
            childs: [
              {
                label: 'Москва',
                value: 'mow',
              },
              {
                label: 'Область',
                value: 'obl',

                childs: [
                  {
                    label: 'Щелково',
                    value: 'shelkovo',
                  },
                  {
                    label: 'Серпухов',
                    value: 'serpuhov',
                  },
                ],
              }
            ]
          },
          {
            label: 'Санкт-Петербург',
            value: 'spb',
          },
        ],
      },
      {
        label: 'Австралия',
        value: 'AU',
        disabled: true,
      },
      {
        label: 'Австрия',
        value: 'AT',
        readOnly: true,
      },
      {
        label: 'Азербайджан',
        value: 'AZ',
      },
      {
        label: 'Аландские острова',
        value: 'AX',
      },
      {
        label: 'Гренада',
        value: 'GD',
      },
      {
        label: 'Гренландия',
        value: 'GL',
      },
      {
        label: 'Греция',
        value: 'GR',
      },
      {
        label: 'Грузия',
        value: 'GE',
      },
      {
        label: 'Исландия',
        value: 'IS',
      },
      {
        label: 'Испания',
        value: 'ES',
      },
      {
        label: 'Италия',
        value: 'IT',
      },
      {
        label: 'Йемен',
        value: 'YE',
      },
    ],
  },
  {
    label: 'Города',
    value: 'cities',

    childs: [
      {
        label: 'Москва',
        value: 'mow',
      },
      {
        label: 'Санкт-Петербург',
        value: 'spb',
      },
      {
        label: 'Абаза',
        value: 0,
      },
      {
        label: 'Абакан',
        value: 1,
      },
      {
        label: 'Агрыз',
        value: 5,
      },
      {
        label: 'Адыгейск',
        value: 6,
      },
      {
        label: 'Азнакаево',
        value: 7,
      },
      {
        label: 'Азов',
        value: 8,
      },
      {
        label: 'Алдан',
        value: 14,
      },
      {
        label: 'Алейск',
        value: 15,
      },
      {
        label: 'Александров',
        value: 16,
      },
      {
        label: 'Александровск-Сахалинский',
        value: 17,
      },
      {
        label: 'Александровск',
        value: 18,
      },
      {
        label: 'Ахтубинск',
        value: 53,
      },
      {
        label: 'Ачинск',
        value: 54,
      },
      {
        label: 'Ачхой-Мартан',
        value: 55,
      },
      {
        label: 'Аша',
        value: 56,
      },
      {
        label: 'Бабаево',
        value: 57,
      },
      {
        label: 'Байкальск',
        value: 61,
      },
      {
        label: 'Баймак',
        value: 62,
      },
      {
        label: 'Бакал',
        value: 63,
      },
      {
        label: 'Баксан',
        value: 64,
      },
      {
        label: 'Балабаново',
        value: 65,
      },
      {
        label: 'Балаклава',
        value: 66,
      },
      {
        label: 'Балаково',
        value: 67,
      },
      {
        label: 'Балахна',
        value: 68,
      },
      {
        label: 'Балашиха',
        value: 69,
      },
      {
        label: 'Балашов',
        value: 70,
      },
      {
        label: 'Балей',
        value: 71,
      },
      {
        label: 'Балтийск',
        value: 72,
      },
      {
        label: 'Батайск',
        value: 76,
      },
      {
        label: 'Бахчисарай',
        value: 77,
      },
      {
        label: 'Бежецк',
        value: 78,
      },
      {
        label: 'Белая Калитва',
        value: 79,
      },
      {
        label: 'Белая Холуница',
        value: 80,
      },
      {
        label: 'Белгород',
        value: 81,
      },
      {
        label: 'Белебей',
        value: 82,
      },
      {
        label: 'Белинский',
        value: 83,
      },
      {
        label: 'Белово',
        value: 84,
      },
      {
        label: 'Белогорск',
        value: 85,
      },
      {
        label: 'Белогорск',
        value: 86,
      },
      {
        label: 'Белозерск',
        value: 87,
      },
      {
        label: 'Белокуриха',
        value: 88,
      },
      {
        label: 'Беломорск',
        value: 89,
      },
    ],
  },
];

const meta = {
  title: 'CheckboxTree',
  component: CheckboxTree,
  parameters: {
    layout: 'centered',
  },

  argTypes: {
    disabled: {
      type: 'boolean',
      control: 'boolean',
    },

    readOnly: {
      type: 'boolean',
      control: 'boolean',
    },

    onChange: {
      type: '(value: CheckboxTreeOptionValue[], event: ChangeEvent<HTMLInputElement>) => void' as never,
      control: 'boolean',
    },

    options: {
      type: 'CheckboxTreeOptionValue[] | undefined' as never,
      control: 'object',
    },

    opened: {
      type: 'CheckboxTreeOptionValue[]' as never,
      control: 'object',
      description: 'Раскрытые пункты',
    },

    toggleOpened: {
      type: '(value: CheckboxTreeOptionValue) => void' as never,
      control: 'boolean',
      description: 'Раскрыть/раскрыть пункт',
    },

    qa: {type: 'string', control: 'text'},
  },
  args: {
    options,
  },
} satisfies Meta<typeof CheckboxTree>;

export default meta;

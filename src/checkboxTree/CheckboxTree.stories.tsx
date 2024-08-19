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
    label: 'Страны',
    value: 'countries',

    childs: [
      {
        label: 'Россия',
        value: 'RU',

        childs: [
          {
            label: 'Москва',
            value: 'mow',
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
      },
      {
        label: 'Австрия',
        value: 'AT',
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
        label: 'Габон',
        value: 'GA',
      },
      {
        label: 'Гаити',
        value: 'HT',
      },
      {
        label: 'Гайана',
        value: 'GY',
      },
      {
        label: 'Гамбия',
        value: 'GM',
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
        label: 'Гуам',
        value: 'GU',
      },
      {
        label: 'Иордания',
        value: 'JO',
      },
      {
        label: 'Ирак',
        value: 'IQ',
      },
      {
        label: 'Иран',
        value: 'IR',
      },
      {
        label: 'Ирландия',
        value: 'IE',
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
      {
        label: 'Кабо-Верде',
        value: 'CV',
      },
      {
        label: 'Казахстан',
        value: 'KZ',
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
        label: 'Абдулино',
        value: 2,
      },
      {
        label: 'Абинск',
        value: 3,
      },
      {
        label: 'Агидель',
        value: 4,
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
        label: 'Ак-Довурак',
        value: 9,
      },
      {
        label: 'Аксай',
        value: 10,
      },
      {
        label: 'Алагир',
        value: 11,
      },
      {
        label: 'Алапаевск',
        value: 12,
      },
      {
        label: 'Алатырь',
        value: 13,
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
        label: 'Алексеевка',
        value: 19,
      },
      {
        label: 'Алексин',
        value: 20,
      },
      {
        label: 'Алзамай',
        value: 21,
      },
      {
        label: 'Алупка',
        value: 22,
      },
      {
        label: 'Алушта',
        value: 23,
      },
      {
        label: 'Альметьевск',
        value: 24,
      },
      {
        label: 'Амурск',
        value: 25,
      },
      {
        label: 'Анадырь',
        value: 26,
      },
      {
        label: 'Анапа',
        value: 27,
      },
      {
        label: 'Ангарск',
        value: 28,
      },
      {
        label: 'Андреаполь',
        value: 29,
      },
      {
        label: 'Анжеро-Судженск',
        value: 30,
      },
      {
        label: 'Анива',
        value: 31,
      },
      {
        label: 'Апатиты',
        value: 32,
      },
      {
        label: 'Апрелевка',
        value: 33,
      },
      {
        label: 'Ардатов',
        value: 37,
      },
      {
        label: 'Ардон',
        value: 38,
      },
      {
        label: 'Арзамас',
        value: 39,
      },
      {
        label: 'Аркадак',
        value: 40,
      },
      {
        label: 'Армавир',
        value: 41,
      },
      {
        label: 'Армянск',
        value: 42,
      },
      {
        label: 'Арсеньев',
        value: 43,
      },
      {
        label: 'Арск',
        value: 44,
      },
      {
        label: 'Артём',
        value: 45,
      },
      {
        label: 'Артёмовск',
        value: 46,
      },
      {
        label: 'Артёмовский',
        value: 47,
      },
      {
        label: 'Архангельск',
        value: 48,
      },
      {
        label: 'Асбест',
        value: 49,
      },
      {
        label: 'Асино',
        value: 50,
      },
      {
        label: 'Астрахань',
        value: 51,
      },
      {
        label: 'Аткарск',
        value: 52,
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

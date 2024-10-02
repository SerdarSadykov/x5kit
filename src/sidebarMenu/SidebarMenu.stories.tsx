import {useState} from 'react';
import type {Meta} from '@storybook/react';

import {AccountCircle, Help, Link, List, Settings} from 'icons';
import {Badge, BadgeVariant} from 'badge';

import {SidebarMenu as BaseSidebarMenu} from './SidebarMenu';
import {SidebarMenuItemProps, SidebarMenuProps} from './types';

export const SidebarMenu: React.FC<SidebarMenuProps> = props => {
  const [selected, setSelected] = useState<string>();

  const onChange: SidebarMenuProps['onChange'] = newSelected => {
    setSelected(newSelected.id === selected ? undefined : newSelected.id);

    if (props.onChange) {
      alert(newSelected.label);
    }
  };

  const resultProps = {
    ...props,

    selected,
    onChange,
  };

  return <BaseSidebarMenu {...resultProps} />;
};

const items: SidebarMenuItemProps[] = [
  {
    id: '1',
    label: 'Пункт меню с очень длинным названием в две строки',
    icon: <List />,
    href: '#1',
    tooltip: 'Команды',
  },
  {
    id: '2',
    label: 'Отчеты',
    icon: <List />,
    href: '#2',

    childs: [
      {
        id: 'sub1',
        label: 'Метамодель',
        href: '#sub1',
        childs: [
          {
            id: 'sub22',
            label: 'Техрадар2',
          },
        ],
      },
      {
        id: 'sub2',
        label: 'Техрадар',
        href: '#sub2',
      },
      {
        id: 'sub3',
        label: 'Подраздел',
        disabled: true,
        href: '#sub3',
      },
    ],
  },
  {
    id: '3',
    label: 'Настройки',
    icon: <Settings />,
    badge: 8,
    disabled: true,
    href: '#3',
    tooltip: 'Недоступный пункт меню',
  },
  {
    id: '4',
    label: 'Помощь',
    icon: <Help />,
    badge: '99+',
    href: '#4',
  },
  {
    id: '5',
    label: 'Профиль',
    icon: <AccountCircle />,
    disabled: false,
    badge: <Badge variant={BadgeVariant.red}>on</Badge>,
    href: '#5',
  },
  {
    id: '6',
    label: 'Внешняя ссылка',
    icon: <Link />,
    disabled: false,
    href: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    target: '_blank',
    qa: 'link',
  },
  {
    id: '7',
    label: 'Внутренняя ссылка',
    icon: <Link />,
    disabled: false,
    href: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
];

const meta = {
  title: 'SidebarMenu',
  component: SidebarMenu,
  tags: ['!autodocs'],
  argTypes: {
    selected: {
      type: 'string',
      control: 'text',
      description: 'Выбранный пункт',
    },

    onChange: {
      type: '(newSelected: SidebarMenuItemProps) => void' as never,
      control: 'boolean',
      description: 'Обработчик переключения',
    },

    items: {
      type: 'SidebarMenuItemProps' as never,
      control: 'object',
      description: 'Элементы',
    },

    qa: {type: 'string', control: 'text'},
  },
  args: {
    items,
    width: 300,
  },
} satisfies Meta<typeof SidebarMenu>;

export default meta;

import {useEffect, useState} from 'react';
import type {Meta} from '@storybook/react';

import {AccountCircle, Settings} from 'icons';
import {SizeTokenValue} from 'theme';

import {Tabs as BaseTabs} from './Tabs';
import {Tab} from './Tab';
import {TabsProps, TabValue} from './types';

export const Tabs: React.FC<TabsProps> = props => {
  const [value, setValue] = useState<TabValue>(props.value);

  const resultProps: TabsProps = {
    ...props,

    value,
    onChange: newValue => setValue(newValue),
  };

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  return (
    <div style={{width: 600}}>
      <BaseTabs {...resultProps}>
        <Tab value={1} icon={<Settings size={SizeTokenValue.Small} />}>
          Хранение
        </Tab>
        <Tab value={2} disabled badge="99+" icon={<AccountCircle size={SizeTokenValue.Small} />}>
          Локальные поставщики
        </Tab>
        <Tab value="импорт" badge={22}>Импорт</Tab>
        <Tab value="three" disabled>
          <div>Tab 3</div>
        </Tab>
        <Tab value="four" badge="15">
          <div>Tab 4</div>
        </Tab>
        <Tab value="five">
          <div>Tab 5</div>
        </Tab>
        <Tab value="6">
          <div>Таб с очень длинным названием, или нет</div>
        </Tab>
      </BaseTabs>
    </div>
  );
};

const meta = {
  title: 'Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },

  argTypes: {
    value: {
      type: 'string | number' as never,
      control: 'text',
    },
  },
  args: {
    value: 1,
  },
} satisfies Meta<typeof Tabs>;

export default meta;

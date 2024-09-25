import {useEffect, useState} from 'react';
import type {Meta} from '@storybook/react';

import {AccountCircle, Settings} from 'icons';
import {SizeTokenValue, theme} from 'theme';

import {Tab} from './Tab';
import {Tabs as BaseTabs} from './Tabs';
import {TabContext, TabList as BaseTabList} from './TabList';
import {TabPanel} from './TabPanel';
import {TabListProps, TabsProps} from './types';

type TabsStoryProps = {onChange: boolean} & Omit<TabsProps, 'onChange'>;

export const Tabs: React.FC<TabsStoryProps> = props => {
  const [value, setValue] = useState<string | undefined>(props.value);

  const onChange = (newValue: string) => {
    setValue(newValue);

    if (props.onChange) {
      alert(newValue);
    }
  };

  const resultProps: TabsProps = {
    ...props,

    value,
    onChange,
  };

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  return (
    <div style={{width: 600}}>
      <BaseTabs {...resultProps}>
        <Tab value="1" icon={<Settings size={SizeTokenValue.Small} />}>
          Хранение
        </Tab>
        <Tab value="2" badge="99+" icon={<AccountCircle size={SizeTokenValue.Small} />}>
          Локальные поставщики {value === '2' ? 'и внешние' : '...'}
        </Tab>
        <Tab value="импорт" badge={22}>
          Импорт
        </Tab>
        <Tab value="three" disabled>
          <div>Tab 3</div>
        </Tab>
        <Tab value="tl" badge="15" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
          Tab Link
        </Tab>
        <Tab value="tl2" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" onClick={e => e.preventDefault()}>
          Tab Link no redirect
        </Tab>
        <Tab value="five">Tab 5</Tab>
        <Tab value="6">Таб с очень длинным названием, или нет</Tab>
      </BaseTabs>
    </div>
  );
};

export const TabList: React.FC<TabsStoryProps> = props => {
  const [value, setValue] = useState<string | undefined>(props.value);

  const onChange: TabListProps['onChange'] = (newValue: string) => {
    setValue(newValue);

    if (props.onChange) {
      alert(newValue);
    }
  };

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  return (
    <div style={{width: 600}}>
      <TabContext.Provider value={value}>
        <BaseTabList onChange={onChange}>
          <Tab value="1" icon={<Settings size={SizeTokenValue.Small} />}>
            Первая
          </Tab>
          <Tab value="2" badge="99+" icon={<AccountCircle size={SizeTokenValue.Small} />}>
            Вторая
          </Tab>
          <Tab value="Третья" badge={22}>
            Треться
          </Tab>
        </BaseTabList>
        <TabPanel value="1">
          <div style={{paddingTop: 20, ...theme.typography.p1}}>Первая вкладка Первая вкладка Первая вкладка</div>
        </TabPanel>
        <TabPanel value="2">
          <div style={{paddingTop: 20, ...theme.typography.p1}}>Вторая вкладка Вторая вкладка Вторая вкладка</div>
        </TabPanel>
        <TabPanel value="импорт">
          <div style={{paddingTop: 20, ...theme.typography.p1}}>Третья</div>
        </TabPanel>
      </TabContext.Provider>
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

    arrows: {
      type: 'boolean',
      control: 'boolean',
      description: 'Показывать стрелки',
    },

    onChange: {
      type: '(newValue: string, e: MouseEvent<HTMLDivElement>) => void' as never,
      control: 'boolean',
    },
  },
  args: {
    value: '1',
  },
} satisfies Meta<typeof Tabs>;

export default meta;

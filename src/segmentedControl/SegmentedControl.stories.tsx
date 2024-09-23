import {ChangeEventHandler, useState} from 'react';
import type {Meta} from '@storybook/react';

import {SizeTokenValue} from 'theme';
import {Notification, Settings, ShoppingCart} from 'icons';

import {SegmentedControl as BaseSegmentedControl} from './SegmentedControl';
import {SegmentedControlProps, SegmentedControlOption} from './types';

const options: SegmentedControlOption[] = [
  {
    label: 'Один',
    value: '1',
  },
  {
    label: 'Два',
    value: '2',
    disabled: true,
  },
  {
    label: 'Три',
    value: '3',
    readOnly: true,
  },
  {
    label: 'Четыре',
    value: '4',
  },
  {
    label: 'Пять',
    value: '5',
  },
  {
    label: 'Шесть',
    value: '6',
  },
];

const iconOptions: SegmentedControlOption[] = [
  {
    label: <Settings size={SizeTokenValue.Small} />,
    value: 'settings',
  },
  {
    label: <Notification size={SizeTokenValue.Small} />,
    value: 'notification',
  },
  {
    label: <ShoppingCart size={SizeTokenValue.Small} />,
    value: 'ShoppingCart',
  },
];

export const SegmentedControl: React.FC<SegmentedControlProps> = props => {
  const [value, setValue] = useState<string>('1');

  const onChange: ChangeEventHandler<HTMLInputElement> = e => {
    if (props.onChange) {
      alert(e.target.value);
    }

    setValue(e.target.value);
  };

  const resultProps: SegmentedControlProps = {
    ...props,

    onChange: props.onChange ? e => alert(e.target.value) : undefined,
  };

  return (
    <div>
      <div style={{marginBottom: 16}}>
        <BaseSegmentedControl {...resultProps} options={iconOptions} name="radio1" />
      </div>
      <div style={{marginBottom: 16}}>
        <BaseSegmentedControl {...resultProps} options={options} name="radio2" value={value} onChange={onChange} />
      </div>
    </div>
  );
};

const meta = {
  title: 'SegmentedControl',
  component: SegmentedControl,
  parameters: {
    layout: 'centered',
  },

  argTypes: {
    size: {
      type: 'SizeTokenValue' as never,
      control: 'select',
      options: [SizeTokenValue.Large, SizeTokenValue.Small],
      description: 'Размер',
    },

    disabled: {
      type: 'boolean',
      control: 'boolean',
    },

    readOnly: {
      type: 'boolean',
      control: 'boolean',
    },

    width: {
      type: 'string',
      control: 'text',
    },

    onChange: {
      type: 'ChangeEventHandler<HTMLInputElement>' as never,
      control: 'boolean',
    },

    qa: {type: 'string', control: 'text'},
  },
  args: {},
} satisfies Meta<typeof SegmentedControl>;

export default meta;

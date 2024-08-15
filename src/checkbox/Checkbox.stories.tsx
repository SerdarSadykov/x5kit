import {ChangeEventHandler, useState} from 'react';
import type {Meta} from '@storybook/react';

import {Link} from 'link';

import {Checkbox as BaseCheckbox} from './Checkbox';
import {CheckboxProps, CheckboxState} from './types';

export const Checkbox: React.FC<CheckboxProps> = props => {
  const [checked, setChecked] = useState<CheckboxState>();

  const onChange: ChangeEventHandler<HTMLInputElement> = () => {
    let newChecked: CheckboxState = false;

    switch (checked) {
      case 'halfOn':
        newChecked = true;
        break;

      case false:
      case undefined:
        newChecked = 'halfOn';
        break;
    }

    setChecked(newChecked);
  };

  const resultProps: CheckboxProps = {
    ...props,

    checked: props.checked ?? checked,

    onChange,
  };

  return (
    <div>
      <div style={{marginBottom: 16}}>
        <BaseCheckbox {...resultProps} />
      </div>
      <div style={{marginBottom: 16}}>
        <BaseCheckbox {...resultProps}>
          {'Я согласен с '}
          <Link href="#" target="_blank">
            условиями оказания услуг
          </Link>
        </BaseCheckbox>
      </div>
      <div style={{maxWidth: 280}}>
        <BaseCheckbox {...resultProps}>Пример многострочного лейбла, на несколько строк</BaseCheckbox>
      </div>
    </div>
  );
};

const meta = {
  title: 'Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },

  argTypes: {
    label: {
      type: 'ReactNode' as never,
      control: 'text',
      description: 'label или children',
    },

    checked: {
      type: 'boolean | halfOn' as never,
      control: 'select',
      options: [false, true, 'halfOn'],
    },

    disabled: {
      type: 'boolean',
      control: 'boolean',
    },

    readOnly: {
      type: 'boolean',
      control: 'boolean',
    },

    error: {
      type: 'boolean',
      control: 'boolean',
    },

    onChange: {
      type: 'ChangeEventHandler<HTMLInputElement>' as never,
      control: 'boolean',
    },

    qa: {type: 'string', control: 'text'},
  },
  args: {
    label: 'Label',
    maxLength: 25,
  },
} satisfies Meta<typeof Checkbox>;

export default meta;

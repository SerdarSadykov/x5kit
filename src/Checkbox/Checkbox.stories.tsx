import type {ChangeEventHandler} from 'react';
import {useState} from 'react';
import type {Meta} from '@storybook/react';
import type {CSSObject} from '@emotion/react';

import {Link} from 'Link';

import {Checkbox as BaseCheckbox} from './Checkbox';
import type {CheckboxProps, CheckboxState} from './types';

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

    if (props.onChange) {
      alert(newChecked);
    }
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

    whiteSpace: {
      type: 'string',
      control: 'select',
      options: ['pre', 'pre-wrap', 'pre-line', 'nowrap'] as Array<CSSObject['whiteSpace']>,
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
  },
} satisfies Meta<typeof Checkbox>;

export default meta;

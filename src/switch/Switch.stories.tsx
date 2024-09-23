import {ChangeEventHandler, useState} from 'react';
import type {Meta} from '@storybook/react';
import {CSSObject} from '@emotion/react';

import {Link} from 'link';

import {Switch as BaseSwitch} from './Switch';
import {SwitchProps, SwitchState} from './types';
import {SizeTokenValue} from 'theme';

export const Switch: React.FC<SwitchProps> = props => {
  const [checked, setChecked] = useState<SwitchState>();

  const onChange: ChangeEventHandler<HTMLInputElement> = () => {
    let newChecked: SwitchState = false;

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

  const resultProps: SwitchProps = {
    ...props,

    checked: props.checked ?? checked,

    onChange,
  };

  return (
    <div>
      <div style={{marginBottom: 16}}>
        <BaseSwitch {...resultProps} />
      </div>
      <div style={{marginBottom: 16}}>
        <BaseSwitch {...resultProps}>
          {'Я согласен с '}
          <Link href="#" target="_blank">
            условиями оказания услуг
          </Link>
        </BaseSwitch>
      </div>
      <div style={{maxWidth: 280}}>
        <BaseSwitch {...resultProps}>Пример многострочного лейбла, на несколько строк</BaseSwitch>
      </div>
    </div>
  );
};

const meta = {
  title: 'Switch',
  component: Switch,
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

    size: {
      type: 'SizeTokenValue' as never,
      control: 'select',
      options: [SizeTokenValue.Large, SizeTokenValue.Small],
      description: 'Размер',
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
} satisfies Meta<typeof Switch>;

export default meta;

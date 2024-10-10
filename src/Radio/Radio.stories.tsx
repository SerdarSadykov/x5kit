import type {Meta} from '@storybook/react';
import type {CSSObject} from '@emotion/react';

import {Link} from 'Link';

import {Radio as BaseRadio} from './Radio';

import type {RadioProps} from './types';

export const Radio: React.FC<RadioProps> = props => {
  const resultProps: RadioProps = {
    ...props,

    name: 'radio_field',
  };

  if (typeof props.checked !== 'undefined' || resultProps.onChange) {
    resultProps.onChange = e => alert(e.target.value);
  }

  return (
    <div>
      <div style={{marginBottom: 16}}>
        <BaseRadio {...resultProps} value="0" />
      </div>
      <div style={{marginBottom: 16}}>
        <BaseRadio {...resultProps} value="1">
          {'Text label '}
          <Link href="#" target="_blank">
            условиями оказания услуг
          </Link>
        </BaseRadio>
      </div>
      <div style={{maxWidth: 280}}>
        <BaseRadio {...resultProps}>Пример многострочного лейбла, на несколько строк</BaseRadio>
      </div>
    </div>
  );
};

const meta = {
  title: 'Radio',
  component: Radio,
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
      type: 'boolean',
      control: 'boolean',
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
} satisfies Meta<typeof Radio>;

export default meta;

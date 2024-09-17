import {useState} from 'react';

import {ArrowNavigationBackward, ArrowNavigationForward} from 'icons';
import baseMeta from 'input/Input.stories';

import {Textarea as BaseTextarea} from './Textarea';
import {TextareaProps} from './types';

type InputStoryProps = Omit<TextareaProps, 'onClearClick'> & {
  startAdornment: boolean;
  endAdornment: boolean;
  onClearClick: boolean;
  mask: string;
};

export const Textarea: React.FC<InputStoryProps> = props => {
  const [value, setValue] = useState<string>();

  const onChange: TextareaProps['onChange'] = ({target}) => {
    setValue(target.value);
  };

  const startAdornment = props.startAdornment ? <ArrowNavigationBackward /> : undefined;
  const endAdornment = props.endAdornment ? <ArrowNavigationForward /> : undefined;
  const onClearClick = props.onClearClick ? () => setValue('') : undefined;

  const resultProps: TextareaProps = {
    ...props,
    value,
    onChange,
    startAdornment,
    endAdornment,
    onClearClick,
  };

  return (
    <div style={{width: 400}}>
      <BaseTextarea {...resultProps} />
    </div>
  );
};

const meta = {
  ...baseMeta,
  component: BaseTextarea,

  argTypes: {
    maxWidth: {
      type: 'string',
      control: 'text',
    },

    minHeight: {
      type: 'string',
      control: 'text',
    },

    maxHeight: {
      type: 'string',
      control: 'text',
    },

    resize: {
      type: 'string',
      control: 'select',
      options: ['block', 'both', 'horizontal', 'inline', 'none', 'vertical'],
    },

    ...baseMeta['commonArgTypes'],
  },
};

export default meta;

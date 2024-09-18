import {Caption} from 'caption';

import {InputInternalProps} from '../types';

export const InputCaption: React.FC<InputInternalProps> = ({error, caption, style}) => {
  const children = error && typeof error === 'string' ? error : caption;

  const captionProps = {
    children,

    disabled: style.isDisabled,
    error: style.isError,
    absolute: style.isAbsoluteCaption,
  }

  return <Caption {...captionProps} />
};

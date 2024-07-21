import {ReactElement} from 'react';

import {Tooltip as BaseTooltip} from 'tooltip';

import {ChipProps} from '../types';

type ChipTooltipProps = {children: ReactElement} & ChipProps;

export const Tooltip: React.FC<ChipTooltipProps> = props => {
  const {children, label, maxLength} = props;

  let content = props.tooltip;

  if (!content && typeof label === 'string' && maxLength && label.length > maxLength) {
    content = label;
  }

  if (!content) {
    return children;
  }

  return <BaseTooltip content={content}>{children}</BaseTooltip>;
};

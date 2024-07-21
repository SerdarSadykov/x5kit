import {ReactElement} from 'react';

import {Tooltip as BaseTooltip, TooltipPlacement} from 'tooltip';

import {ChipProps} from '../types';

type ChipTooltipProps = {children: ReactElement} & ChipProps;

export const Tooltip: React.FC<ChipTooltipProps> = props => {
  const {children, label, maxLength} = props;

  let content = props.tooltip;

  if (!content && label && maxLength && label.length > maxLength) {
    content = label;
  }

  if (!content) {
    return children;
  }

  return (
    <BaseTooltip placement={TooltipPlacement.bottom} content={content}>
      {children}
    </BaseTooltip>
  );
};

import {CSSProperties, DOMAttributes, PropsWithChildren, ReactNode} from 'react';

import {QA} from 'common';
import {SizeTokenValue} from 'theme';
import {TooltipProps} from 'tooltip';

export enum ChipVariant {
  outlined = 'outlined',
  filled = 'filled',
}

export type ChipProps = {
  label: string | ReactNode;

  size?: SizeTokenValue;
  variant?: ChipVariant;
  disabled?: boolean;
  checked?: boolean;
  error?: boolean;

  startAdornment?: ReactNode; // icon
  endAdornment?: ReactNode; // icon
  tooltip?: TooltipProps['content'];

  onDelete?: () => void;

  maxLength?: number
  maxLengthFunc?: (label: string) => string

  // onChange -> onClick
} & QA & Pick<CSSProperties, 'whiteSpace' | 'maxWidth'> & Pick<DOMAttributes<HTMLDivElement>, 'onClick'>;
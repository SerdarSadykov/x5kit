import {CSSProperties, DOMAttributes, ReactNode} from 'react';

import {QA} from 'common';
import {SizeTokenValue} from 'theme';
import {TooltipProps} from 'tooltip';

export enum ChipVariant {
  outlined = 'outlined',
  filled = 'filled',
}

export type ChipProps = {
  size?: SizeTokenValue;
  variant?: ChipVariant;
  disabled?: boolean;
  checked?: boolean;
  error?: boolean;

  label: string;

  startAdornment?: ReactNode; // icon
  endAdornment?: ReactNode; // icon
  tooltip?: TooltipProps['content'];

  onDelete?: () => void;

  // maxLabelLength?: number
  // shorteningFunc?: (label: string, length: number) => string
  // onChange -> onClick
} & QA & Pick<CSSProperties, 'whiteSpace'> & Pick<DOMAttributes<HTMLDivElement>, 'onClick'>;
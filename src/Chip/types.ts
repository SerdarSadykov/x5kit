import type {AnchorHTMLAttributes, HTMLAttributes, PropsWithChildren, ReactNode} from 'react';
import type {CSSObject} from '@emotion/react';

import type {QA} from 'common';
import type {SizeTokenValue} from 'theme';
import type {TooltipProps} from 'Tooltip';

export enum ChipVariant {
  outlined = 'outlined',
  filled = 'filled',
}

export type ChipStyles = {
  size: SizeTokenValue;
  variant: ChipVariant;

  disabled?: boolean;
  checked?: boolean;
  error?: boolean;
  isButton?: boolean;
};

export type ChipProps = {
  label?: string;

  startAdornment?: ReactNode; // icon
  endAdornment?: ReactNode; // icon
  tooltip?: TooltipProps['content'];

  onDelete?: () => void;

  maxLength?: number;
  maxLengthFunc?: (label: string) => string;

  // onChange -> onClick
} & Partial<Omit<ChipStyles, 'isButton'>> &
  QA &
  PropsWithChildren &
  Pick<CSSObject, 'whiteSpace' | 'maxWidth'> &
  Pick<HTMLAttributes<HTMLDivElement>, 'onClick'> &
  Pick<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'target'>;

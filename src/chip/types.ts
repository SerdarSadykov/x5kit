import {AnchorHTMLAttributes, HTMLAttributes, PropsWithChildren, ReactNode} from 'react';
import {CSSObject} from '@emotion/react';

import {QA} from 'common';
import {SizeTokenValue} from 'theme';
import {TooltipProps} from 'tooltip';

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
} & Partial<Omit<ChipStyles, 'isButton'>>
  & QA
  & PropsWithChildren
  & Pick<CSSObject, 'whiteSpace' | 'maxWidth'>
  & Pick<HTMLAttributes<HTMLDivElement>, 'onClick'>
  & Pick<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'target'>;
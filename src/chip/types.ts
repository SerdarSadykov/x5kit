import {CSSProperties, ReactNode} from 'react';

import {QA} from 'common';
import {SizeTokenValue} from 'theme';

export enum ChipVariant {
  outlined = 'outlined',
  filled = 'filled',
}

export type ChipStyles = {
  size?: SizeTokenValue;
  variant?: ChipVariant;
  checked?: boolean;
  error?: boolean;
} & Pick<CSSProperties, 'whiteSpace'>;

export type ChipProps = {
  label: string;

  startAdornment?: ReactNode;
  endAdornment?: ReactNode;

  // name?: string
  // checked?: boolean
  // error?: boolean
  // variant?: keyof typeof chipVariants
  // icon?: ReactElement
  // tooltip?: string
  // maxLabelLength?: number
  // shorteningFunc?: (label: string, length: number) => string
  // onDelete?: (name?: string) => void
  // onChange?: ({ name, checked }: { name?: string; checked?: boolean }) => void
} & QA & ChipStyles;
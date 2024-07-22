import {CSSProperties, PropsWithChildren} from 'react';

import {SizeTokenValue} from 'theme';

export enum BadgeVariant {
  red = 'red',
  accent = 'accent',
  grey = 'grey',
  disabled = 'disabled',
}

export type BadgeProps = {
  size?: number | SizeTokenValue;
  variant?: BadgeVariant;
  hasStroke?: boolean;
} & PropsWithChildren & Pick<CSSProperties, 'color' | 'backgroundColor' | 'borderColor'>;


export enum BadgeDotSize {
  xs = 'xs',
  s = 's',
  m = 'm',
  l = 'l',
}
export type BadgeDotProps = {
  size: BadgeDotSize;
} & Omit<BadgeProps, 'children' | 'size' | 'color'>;

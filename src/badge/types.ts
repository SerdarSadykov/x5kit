import {PropsWithChildren} from 'react';
import {CSSObject} from '@emotion/react';

import {SizeTokenValue} from 'theme';

export enum BadgeVariant {
  red = 'red',
  accent = 'accent',
  grey = 'grey',
  disabled = 'disabled',
}

export type BadgeStyles = {
  size: SizeTokenValue;
  variant: BadgeVariant;
  hasStroke?: boolean;

  color?: string;
} & Pick<CSSObject, 'backgroundColor' | 'borderColor'>;

export type BadgeProps = Partial<BadgeStyles> & PropsWithChildren;


export enum BadgeDotSize {
  xs = 'xs',
  s = 's',
  m = 'm',
  l = 'l',
}
export type BadgeDotProps = {
  size: BadgeDotSize;
} & Omit<BadgeProps, 'children' | 'size' | 'color'>;

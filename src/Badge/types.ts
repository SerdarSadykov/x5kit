import type {HTMLAttributes} from 'react';
import type {CSSObject} from '@emotion/react';

import type {QA} from 'common';
import type {SizeTokenValue} from 'theme';

export enum BadgeVariant {
  red = 'red',
  accent = 'accent',
  grey = 'grey',
  disabled = 'disabled',
}

export type BadgeStyles = {
  /** Размер */
  size: SizeTokenValue;
  /** Вариант */
  variant: BadgeVariant;
  /** Очерченная граница */
  hasStroke?: boolean;
  /** Цвет текста */
  color?: string;
} & Pick<CSSObject, 'backgroundColor' | 'borderColor'>;

export type BadgeProps = Partial<BadgeStyles> & QA & HTMLAttributes<HTMLDivElement>;

export enum BadgeDotSize {
  xs = 'xs',
  s = 's',
  m = 'm',
  l = 'l',
}
export type BadgeDotProps = {
  /** Размер */
  size: BadgeDotSize;
} & QA &
  Omit<BadgeProps, 'children' | 'size' | 'color'>;

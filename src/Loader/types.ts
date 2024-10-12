import type {CSSProperties, HTMLAttributes} from 'react';

import type {QA} from 'common';
import type {ColorTokenValue, SizeTokenValue} from 'theme';

export type LoaderProps = {
  /** Размер */
  size?: SizeTokenValue | CSSProperties['width'];
  /** Цвет */
  color?: ColorTokenValue;
} & QA;

export type LoaderBlockProps = LoaderProps & HTMLAttributes<HTMLDivElement>;

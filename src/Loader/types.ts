import type {CSSProperties, HTMLAttributes} from 'react';

import type {QA} from 'common';
import type {ColorTokenValue, SizeTokenValue} from 'theme';

export type LoaderProps = {
  size?: SizeTokenValue | CSSProperties['width'];
  color?: ColorTokenValue;
} & QA;

export type LoaderBlockProps = LoaderProps & HTMLAttributes<HTMLDivElement>;

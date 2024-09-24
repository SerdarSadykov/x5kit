import {CSSProperties, HTMLAttributes, PropsWithChildren} from 'react';

import {QA} from 'common';
import {ColorTokenValue, SizeTokenValue} from 'theme';

export type LoaderProps = {
  size?: SizeTokenValue | CSSProperties['width'];
  color?: ColorTokenValue;
} & QA;

export type LoaderBlockProps = LoaderProps & HTMLAttributes<HTMLDivElement>;

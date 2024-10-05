import type {InputHTMLAttributes, ReactNode} from 'react';
import type {CSSObject} from '@emotion/react';

import type {QA} from 'common';
import type {SizeTokenValue} from 'theme';

export type SegmentedControlOption = {
  label: ReactNode;
} & QA &
  Omit<InputHTMLAttributes<HTMLInputElement>, 'checked' | 'children'>;

export type SegmentedControlProps = {
  options: SegmentedControlOption[];
  size?: SizeTokenValue;
} & QA &
  Pick<CSSObject, 'width'> &
  Pick<InputHTMLAttributes<HTMLInputElement>, 'name' | 'value' | 'onChange' | 'disabled' | 'readOnly'>;

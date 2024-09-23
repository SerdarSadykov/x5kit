import {InputHTMLAttributes, ReactNode} from 'react';
import {CSSObject} from '@emotion/react';

import {QA} from 'common';
import {SizeTokenValue} from 'theme';

export type SegmentedControlOption = {
  label: ReactNode;
} & QA & Omit<InputHTMLAttributes<HTMLInputElement>, 'checked' | 'children'>;

export type SegmentedControlProps = {
  options: SegmentedControlOption[];
  size?: SizeTokenValue;
} & QA
  & Pick<CSSObject, 'width'>
  & Pick<InputHTMLAttributes<HTMLInputElement>, 'name' | 'value' | 'onChange' | 'disabled' | 'readOnly'>;
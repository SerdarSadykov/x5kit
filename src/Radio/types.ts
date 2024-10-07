import type {InputHTMLAttributes, PropsWithChildren, ReactNode} from 'react';
import type {CSSObject} from '@emotion/react';

import type {QA} from 'common';

export type RadioStyles = {
  disabled?: boolean;
  readOnly?: boolean;
  error?: boolean;

  hasLabel?: boolean;
} & Pick<CSSObject, 'whiteSpace'>;

export type RadioProps = {
  label?: ReactNode;
  startAdornment?: ReactNode;
} & QA &
  PropsWithChildren &
  RadioStyles &
  InputHTMLAttributes<HTMLInputElement>;

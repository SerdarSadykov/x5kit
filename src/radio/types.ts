import {InputHTMLAttributes, PropsWithChildren, ReactNode} from 'react';
import {CSSObject} from '@emotion/react';

import {QA} from 'common';

export type RadioStyles = {
  disabled?: boolean;
  readOnly?: boolean;
  error?: boolean;

  hasLabel?: boolean;
} & Pick<CSSObject, 'whiteSpace'>;

export type RadioProps = {
  label?: ReactNode;
  startAdornment?: ReactNode;
} & QA & PropsWithChildren & RadioStyles & InputHTMLAttributes<HTMLInputElement>;
import {AnchorHTMLAttributes} from 'react';
import {CSSObject} from '@emotion/react';

import {QA} from 'common';

export enum LinkVariant {
  accent = 'accent',
  blue = 'blue',
}

export type LinkStyles = {
  disabled?: boolean;
  pseudolink?: boolean;
  visitable?: boolean;
  loading?: boolean;

  behavior: {
    default: CSSObject;
    hover: CSSObject;
    active: CSSObject;
    visited: CSSObject;
    disabled: CSSObject;
  };
};

export type LinkProps = {
  variant?: LinkVariant;
} & QA & Partial<LinkStyles> & AnchorHTMLAttributes<HTMLAnchorElement>;
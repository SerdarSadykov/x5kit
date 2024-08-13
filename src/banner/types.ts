import {PropsWithChildren, ReactNode} from 'react';
import {CSSObject} from '@emotion/react';

import {QA} from 'common';
import {LinkProps} from 'link/types';

export enum BannerVariant {
  defaultBlue = 'defaultBlue',
  defaultGrey = 'defaultGrey',
  success = 'success',
  warning = 'warning',
  error = 'error',
}

export type BannerStyles = {
  variant: BannerVariant;
  color?: string;
} & Pick<CSSObject, 'backgroundColor' | 'borderColor' | 'maxWidth'>;

export type BannerAction = {text: ReactNode;} & Partial<LinkProps>;

export type BannerProps = {
  icon?: boolean | ReactNode;

  title?: ReactNode;

  action?: BannerAction | ReactNode;
  actionNextLine?: boolean;

  onClose?: () => void
} & Partial<BannerStyles> & QA & PropsWithChildren;

import {PropsWithChildren, ReactNode} from 'react';
import {CSSObject} from '@emotion/react';

import {SizeTokenValue} from 'theme';
import {QA} from 'common';
import {LinkProps} from 'link';

export enum BannerVariant {
  defaultBlue = 'defaultBlue',
  defaultGrey = 'defaultGrey',
  success = 'success',
  warning = 'warning',
  error = 'error',
}

export type BannerStyles = {
  variant: BannerVariant;
  size: SizeTokenValue;
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

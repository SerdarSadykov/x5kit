import type {PropsWithChildren, ReactNode} from 'react';
import type {CSSObject} from '@emotion/react';

import type {SizeTokenValue} from 'theme';
import type {QA} from 'common';
import type {LinkProps} from 'Link';

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
} & Pick<CSSObject, 'backgroundColor' | 'borderColor' | 'width' | 'maxWidth'>;

export type BannerAction = {text: ReactNode} & Partial<LinkProps>;

export type BannerProps = {
  icon?: boolean | ReactNode;

  title?: ReactNode;

  action?: BannerAction | ReactNode;
  actionNextLine?: boolean;

  onClose?: () => void;
} & Partial<BannerStyles> &
  QA &
  PropsWithChildren;

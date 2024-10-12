import type {CSSProperties, ReactNode} from 'react';
import type {SnackbarProviderProps as BaseSnackbarProviderProps, OptionsObject} from 'notistack';

import type {QA} from 'common';
import type {ButtonProps} from 'Button';
import type {LinkProps} from 'Link';

export type SnackbarProviderProps = BaseSnackbarProviderProps;

export enum SnackbarVariant {
  default = 'default',
  success = 'success',
  warning = 'warning',
  error = 'error',
}

export type SnackbarAction = ({isButton: true} & ButtonProps) | ({isLink: true} & LinkProps) | ReactNode;

export type SnackbarMessage = {
  content: ReactNode;
  title?: ReactNode;
  icon?: ReactNode;
  variant?: SnackbarVariant;

  closable?: boolean;

  actionsTop?: SnackbarAction[];
  actionsBottom?: SnackbarAction[];
} & QA &
  Omit<OptionsObject, 'variant'> &
  Pick<CSSProperties, 'maxWidth' | 'whiteSpace'>;

export type SnackbarMessageInner = Omit<SnackbarMessage, 'key'> & Required<Pick<SnackbarMessage, 'key' | 'variant'>>;

export type SnackbarContentProps = {
  message: SnackbarMessageInner;
};

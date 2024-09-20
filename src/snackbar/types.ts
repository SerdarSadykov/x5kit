import {CSSProperties, ReactNode} from 'react';
import {SnackbarProviderProps as BaseSnackbarProviderProps, OptionsObject} from 'notistack';

import {QA} from 'common';
import {ButtonProps} from 'button';
import {LinkProps} from 'link';

export type SnackbarProviderProps = BaseSnackbarProviderProps;

export enum SnackbarVariant {
  default = 'default',
  success = 'success',
  warning = 'warning',
  error = 'error',
}

export type SnackbarAction = ({isButton: boolean} & ButtonProps) | ({isLink: boolean} & LinkProps) | ReactNode;

export type SnackbarMessage = {
  content: ReactNode;
  title?: ReactNode;
  icon?: ReactNode;
  variant?: SnackbarVariant;

  closable?: boolean;

  actionsTop?: SnackbarAction[];
  actionsBottom?: SnackbarAction[];
} & QA & Omit<OptionsObject, 'variant'> & Pick<CSSProperties, 'maxWidth' | 'whiteSpace'>;

export type SnackbarMessageInner = Omit<SnackbarMessage, 'key'> & Required<Pick<SnackbarMessage, 'key' | 'variant'>>;

export type SnackbarContentProps = {
  message: SnackbarMessageInner;
};
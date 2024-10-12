import type {CSSProperties, ReactNode} from 'react';
import type {SnackbarProviderProps as BaseSnackbarProviderProps, OptionsObject} from 'notistack';

import type {QA} from 'common';
import type {ButtonProps} from 'Button';
import type {LinkProps} from 'Link';

/** Пропсы провайдера notistack */
export type SnackbarProviderProps = BaseSnackbarProviderProps;

/** Вариант дизайна Snackbar */
export enum SnackbarVariant {
  /** Без границы и иконки */
  default = 'default',
  /** Зеленая граница и иконка */
  success = 'success',
  /** Желтая граница и иконка */
  warning = 'warning',
  /** Красная граница и иконка */
  error = 'error',
}

/** Кнопки в сообщении
 *
 * Передаются кнопки(isButton), ссылки(isLink), или кастомный элемент
 */
export type SnackbarAction = ({isButton: true} & ButtonProps) | ({isLink: true} & LinkProps) | ReactNode;

/** Всплывающее сообщение */
export type SnackbarMessage = {
  /** Контент */
  content: ReactNode;
  /** Заголовок */
  title?: ReactNode;
  /** Кастомная иконка */
  icon?: ReactNode;
  /** Вариант */
  variant?: SnackbarVariant;

  /** С возможностью закрытия (показывать крестик) */
  closable?: boolean;

  /** Кнопки сверху справа */
  actionsTop?: SnackbarAction[];
  /** Кнопки снизу */
  actionsBottom?: SnackbarAction[];
} & QA &
  Omit<OptionsObject, 'variant'> &
  Pick<CSSProperties, 'maxWidth' | 'whiteSpace'>;

export type SnackbarMessageInner = Omit<SnackbarMessage, 'key'> & Required<Pick<SnackbarMessage, 'key' | 'variant'>>;

export type SnackbarContentProps = {
  message: SnackbarMessageInner;
};

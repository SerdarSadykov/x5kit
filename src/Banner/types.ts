import type {PropsWithChildren, ReactNode} from 'react';
import type {CSSObject} from '@emotion/react';

import type {SizeTokenValue} from 'theme';
import type {QA} from 'common';

export enum BannerVariant {
  defaultBlue = 'defaultBlue',
  defaultGrey = 'defaultGrey',
  success = 'success',
  warning = 'warning',
  error = 'error',
}

export type BannerStyles = {
  /** Вариант */
  variant: BannerVariant;
  /** Размер */
  size: SizeTokenValue;
  /** Цвет текста */
  color?: string;
} & Pick<CSSObject, 'backgroundColor' | 'borderColor' | 'width' | 'maxWidth'>;

export type BannerProps = {
  /**
   * boolean - Показывать иконку по "варианту"
   *
   * ReactNode - Кастомная иконка
   * */
  icon?: boolean | ReactNode;

  /** Заголовок */
  title?: ReactNode;

  /** Контрол справа */
  actionsTop?: ReactNode;

  /** Контрол снизу */
  actionsBottom?: ReactNode;

  /** Обработчик закрытия */
  onClose?: () => void;
} & Partial<BannerStyles> &
  QA &
  PropsWithChildren;

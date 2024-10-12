import type {AnchorHTMLAttributes, HTMLAttributes, PropsWithChildren, ReactNode} from 'react';
import type {CSSObject} from '@emotion/react';

import type {QA} from 'common';
import type {SizeTokenValue} from 'theme';
import type {TooltipProps} from 'Tooltip';

export enum ChipVariant {
  outlined = 'outlined',
  filled = 'filled',
}

export type ChipStyles = {
  /** Размер */
  size: SizeTokenValue;
  /** Вариант */
  variant: ChipVariant;

  /** Отключен */
  disabled?: boolean;
  /** Выбран */
  checked?: boolean;
  /** С ошибкой */
  error?: boolean;
  /** Показывать курсор pointer */
  isButton?: boolean;
};

export type ChipProps = {
  /** Label */
  label?: string;

  /** Иконка | Контент слева */
  startAdornment?: ReactNode;
  /** Иконка | Контент справа */
  endAdornment?: ReactNode;

  /** Всплывающая подсказка */
  tooltip?: TooltipProps['content'];

  /** Обработчик удаления. Показывает крестик */
  onDelete?: () => void;

  /** Максимальная длинна label.
   *
   * Показывает tooltip при превышении */
  maxLength?: number;
  /** Обработчик длинны label */
  maxLengthFunc?: (label: string) => string;
} & Partial<Omit<ChipStyles, 'isButton'>> &
  QA &
  PropsWithChildren &
  Pick<CSSObject, 'whiteSpace' | 'maxWidth'> &
  Pick<HTMLAttributes<HTMLDivElement>, 'onClick'> &
  Pick<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'target'>;

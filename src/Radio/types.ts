import type {InputHTMLAttributes, PropsWithChildren, ReactNode} from 'react';
import type {CSSObject} from '@emotion/react';

import type {QA} from 'common';

export type RadioStyles = {
  /** Отключен */
  disabled?: boolean;
  /** Фокусируемый без редактирования */
  readOnly?: boolean;
  /** Ошибка в поле */
  error?: boolean;

  /** Без подписи, вычисляется автоматически */
  hasLabel?: boolean;
} & Pick<CSSObject, 'whiteSpace'>;

export type RadioProps = {
  /** Label */
  label?: ReactNode;
  /** Иконка | Контент слева */
  startAdornment?: ReactNode;
} & QA &
  Omit<PropsWithChildren, 'hasLabel'> &
  RadioStyles &
  InputHTMLAttributes<HTMLInputElement>;

import type {InputHTMLAttributes, PropsWithChildren, ReactNode} from 'react';
import type {CSSObject} from '@emotion/react';

import type {QA} from 'common';

/** Выбран или indeterminate при передаче halfOn */
export type CheckboxState = boolean | 'halfOn';

export type CheckboxStyles = {
  /** Выбран */
  checked?: CheckboxState;
  /** Отключен */
  disabled?: boolean;
  /** Фокусируемый без редактирования */
  readOnly?: boolean;

  /** Ошибка в поле */
  error?: boolean;

  /** Без подписи, вычисляется автоматически */
  hasLabel?: boolean;
} & Pick<CSSObject, 'whiteSpace'>;

export type CheckboxProps = {
  /** Label */
  label?: ReactNode;

  /** Иконка | Контент слева */
  startAdornment?: ReactNode;
} & QA &
  PropsWithChildren &
  Omit<CheckboxStyles, 'hasLabel'> &
  Omit<InputHTMLAttributes<HTMLInputElement>, 'checked'>;

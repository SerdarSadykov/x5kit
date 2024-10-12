//eslint-disable-next-line @typescript-eslint/consistent-type-imports
import {SizeTokenValue} from 'theme';

import type {InputHTMLAttributes, PropsWithChildren, ReactNode} from 'react';
import type {CSSObject} from '@emotion/react';
import type {QA} from 'common';

/** Выбран или indeterminate(желтый) при передаче halfOn */
export type SwitchState = boolean | 'halfOn';

export type SwitchStyles = {
  /** Выбран */
  checked?: SwitchState;
  /** Отключен */
  disabled?: boolean;
  /** Фокусируемый без редактирования */
  readOnly?: boolean;
  /** Ошибка в поле */
  error?: boolean;

  /** Без подписи, вычисляется автоматически */
  hasLabel?: boolean;
  /** Размер */
  size?: SizeTokenValue;
} & Pick<CSSObject, 'whiteSpace'>;

export type SwitchProps = {
  /** Label */
  label?: ReactNode;
  /** Иконка | Контент слева */
  startAdornment?: ReactNode;
} & QA &
  PropsWithChildren &
  Omit<SwitchStyles, 'hasLabel'> &
  Omit<InputHTMLAttributes<HTMLInputElement>, 'checked' | 'size'>;

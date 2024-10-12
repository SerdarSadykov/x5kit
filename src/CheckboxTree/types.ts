import type {ChangeEvent, HTMLAttributes, InputHTMLAttributes, ReactNode} from 'react';

import type {QA} from 'common';
import type {TooltipProps} from 'Tooltip';
import type {CheckboxProps} from 'Checkbox';

/** Значение option */
export type CheckboxTreeOptionValue = string | number;

export type CheckboxTreeOption = {
  /** Label */
  label: ReactNode;

  /** Значение */
  value: CheckboxTreeOptionValue;

  /** Дочерние option */
  childs?: CheckboxTreeOption[];

  /** Подпись */
  tooltip?: TooltipProps['content'];
} & Omit<CheckboxProps, 'label' | 'value' | 'checked'>;

/** Обработчик изменения значения */
export type CheckboxTreeOnChange<T = CheckboxTreeOption> = (
  /** Новое значение */
  value: CheckboxTreeOptionValue[],

  /** Option на котором произошло событие  */
  option: T,

  /** Событие */
  event: ChangeEvent<HTMLInputElement>
) => void;

export type CheckboxTreeProps<T extends CheckboxTreeOption = CheckboxTreeOption> = {
  /** Option */
  options: T[];
  /** Выбранные option */
  value: CheckboxTreeOptionValue[] | undefined;
  /** Обработчик изменения значения */
  onChange: CheckboxTreeOnChange<T>;

  /** Отключен */
  disabled?: boolean;
  /** Фокусируемый без редактирования */
  readOnly?: boolean;

  /** Раскрытые option */
  opened?: CheckboxTreeOptionValue[];
  /** Обработчие раскрытия option */
  toggleOpened?: (value: CheckboxTreeOptionValue) => void;
} & QA &
  Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> &
  Pick<InputHTMLAttributes<HTMLInputElement>, 'name'>;

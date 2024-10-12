import type {ChangeEvent, HTMLAttributes, InputHTMLAttributes, ReactNode} from 'react';

import type {QA} from 'common';
import type {TooltipProps} from 'Tooltip';
import type {CheckboxProps} from 'Checkbox';

/** Значение варианта */
export type CheckboxTreeOptionValue = string | number;

export type CheckboxTreeOption = {
  /** Label */
  label: ReactNode;

  /** Значение */
  value: CheckboxTreeOptionValue;

  /** Дочерние элементы */
  childs?: CheckboxTreeOption[];

  /** Подпись */
  tooltip?: TooltipProps['content'];
} & Omit<CheckboxProps, 'label' | 'value' | 'checked'>;

export type CheckboxTreeOnChange<T = CheckboxTreeOption> = (
  /** Новое значение */
  value: CheckboxTreeOptionValue[],

  /** Вариант на котором произошло событие  */
  option: T,

  /** Событие */
  event: ChangeEvent<HTMLInputElement>
) => void;

export type CheckboxTreeProps<T extends CheckboxTreeOption = CheckboxTreeOption> = {
  /** Варианты */
  options: T[];
  /** Выбранные варианты */
  value: CheckboxTreeOptionValue[] | undefined;
  /** Обработчик изменения */
  onChange: CheckboxTreeOnChange<T>;

  /** Отключен */
  disabled?: boolean;
  /** Фокусируемый без редактирования */
  readOnly?: boolean;

  /** Раскрытые варианты */
  opened?: CheckboxTreeOptionValue[];
  /** Обработчие раскрытия варианта */
  toggleOpened?: (value: CheckboxTreeOptionValue) => void;
} & QA &
  Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> &
  Pick<InputHTMLAttributes<HTMLInputElement>, 'name'>;

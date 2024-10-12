import type {InputHTMLAttributes, MouseEventHandler, ReactNode, Ref, RefCallback} from 'react';
import type {MaskInputOptions} from 'maska';

import type {CSSObject} from '@emotion/react';

import type {SizeTokenValue} from 'theme';
import type {QA} from 'common';

type InputBaseProps<T> = Pick<
  InputHTMLAttributes<T>,
  | 'type'
  | 'name'
  | 'disabled'
  | 'readOnly'
  | 'required'
  | 'autoFocus'
  | 'autoComplete'
  | 'onFocus'
  | 'onBlur'
  | 'onClick'
  | 'onInput'
  | 'onChange'
  | 'tabIndex'
>;

export type InputInputComponent<T = HTMLInputElement> = React.FC<InputInternalProps<T>>;

export type InputProps<T = HTMLInputElement> = {
  /** Размер */
  size?: SizeTokenValue;

  /** Принудительная установка состояния "Заполнено" */
  filled?: boolean;
  /** Принудительная установка состояния "В фокусе" */
  focused?: boolean;
  /** Без границы */
  unborder?: boolean;
  /** Всплывающая подсказка если значение не помещается */
  overflowTooltip?: boolean;
  /** Показать loader */
  loading?: boolean;
  /** Абсолютное позиционирование caption, не занимает место между полями */
  absoluteCaption?: boolean;
  /** Ошибка в поле */
  error?: boolean | ReactNode;

  /** Подпись */
  caption?: ReactNode;
  /** Label */
  label?: string | React.FC<InputStyles & Pick<InputProps<T>, 'error'>>;

  /** Значение */
  value: string | undefined;

  /** Иконка | Контент слева */
  startAdornment?: ReactNode;
  /** Иконка | Контент справа */
  endAdornment?: ReactNode;

  /** Обработчик нажатия на крестик(очистки)
   *
   * Крестик отображатся при передаче
   */
  onClearClick?: MouseEventHandler<HTMLButtonElement>;

  /** Маска поля */
  mask?: MaskInputOptions;

  /** ref контейнера */
  containerRef?: Ref<HTMLDivElement>;

  /** Свойства элемента input */
  inputProps?: InputHTMLAttributes<T> & {ref?: RefCallback<T>};
  /** Компонент input */
  inputComponent?: InputInputComponent<T>;
} & QA &
  InputBaseProps<T> &
  Pick<CSSObject, 'width'>;

export type InputStyles = {
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isFilled?: boolean;
  isFocused: boolean;
  isUnborder?: boolean;
  isOverflowTooltip?: boolean;
  isLoading?: boolean;
  isLabeled: boolean;
  isMasked: boolean;
  isSmall: boolean;
  isError: boolean;
  isAbsoluteCaption: boolean;
};

export type InputInternalProps<T = HTMLInputElement> = InputProps<T> & {
  style: InputStyles;
};

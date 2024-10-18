import type {ReactNode, ChangeEvent, PropsWithChildren, HTMLAttributes} from 'react';
import type React from 'react';
import type {CSSObject} from '@emotion/react';
import type {VariableSizeListProps} from 'react-window';

import type {InputProps} from 'Input';
import type {getQAAttribute, QA, RequiredQA} from 'common';
import type {DropdownProps} from 'Dropdown';
import type {CheckboxTreeOption} from 'CheckboxTree';

/** Единичное значение - для SingleSelect */
export type SelectSingleValue = string | number;
/** Множественное значение - для Select */
export type SelectMultipleValue = SelectSingleValue[];

/** Option */
export type SelectOption = {
  /** Label */
  label: string;
  /** Иконка
   *
   *
   * Наличие приведет к отключению virtualize
   */
  icon?: ReactNode;
  /** Дочерние option
   *
   * Отображаются только при multiple
   *
   * Наличие приведет к рендеру CheckboxTree
   * и отключению virtualize
   */
  childs?: SelectOption[];
} & PropsWithChildren &
  Omit<CheckboxTreeOption, 'label'>;

/** Пропс компонента рендера option */
export type SelectItemProps = {
  /** Option */
  option: SelectOption;
  /** Выбран */
  checked: boolean; // isActive
} & Pick<SelectContextProps, 'onChange' | 'setIsOpen' | 'name'> &
  Pick<HTMLAttributes<HTMLDivElement>, 'style'>;

/** Пропс компонента рендера всех option */
export type SelectItemsProps = {
  /** Элементы Option */
  options: SelectOption[];

  /** Ширина дропдауна в пикселях
   *
   * используется при virtualize
   */
  clientWidth: number | undefined;
} & RequiredQA &
  Pick<
    SelectContextProps,
    | 'state'
    | 'name'
    | 'value'
    | 'onChange'
    | 'multiple'
    | 'setIsOpen'
    | 'height'
    | 'maxHeight'
    | 'virtualize'
    | 'whiteSpace'
    | 'loadMore'
  > &
  Pick<SelectComponents, 'item'>;

/** Пропс компонента рендера контента dropdown */
export type SelectListProps = {
  components?: SelectComponents;
};
/** Обработчик изменения значения Select */
export type SelectListOnChange = (
  /** Новое значение */
  value: SelectMultipleValue,
  /** Option на котором произошло событие  */
  option?: SelectOption,
  /** Событие */
  event?: ChangeEvent<HTMLInputElement>
) => void;

/** Обработчик изменения значения SingleSelect */
export type SelectSingleOnChange = (
  /** Новое значение */
  value: SelectSingleValue,
  /** Option на котором произошло событие  */
  option?: SelectOption,
  /** Событие */
  event?: ChangeEvent<HTMLInputElement>
) => void;

/** Последний результат обработчика LoadMore или SelectFilter
 *
 * Можно расширять другими значениями, например сохраняя номер последней страницы
 */
export type LastResult = {
  /** Новые или отфильтрованные option */
  options: SelectOption[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
};

/** Обработчик скроллинга в конец списка
 *
 * Позволяет загружать новые элементы при пагинации
 *
 * @returns Новые option
 */
export type LoadMore<T extends LastResult = LastResult> = (
  /** Текущие option */
  options: SelectOption[],
  /** Последний результат вызова функции */
  lastResult?: T
) => Promise<T>;

/** Обработчик фильтрации option
 *
 * Используется для поиска значений
 * Пример containsFilter
 */
export type SelectFilter<T extends LastResult = LastResult> = {
  /** Обработчик
   *
   * @returns Отфильтрованные option. Несуществующие option будут добавлены
   */
  cb: (
    /** Введенный текст */
    query: string,

    /** Текущие option */
    options: SelectOption[],
    /** Последний результат вызова функции */
    lastResult?: T
  ) => Promise<T>;

  /** debounce delay  */
  delay?: number;
};

/** Состояние Select */
export enum SelectState {
  /** По умолчанию */
  default = 'default',
  /** Вызван обработчик filter */
  searching = 'searching',
  /** Список отфильтрован */
  filtred = 'filtred',
  /** Вызван обработчик loadMore */
  loadingMore = 'loadingMore',
}

/** Перегружаемые компоненты */
type SelectComponents = {
  /** Подпись в верхнем баннере */
  hint?: ReactNode;
  /** Шапка */
  header?: ReactNode;
  /** Подвал */
  footer?: ReactNode;

  /** При поиске */
  searching?: ReactNode;
  /** При отсутствии результатов поиска */
  notFound?: ReactNode;

  /** Дробдаун (с шапкой, элементами и пр.) */
  list?: React.FC<SelectListProps>;
  /** Элементы списка */
  items?: React.FC<SelectItemsProps>;
  /** Элемент списка
   *
   * Не используется при virtualize
   */
  item?: React.FC<SelectItemProps>;
};

type CommonProps<T extends LastResult = LastResult> = {
  /** Значения */
  value: SelectMultipleValue;
  /** Обработчик изменения значения */
  onChange: SelectListOnChange;

  /** Множественный выбор */
  multiple?: boolean;
  /** Количество Chips с label выбранных элементов
   *
   * Без передачи, будет показано просто кол-во выбранных
   */
  showChips?: number;
  /** Использовать перенос строк в input */
  wrap?: boolean;

  /** Фильтр элементов
   *
   * При передаче будет возможность ввода текста в input
   *
   * Обработчик может фильтровать текущие элементы, а также возвращать новые
   *
   * которые будут добавлены (пример: при поиска на backend)
   */
  filter?: SelectFilter<T>;

  /** Использовать виртуализацию
   *
   * Использовть при большом количестве элементов > 1000
   *
   * Виртуализация отключается при передаче options с childs
   *
   * Виртуализация отключается при количестве элементов < 20
   */
  virtualize?: VariableSizeListProps | boolean;
} & Pick<InputProps, 'disabled' | 'readOnly' | 'name'> &
  Pick<CSSObject, 'whiteSpace'>;

export type SelectProps<T extends LastResult = LastResult> = {
  /** Options */
  options: SelectOption[];

  /** Кастомные свойства Dropdown
   *
   * Используется в специфических ситуациях
   */
  dropdownProps?: Partial<DropdownProps>;

  /** При скроллинге в конец списка
   *
   * Позволяет загружать новые элементы при пагинации
   */
  onLoadMore?: LoadMore<T>;
} & QA &
  CommonProps<T> &
  SelectListProps &
  Omit<InputProps, 'value' | 'onChange'> &
  Partial<Pick<DropdownProps, 'isOpen' | 'setIsOpen'>>;

export type SingleSelectProps<T extends LastResult = LastResult> = {
  /** Значение */
  value: SelectSingleValue | undefined;
  /** Обработчик изменения значения */
  onChange: SelectSingleOnChange;
} & Omit<SelectProps<T>, 'value' | 'onChange' | 'multiple'>;

export type SelectContextProps = {
  options: SelectOption[];
  filtred: SelectOption[];

  state: SelectState;
  setState: (state: SelectState, filtred?: SelectOption[]) => void;

  getQA: ReturnType<typeof getQAAttribute>;

  onClear: () => void;

  loadMore: (target: HTMLDivElement | undefined) => void;
  filterOptions: (query: string) => void;
} & CommonProps &
  Pick<DropdownProps, 'isOpen' | 'setIsOpen' | 'height'> &
  Required<Pick<DropdownProps, 'maxHeight'>>;

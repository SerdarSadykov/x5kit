import type {AnchorHTMLAttributes, HTMLAttributes, MouseEvent, PropsWithChildren, ReactNode} from 'react';

import type {QA} from 'common';

export type TabProps = {
  /** Обязательный идентификатор
   *
   * Можно использовать любой уникальный в рамках меню int|string|uuid
   */
  value: string;
  /** Label */
  label?: ReactNode;
  /** Иконка */
  icon?: ReactNode;
  /** Значок */
  badge?: ReactNode;
  /** Отключен
   *
   * Не позволяет переход по табу
   */
  disabled?: boolean;
} & QA &
  AnchorHTMLAttributes<HTMLDivElement>;

export type TabsProps = {
  /** Выбранный таб */
  value?: string;
  /** Обработчик смены таба */
  onChange: (
    /** Новый таб */
    newValue: string,
    /** Событие клика | нажатия */
    e: MouseEvent<HTMLDivElement>
  ) => void;
  /** Показывать стрелки при overflow */
  arrows?: boolean;
} & QA &
  Omit<HTMLAttributes<HTMLDivElement>, 'onChange'>;

export type TabContextProps = Pick<TabsProps, 'value' | 'onChange'>;

export type TabListProps = Omit<TabsProps, 'value' | 'onChange'>;

export type TabPanelProps = Pick<TabProps, 'value'> & PropsWithChildren;

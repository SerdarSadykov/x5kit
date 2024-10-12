import type {AnchorHTMLAttributes} from 'react';
import type {CSSObject} from '@emotion/react';

import type {QA} from 'common';

export enum LinkVariant {
  accent = 'accent',
  blue = 'blue',
}

export type LinkStyles = {
  /** Отключено */
  disabled?: boolean;
  /** Стиль с подчеркиванием */
  pseudolink?: boolean;
  /** Использовать состояние :visited */
  visitable?: boolean;
  /** Показать loader */
  loading?: boolean;

  /** Кастомные стили */
  behavior: {
    /** По умолчанию */
    default: CSSObject;
    /** При наведении */
    hover: CSSObject;
    /** При нажатии */
    active: CSSObject;
    /** Был переход по ссылке */
    visited: CSSObject;
    /** Отключенный */
    disabled: CSSObject;
  };
};

export type LinkProps = {
  /** Вариант */
  variant?: LinkVariant;
} & QA &
  Partial<LinkStyles> &
  AnchorHTMLAttributes<HTMLAnchorElement>;

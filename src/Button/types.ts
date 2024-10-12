import type {AnchorHTMLAttributes, ButtonHTMLAttributes, ElementType, ReactNode} from 'react';
import type {CSSObject} from '@emotion/react';

import type {QA} from 'common';
import type {SizeTokenValue} from 'theme';
import type {TooltipProps} from 'Tooltip';

export enum ButtonVariant {
  primary = 'primary',
  secondary = 'secondary',
  outlined = 'outlined',
  text = 'text',

  inner = 'inner',
  innerInput = 'innerInput',

  dangerPrimary = 'dangerPrimary',
  dangerSecondary = 'dangerSecondary',
  dangerOutlined = 'dangerOutlined',
  dangerText = 'dangerText',
}

export type ButtonStyles = {
  /** Размер */
  size: SizeTokenValue;
  /** Показывать Loader */
  loading?: boolean;

  /** Кастомные стили */
  behavior: {
    /** По умолчанию */
    default: CSSObject;
    /** При наведении */
    hover: CSSObject;
    /** При нажатии */
    active: CSSObject;
    /** Отключенный */
    disabled: CSSObject;
  };
} & Pick<CSSObject, 'width' | 'justifyContent' | 'fontSize' | 'lineHeight'>;

export type ButtonProps = {
  /** Вариант кнопки */
  variant?: ButtonVariant;
  /** Всплывающая подсказка */
  tooltip?: TooltipProps['content'];

  /** Иконка | Контент слева */
  startAdornment?: ReactNode;
  /** Иконка | Контент справа */
  endAdornment?: ReactNode;

  /** TagName - по умолчанию button */
  as?: ElementType;
} & QA &
  Partial<ButtonStyles> &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'> &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'color'>;

export type IconButtonProps = Omit<ButtonProps, 'startAdornment' | 'endAdornment'>;

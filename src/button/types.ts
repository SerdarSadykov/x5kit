import {AnchorHTMLAttributes, ButtonHTMLAttributes, ElementType, ReactNode} from 'react';
import {CSSObject} from '@emotion/react';

import {QA} from 'common';
import {SizeTokenValue} from 'theme';
import {TooltipProps} from 'tooltip';

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
  size: SizeTokenValue;
  loading?: boolean;

  behavior: {
    default: CSSObject;
    hover: CSSObject;
    active: CSSObject;
    disabled: CSSObject;
  };
} & Pick<CSSObject, 'width' | 'justifyContent' | 'fontSize' | 'lineHeight'>;

export type ButtonProps = {
  variant?: ButtonVariant;
  tooltip?: TooltipProps['content'];

  startAdornment?: ReactNode; // startIcon
  endAdornment?: ReactNode; // endIcon

  as?: ElementType;

  // equated?: boolean; определяется на основе typeof childred === string
  // mode?: keyof typeof buttonModes === variant inner | innerInput

  // type?: keyof typeof buttonTypes
} & QA & Partial<ButtonStyles> & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'> & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'color'>;

export type IconButtonProps = Omit<ButtonProps, 'startAdornment' | 'endAdornment'>;
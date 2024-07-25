import {AnchorHTMLAttributes, ButtonHTMLAttributes, CSSProperties, PropsWithChildren, ReactNode} from 'react';

import {QA} from 'common';
import {SizeTokenValue} from 'theme';

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

type ColorProps = Pick<CSSProperties, 'color' | 'backgroundColor' | 'borderColor'>;

export type ButtonStyles = {
  variant: ButtonVariant;
  size: SizeTokenValue;
  loading?: boolean;

  style: {
    default: ColorProps;
    hover: ColorProps;
    active: ColorProps;
    disabled: ColorProps;
  };
} & Pick<CSSProperties, 'width' | 'justifyContent' | 'fontSize' | 'lineHeight'>;

export type ButtonProps = {
  tooltip?: boolean;

  startAdornment?: ReactNode; // startIcon
  endAdornment?: ReactNode; // endIcon
  as: React.ElementType;

  // equated?: boolean; определяется на основе typeof childred === string
  // mode?: keyof typeof buttonModes === variant inner | innerInput

  // type?: keyof typeof buttonTypes
} & QA & Partial<ButtonStyles> & PropsWithChildren & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'> & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'color'>;

export type IconButtonProps = Omit<ButtonProps, 'startAdornment' | 'endAdornment'>;
import {QA} from 'common';
import {ButtonHTMLAttributes, CSSProperties, PropsWithChildren, ReactNode} from 'react';
import {SizeTokenValue} from 'theme';

export enum ButtonVariant {
  primary = 'primary',
  secondary = 'secondary',
  outlined = 'outlined',
  text = 'text',

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
} & Pick<CSSProperties, 'width' | 'justifyContent'>;

export type ButtonProps = {
  startAdornment?: ReactNode; // startIcon
  endAdornment?: ReactNode; // endIcon

  // equated?: boolean; определяется на основе typeof childred === string
  // mode?: keyof typeof buttonModes

  // type?: keyof typeof buttonTypes
} & QA & Partial<ButtonStyles> & PropsWithChildren & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'>;

export type IconButtonProps = Omit<ButtonProps, 'startAdornment' | 'endAdornment'>;
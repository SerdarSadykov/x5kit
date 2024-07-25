import {forwardRef} from 'react';
import styled, {CSSObject} from '@emotion/styled';

import {SizeTokenValue, theme} from 'theme';
import {Tooltip} from 'tooltip';

import {Loader} from './Loader';
import {Content} from './Content';
import {ButtonProps, ButtonStyles, ButtonVariant, IconButtonProps} from './types';

export const buttonVariantStyle: Record<ButtonVariant, ButtonStyles['style']> = {
  [ButtonVariant.primary]: {
    default: {
      color: theme.colors.white,
      backgroundColor: theme.colors.accent[90],
      borderColor: theme.colors.accent[90],
    },
    hover: {
      color: theme.colors.white,
      backgroundColor: theme.colors.accent[80],
      borderColor: theme.colors.accent[80],
    },
    active: {
      color: theme.colors.white,
      backgroundColor: theme.colors.accent[100],
      borderColor: theme.colors.accent[100],
    },
    disabled: {
      color: theme.colors.grey[40],
      backgroundColor: theme.colors.grey[20],
      borderColor: theme.colors.grey[20],
    },
  },

  [ButtonVariant.secondary]: {
    default: {
      color: theme.colors.grey[100],
      backgroundColor: theme.colors.grey[30],
      borderColor: theme.colors.grey[30],
    },
    hover: {
      color: theme.colors.grey[100],
      backgroundColor: theme.colors.grey[20],
      borderColor: theme.colors.grey[20],
    },
    active: {
      color: theme.colors.grey[100],
      backgroundColor: theme.colors.grey[40],
      borderColor: theme.colors.grey[40],
    },
    disabled: {
      color: theme.colors.grey[40],
      backgroundColor: theme.colors.grey[20],
      borderColor: theme.colors.grey[20],
    },
  },

  [ButtonVariant.outlined]: {
    default: {
      color: theme.colors.grey[100],
      backgroundColor: theme.colors.white,
      borderColor: theme.colors.grey[30],
    },
    hover: {
      color: theme.colors.grey[100],
      backgroundColor: theme.colors.grey[20],
      borderColor: theme.colors.grey[40],
    },
    active: {
      color: theme.colors.grey[100],
      backgroundColor: theme.colors.grey[40],
      borderColor: theme.colors.grey[40],
    },
    disabled: {
      color: theme.colors.grey[40],
      backgroundColor: theme.colors.white,
      borderColor: theme.colors.grey[20],
    },
  },

  [ButtonVariant.text]: {
    default: {
      color: theme.colors.accent[90],
      backgroundColor: 'transparent',
      borderColor: 'transparent',
    },
    hover: {
      color: theme.colors.accent[90],
      backgroundColor: theme.colors.accent[20],
      borderColor: theme.colors.accent[20],
    },
    active: {
      color: theme.colors.accent[90],
      backgroundColor: theme.colors.accent[30],
      borderColor: theme.colors.accent[30],
    },
    disabled: {
      color: theme.colors.grey[40],
      backgroundColor: 'transparent',
      borderColor: 'transparent',
    },
  },

  [ButtonVariant.inner]: {
    default: {
      color: theme.colors.grey[40],
      backgroundColor: 'transparent',
      borderColor: 'transparent',
    },
    hover: {
      color: theme.colors.grey[40],
      backgroundColor: theme.colors.grey[80],
      borderColor: theme.colors.grey[80],
    },
    active: {
      color: theme.colors.grey[40],
      backgroundColor: theme.colors.grey[60],
      borderColor: theme.colors.grey[60],
    },
    disabled: {
      color: theme.colors.grey[60],
      backgroundColor: 'transparent',
      borderColor: 'transparent',
    },
  },

  [ButtonVariant.innerInput]: {
    default: {
      color: theme.colors.grey[60],
      backgroundColor: 'transparent',
      borderColor: 'transparent',
    },
    hover: {
      color: theme.colors.grey[60],
      backgroundColor: theme.colors.grey[30],
      borderColor: theme.colors.grey[30],
    },
    active: {
      color: theme.colors.grey[40],
      backgroundColor: theme.colors.grey[40],
      borderColor: theme.colors.grey[40],
    },
    disabled: {
      color: theme.colors.grey[60],
      backgroundColor: 'transparent',
      borderColor: 'transparent',
    },
  },

  [ButtonVariant.dangerPrimary]: {
    default: {
      color: theme.colors.white,
      backgroundColor: theme.colors.red[80],
      borderColor: theme.colors.red[80],
    },
    hover: {
      color: theme.colors.white,
      backgroundColor: theme.colors.red[70],
      borderColor: theme.colors.red[70],
    },
    active: {
      color: theme.colors.white,
      backgroundColor: theme.colors.red[90],
      borderColor: theme.colors.red[90],
    },
    disabled: {
      color: theme.colors.grey[40],
      backgroundColor: theme.colors.grey[20],
      borderColor: theme.colors.grey[20],
    },
  },

  [ButtonVariant.dangerSecondary]: {
    default: {
      color: theme.colors.red[80],
      backgroundColor: theme.colors.red[20],
      borderColor: theme.colors.red[20],
    },
    hover: {
      color: theme.colors.red[80],
      backgroundColor: theme.colors.red[10],
      borderColor: theme.colors.red[10],
    },
    active: {
      color: theme.colors.red[80],
      backgroundColor: theme.colors.red[30],
      borderColor: theme.colors.red[30],
    },
    disabled: {
      color: theme.colors.grey[40],
      backgroundColor: theme.colors.grey[20],
      borderColor: theme.colors.grey[20],
    },
  },

  [ButtonVariant.dangerOutlined]: {
    default: {
      color: theme.colors.red[80],
      backgroundColor: theme.colors.white,
      borderColor: theme.colors.red[80],
    },
    hover: {
      color: theme.colors.red[80],
      backgroundColor: theme.colors.red[10],
      borderColor: theme.colors.red[80],
    },
    active: {
      color: theme.colors.red[80],
      backgroundColor: theme.colors.red[30],
      borderColor: theme.colors.red[80],
    },
    disabled: {
      color: theme.colors.grey[40],
      backgroundColor: theme.colors.white,
      borderColor: theme.colors.grey[20],
    },
  },

  [ButtonVariant.dangerText]: {
    default: {
      color: theme.colors.red[80],
      backgroundColor: 'transparent',
      borderColor: 'transparent',
    },
    hover: {
      color: theme.colors.red[80],
      backgroundColor: theme.colors.red[10],
      borderColor: theme.colors.red[10],
    },
    active: {
      color: theme.colors.red[80],
      backgroundColor: theme.colors.red[30],
      borderColor: theme.colors.red[30],
    },
    disabled: {
      color: theme.colors.grey[40],
      backgroundColor: 'transparent',
      borderColor: 'transparent',
    },
  },
};

const buttonSize: Record<SizeTokenValue, CSSObject> = {
  [SizeTokenValue.Large]: {
    minHeight: 48,
    padding: '12px 16px',
  },

  [SizeTokenValue.Medium]: {
    minHeight: 40,
    padding: '8px 12px',
  },

  [SizeTokenValue.Small]: {
    minHeight: 32,
    padding: '4px 8px',
  },

  [SizeTokenValue.XSmall]: {
    minHeight: 24,
    padding: '4px',
  },

  [SizeTokenValue.XXSmall]: {
    minHeight: 16,
    padding: 0,
  },
};

const iconButtonSize: Record<SizeTokenValue, CSSObject> = {
  [SizeTokenValue.Large]: {
    minHeight: 48,
    minWidth: 48,
    padding: 12,
  },

  [SizeTokenValue.Medium]: {
    minHeight: 40,
    minWidth: 40,
    padding: 8,
  },

  [SizeTokenValue.Small]: {
    minHeight: 32,
    minWidth: 32,
    padding: 4,
  },

  [SizeTokenValue.XSmall]: {
    minHeight: 24,
    minWidth: 24,
    padding: 4,
  },

  [SizeTokenValue.XXSmall]: {
    minHeight: 16,
    minWidth: 16,
    padding: 0,
  },
};

const ButtonComponent = styled.button<ButtonStyles>`
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 2px;
  justify-content: center;
  box-sizing: border-box;
  border-width: 1px;
  border-style: solid;
  border-radius: 4px;
  cursor: pointer;
  outline: none;
  text-decoration: none;

  ${({
    width,
    justifyContent,
    size,
    style,

    fontSize = theme.typography.p1.fontSize,
    lineHeight = theme.typography.p1.lineHeight,
  }) => {
    return {
      width,
      justifyContent,

      ...style.default,
      ...buttonSize[size],
      ...theme.typography.p1,

      fontSize,
      lineHeight,
    };
  }}

  :hover {
    ${props => props.style.hover}
  }

  :active {
    ${props => props.style.active}
  }

  :focus-visible::after {
    content: '';
    display: block;
    position: absolute;
    box-sizing: border-box;
    top: -2px;
    left: -2px;
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    border-radius: 4px;
    box-shadow: 0px 0px 3px 2px ${theme.colors.accent[70]};
  }

  :visited {
    ${props => props.style.default}
  }

  &[disabled] {
    ${props => props.style.disabled}
  }
`;

const IconButtonComponent = styled(ButtonComponent)(props => iconButtonSize[props.size]);

const BaseButton = forwardRef<
  HTMLButtonElement,
  ButtonProps & {component: typeof ButtonComponent | typeof IconButtonComponent}
>((props, ref) => {
  const {
    children,
    tooltip,
    style,
    loading,
    component: Component,

    variant = ButtonVariant.primary,
    size = SizeTokenValue.Large,

    ...rest
  } = props;

  const buttonStyles: ButtonStyles = {
    variant,
    size,
    loading,
    style: style ?? buttonVariantStyle[variant],
  };

  const child = (
    <Component ref={ref} {...rest} {...buttonStyles}>
      <Loader {...buttonStyles} />
      {children}
    </Component>
  );

  if (tooltip) {
    return <Tooltip content={tooltip}>{child}</Tooltip>;
  }

  return child;
});

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {children, startAdornment, endAdornment} = props;

  return (
    <BaseButton ref={ref} component={ButtonComponent} {...props}>
      {startAdornment}

      <Content>{children}</Content>

      {endAdornment}
    </BaseButton>
  );
});

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>((props, ref) => {
  const {children, loading} = props;

  return (
    <BaseButton ref={ref} component={IconButtonComponent} {...props}>
      {!loading && children}
    </BaseButton>
  );
});

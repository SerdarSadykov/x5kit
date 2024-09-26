import styled, {CSSObject} from '@emotion/styled';

import {SizeTokenValue, theme} from 'theme';

import {BadgeProps, BadgeStyles, BadgeVariant} from './types';

const sizeProps: Partial<Record<SizeTokenValue, CSSObject>> = {
  [SizeTokenValue.Large]: {
    minWidth: 20,
    minHeight: 20,
    borderRadius: 11,
    padding: '0 6px',
  },
  [SizeTokenValue.Medium]: {
    minWidth: 16,
    minHeight: 16,
    borderRadius: 17,
    padding: '0 4px',
  },
  [SizeTokenValue.Small]: {
    minWidth: 12,
    minHeight: 12,
    borderRadius: 13,
    padding: '0 3px',
    fontSize: '10px',
  },
};

const variantColor: Record<BadgeVariant, CSSObject> = {
  [BadgeVariant.red]: {
    color: theme.colors.white,
    backgroundColor: theme.colors.additional.red[80],
  },

  [BadgeVariant.accent]: {
    color: theme.colors.white,
    backgroundColor: theme.colors.accent[90],
  },

  [BadgeVariant.grey]: {
    color: theme.colors.grey[100],
    backgroundColor: theme.colors.grey[30],
  },

  [BadgeVariant.disabled]: {
    color: theme.colors.grey[40],
    backgroundColor: theme.colors.grey[20],
  },
};

const Container = styled.div<BadgeStyles>`
  display: flex;
  position: relative;
  box-sizing: border-box;
  text-align: center;
  user-select: none;
  align-items: center;
  justify-content: center;
  line-height: 0 !important;
  outline-style: solid;
  outline-width: 2px;

  ${({variant, size, hasStroke, ...props}) => {
    const variantProps = variantColor[variant];

    const color = props.color ?? variantProps.color;
    const backgroundColor = props.backgroundColor ?? variantProps.backgroundColor;
    const borderColor = props.borderColor ?? variantProps.borderColor;

    return {
      ...sizeProps[size],
      ...theme.typography.p3,

      color,
      backgroundColor,
      borderColor,

      outlineColor: hasStroke ? borderColor : 'transparent',
    };
  }}
`;

export const Badge: React.FC<BadgeProps> = props => {
  const {
    variant = BadgeVariant.red,
    size = SizeTokenValue.Medium,
    borderColor = theme.colors.grey[10],

    ...rest
  } = props;

  const containerProps = {size, borderColor, variant, ...rest};

  return <Container {...containerProps} />;
};

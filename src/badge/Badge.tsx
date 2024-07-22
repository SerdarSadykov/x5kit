import styled, {CSSObject} from '@emotion/styled';

import {SizeTokenValue, theme} from 'theme';

import {BadgeProps, BadgeVariant} from './types';

const sizeWidth: Record<SizeTokenValue, number> = {
  [SizeTokenValue.Large]: 20,
  [SizeTokenValue.Medium]: 16,
  [SizeTokenValue.Small]: 12,
};

const Container = styled.div<BadgeProps & Required<Pick<BadgeProps, 'size'>>>`
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

  ${({size}) => {
    const minWidth = typeof size === 'number' ? size : sizeWidth[size];

    const add: CSSObject = {
      minWidth,
      minHeight: minWidth,
      borderRadius: minWidth / 2 + 1,

      ...theme.typography.p3,
    };

    switch (size) {
      case SizeTokenValue.Large:
        add.padding = '0 6px';
        break;

      case SizeTokenValue.Medium:
        add.padding = '0 4px';
        break;

      case SizeTokenValue.Small:
        add.padding = '0 3px';
        add.fontSize = '10px';
        break;
    }

    return add;
  }}

  ${({variant, hasStroke, color, backgroundColor, borderColor = theme.colors.grey[10]}) => {
    switch (variant) {
      case BadgeVariant.accent:
        color ??= theme.colors.white;
        backgroundColor ??= theme.colors.accent[90];
        break;

      case BadgeVariant.grey:
        color ??= theme.colors.grey[100];
        backgroundColor ??= theme.colors.grey[30];
        break;

      case BadgeVariant.disabled:
        color ??= theme.colors.grey[40];
        backgroundColor ??= theme.colors.grey[20];
        break;

      default:
        color ??= theme.colors.white;
        backgroundColor ??= theme.colors.additional.red[80];
        break;
    }

    return {
      color,
      backgroundColor,
      outlineColor: hasStroke ? borderColor : 'transparent',
    };
  }}
`;

export const Badge: React.FC<BadgeProps> = props => {
  const {children, size = SizeTokenValue.Medium, ...rest} = props;

  return (
    <Container {...rest} size={size}>
      {children}
    </Container>
  );
};

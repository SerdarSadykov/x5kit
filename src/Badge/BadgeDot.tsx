import styled from '@emotion/styled';

import {theme} from 'theme';

import {BadgeDotSize, BadgeVariant} from './types';

import type {BadgeDotProps} from './types';

const sizeWidth: Record<BadgeDotSize, number> = {
  [BadgeDotSize.l]: 12,
  [BadgeDotSize.m]: 10,
  [BadgeDotSize.s]: 8,
  [BadgeDotSize.xs]: 6,
};

const Container = styled.div<BadgeDotProps & Required<Pick<BadgeDotProps, 'size'>>>`
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
  border-radius: 50%;

  ${({variant, size, hasStroke, color, backgroundColor, borderColor = theme.colors.grey[10]}) => {
    const minWidth = sizeWidth[size];

    switch (variant) {
      case BadgeVariant.accent:
        backgroundColor ??= theme.colors.accent[90];
        break;

      case BadgeVariant.grey:
        backgroundColor ??= theme.colors.grey[30];
        break;

      case BadgeVariant.disabled:
        backgroundColor ??= theme.colors.grey[20];
        break;

      default:
        backgroundColor ??= theme.colors.additional.red[80];
        break;
    }

    return {
      color,
      backgroundColor,
      outlineColor: hasStroke ? borderColor : 'transparent',

      minWidth,
      minHeight: minWidth,
    };
  }}
`;

export const BadgeDot: React.FC<BadgeDotProps> = props => {
  const {size = BadgeDotSize.m, qa = 'badge-dot', ...rest} = props;

  return <Container data-qa={qa} {...rest} size={size} />;
};

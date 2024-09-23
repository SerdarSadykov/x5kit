import {keyframes} from '@emotion/react';
import styled from '@emotion/styled';

import {theme} from 'theme';

import {LoaderProps} from './types';

export const progressKeyframe = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`;
export const dashKeyframe = keyframes`
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0;
  }
  
  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }
  
  100% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -125px;
  }
`;

export const StyledRoot = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  color: ${theme.colors.accent[90]};
`;

export const StyledSvg = styled.svg`
  display: block;
`;

export const StyledCircle = styled.circle`
  stroke: currentColor;
  stroke-dasharray: 80px, 200px;
  stroke-dashoffset: 0;
  animation: ${dashKeyframe} 1.4s ease-in-out infinite;
`;

export const StyledContainer = styled.div<LoaderProps>`
  display: inline-block;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  animation: ${progressKeyframe} 1.4s ease-in-out infinite;
`;

export const StyledMessage = styled.div`
  margin-top: ${theme.spaces.x4};
  padding: ${theme.spaces.x4};
  color: ${theme.colors.grey[100]};
  ${...theme.typography.p1},
`;

export const StyledInner = restyled.div(({theme}) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  [`.${classes.item} &`]: {
    marginRight: theme.spaces.x5,
  },
}));

// export const StyledItem = restyled.div(({theme}) => ({
//   display: 'flex',
//   alignItems: 'center',
//   padding: theme.spaces.join('x3', 'x6'),
//   color: theme.colors.grey[40],
// }));

// export const StyledBlock = restyled.div(({theme}) => ({
//   position: 'absolute',
//   width: '100%',
//   height: '100%',
//   left: 0,
//   top: 0,
//   backgroundColor: theme.colors.white,
//   zIndex: theme.zIndex.loader,
// }));

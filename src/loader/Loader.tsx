import styled from '@emotion/styled';
import {keyframes} from '@emotion/react';

import {theme, SizeTokenValue} from 'theme';

import {LoaderProps} from './types';

const progressKeyframe = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`;

const dashKeyframe = keyframes`
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

const SVG = styled.svg`
  display: block;
  color: currentColor;
`;

const Circle = styled.circle`
  stroke: currentColor;
  stroke-dasharray: 80px, 200px;
  stroke-dashoffset: 0;
  animation: ${dashKeyframe} 1.4s ease-in-out infinite;
`;

const Rotation = styled.div<LoaderProps>`
  animation: ${progressKeyframe} 1.4s ease-in-out infinite;

  ${({size, color}) => {
    switch (size) {
      case SizeTokenValue.Large:
        size = 48;
        break;
      case SizeTokenValue.Medium:
        size = 24;
        break;
      case SizeTokenValue.Small:
        size = 16;
        break;
    }

    return {color, width: size, height: size};
  }}
`;

export const Loader: React.FC<LoaderProps> = props => {
  const {size = SizeTokenValue.Medium, color = theme.colors.accent[90], qa = 'loader'} = props;

  return (
    <Rotation data-qa={qa} size={size} color={color}>
      <SVG viewBox="22 22 44 44">
        <Circle cx="44" cy="44" r="20" fill="none" strokeWidth="3.6" />
      </SVG>
    </Rotation>
  );
};

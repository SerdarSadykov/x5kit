import {PropsWithChildren} from 'react';
import styled from '@emotion/styled';
import {keyframes} from '@emotion/react';

import {QA, getQAAttribute} from 'common';
import {theme, SizeTokenValue} from 'theme';

export type LoaderProps = {
  size?: SizeTokenValue | number;
} & QA &
  PropsWithChildren;

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

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
`;

const SVG = styled.svg`
  display: block;
  color: ${theme.colors.accent[90]};
`;

const Circle = styled.circle`
  stroke: currentColor;
  stroke-dasharray: 80px, 200px;
  stroke-dashoffset: 0;
  animation: ${dashKeyframe} 1.4s ease-in-out infinite;
`;

const Rotation = styled.div<LoaderProps>`
  display: inline-block;
  animation: ${progressKeyframe} 1.4s ease-in-out infinite;

  ${({size}) => {
    const width = typeof size === 'number' ? size : size === SizeTokenValue.Small ? 16 : 24;

    return {width, height: width};
  }}
`;

export const Loader: React.FC<LoaderProps> = ({children, size = SizeTokenValue.Medium, qa = 'loader'}) => {
  const getQA = getQAAttribute(qa);

  return (
    <Container data-qa={getQA()}>
      <Rotation data-qa={getQA('container')} size={size}>
        <SVG viewBox="22 22 44 44">
          <Circle cx="44" cy="44" r="20" fill="none" strokeWidth="3.6" />
        </SVG>
      </Rotation>
      {children}
    </Container>
  );
};

export default Loader;

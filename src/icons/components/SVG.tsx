import {forwardRef} from 'react';

import {SizeTokenValue} from 'theme';

import type {IconProps} from '../types';

export const SVG = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  const {name, size = SizeTokenValue.Large, color = 'currentColor', ...restProps} = props;
  let {width, height, viewBox} = props;

  switch (size) {
    case SizeTokenValue.Large:
    case SizeTokenValue.Medium:
      width ??= 24;
      height ??= 24;
      break;

    case SizeTokenValue.Small:
      width ??= 16;
      height ??= 16;
      break;

    case SizeTokenValue.XSmall:
    case SizeTokenValue.XXSmall:
      width ??= 12;
      height ??= 12;
      break;

    default:
      width ??= size;
      height ??= size;
  }

  viewBox ??= `0 0 ${width} ${height}`;

  return (
    <svg
      ref={ref}
      fill={color}
      data-qa={`${name}Icon`}
      width={`${width}px`}
      height={`${height}px`}
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      {...restProps}
    />
  );
});

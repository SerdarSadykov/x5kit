import {forwardRef} from 'react';

import {SizeTokenValue} from 'theme';

import {IconProps} from '../types';

export const SVG = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  const {name, size = SizeTokenValue.Large, color = 'currentColor', ...restProps} = props;

  let w = size;

  switch (size) {
    case SizeTokenValue.Large:
    case SizeTokenValue.Medium:
      w = 24;
      break;

    case SizeTokenValue.Small:
    case SizeTokenValue.XSmall:
    case SizeTokenValue.XXSmall:
      w = 16;
      break;
  }

  return (
    <svg
      ref={ref}
      fill={color}
      data-qa={`${name}Icon`}
      width={`${w}px`}
      height={`${w}px`}
      viewBox={`0 0 ${w} ${w}`}
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      {...restProps}
    />
  );
});

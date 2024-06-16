import {forwardRef} from 'react';

import {SizeTokenValue} from 'theme';

import {IconProps} from '../types';

export const SVGComponent = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  const {name, size = SizeTokenValue.Large, color = 'currentColor', ...restProps} = props;

  const w = typeof size === 'number' ? size : (size === SizeTokenValue.Small ? 16 : 24);

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

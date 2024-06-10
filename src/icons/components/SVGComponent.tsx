import {forwardRef} from 'react';

import {SizeTokenValue} from 'tokens';

import {IconProps} from '../types';

export const SVGComponent = forwardRef<SVGSVGElement, IconProps>((props, ref) => {
  const {name, size = SizeTokenValue.Large, color = 'currentColor', ...restProps} = props;

  const w = size === SizeTokenValue.Small ? 16 : 24;

  return (
    <svg
      data-qa={`Icon`}
      ref={ref}
      width={`${w}px`}
      height={`${w}px`}
      fill={color}
      viewBox={`0 0 ${w} ${w}`}
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      {...restProps}
    />
  );
});

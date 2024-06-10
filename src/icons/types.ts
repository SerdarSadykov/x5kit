import {forwardRef} from 'react';

import {SizeTokenValue} from 'tokens';

export type IconProps = React.SVGProps<SVGSVGElement> & {
  size?: SizeTokenValue;
  color?: string;
  name?: string;
};

export type IconComponent = ReturnType<typeof forwardRef<SVGSVGElement, IconProps>>;

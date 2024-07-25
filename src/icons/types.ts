import {forwardRef} from 'react';

import {SizeTokenValue} from 'theme';

export type IconProps = React.SVGProps<SVGSVGElement> & {
  size?: number | SizeTokenValue;
  color?: string;
};

export type IconComponent = ReturnType<typeof forwardRef<SVGSVGElement, IconProps>>;

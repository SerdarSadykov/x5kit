import {forwardRef} from 'react';

import {SizeTokenValue} from 'theme';

export type IconProps = React.SVGProps<SVGSVGElement> & {
  size?: SizeTokenValue | number;
  color?: string;
};

export type IconComponent = ReturnType<typeof forwardRef<SVGSVGElement, IconProps>>;

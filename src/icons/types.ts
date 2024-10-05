import type {forwardRef} from 'react';

import type {SizeTokenValue} from 'theme';

export type IconProps = React.SVGProps<SVGSVGElement> & {
  size?: number | SizeTokenValue;
  color?: string;
};

export type IconComponent = ReturnType<typeof forwardRef<SVGSVGElement, IconProps>>;

import {forwardRef} from 'react';

import {SizeTokenValue} from 'theme';
import {IconComponent} from 'icons/types';

import {SVG} from './SVG';

const largeIcon = <circle cx="12" cy="12" r="6" />

const smallIcon = (
  <path d="M11 8C11 9.65685 9.65685 11 8 11C6.34315 11 5 9.65685 5 8C5 6.34315 6.34315 5 8 5C9.65685 5 11 6.34315 11 8Z" />
)

export const Marker: IconComponent = forwardRef((props, ref) => {
  const {size} = props;

  return (
    <SVG ref={ref} name="Marker" {...props}>
      {!size || size === SizeTokenValue.Large || size === SizeTokenValue.Medium ? largeIcon : smallIcon}
    </SVG>
  );
});


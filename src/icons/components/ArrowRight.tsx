import {forwardRef} from 'react';

import {SizeTokenValue} from 'theme';

import type {IconComponent} from '../types';

import {SVG} from './SVG';

const largeIcon = (
  <path d="M11.565 7.06496L15.45 10.95C16.035 11.535 16.035 12.48 15.45 13.065L11.565 16.95C10.62 17.895 9 17.22 9 15.885L9 8.11495C9 6.77995 10.62 6.11995 11.565 7.06496Z" />
)

const smallIcon = (
  <path d="M6 5.11344L6 10.8866C6 11.318 6.50973 11.5469 6.83218 11.2603L10.0796 8.37372C10.3033 8.17483 10.3033 7.82521 10.0796 7.62631L6.83218 4.73973C6.50973 4.45311 6 4.68201 6 5.11344Z" />
)

export const ArrowRight: IconComponent = forwardRef((props, ref) => {
  const {size} = props;

  return (
    <SVG ref={ref} name={ArrowRight.name} {...props}>
      {size === SizeTokenValue.Small ? smallIcon : largeIcon}
    </SVG>
  );
});


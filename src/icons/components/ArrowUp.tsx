import {forwardRef} from 'react';

import {SizeTokenValue} from 'tokens';

import type {IconComponent} from '../types';

import {SVGComponent} from './SVGComponent';

const largeIcon = (
  <path d="M7.06495 12.435L10.95 8.55C11.535 7.965 12.48 7.965 13.065 8.55L16.95 12.435C17.895 13.38 17.22 15 15.885 15L8.11495 15C6.77995 15 6.11995 13.38 7.06495 12.435Z" />
)

const smallIcon = (
  <path d="M5.11341 10L10.8866 10C11.318 10 11.5469 9.49027 11.2603 9.16782L8.37369 5.92042C8.1748 5.69666 7.82518 5.69666 7.62628 5.92042L4.7397 9.16782C4.45308 9.49027 4.68198 10 5.11341 10Z" />
)

export const ArrowUp: IconComponent = forwardRef((props, ref) => {
  const {size} = props;

  return (
    <SVGComponent ref={ref} {...props}>
      {size === SizeTokenValue.Small ? smallIcon : largeIcon}
    </SVGComponent>
  );
});


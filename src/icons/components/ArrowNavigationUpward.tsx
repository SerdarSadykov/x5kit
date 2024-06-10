import {forwardRef} from 'react';

import {SizeTokenValue} from 'tokens';

import type {IconComponent} from '../types';

import {SVGComponent} from './SVGComponent';

const largeIcon = (
  <path d="m13 19v-11.17l4.88 4.88c0.39 0.39 1.03 0.39 1.42 0s0.39-1.02 0-1.41l-6.59-6.59c-0.39-0.39-1.02-0.39-1.41 0l-6.6 6.58c-0.39 0.39-0.39 1.02 0 1.41s1.02 0.39 1.41 0l4.89-4.87v11.17c0 0.55 0.45 1 1 1s1-0.45 1-1z" />
)

const smallIcon = (
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M3.89957 7.89957C3.67893 8.12022 3.32119 8.12022 3.10054 7.89957C2.8799 7.67893 2.8799 7.32119 3.10054 7.10054L7.10054 3.10054C7.32119 2.8799 7.67893 2.8799 7.89957 3.10054L11.8996 7.10054C12.1202 7.32119 12.1202 7.67893 11.8996 7.89957C11.6789 8.12022 11.3212 8.12022 11.1005 7.89957L8.06506 4.86409L8.06506 13.0001C8.06506 13.3121 7.8121 13.5651 7.50006 13.5651C7.18802 13.5651 6.93506 13.3121 6.93506 13.0001L6.93506 4.86409L3.89957 7.89957Z"
  />
)

export const ArrowNavigationUpward: IconComponent = forwardRef((props, ref) => {
  const {size} = props;

  return (
    <SVGComponent ref={ref} {...props}>
      {size === SizeTokenValue.Small ? smallIcon : largeIcon}
    </SVGComponent>
  );
});


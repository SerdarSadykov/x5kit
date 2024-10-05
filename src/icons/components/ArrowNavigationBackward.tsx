import {forwardRef} from 'react';

import {SizeTokenValue} from 'theme';

import {SVG} from './SVG';

import type {IconComponent} from '../types';

const largeIcon = (
  <path d="m19 11h-11.17l4.88-4.88c0.39-0.39 0.39-1.03 0-1.42s-1.02-0.39-1.41 0l-6.59 6.59c-0.39 0.39-0.39 1.02 0 1.41l6.59 6.59c0.39 0.39 1.02 0.39 1.41 0s0.39-1.02 0-1.41l-4.88-4.88h11.17c0.55 0 1-0.45 1-1s-0.45-1-1-1z" />
);

const smallIcon = (
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M7.89957 3.89957C8.12022 3.67893 8.12022 3.32119 7.89957 3.10054C7.67893 2.8799 7.32119 2.8799 7.10054 3.10054L3.10054 7.10054C2.8799 7.32119 2.8799 7.67893 3.10054 7.89957L7.10054 11.8996C7.32119 12.1202 7.67893 12.1202 7.89957 11.8996C8.12022 11.6789 8.12022 11.3212 7.89957 11.1005L4.86409 8.06506H13.0001C13.3121 8.06506 13.5651 7.8121 13.5651 7.50006C13.5651 7.18802 13.3121 6.93506 13.0001 6.93506H4.86409L7.89957 3.89957Z"
  />
);

export const ArrowNavigationBackward: IconComponent = forwardRef((props, ref) => {
  const {size} = props;

  return (
    <SVG ref={ref} name="ArrowNavigationBackward" {...props}>
      {!size || size === SizeTokenValue.Large || size === SizeTokenValue.Medium ? largeIcon : smallIcon}
    </SVG>
  );
});

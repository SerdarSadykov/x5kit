import {forwardRef} from 'react';

import {SizeTokenValue} from 'theme';

import type {IconComponent} from '../types';

import {SVG} from './SVG';

const largeIcon = (
  <path d="m5 13h11.17l-4.88 4.88c-0.39 0.39-0.39 1.03 0 1.42s1.02 0.39 1.41 0l6.59-6.59c0.39-0.39 0.39-1.02 0-1.41l-6.58-6.6c-0.39-0.39-1.02-0.39-1.41 0s-0.39 1.02 0 1.41l4.87 4.89h-11.17c-0.55 0-1 0.45-1 1s0.45 1 1 1z" />
)

const smallIcon = (
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M8.10042 3.89957C7.87977 3.67893 7.87977 3.32119 8.10042 3.10054C8.32107 2.8799 8.6788 2.8799 8.89945 3.10054L12.8995 7.10054C13.1201 7.32119 13.1201 7.67893 12.8995 7.89957L8.89945 11.8996C8.6788 12.1202 8.32107 12.1202 8.10042 11.8996C7.87977 11.6789 7.87977 11.3212 8.10042 11.1005L11.1359 8.06506H2.99994C2.6879 8.06506 2.43494 7.8121 2.43494 7.50006C2.43494 7.18802 2.6879 6.93506 2.99994 6.93506H11.1359L8.10042 3.89957Z"
  />
)

export const ArrowNavigationForward: IconComponent = forwardRef((props, ref) => {
  const {size} = props;

  return (
    <SVG ref={ref} name="ArrowNavigationForward" {...props}>
      {!size || size === SizeTokenValue.Large || size === SizeTokenValue.Medium ? largeIcon : smallIcon}
    </SVG>
  );
});


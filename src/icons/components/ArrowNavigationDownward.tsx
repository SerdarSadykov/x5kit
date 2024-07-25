import {forwardRef} from 'react';

import {SizeTokenValue} from 'theme';

import type {IconComponent} from '../types';

import {SVG} from './SVG';

const largeIcon = (
  <path d="m11 5v11.17l-4.88-4.88c-0.39-0.39-1.03-0.39-1.42 0s-0.39 1.02 0 1.41l6.59 6.59c0.39 0.39 1.02 0.39 1.41 0l6.59-6.59c0.39-0.39 0.39-1.02 0-1.41s-1.02-0.39-1.41 0l-4.88 4.88v-11.17c0-0.55-0.45-1-1-1s-1 0.45-1 1z" />
)

const smallIcon = (
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M8.06494 11.1359V2.99994C8.06494 2.6879 7.81198 2.43494 7.49994 2.43494C7.1879 2.43494 6.93494 2.6879 6.93494 2.99994V11.1359L3.89945 8.10042C3.67881 7.87977 3.32107 7.87977 3.10042 8.10042C2.87977 8.32107 2.87977 8.6788 3.10042 8.89945L7.10042 12.8995C7.32107 13.1201 7.6788 13.1201 7.89945 12.8995L11.8995 8.89945C12.1201 8.6788 12.1201 8.32107 11.8995 8.10042C11.6788 7.87977 11.3211 7.87977 11.1004 8.10042L8.06494 11.1359Z"
  />
)

export const ArrowNavigationDownward: IconComponent = forwardRef((props, ref) => {
  const {size} = props;

  return (
    <SVG ref={ref} name="ArrowNavigationDownward" {...props}>
      {!size || size === SizeTokenValue.Large || size === SizeTokenValue.Medium ? largeIcon : smallIcon}
    </SVG>
  );
});


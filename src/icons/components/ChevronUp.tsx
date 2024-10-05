import {forwardRef} from 'react';

import {SizeTokenValue} from 'theme';

import {SVG} from './SVG';

import type {IconComponent} from '../types';

const largeIcon = (
  <path d="M8.12998 15.29L12.01 11.41L15.89 15.29C16.28 15.68 16.91 15.68 17.3 15.29C17.69 14.9 17.69 14.27 17.3 13.88L12.71 9.29002C12.32 8.90002 11.69 8.90002 11.3 9.29002L6.70998 13.88C6.31998 14.27 6.31998 14.9 6.70998 15.29C7.09998 15.67 7.73998 15.68 8.12998 15.29Z" />
);

const smallIcon = (
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M4.10048 9.89957C4.32113 10.1202 4.67887 10.1202 4.89951 9.89957L8 6.79909L11.1005 9.89957C11.3211 10.1202 11.6789 10.1202 11.8995 9.89957C12.1202 9.67893 12.1202 9.32119 11.8995 9.10054L8.39951 5.60054C8.29355 5.49459 8.14985 5.43506 8 5.43506C7.85015 5.43506 7.70644 5.49459 7.60048 5.60054L4.10048 9.10054C3.87984 9.32119 3.87984 9.67893 4.10048 9.89957Z"
  />
);

export const ChevronUp: IconComponent = forwardRef((props, ref) => {
  const {size} = props;

  return (
    <SVG ref={ref} name="ChevronUp" {...props}>
      {!size || size === SizeTokenValue.Large || size === SizeTokenValue.Medium ? largeIcon : smallIcon}
    </SVG>
  );
});

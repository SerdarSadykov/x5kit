import {forwardRef} from 'react';

import {SizeTokenValue} from 'theme';
import {IconComponent} from 'icons/types';

import {SVG} from './SVG';

const largeIcon = (
  <path d="m12 7c0.55 0 1 0.45 1 1v4c0 0.55-0.45 1-1 1s-1-0.45-1-1v-4c0-0.55 0.45-1 1-1zm-0.01-5c-5.52 0-9.99 4.48-9.99 10s4.47 10 9.99 10c5.53 0 10.01-4.48 10.01-10s-4.48-10-10.01-10zm0.01 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm1-3h-2v-2h2v2z" />
)

const smallIcon = (
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M8.5 12.87C11.4658 12.87 13.87 10.4658 13.87 7.5C13.87 4.53423 11.4658 2.13 8.5 2.13C5.53423 2.13 3.13 4.53423 3.13 7.5C3.13 10.4658 5.53423 12.87 8.5 12.87ZM8.5 14C12.0899 14 15 11.0899 15 7.5C15 3.91015 12.0899 1 8.5 1C4.91015 1 2 3.91015 2 7.5C2 11.0899 4.91015 14 8.5 14ZM8.50006 3.93506C8.8121 3.93506 9.06506 4.18802 9.06506 4.50006V8.00006C9.06506 8.3121 8.8121 8.56506 8.50006 8.56506C8.18802 8.56506 7.93506 8.3121 7.93506 8.00006V4.50006C7.93506 4.18802 8.18802 3.93506 8.50006 3.93506ZM8.51495 11.08C8.82699 11.08 9.07995 10.827 9.07995 10.515C9.07995 10.2029 8.82699 9.94995 8.51495 9.94995C8.20291 9.94995 7.94995 10.2029 7.94995 10.515C7.94995 10.827 8.20291 11.08 8.51495 11.08Z"
  />
)

export const Error: IconComponent = forwardRef((props, ref) => {
  const {size} = props;

  return (
    <SVG ref={ref} name="Error" {...props}>
      {!size || size === SizeTokenValue.Large || size === SizeTokenValue.Medium ? largeIcon : smallIcon}
    </SVG>
  );
});


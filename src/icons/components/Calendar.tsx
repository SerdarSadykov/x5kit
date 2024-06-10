import {forwardRef} from 'react';

import {SizeTokenValue} from 'tokens';

import type {IconComponent} from '../types';

import {SVGComponent} from './SVGComponent';

const largeIcon = (
  <path d="M7 11H9V13H7V11ZM21 6V20C21 21.1 20.1 22 19 22H5C3.89 22 3 21.1 3 20L3.01 6C3.01 4.9 3.89 4 5 4H6V2H8V4H16V2H18V4H19C20.1 4 21 4.9 21 6ZM5 8H19V6H5V8ZM19 20V10H5V20H19ZM15 13H17V11H15V13ZM11 13H13V11H11V13Z" />
)

const smallIcon = (
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M5 1.565C5 1.25296 5.25296 1 5.565 1C5.87704 1 6.13 1.25296 6.13 1.565V2H10V1.565C10 1.25296 10.253 1 10.565 1C10.877 1 11.13 1.25296 11.13 1.565V2H12C13.1046 2 14 2.89543 14 4V12C14 13.1046 13.1046 14 12 14H4C2.89543 14 2 13.1046 2 12V4C2 2.89543 2.89543 2 4 2H5V1.565ZM5 3.13H4C3.51951 3.13 3.13 3.51951 3.13 4V6H4H12H12.87V4C12.87 3.51951 12.4805 3.13 12 3.13H11.13V3.435C11.13 3.74704 10.877 4 10.565 4C10.253 4 10 3.74704 10 3.435V3.13H6.13V3.435C6.13 3.74704 5.87704 4 5.565 4C5.25296 4 5 3.74704 5 3.435V3.13ZM12.87 7.13H12H4H3.13V12C3.13 12.4805 3.51951 12.87 4 12.87H12C12.4805 12.87 12.87 12.4805 12.87 12V7.13Z"
  />
)

export const Calendar: IconComponent = forwardRef((props, ref) => {
  const {size} = props;

  return (
    <SVGComponent ref={ref} name={Calendar.name} {...props}>
      {size === SizeTokenValue.Small ? smallIcon : largeIcon}
    </SVGComponent>
  );
});


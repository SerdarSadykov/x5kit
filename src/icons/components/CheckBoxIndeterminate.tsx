import {forwardRef} from 'react';

import {SizeTokenValue} from 'tokens';

import type {IconComponent} from '../types';

import {SVGComponent} from './SVGComponent';

const largeIcon = [
  <path
    key="1"
    d="M0 2C0 0.89543 0.895431 0 2 0H22C23.1046 0 24 0.895431 24 2V22C24 23.1046 23.1046 24 22 24H2C0.89543 24 0 23.1046 0 22V2Z"
  />,
  <rect key="2" x="4.5" y="10.5" width="15" height="3" rx="1.5" fill="white" />,
]

export const CheckBoxIndeterminate: IconComponent = forwardRef((props, ref) => {
  return (
    <SVGComponent ref={ref} {...props}>
      {largeIcon}
    </SVGComponent>
  );
});


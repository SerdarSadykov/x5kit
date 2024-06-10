import {forwardRef} from 'react';

import {SizeTokenValue} from 'tokens';

import type {IconComponent} from '../types';

import {SVGComponent} from './SVGComponent';

const largeIcon = [
  <path
    key="1"
    d="M0 2C0 0.89543 0.895431 0 2 0H22C23.1046 0 24 0.895431 24 2V22C24 23.1046 23.1046 24 22 24H2C0.89543 24 0 23.1046 0 22V2Z"
  />,
  <path
    key="2"
    d="M20.3564 7.44441C20.7182 7.06026 20.7193 6.46104 20.3588 6.07562L19.6127 5.27802C19.2185 4.85653 18.5503 4.85535 18.1545 5.27545L13.9425 9.74682L9 14.9936L5.85541 11.6684C5.4613 11.2516 4.79814 11.2511 4.40337 11.6672L3.65144 12.4598C3.28601 12.845 3.28533 13.4486 3.64987 13.8347L8.27205 18.7292C8.66701 19.1474 9.33255 19.147 9.72699 18.7282L20.3564 7.44441Z"
    fill="white"
  />,
]

export const CheckBoxSelected: IconComponent = forwardRef((props, ref) => {
  return (
    <SVGComponent ref={ref} name={CheckBoxSelected.name} {...props}>
      {largeIcon}
    </SVGComponent>
  );
});


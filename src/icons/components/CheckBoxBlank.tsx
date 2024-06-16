import {forwardRef} from 'react';

import {SizeTokenValue} from 'theme';

import type {IconComponent} from '../types';

import {SVGComponent} from './SVGComponent';

const largeIcon = (
  <path
    d=" M 21 1.5 L 3 1.5 C 2.172 1.5 1.5 2.172 1.5 3 L 1.5 21 C 1.5 21.828 2.172 22.5 3 22.5 L 21 22.5 C 21.828 22.5 22.5 21.828 22.5 21 L 22.5 3 C 22.5 2.172 21.828 1.5 21 1.5 Z  M 3 0 C 1.343 0 0 1.343 0 3 L 0 21 C 0 22.657 1.343 24 3 24 L 21 24 C 22.657 24 24 22.657 24 21 L 24 3 C 24 1.343 22.657 0 21 0 L 3 0 Z "
    fillRule="evenodd"
  />
)

export const CheckBoxBlank: IconComponent = forwardRef((props, ref) => {
  return (
    <SVGComponent ref={ref} name={CheckBoxBlank.name} {...props}>
      {largeIcon}
    </SVGComponent>
  );
});


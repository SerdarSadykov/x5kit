import {forwardRef} from 'react';

import {SizeTokenValue} from 'theme';
import {IconComponent} from 'icons/types';

import {SVG} from './SVG';

const largeIcon = (
  <path d="M18 13H6C5.45 13 5 12.55 5 12C5 11.45 5.45 11 6 11H18C18.55 11 19 11.45 19 12C19 12.55 18.55 13 18 13Z" />
)

const smallIcon = (
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M3.435 8.50006C3.435 8.18802 3.68796 7.93506 4 7.93506H12C12.312 7.93506 12.565 8.18802 12.565 8.50006C12.565 8.8121 12.312 9.06506 12 9.06506H4C3.68796 9.06506 3.435 8.8121 3.435 8.50006Z"
  />
)

export const Remove: IconComponent = forwardRef((props, ref) => {
  const {size} = props;

  return (
    <SVG ref={ref} name="Remove" {...props}>
      {!size || size === SizeTokenValue.Large || size === SizeTokenValue.Medium ? largeIcon : smallIcon}
    </SVG>
  );
});


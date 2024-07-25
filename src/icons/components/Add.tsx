import {forwardRef} from 'react';

import {SizeTokenValue} from 'theme';

import type {IconComponent} from '../types';

import {SVG} from './SVG';

const largeIcon = (
  <path d="M18 13H13V18C13 18.55 12.55 19 12 19C11.45 19 11 18.55 11 18V13H6C5.45 13 5 12.55 5 12C5 11.45 5.45 11 6 11H11V6C11 5.45 11.45 5 12 5C12.55 5 13 5.45 13 6V11H18C18.55 11 19 11.45 19 12C19 12.55 18.55 13 18 13Z" />
)

const smallIcon = (
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M8.5 2.43506C8.81204 2.43506 9.065 2.68802 9.065 3.00006V6.93506H13C13.312 6.93506 13.565 7.18802 13.565 7.50006C13.565 7.8121 13.312 8.06506 13 8.06506H9.065V12.0001C9.065 12.3121 8.81204 12.5651 8.5 12.5651C8.18796 12.5651 7.935 12.3121 7.935 12.0001V8.06506H4C3.68796 8.06506 3.435 7.8121 3.435 7.50006C3.435 7.18802 3.68796 6.93506 4 6.93506H7.935V3.00006C7.935 2.68802 8.18796 2.43506 8.5 2.43506Z"
  />
)

export const Add: IconComponent = forwardRef((props, ref) => {
  const {size} = props;

  return (
    <SVG ref={ref} name="Add" {...props}>
      {!size || size === SizeTokenValue.Large || size === SizeTokenValue.Medium ? largeIcon : smallIcon}
    </SVG>
  );
});

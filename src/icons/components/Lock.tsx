import {forwardRef} from 'react';

import {SizeTokenValue} from 'tokens';
import {IconComponent} from 'icons/types';

import {SVGComponent} from './SVGComponent';

const largeIcon = (
  <path d="M18 8H17V6C17 3.24 14.76 1 12 1C9.24 1 7 3.24 7 6V8H6C4.9 8 4 8.9 4 10V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V10C20 8.9 19.1 8 18 8ZM9 6C9 4.34 10.34 3 12 3C13.66 3 15 4.34 15 6V8H9V6ZM18 20H6V10H18V20Z" />
)

const smallIcon = (
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M6.065 4.50006C6.065 3.70753 6.70747 3.06506 7.5 3.06506H8.5C9.29253 3.06506 9.935 3.70753 9.935 4.50006V5.93506H6.065V4.50006ZM4.935 5.93506V4.50006C4.935 3.08345 6.08339 1.93506 7.5 1.93506H8.5C9.91661 1.93506 11.065 3.08345 11.065 4.50006V5.93506H11.5C12.3643 5.93506 13.065 6.63573 13.065 7.50006V12.5001C13.065 13.3644 12.3643 14.0651 11.5 14.0651H4.5C3.63567 14.0651 2.935 13.3644 2.935 12.5001V7.50006C2.935 6.63573 3.63567 5.93506 4.5 5.93506H4.935ZM4.065 7.50006C4.065 7.25981 4.25975 7.06506 4.5 7.06506H11.5C11.7402 7.06506 11.935 7.25981 11.935 7.50006V12.5001C11.935 12.7403 11.7402 12.9351 11.5 12.9351H4.5C4.25975 12.9351 4.065 12.7403 4.065 12.5001V7.50006Z"
  />
)

export const Lock: IconComponent = forwardRef((props, ref) => {
  const {size} = props;

  return (
    <SVGComponent ref={ref} name={Lock.name} {...props}>
      {size === SizeTokenValue.Small ? smallIcon : largeIcon}
    </SVGComponent>
  );
});


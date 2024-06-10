import {forwardRef} from 'react';

import {SizeTokenValue} from 'tokens';
import {IconComponent} from 'icons/types';

import {SVGComponent} from './SVGComponent';

const largeIcon = [
  <path d="M3 7C3 7.6 3.5 8 4 8H20C20.5 8 21 7.6 21 7C21 6.4 20.5 6 20 6H4C3.5 6 3 6.4 3 7Z" key="1" />,
  <path d="M3 12C3 12.6 3.5 13 4 13H20C20.5 13 21 12.6 21 12C21 11.4 20.5 11 20 11H4C3.5 11 3 11.4 3 12Z" key="2" />,
  <path d="M3 17C3 17.6 3.5 18 4 18H20C20.5 18 21 17.6 21 17C21 16.4 20.5 16 20 16H4C3.5 16 3 16.4 3 17Z" key="3" />,
]

const smallIcon = (
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M2.435 4.50006C2.435 4.18802 2.68796 3.93506 3 3.93506H13C13.312 3.93506 13.565 4.18802 13.565 4.50006C13.565 4.8121 13.312 5.06506 13 5.06506H3C2.68796 5.06506 2.435 4.8121 2.435 4.50006ZM2.435 7.50006C2.435 7.18802 2.68796 6.93506 3 6.93506H13C13.312 6.93506 13.565 7.18802 13.565 7.50006C13.565 7.8121 13.312 8.06506 13 8.06506H3C2.68796 8.06506 2.435 7.8121 2.435 7.50006ZM2.435 10.5001C2.435 10.188 2.68796 9.93506 3 9.93506H13C13.312 9.93506 13.565 10.188 13.565 10.5001C13.565 10.8121 13.312 11.0651 13 11.0651H3C2.68796 11.0651 2.435 10.8121 2.435 10.5001Z"
  />
)

export const Menu: IconComponent = forwardRef((props, ref) => {
  const {size} = props;

  return (
    <SVGComponent ref={ref} {...props}>
      {size === SizeTokenValue.Small ? smallIcon : largeIcon}
    </SVGComponent>
  );
});


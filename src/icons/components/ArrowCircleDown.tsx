import {forwardRef} from 'react';

import {SizeTokenValue} from 'theme';
import {IconComponent} from 'icons/types';

import {SVG} from './SVG';

const largeIcon = [
  <path
    key="0"
    d="M12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z"
  />,
  <path
    key="1"
    d="M9.24773 12.4894L11.4119 14.7452C11.7378 15.0849 12.2642 15.0849 12.5901 14.7452L14.7543 12.4894C15.2808 11.9407 14.9047 11 14.161 11H9.83265C9.08897 11 8.72131 11.9407 9.24773 12.4894Z"
  />,
]

const smallIcon = (
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M13.87 8C13.87 11.2419 11.2419 13.87 8 13.87C4.75809 13.87 2.13 11.2419 2.13 8C2.13 4.75809 4.75809 2.13 8 2.13C11.2419 2.13 13.87 4.75809 13.87 8ZM15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8ZM6.08715 7H9.91293C10.3401 7 10.5706 7.50106 10.2926 7.8254L8.37967 10.0571C8.18012 10.2899 7.81996 10.2899 7.62041 10.0571L5.70752 7.8254C5.42952 7.50106 5.65997 7 6.08715 7Z"
  />
)

export const ArrowCircleDown: IconComponent = forwardRef((props, ref) => {
  const {size} = props;

  return (
    <SVG ref={ref} name="ArrowCircleDown" {...props}>
      {size === SizeTokenValue.Small ? smallIcon : largeIcon}
    </SVG>
  );
});


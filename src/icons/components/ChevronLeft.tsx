import {forwardRef} from 'react';

import {SizeTokenValue} from 'theme';

import type {IconComponent} from '../types';

import {SVG} from './SVG';

const largeIcon = (
  <path d="M14.6855 6.31409C14.2662 5.8953 13.5888 5.8953 13.1695 6.31409L8.23449 11.243C7.81517 11.6617 7.81517 12.3383 8.23449 12.757L13.1695 17.6859C13.5888 18.1047 14.2662 18.1047 14.6855 17.6859C15.1048 17.2671 15.1048 16.5906 14.6855 16.1718L10.5138 11.9946L14.6855 7.82819C15.1048 7.4094 15.0941 6.72215 14.6855 6.31409Z" />
)

const smallIcon = (
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M9.89951 11.8995C10.1202 11.6788 10.1202 11.3211 9.89951 11.1004L6.79903 7.99994L9.89951 4.89946C10.1202 4.67881 10.1202 4.32107 9.89951 4.10043C9.67887 3.87978 9.32113 3.87978 9.10048 4.10043L5.60048 7.60043C5.49452 7.70638 5.435 7.85009 5.435 7.99994C5.435 8.14979 5.49452 8.2935 5.60048 8.39946L9.10048 11.8995C9.32113 12.1201 9.67887 12.1201 9.89951 11.8995Z"
  />
)

export const ChevronLeft: IconComponent = forwardRef((props, ref) => {
  const {size} = props;

  return (
    <SVG ref={ref} name={ChevronLeft.name} {...props}>
      {size === SizeTokenValue.Small ? smallIcon : largeIcon}
    </SVG>
  );
});


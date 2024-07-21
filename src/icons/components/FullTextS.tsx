import {forwardRef} from 'react';

import {SizeTokenValue} from 'theme';
import {IconComponent} from 'icons/types';

import {SVG} from './SVG';

const largeIcon = (
  <path d="M7.00502 12.99H17.01V10.995H7.00502V12.99ZM3.34502 3.98999V20.01H20.685V3.98999H3.34502ZM18.675 17.985H5.34002V5.99999H18.675V17.985ZM17.01 14.325H6.99002V16.32H16.995V14.325H17.01ZM17.01 7.66499H6.99002V9.65999H16.995V7.66499H17.01Z" />
)

export const FullTextS: IconComponent = forwardRef((props, ref) => {
  return (
    <SVG ref={ref} name="FullTextS" {...props}>
      {largeIcon}
    </SVG>
  );
});


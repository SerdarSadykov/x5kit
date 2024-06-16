import {forwardRef} from 'react';

import {SizeTokenValue} from 'theme';
import {IconComponent} from 'icons/types';

import {SVGComponent} from './SVGComponent';

const largeIcon = (
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M10.0778 5.13697C10.0786 5.13747 10.0794 5.13796 10.0801 5.13845L18.2221 10.3097C19.444 11.098 19.4636 12.897 18.215 13.6849C18.2142 13.6854 18.2133 13.686 18.2125 13.6865L10.0801 18.8616C10.0795 18.862 10.0789 18.8624 10.0782 18.8628C8.74063 19.7193 7 18.7574 7 17.18V6.82003C7 5.24285 8.74028 4.28093 10.0778 5.13697ZM9 6.82171L17.1391 11.9912C17.1412 11.9926 17.1426 11.9937 17.1434 11.9944L17.1446 11.9954L9.00312 17.1764L9 17.1784V6.82171Z"
  />
)

const smallIcon = (
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M4.21641 3.51138C4.39061 3.41029 4.60545 3.40958 4.78032 3.5095L11.7803 7.5095C11.9564 7.6101 12.065 7.7973 12.065 8.00006C12.065 8.20281 11.9564 8.39002 11.7803 8.49062L4.78032 12.4906C4.60545 12.5905 4.39061 12.5898 4.21641 12.4887C4.04221 12.3876 3.935 12.2015 3.935 12.0001V4.00006C3.935 3.79865 4.04221 3.61248 4.21641 3.51138ZM5.065 4.97366V11.0265L10.3612 8.00006L5.065 4.97366Z"
  />
)

export const PlayArrow: IconComponent = forwardRef((props, ref) => {
  const {size} = props;

  return (
    <SVGComponent ref={ref} name={PlayArrow.name} name={PlayArrow.name} {...props}>
      {size === SizeTokenValue.Small ? smallIcon : largeIcon}
    </SVGComponent>
  );
});


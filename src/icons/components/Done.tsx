import {forwardRef} from 'react';

import {SizeTokenValue} from 'theme';
import {IconComponent, IconProps} from 'icons/types';

import {SVG} from './SVG';

const largeIcon = (
  <path d="M9 16.2001L5.5 12.7001C5.11 12.3101 4.49 12.3101 4.1 12.7001C3.71 13.0901 3.71 13.7101 4.1 14.1001L8.29 18.2901C8.68 18.6801 9.31 18.6801 9.7 18.2901L20.3 7.70007C20.69 7.31007 20.69 6.69007 20.3 6.30007C19.91 5.91007 19.29 5.91007 18.9 6.30007L9 16.2001Z" />
);

const smallIcon = (
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M13.8995 4.10042C14.1202 4.32106 14.1202 4.6788 13.8995 4.89945L5.89951 12.8995C5.79356 13.0055 5.64985 13.065 5.5 13.065C5.35015 13.065 5.20644 13.0055 5.10048 12.8995L2.10048 9.89953C1.87984 9.67888 1.87984 9.32114 2.10048 9.1005C2.32113 8.87985 2.67887 8.87985 2.89951 9.1005L5.5 11.701L13.1005 4.10042C13.3211 3.87978 13.6789 3.87977 13.8995 4.10042Z"
  />
);

const xSmallIcon = (
  <path d="M11.3564 2.1907C11.7182 1.80655 11.7193 1.20732 11.3588 0.821901L11.3177 0.778024C10.9235 0.356526 10.2553 0.355348 9.85952 0.775453L7.295 3.49788L4 6.99575L2.14542 5.03461C1.75131 4.61786 1.08814 4.61733 0.693367 5.03346L0.651439 5.07765C0.286014 5.46285 0.285326 6.06647 0.649872 6.45249L3.27205 9.22916C3.66701 9.6474 4.33255 9.64698 4.72699 9.22825L11.3564 2.1907Z" />
);

export const Done: IconComponent = forwardRef((props, ref) => {
  const svgProps: IconProps = {...props, children: largeIcon};

  switch (props.size) {
    case SizeTokenValue.Small:
    case SizeTokenValue.XXSmall:
      svgProps.children = smallIcon;
      break;

    case SizeTokenValue.XSmall:
      svgProps.children = xSmallIcon;
      svgProps.viewBox ??= '0 0 12 10';
      break;
  }

  return <SVG ref={ref} name="Done" {...svgProps} />;
});

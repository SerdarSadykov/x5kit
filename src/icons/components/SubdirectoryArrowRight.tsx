import {forwardRef} from 'react';

import {SizeTokenValue} from 'theme';
import {IconComponent} from 'icons/types';

import {SVG} from './SVG';

const largeIcon = (
  <path d="M18.29 15.71L13.71 20.29C13.32 20.68 12.68 20.68 12.29 20.29C11.9 19.9 11.9 19.26 12.29 18.87L15.17 16H5C4.45 16 4 15.55 4 15V5C4 4.45 4.45 4 5 4C5.55 4 6 4.45 6 5V14H15.17L12.29 11.13C11.9 10.74 11.9 10.1 12.29 9.71C12.68 9.32 13.32 9.32 13.71 9.71L18.29 14.29C18.68 14.68 18.68 15.32 18.29 15.71Z" />
)

const smallIcon = (
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M4.05994 3.50019C4.05994 3.19091 3.80922 2.94019 3.49994 2.94019C3.19066 2.94019 2.93994 3.19091 2.93994 3.50019V8.50008C2.93994 9.36164 3.63838 10.0601 4.49994 10.0601H11.136V10.07L9.10054 12.1054C8.8799 12.3261 8.8799 12.6838 9.10054 12.9045C9.32119 13.1251 9.67893 13.1251 9.89957 12.9045L12.8996 9.90446C13.1202 9.68381 13.1202 9.32607 12.8996 9.10543L9.89957 6.10543C9.67893 5.88478 9.32119 5.88478 9.10054 6.10543C8.8799 6.32607 8.8799 6.68381 9.10054 6.90446L11.1361 8.93997V8.94008H4.49994C4.25694 8.94008 4.05994 8.74308 4.05994 8.50008V3.50019Z"
  />
)

export const SubdirectoryArrowRight: IconComponent = forwardRef((props, ref) => {
  const {size} = props;

  return (
    <SVG ref={ref} name="SubdirectoryArrowRight" {...props}>
      {size === SizeTokenValue.Small ? smallIcon : largeIcon}
    </SVG>
  );
});


import {forwardRef} from 'react';

import {SizeTokenValue} from 'theme';
import {IconComponent} from 'icons/types';

import {SVGComponent} from './SVGComponent';

const largeIcon = (
  <path d="M12 8C13.1 8 14 7.1 14 6C14 4.9 13.1 4 12 4C10.9 4 10 4.9 10 6C10 7.1 10.9 8 12 8ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10ZM12 16C10.9 16 10 16.9 10 18C10 19.1 10.9 20 12 20C13.1 20 14 19.1 14 18C14 16.9 13.1 16 12 16Z" />
)

const smallIcon = (
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M8 5C7.17157 5 6.5 4.32843 6.5 3.5C6.5 2.67157 7.17157 2 8 2C8.82843 2 9.5 2.67157 9.5 3.5C9.5 4.32843 8.82843 5 8 5ZM8 9.5C7.17157 9.5 6.5 8.82843 6.5 8C6.5 7.17157 7.17157 6.5 8 6.5C8.82843 6.5 9.5 7.17157 9.5 8C9.5 8.82843 8.82843 9.5 8 9.5ZM6.5 12.5C6.5 13.3284 7.17157 14 8 14C8.82843 14 9.5 13.3284 9.5 12.5C9.5 11.6716 8.82843 11 8 11C7.17157 11 6.5 11.6716 6.5 12.5Z"
  />
)

export const MoreVertical: IconComponent = forwardRef((props, ref) => {
  const {size} = props;

  return (
    <SVGComponent ref={ref} name={MoreVertical.name} {...props}>
      {size === SizeTokenValue.Small ? smallIcon : largeIcon}
    </SVGComponent>
  );
});


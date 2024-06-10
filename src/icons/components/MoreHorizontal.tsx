import {forwardRef} from 'react';

import {SizeTokenValue} from 'tokens';
import {IconComponent} from 'icons/types';

import {SVGComponent} from './SVGComponent';

const largeIcon = (
  <path d="M6 10C4.9 10 4 10.9 4 12C4 13.1 4.9 14 6 14C7.1 14 8 13.1 8 12C8 10.9 7.1 10 6 10ZM18 10C16.9 10 16 10.9 16 12C16 13.1 16.9 14 18 14C19.1 14 20 13.1 20 12C20 10.9 19.1 10 18 10ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z" />
)

const smallIcon = (
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M5 8C5 8.82843 4.32843 9.5 3.5 9.5C2.67157 9.5 2 8.82843 2 8C2 7.17157 2.67157 6.5 3.5 6.5C4.32843 6.5 5 7.17157 5 8ZM9.5 8C9.5 8.82843 8.82843 9.5 8 9.5C7.17157 9.5 6.5 8.82843 6.5 8C6.5 7.17157 7.17157 6.5 8 6.5C8.82843 6.5 9.5 7.17157 9.5 8ZM12.5 9.5C13.3284 9.5 14 8.82843 14 8C14 7.17157 13.3284 6.5 12.5 6.5C11.6716 6.5 11 7.17157 11 8C11 8.82843 11.6716 9.5 12.5 9.5Z"
  />
)

export const MoreHorizontal: IconComponent = forwardRef((props, ref) => {
  const {size} = props;

  return (
    <SVGComponent ref={ref} name={MoreHorizontal.name} {...props}>
      {size === SizeTokenValue.Small ? smallIcon : largeIcon}
    </SVGComponent>
  );
});


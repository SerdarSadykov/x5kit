import {forwardRef} from 'react';

import {SizeTokenValue} from 'theme';

import {SVG} from './SVG';

import type {IconComponent} from '../types';

const largeIcon = (
  <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" />
);

const smallIcon = (
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M12.3995 4.39957C12.6201 4.17893 12.6201 3.82119 12.3995 3.60054C12.1788 3.3799 11.8211 3.3799 11.6004 3.60054L8 7.20097L4.39957 3.60054C4.17892 3.3799 3.82119 3.3799 3.60054 3.60054C3.37989 3.82119 3.37989 4.17893 3.60054 4.39957L7.20096 8L3.60042 11.6005C3.37977 11.8212 3.37977 12.1789 3.60042 12.3996C3.82107 12.6202 4.17881 12.6202 4.39945 12.3996L8 8.79903L11.6005 12.3996C11.8212 12.6202 12.1789 12.6202 12.3996 12.3996C12.6202 12.1789 12.6202 11.8212 12.3996 11.6005L8.79903 8L12.3995 4.39957Z"
  />
);

export const Close: IconComponent = forwardRef((props, ref) => {
  const {size} = props;

  return (
    <SVG ref={ref} name="Close" {...props}>
      {!size || size === SizeTokenValue.Large || size === SizeTokenValue.Medium ? largeIcon : smallIcon}
    </SVG>
  );
});

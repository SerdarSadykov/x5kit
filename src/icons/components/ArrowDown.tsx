import {forwardRef} from 'react';

import {SizeTokenValue} from 'theme';
import {IconComponent} from 'icons/types';

import {SVG} from './SVG';

const largeIcon = (
  <path d="M16.935 11.565L13.05 15.45C12.465 16.035 11.52 16.035 10.935 15.45L7.04998 11.565C6.10498 10.62 6.77998 9 8.11498 9L15.885 9C17.22 9 17.88 10.62 16.935 11.565Z" />
)

const smallIcon = (
  <path d="M10.8866 6H5.11344C4.68201 6 4.45311 6.50973 4.73973 6.83218L7.62631 10.0796C7.8252 10.3033 8.17482 10.3033 8.37372 10.0796L11.2603 6.83218C11.5469 6.50973 11.318 6 10.8866 6Z" />
)

export const ArrowDown: IconComponent = forwardRef((props, ref) => {
  const {size} = props;

  return (
    <SVG ref={ref} name="ArrowDown" {...props}>
      {!size || size === SizeTokenValue.Large || size === SizeTokenValue.Medium ? largeIcon : smallIcon}
    </SVG>
  );
});


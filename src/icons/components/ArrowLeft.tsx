import {forwardRef} from 'react';

import {SizeTokenValue} from 'theme';
import {IconComponent} from 'icons/types';

import {SVGComponent} from './SVGComponent';

const largeIcon = (
  <path d="M12.435 7.065L8.55 10.95C7.965 11.535 7.965 12.48 8.55 13.065L12.435 16.95C13.38 17.895 15 17.22 15 15.885L15 8.115C15 6.78 13.38 6.12 12.435 7.065Z" />
)

const smallIcon = (
  <path d="M10 10.8866L10 5.1134C10 4.68198 9.49027 4.45308 9.16782 4.7397L5.92042 7.62628C5.69666 7.82517 5.69666 8.17479 5.92042 8.37369L9.16782 11.2603C9.49027 11.5469 10 11.318 10 10.8866Z" />
)

export const ArrowLeft: IconComponent = forwardRef((props, ref) => {
  const {size} = props;

  return (
    <SVGComponent ref={ref} name={ArrowLeft.name} {...props}>
      {size === SizeTokenValue.Small ? smallIcon : largeIcon}
    </SVGComponent>
  );
});


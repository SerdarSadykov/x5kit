import {forwardRef} from 'react';

import {SizeTokenValue} from 'tokens';

import type {IconComponent} from '../types';

import {SVGComponent} from './SVGComponent';

const largeIcon = (
  <path d="M9.31434 6.3157C8.89522 6.73482 8.89522 7.41186 9.31434 7.83097L13.484 12.0007L9.31434 16.1704C8.89522 16.5895 8.89522 17.2665 9.31434 17.6857C9.73346 18.1048 10.4105 18.1048 10.8296 17.6857L15.7623 12.7529C16.1815 12.3338 16.1815 11.6568 15.7623 11.2377L10.8296 6.30495C10.4212 5.89658 9.73346 5.89658 9.31434 6.3157Z" />
)

const smallIcon = (
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M6.10049 4.10054C5.87984 4.32119 5.87984 4.67893 6.10049 4.89957L9.20097 8.00006L6.10049 11.1005C5.87984 11.3212 5.87984 11.6789 6.10049 11.8996C6.32113 12.1202 6.67887 12.1202 6.89952 11.8996L10.3995 8.39957C10.5055 8.29362 10.565 8.14991 10.565 8.00006C10.565 7.85021 10.5055 7.7065 10.3995 7.60054L6.89952 4.10054C6.67887 3.8799 6.32113 3.8799 6.10049 4.10054Z"
  />
)

export const Right: IconComponent = forwardRef((props, ref) => {
  const {size} = props;

  return (
    <SVGComponent ref={ref} {...props}>
      {size === SizeTokenValue.Small ? smallIcon : largeIcon}
    </SVGComponent>
  );
});


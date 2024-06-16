import {forwardRef} from 'react';

import {SizeTokenValue} from 'theme';

import type {IconComponent} from '../types';

import {SVGComponent} from './SVGComponent';

const largeIcon = (
  <path d="M15.88 9.29L12 13.17L8.12001 9.29C7.73001 8.9 7.10001 8.9 6.71001 9.29C6.32001 9.68 6.32001 10.31 6.71001 10.7L11.3 15.29C11.69 15.68 12.32 15.68 12.71 15.29L17.3 10.7C17.69 10.31 17.69 9.68 17.3 9.29C16.91 8.91 16.27 8.9 15.88 9.29Z" />
)

const smallIcon = (
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M11.8995 6.10043C11.6789 5.87978 11.3211 5.87978 11.1005 6.10043L8 9.20091L4.89952 6.10043C4.67887 5.87978 4.32113 5.87978 4.10049 6.10043C3.87984 6.32107 3.87984 6.67881 4.10049 6.89946L7.60049 10.3995C7.70645 10.5054 7.85015 10.5649 8 10.5649C8.14985 10.5649 8.29356 10.5054 8.39952 10.3995L11.8995 6.89946C12.1202 6.67881 12.1202 6.32107 11.8995 6.10043Z"
  />
)

export const ChevronDown: IconComponent = forwardRef((props, ref) => {
  const {size} = props;

  return (
    <SVGComponent ref={ref} name={ChevronDown.name} {...props}>
      {size === SizeTokenValue.Small ? smallIcon : largeIcon}
    </SVGComponent>
  );
});


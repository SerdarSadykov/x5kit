import {forwardRef} from 'react';

import {SizeTokenValue} from 'theme';
import {IconComponent} from 'icons/types';

import {SVGComponent} from './SVGComponent';

const largeIcon = (
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M12.7929 2.79289C13.1834 2.40237 13.8166 2.40237 14.2071 2.79289L21.4142 10H5C4.44772 10 4 9.55228 4 9C4 8.44772 4.44772 8 5 8H16.5858L12.7929 4.20711C12.4024 3.81658 12.4024 3.18342 12.7929 2.79289ZM3.58579 14H20C20.5523 14 21 14.4477 21 15C21 15.5523 20.5523 16 20 16H8.41421L12.2071 19.7929C12.5976 20.1834 12.5976 20.8166 12.2071 21.2071C11.8166 21.5976 11.1834 21.5976 10.7929 21.2071L3.58579 14Z"
  />
)

const smallIcon = [
  <path
    key="0"
    fillRule="evenodd"
    clipRule="evenodd"
    d="M8.60048 3.10054C8.82113 2.8799 9.17887 2.8799 9.39951 3.10054L13.364 7.06506H3.5C3.18796 7.06506 2.935 6.8121 2.935 6.50006C2.935 6.18802 3.18796 5.93506 3.5 5.93506H10.636L8.60048 3.89957C8.37984 3.67893 8.37984 3.32119 8.60048 3.10054Z"
  />,
  <path
    key="1"
    fillRule="evenodd"
    clipRule="evenodd"
    d="M7.89951 12.8996C7.67887 13.1202 7.32113 13.1202 7.10048 12.8996L3.13597 8.93506H13C13.312 8.93506 13.565 9.18802 13.565 9.50006C13.565 9.8121 13.312 10.0651 13 10.0651H5.86403L7.89951 12.1005C8.12016 12.3212 8.12016 12.6789 7.89951 12.8996Z"
  />,
]

export const Sync: IconComponent = forwardRef((props, ref) => {
  const {size} = props;

  return (
    <SVGComponent ref={ref} name={Sync.name} {...props}>
      {size === SizeTokenValue.Small ? smallIcon : largeIcon}
    </SVGComponent>
  );
});


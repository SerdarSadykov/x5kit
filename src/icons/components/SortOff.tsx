import {forwardRef} from 'react';

import {SizeTokenValue} from 'theme';
import {IconComponent} from 'icons/types';

import {SVG} from './SVG';

const largeIcon = (
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M14 8H4C3.5 8 3 7.6 3 7C3 6.4 3.5 6 4 6H14C14.6 6 15 6.4 15 7C15 7.6 14.6 8 14 8ZM3 12C3 12.6 3.5 13 4 13H20C20.5 13 21 12.6 21 12C21 11.4 20.5 11 20 11H4C3.5 11 3 11.4 3 12ZM4 18H8C8.6 18 9 17.5 9 17C9 16.5 8.6 16 8 16H4C3.5 16 3 16.5 3 17C3 17.5 3.5 18 4 18Z"
  />
)

const smallIcon = (
  <path
    fillRule="evenodd"
    clipRule="evenodd"
    d="M2 4.50494C2 4.1929 2.25296 3.93994 2.565 3.93994H9.435C9.74704 3.93994 10 4.1929 10 4.50494C10 4.81698 9.74704 5.06994 9.435 5.06994H2.565C2.25296 5.06994 2 4.81698 2 4.50494ZM2 7.50494C2 7.1929 2.25296 6.93994 2.565 6.93994H13.435C13.747 6.93994 14 7.1929 14 7.50494C14 7.81698 13.747 8.06994 13.435 8.06994H2.565C2.25296 8.06994 2 7.81698 2 7.50494ZM2.565 9.93994C2.25296 9.93994 2 10.1929 2 10.5049C2 10.817 2.25296 11.0699 2.565 11.0699H5.435C5.74704 11.0699 6 10.817 6 10.5049C6 10.1929 5.74704 9.93994 5.435 9.93994H2.565Z"
  />
)

export const SortOff: IconComponent = forwardRef((props, ref) => {
  const {size} = props;

  return (
    <SVG ref={ref} name="SortOff" {...props}>
      {size === SizeTokenValue.Small ? smallIcon : largeIcon}
    </SVG>
  );
});


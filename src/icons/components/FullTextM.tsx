import {forwardRef} from 'react';

import {IconComponent} from 'icons/types';

import {SVG} from './SVG';

const largeIcon = (
  <path d="M2.34 3V21H21.675V3H2.34ZM19.665 19.005H4.335V4.995H19.665V19.005ZM16.995 10.995H7.005V12.99H17.01V10.995H16.995ZM16.995 7.665H7.005V9.66H17.01V7.665H16.995ZM16.995 14.34H7.005V16.335H17.01V14.34H16.995Z" />
)

export const FullTextM: IconComponent = forwardRef((props, ref) => {
  return (
    <SVG ref={ref} name="FullTextM" {...props}>
      {largeIcon}
    </SVG>
  );
});


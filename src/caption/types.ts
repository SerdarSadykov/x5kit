import {PropsWithChildren} from 'react';

export type CaptionProps = {
  disabled?: boolean;
  error?: boolean;
  absolute?: boolean;
} & PropsWithChildren;

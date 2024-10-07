import type {PropsWithChildren} from 'react';

export type CaptionProps = {
  error?: boolean;
  absolute?: boolean;
} & PropsWithChildren;

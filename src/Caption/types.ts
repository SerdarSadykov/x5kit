import type {PropsWithChildren} from 'react';

export type CaptionProps = {
  /** Окрасить при ошибке */
  error?: boolean;
  /** Абсолютное позиционирование, не занимает место между полями */
  absolute?: boolean;
} & PropsWithChildren;

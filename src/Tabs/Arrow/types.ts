import type {MutableRefObject} from 'react';
import type {RequiredQA} from 'common';

export type ArrowProps = {
  scrollableRef: MutableRefObject<HTMLDivElement | null>;
} & RequiredQA;

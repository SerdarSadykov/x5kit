import type {AnchorHTMLAttributes, HTMLAttributes, MouseEvent, PropsWithChildren, ReactNode} from 'react';

import type {QA} from 'common';

export type TabProps = {
  value: string;
  label?: ReactNode;
  icon?: ReactNode;
  badge?: ReactNode;
  disabled?: boolean;
} & QA &
  AnchorHTMLAttributes<HTMLDivElement>;

export type TabsProps = {
  value?: string;
  onChange: (newValue: string, e: MouseEvent<HTMLDivElement>) => void;
  arrows?: boolean;
} & QA &
  Omit<HTMLAttributes<HTMLDivElement>, 'onChange'>;

export type TabContextProps = Pick<TabsProps, 'value' | 'onChange'>;

export type TabListProps = Omit<TabsProps, 'value' | 'onChange'>;

export type TabPanelProps = Pick<TabProps, 'value'> & PropsWithChildren;

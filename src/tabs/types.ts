import {AnchorHTMLAttributes, HTMLAttributes, MouseEvent, PropsWithChildren, ReactNode} from 'react';

import {QA} from 'common';

export type TabProps = {
  value: string;
  label?: ReactNode;
  icon?: ReactNode;
  badge?: ReactNode;
  disabled?: boolean;
} & AnchorHTMLAttributes<HTMLDivElement>;

export type TabsProps = {
  value?: string;
  onChange: (newValue: string, e: MouseEvent<HTMLDivElement>) => void;
  arrows?: boolean;
} & QA & Omit<HTMLAttributes<HTMLDivElement>, 'onChange'>;

export type TabListProps = Omit<TabsProps, 'value'>;

export type TabPanelProps = {
  value: string;
} & PropsWithChildren;
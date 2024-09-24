import {HTMLAttributes, MouseEvent, ReactNode} from 'react';

export type TabValue = string | number;

export type TabProps = {
  label?: ReactNode;
  icon?: ReactNode;
  badge?: ReactNode;
  value: TabValue;
  disabled?: boolean;
} & HTMLAttributes<HTMLDivElement>;

export type TabsProps = {
  value: TabValue;
  onChange: (newValue: TabValue, e: MouseEvent<HTMLDivElement>) => void;
} & Omit<HTMLAttributes<HTMLDivElement>, 'onChange'>;
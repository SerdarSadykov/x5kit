import {HTMLAttributes, MouseEvent, ReactNode} from 'react';

import {QA} from 'common';

export type TabProps = {
  label?: ReactNode;
  icon?: ReactNode;
  badge?: ReactNode;
  value: string;
  disabled?: boolean;
} & HTMLAttributes<HTMLDivElement>;

export type TabsProps = {
  value: string;
  onChange: (newValue: string, e: MouseEvent<HTMLDivElement>) => void;
  arrows?: boolean;
} & QA & Omit<HTMLAttributes<HTMLDivElement>, 'onChange'>;

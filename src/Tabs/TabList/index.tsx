import {createContext, forwardRef, useContext} from 'react';

import {Tabs} from '../Tabs';

import type {PropsWithChildren} from 'react';
import type {TabListProps, TabPanelProps, TabContextProps} from '../types';

const TabContextValue = createContext<TabContextProps>({} as TabContextProps);

export const TabContext: React.FC<TabContextProps & PropsWithChildren> = ({children, ...value}) => {
  return <TabContextValue.Provider value={value}>{children}</TabContextValue.Provider>;
};

export const TabList = forwardRef<HTMLDivElement, TabListProps>((props, ref) => {
  const context = useContext(TabContextValue);

  return <Tabs ref={ref} value={context.value} onChange={context.onChange} {...props} />;
});

export const TabPanel: React.FC<TabPanelProps> = ({children, value}) => {
  const curValue = useContext(TabContextValue).value;

  if (value !== curValue) {
    return null;
  }

  return children;
};

import {createContext, forwardRef, useContext} from 'react';

import {Tabs} from '../Tabs';

import type {TabListProps} from '../types';

export const TabContext = createContext<string | undefined>(undefined);

export const TabList = forwardRef<HTMLDivElement, TabListProps>((props, ref) => {
  const curValue = useContext(TabContext);

  return (
    <TabContext.Provider value={curValue}>
      <Tabs ref={ref} value={curValue} {...props} />
    </TabContext.Provider>
  );
});

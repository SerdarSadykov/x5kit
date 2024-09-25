import {useContext} from 'react';

import {TabContext} from '../TabList';
import {TabPanelProps} from '../types';

export const TabPanel: React.FC<TabPanelProps> = ({children, value}) => {
  const curValue = useContext(TabContext);

  if (value !== curValue) {
    return null;
  }

  return children;
};
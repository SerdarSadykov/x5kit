import {PropsWithChildren} from 'react';
import {Global} from '@emotion/react';

import {fonts} from '../fonts';

export const ThemeProvider: React.FC<PropsWithChildren> = ({children}) => {
  return (
    <>
      <Global styles={fonts} />
      {children}
    </>
  );
};

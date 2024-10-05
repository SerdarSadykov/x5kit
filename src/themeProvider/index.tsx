import {Global} from '@emotion/react';

import {SnackbarProvider} from 'snackbar';

import {fonts} from 'theme/fonts';

import type {PropsWithChildren} from 'react';

export const ThemeProvider: React.FC<PropsWithChildren> = ({children}) => (
  <SnackbarProvider>
    <Global styles={fonts} />
    {children}
  </SnackbarProvider>
);

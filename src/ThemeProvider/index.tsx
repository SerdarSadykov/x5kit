import {Global} from '@emotion/react';

import {SnackbarProvider} from 'Snackbar';

import {fonts} from 'theme/fonts';

import type {PropsWithChildren} from 'react';

/** Тема
 *
 * добавляет шрифт X5 Sans
 *
 * добавляет работу с Snackbar
 */
export const ThemeProvider: React.FC<PropsWithChildren> = ({children}) => (
  <SnackbarProvider>
    <Global styles={fonts} />
    {children}
  </SnackbarProvider>
);

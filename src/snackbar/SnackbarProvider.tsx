import {forwardRef} from 'react';

import {SnackbarProvider as BaseSnackbarProvider} from 'notistack';

import type {SnackbarProviderProps, CustomContentProps} from 'notistack';

export const SnackbarContainer = forwardRef<HTMLDivElement, CustomContentProps>(({message, style}, ref) => (
  <div ref={ref} style={style}>
    {message}
  </div>
));

const Components: SnackbarProviderProps['Components'] = {
  default: SnackbarContainer,
  success: SnackbarContainer,
  warning: SnackbarContainer,
  error: SnackbarContainer,
  info: SnackbarContainer,
};

export const SnackbarProvider: React.FC<SnackbarProviderProps> = ({children, ...props}) => (
  <>
    <BaseSnackbarProvider Components={Components} {...props} />
    {children}
  </>
);

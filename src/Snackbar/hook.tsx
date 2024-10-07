import {closeSnackbar, enqueueSnackbar as baseEnqueueSnackbar} from 'notistack';

import {MessageComponent} from './MessageComponent';

import {SnackbarVariant} from './types';

import type {SnackbarMessage, SnackbarMessageInner} from './types';

const enqueueSnackbar = (message: SnackbarMessage) => {
  const innerMessage: SnackbarMessageInner = {
    ...message,

    key: message.key ?? String(Math.random() * 10_000),
    variant: message.variant ?? SnackbarVariant.default,
  };

  baseEnqueueSnackbar(<MessageComponent message={innerMessage} />, {
    autoHideDuration: 3_000,

    ...innerMessage,

    content: undefined,
  });
};

export {enqueueSnackbar, closeSnackbar};

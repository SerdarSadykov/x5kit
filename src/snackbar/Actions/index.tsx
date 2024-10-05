import {SizeTokenValue} from 'theme';
import {Button, ButtonVariant} from 'button';
import {Link} from 'link';

import type {SnackbarAction} from '../types';

export const getAction = (action: SnackbarAction, index: number) => {
  if (action && typeof action === 'object') {
    if ('isButton' in action) {
      return <Button key={index} variant={ButtonVariant.text} size={SizeTokenValue.Small} {...action} />;
    }

    if ('isLink' in action) {
      return <Link key={index} {...action} />;
    }
  }

  return action;
};

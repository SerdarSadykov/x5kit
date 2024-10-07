import {SizeTokenValue} from 'theme';
import {Loader as BaseLoader} from 'Loader';

import type {ButtonStyles} from '../types';

export const Loader: React.FC<ButtonStyles> = props => {
  if (!props.loading) {
    return null;
  }

  const size = props.size === SizeTokenValue.Small ? SizeTokenValue.Small : SizeTokenValue.Medium;

  return <BaseLoader color="inherit" size={size} />;
};

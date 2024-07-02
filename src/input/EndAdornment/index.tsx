import {Loader} from 'loader';

import {InputProps, InputStyles} from '../types';

export const EndAdornment: React.FC<InputProps & InputStyles> = props => {
  const {size, endAdornment, loading} = props;

  if (endAdornment) {
    return endAdornment;
  }

  if (loading) {
    return <Loader size={size} />;
  }

  return null;
};

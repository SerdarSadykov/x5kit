import {Search} from 'icons';
import {SizeTokenValue} from 'theme';
import {Input} from 'input';

import {DatepickerProps} from './types';

export const Datepicker: React.FC<DatepickerProps> = props => {
  const startAdornment = (
    <Search size={props.size === SizeTokenValue.Small ? SizeTokenValue.Small : SizeTokenValue.Medium} />
  );

  return <Input startAdornment={startAdornment} {...props} />;
};

import {Search} from 'icons';
import {SizeTokenValue} from 'theme';
import {Input} from 'Input';

import type {SearchInputProps} from './types';

export const SearchInput: React.FC<SearchInputProps> = props => {
  const startAdornment = (
    <Search size={props.size === SizeTokenValue.Small ? SizeTokenValue.Small : SizeTokenValue.Medium} />
  );

  return <Input startAdornment={startAdornment} {...props} />;
};

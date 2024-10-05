import {useContext} from 'react';

import {InputComponent} from 'input';
import {SelectContext} from 'select/Select';

import type {InputProps} from 'input';

export const NoWrapInput: InputProps['inputComponent'] = props => {
  const isReadOnly = !useContext(SelectContext).filter;

  const inputProps = {
    ...props,

    inputProps: {...props.inputProps, readOnly: isReadOnly},

    style: {...props.style, isReadOnly},
  };

  return <InputComponent {...inputProps} />;
};

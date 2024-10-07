import {useContext} from 'react';

import {InputComponent} from 'Input';
import {SelectContext} from 'Select/Select';

import type {InputProps} from 'Input';

export const NoWrapInput: InputProps['inputComponent'] = props => {
  const isReadOnly = !useContext(SelectContext).filter;

  const inputProps = {
    ...props,

    inputProps: {...props.inputProps, readOnly: isReadOnly},

    style: {...props.style, isReadOnly},
  };

  return <InputComponent {...inputProps} />;
};

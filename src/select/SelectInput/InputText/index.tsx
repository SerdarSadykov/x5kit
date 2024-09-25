import {useContext} from 'react';

import {InputProps, InputComponent} from 'input';
import {SelectContext} from 'select/Select';

export const InputText: InputProps['inputComponent'] = props => {
  const isReadOnly = !useContext(SelectContext).filter;

  const inputProps = {
    ...props,

    inputProps: {...props.inputProps, readOnly: isReadOnly},

    style: {...props.style, isReadOnly},
  };

  return <InputComponent {...inputProps} />;
};

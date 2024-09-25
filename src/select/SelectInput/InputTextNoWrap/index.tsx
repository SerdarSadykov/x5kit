import {CSSProperties, useContext, useEffect, useRef} from 'react';
import styled from '@emotion/styled';

import {InputProps, Label, FieldComponent} from 'input';
import {SelectContext} from 'select/Select';

const Container = styled.div`
  position: relative;
  flex-grow: 1;
  height: 100%;

  input:read-only {
    cursor: default;
  }
`;

const DivFieldComponent = styled(FieldComponent)`
  padding-top: 19px;
`;

const hidden: CSSProperties = {display: 'none'};

export const InputTextNoWrap: InputProps['inputComponent'] = props => {
  const {isOpen, filter} = useContext(SelectContext);
  const isFiltering = !!filter && isOpen;

  const ref = useRef<HTMLInputElement>(null);

  const inputProps = {
    ...props.style,
    ...props.inputProps,

    value: props.value,
    onChange: props.onChange,
    onBlur: props.onBlur,

    style: isFiltering ? undefined : hidden,
  };

  const divProps = {
    ...props.style,
    ...props.inputProps,

    children: props.value,
    onFocus: props.onFocus,

    tabIndex: isFiltering ? undefined : 0,
    style: isFiltering ? hidden : undefined,
  };

  useEffect(() => {
    if (!isFiltering) {
      return;
    }

    setTimeout(() => {
      ref.current?.focus();
    });
  }, [isFiltering]);

  return (
    <Container>
      <Label {...props} />
      <FieldComponent ref={ref} {...inputProps} />
      <DivFieldComponent as="div" {...divProps} />
    </Container>
  );
};

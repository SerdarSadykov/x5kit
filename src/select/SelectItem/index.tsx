import styled from '@emotion/styled';

import {theme} from 'theme';

import {SelectItemProps} from '../types';

const Container = styled.label`
  position: relative;
  display: block;
  padding: 6px 12px;

  ${theme.typography.p1compact};

  :hover {
    background-color: ${theme.colors.grey[10]};
    cursor: pointer;
  }

  input {
    position: absolute;
    visibility: hidden;
    left: 0;
    top: 0;
    width: 0;
    height: 0;
    pointer-events: none;
  }
`;

export const SelectItem: React.FC<SelectItemProps> = ({option, checked, onChange}) => {
  const {name, label, value} = option;

  const inputProps = {name, value, checked, onChange, type: 'radio'};

  return (
    <Container>
      <input {...inputProps} />
      {label}
    </Container>
  );
};

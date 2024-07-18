import styled from '@emotion/styled';

import type {InputInternalProps} from '../types';
import {Field} from '../Field';
import {Label} from '../Label';

const Container = styled.div`
  position: relative;
  flex-grow: 1;
  height: 100%;
`;

export const InputComponent: React.FC<InputInternalProps> = props => (
  <Container>
    <Field {...props} />
    <Label {...props} />
  </Container>
);

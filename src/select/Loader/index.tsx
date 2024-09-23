import styled from '@emotion/styled';
import {PropsWithChildren} from 'react';

import {SizeTokenValue, theme} from 'theme';
import {Loader as BaseLoader} from 'loader';

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${theme.colors.grey[40]};

  ${theme.typography.p1compact};
`;

export const Loader: React.FC<PropsWithChildren> = ({children}) => (
  <Container>
    <BaseLoader size={SizeTokenValue.Small} />
    <div>{children}</div>
  </Container>
);

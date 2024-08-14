import styled from '@emotion/styled';

import {theme} from 'theme';

import {Loader} from './Loader';
import {LoaderItemProps} from './types';

export const Container = styled.div`
  display: flex;
  align-items: 'center';
  padding: 6px 12px;
  color: ${theme.colors.grey[40]};
`;

export const Content = styled.div(theme.typography.p3);

export const LoaderItem: React.FC<LoaderItemProps> = ({children, size}) => (
  <Container>
    <Loader size={size} />
    <Content>{children}</Content>
  </Container>
);

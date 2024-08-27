import styled from '@emotion/styled';

import {theme} from 'theme';

import {Loader} from './Loader';
import {LoaderItemProps} from './types';

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${theme.colors.grey[40]};

  ${theme.typography.p1compact};
`;

export const LoaderItem: React.FC<LoaderItemProps> = ({children, size, color, qa, ...props}) => {
  const loaderProps = {size, color};

  return (
    <Container data-qa={qa} {...props}>
      <Loader {...loaderProps} />
      <div>{children}</div>
    </Container>
  );
};

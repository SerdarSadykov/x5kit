import styled from '@emotion/styled';

import {theme} from 'theme';

import {Loader} from './Loader';

import type {LoaderBlockProps} from './types';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  color: ${theme.colors.grey[100]};

  ${theme.typography.p1};
`;

export const LoaderBlock: React.FC<LoaderBlockProps> = ({children, size, color, qa, ...props}) => {
  const loaderProps = {size, color};

  return (
    <Container data-qa={qa} {...props}>
      <Loader {...loaderProps} />
      <div>{children}</div>
    </Container>
  );
};

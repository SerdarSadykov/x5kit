import styled from '@emotion/styled';

import type {PropsWithChildren} from 'react';

const Container = styled.div``;

export const SelectHeader: React.FC<PropsWithChildren> = props => {
  return <Container {...props} />;
};

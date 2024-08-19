import {PropsWithChildren} from 'react';
import styled from '@emotion/styled';

const Container = styled.div``;

export const SelectHeader: React.FC<PropsWithChildren> = props => {
  return <Container {...props} />;
};
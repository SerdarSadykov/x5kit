import styled from '@emotion/styled';
import {PropsWithChildren} from 'react';

const Container = styled.div<{isString: boolean}>`
  padding: ${props => (props.isString ? '0 4px' : undefined)};
`;

export const Content: React.FC<PropsWithChildren> = ({children}) => (
  <Container isString={typeof children === 'string'}>{children}</Container>
);

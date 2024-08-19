import {PropsWithChildren} from 'react';
import styled from '@emotion/styled';

import {theme} from 'theme';

const Container = styled.div`
  position: relative;
  padding: 12px;
  border-top: 1px solid ${theme.colors.grey[20]};
`;

export const SelectFooter: React.FC<PropsWithChildren> = props => {
  return <Container {...props} />;
};

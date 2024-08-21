import {PropsWithChildren, useState} from 'react';
import styled from '@emotion/styled';

import {SizeTokenValue} from 'theme';
import {Banner} from 'banner';

const Container = styled.div`
  padding: 12px 12px 0;
`;

export const Hint: React.FC<PropsWithChildren> = props => {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen || !props.children) return null;

  const onClose = () => setIsOpen(false);

  const bannerProps = {...props, onClose, size: SizeTokenValue.XSmall};

  return (
    <Container>
      <Banner {...bannerProps} />
    </Container>
  );
};

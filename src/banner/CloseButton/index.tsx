import styled from '@emotion/styled';

import {SizeTokenValue} from 'theme';
import {Close} from 'icons';
import {ButtonVariant, IconButton} from 'button';

import {BannerProps} from '../types';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
`;

export const CloseButton: React.FC<Pick<BannerProps, 'onClose'>> = ({onClose}) => {
  if (!onClose) {
    return null;
  }

  return (
    <Container>
      <IconButton size={SizeTokenValue.XXSmall} variant={ButtonVariant.inner} onClick={onClose}>
        <Close size={SizeTokenValue.Small} />
      </IconButton>
    </Container>
  );
};

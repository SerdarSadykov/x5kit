import styled from '@emotion/styled';

import {SizeTokenValue} from 'theme';
import {Close} from 'icons';
import {ButtonVariant, IconButton} from 'Button';

import type {BannerProps} from '../types';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
`;

export const CloseButton: React.FC<Pick<BannerProps, 'onClose' | 'qa'>> = ({onClose, qa}) => {
  if (!onClose) {
    return null;
  }

  return (
    <Container>
      <IconButton qa={`${qa}-close`} size={SizeTokenValue.XXSmall} variant={ButtonVariant.innerInput} onClick={onClose}>
        <Close size={SizeTokenValue.Small} />
      </IconButton>
    </Container>
  );
};

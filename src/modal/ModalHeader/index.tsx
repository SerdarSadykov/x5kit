import styled from '@emotion/styled';

import {Close} from 'icons';
import {SizeTokenValue, theme} from 'theme';
import {ButtonVariant, IconButton} from 'button';

import {ModalHeaderProps} from '../types';

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-shrink: 0;
  gap: 16px;
  padding: 16px 12px 12px 24px;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 4px 0;
`;

const Title = styled.div`
  color: ${theme.colors.grey[100]};

  ${theme.typography.h3}
`;

const Caption = styled.div`
  padding-top: 4px;
  color: ${theme.colors.grey[60]};

  ${theme.typography.p1}
`;

const ButtonContainer = styled.div`
  button {
    width: 32px;
    height: 32px;
  }
`;

const CloseButton: React.FC<Pick<ModalHeaderProps, 'onClose'>> = ({onClose}) => {
  if (!onClose) {
    return null;
  }

  return (
    <ButtonContainer>
      <IconButton variant={ButtonVariant.inner} size={SizeTokenValue.Small} onClick={onClose}>
        <Close />
      </IconButton>
    </ButtonContainer>
  );
};

export const ModalHeader: React.FC<ModalHeaderProps> = ({children, onClose, caption, icon, ...prop}) => (
  <Container {...prop}>
    <TitleContainer>
      {icon}
      <div>
        <Title>{children}</Title>
        {!!caption && <Caption>{caption}</Caption>}
      </div>
    </TitleContainer>
    <CloseButton onClose={onClose} />
  </Container>
);

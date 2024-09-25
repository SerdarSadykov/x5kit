// for Select.stories.tsx

import styled from '@emotion/styled';
import {Button, ButtonVariant} from 'button';

import {SizeTokenValue, theme} from 'theme';
import {Typography} from 'typography';

const HeaderContainer = styled.div`
  padding: 10px;
  border-bottom: 1px solid ${theme.colors.grey[20]};
`;

const FooterContainer = styled.div`
  padding: 10px;
  border-top: 1px solid ${theme.colors.grey[20]};
`;

const FooterButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <Typography variant="h4" style={{textAlign: 'center'}}>
        Заголовок
      </Typography>
    </HeaderContainer>
  );
};

const Footer: React.FC = () => {
  const onCancel = () => console.log('cancel');
  const onConfirm = () => console.log('confirm');

  return (
    <FooterContainer>
      <Typography variant="h4" style={{marginBottom: 8}}>
        Показано n из m
      </Typography>
      <Typography variant="p3" style={{marginBottom: 8}}>
        Уточните запрос, пожалуйста.
      </Typography>
      <FooterButtons>
        <Button size={SizeTokenValue.Small} variant={ButtonVariant.outlined} onClick={onCancel}>
          Отмена
        </Button>
        <Button size={SizeTokenValue.Small} onClick={onConfirm}>
          Применить
        </Button>
      </FooterButtons>
    </FooterContainer>
  );
};

export const header = <Header />;
export const footer = <Footer />;

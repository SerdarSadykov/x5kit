/* v8 ignore next 100 lines */
// for Select.stories.tsx

import styled from '@emotion/styled';

import {Button, ButtonVariant} from 'Button';

import {SizeTokenValue, theme} from 'theme';
import {Typography} from 'Typography';

import type {SelectOption} from './types';

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
  // eslint-disable-next-line  no-console
  const onCancel = () => console.log('cancel');

  // eslint-disable-next-line  no-console
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

export const setIcon = (option: SelectOption, i: number) => {
  option.icon = (
    <div
      style={{
        width: 15,
        height: 11,
        alignSelf: 'center',
        backgroundPosition: `${i * 15}px 0`,
        backgroundImage: `url(
          'data:image/jpeg;base64,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'
        )`,
      }}
    />
  );

  return option;
};

import styled from '@emotion/styled';

import {theme} from 'theme';

import {ActionsTop} from '../ActionsTop';
import {ActionsBottom} from '../ActionsBottom';
import {MessageContent} from '../MessageContent';
import {MessageIcon} from '../MessageIcon';

import {SnackbarVariant} from '../types';

import type {SnackbarContentProps, SnackbarMessageInner} from '../types';

const variantShadow: Record<SnackbarVariant, string> = {
  [SnackbarVariant.default]: 'none',
  [SnackbarVariant.success]: `-4px 0px 0px 0px ${theme.colors.success}`,
  [SnackbarVariant.warning]: `-4px 0px 0px 0px ${theme.colors.additional.yellow[50]}`,
  [SnackbarVariant.error]: `-4px 0px 0px 0px ${theme.colors.additional.red[50]}`,
};

const Container = styled.div<Pick<SnackbarMessageInner, 'variant'>>`
  display: flex;
  align-items: flex-start;
  padding: 8px;
  border-radius: 4px;
  background-color: ${theme.colors.grey[90]};
  box-shadow: ${props => variantShadow[props.variant]};
`;

const Content = styled.div`
  flex-grow: 1;
`;

const Top = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

export const MessageComponent: React.FC<SnackbarContentProps> = props => {
  const {qa, variant, maxWidth} = props.message;

  return (
    <Container data-qa={qa} variant={variant} style={{maxWidth}}>
      <MessageIcon {...props} />

      <Content>
        <Top>
          <MessageContent {...props} />
          <ActionsTop {...props} />
        </Top>

        <ActionsBottom {...props} />
      </Content>
    </Container>
  );
};

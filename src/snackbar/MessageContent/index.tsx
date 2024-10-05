import styled from '@emotion/styled';

import {theme} from 'theme';

import {SnackbarVariant} from '../types';

import type {SnackbarContentProps, SnackbarMessageInner} from '../types';

const variantColor: Record<SnackbarVariant, string> = {
  [SnackbarVariant.default]: theme.colors.white,
  [SnackbarVariant.success]: theme.colors.additional.green[50],
  [SnackbarVariant.warning]: theme.colors.additional.yellow[50],
  [SnackbarVariant.error]: theme.colors.additional.red[50],
};

const Container = styled.div`
  padding: 6px 8px 6px 4px;
`;

const TitleComponent = styled.div<Pick<SnackbarMessageInner, 'variant'>>`
  padding-bottom: 2px;
  color: ${props => variantColor[props.variant]};

  ${theme.typography.h4}
`;

const ContentComponent = styled.div`
  color: ${theme.colors.white};

  ${theme.typography.p1compact}
`;

export const MessageContent: React.FC<SnackbarContentProps> = props => {
  const {title, content, variant, whiteSpace} = props.message;

  return (
    <Container>
      {title && <TitleComponent variant={variant}>{title}</TitleComponent>}
      <ContentComponent style={{whiteSpace}}>{content}</ContentComponent>
    </Container>
  );
};

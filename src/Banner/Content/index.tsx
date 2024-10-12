import styled from '@emotion/styled';

import {theme} from 'theme';

import type {QA} from 'common';
import type {BannerProps} from '../types';

const Container = styled.div`
  display: flex;
  min-width: 0;
  justify-content: space-between;
  flex-grow: 1;
  gap: 8px;
`;

const ContentContainer = styled.div`
  min-width: 0;
`;

const Title = styled.div`
  padding: 2px 0 6px;

  ${theme.typography.h4}
`;

const Actions = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  gap: 8px;
`;

type ContentProps = Pick<BannerProps, 'children' | 'title' | 'actionsTop'> & Required<QA>;

export const Content: React.FC<ContentProps> = ({children, title, actionsTop, qa}) => {
  const titleContent = title && <Title data-qa={`${qa}-title`}>{title}</Title>;

  const right = actionsTop && <Actions data-qa={`${qa}-actions-top`}>{actionsTop}</Actions>;

  return (
    <Container>
      <ContentContainer>
        {titleContent}
        <div data-qa={`${qa}-message`}>{children}</div>
      </ContentContainer>
      {right}
    </Container>
  );
};

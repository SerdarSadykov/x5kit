import styled from '@emotion/styled';

import {theme} from 'theme';

import {getQAAttribute} from 'common';

import {Action} from '../Action';

import type {QA} from 'common';
import type {BannerProps} from '../types';

type ContentProps = Pick<BannerProps, 'children' | 'title' | 'action' | 'actionNextLine'> & Required<QA>;

const Container = styled.div<Pick<ContentProps, 'actionNextLine'>>`
  display: flex;
  min-width: 0;
  justify-content: space-between;
  flex-grow: 1;

  ${props => ({
    gap: props.actionNextLine ? 4 : 8,
    flexDirection: props.actionNextLine ? 'column' : undefined,
  })}
`;

const ContentContainer = styled.div`
  min-width: 0;
`;

const Title = styled.div`
  padding: 2px 0 6px;

  ${theme.typography.h4}
`;

export const Content: React.FC<ContentProps> = ({children, title, action, actionNextLine, qa}) => {
  const getQA = getQAAttribute(qa);

  const titleContent = title ? <Title data-qa={getQA('title')}>{title}</Title> : null;

  const actionProps = {action, qa: getQA('action')};

  return (
    <Container actionNextLine={actionNextLine}>
      <ContentContainer>
        {titleContent}
        <div data-qa={getQA('message')}>{children}</div>
      </ContentContainer>

      <Action {...actionProps} />
    </Container>
  );
};

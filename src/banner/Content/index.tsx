import styled from '@emotion/styled';

import {theme} from 'theme';
import {getQAAttribute, QA} from 'common';
import {Link} from 'link';

import {BannerProps} from '../types';

type ContentProps = Pick<BannerProps, 'children' | 'title' | 'action' | 'actionNextLine'> & Required<QA>;

const Container = styled.div<Pick<ContentProps, 'actionNextLine'>>`
  display: flex;
  gap: 8px;
  min-width: 0;
  flex-direction: ${props => (props.actionNextLine ? 'column' : undefined)};
`;

const ContentContainer = styled.div`
  min-width: 0;
`;

const ActionContainer = styled.div<Pick<ContentProps, 'actionNextLine'>>`
  padding: ${props => (props.actionNextLine ? '2px 0' : '2px 8px')};
`;

const Title = styled.div`
  padding: 2px 0 6px;

  ${theme.typography.h4}
`;

const Action: React.FC<Pick<ContentProps, 'action' | 'actionNextLine'>> = ({action, actionNextLine}) => {
  if (!action) {
    return null;
  }

  if (typeof action === 'object' && 'text' in action) {
    const {text, ...linkProps} = action;

    return (
      <ActionContainer actionNextLine={actionNextLine}>
        <Link {...linkProps}>{text}</Link>
      </ActionContainer>
    );
  }

  return action;
};

export const Content: React.FC<ContentProps> = ({children, title, action, actionNextLine, qa}) => {
  const getQA = getQAAttribute(qa);

  const titleContent = title ? <Title data-qa={getQA('title')}>{title}</Title> : null;

  const actionProps = {action, actionNextLine};

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

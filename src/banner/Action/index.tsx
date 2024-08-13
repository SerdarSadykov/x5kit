import styled from '@emotion/styled';

import {Link} from 'link';

import {BannerProps} from '../types';

const Container = styled.div`
  flex-shrink: 0;
`;

export const Action: React.FC<Pick<BannerProps, 'action' | 'qa'>> = ({action, qa}) => {
  if (!action) {
    return null;
  }

  if (typeof action === 'object' && 'text' in action) {
    const {text, ...linkProps} = action;

    return (
      <Container data-qa={qa}>
        <Link {...linkProps}>{text}</Link>
      </Container>
    );
  }

  return action;
};

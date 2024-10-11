import styled from '@emotion/styled';

import {getAction} from '../Actions';

import type {SnackbarContentProps} from '../types';
import type {RequiredQA} from 'common';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-top: 8px;
  gap: 8px;
`;

export const ActionsBottom: React.FC<SnackbarContentProps & RequiredQA> = props => {
  const {actionsBottom = []} = props.message;

  const child = actionsBottom.map(getAction).filter(Boolean);

  if (!child.length) {
    return null;
  }

  return <Container data-qa={`${props.qa}-actions-bottom`}>{child}</Container>;
};

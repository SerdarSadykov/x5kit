import styled from '@emotion/styled';
import {closeSnackbar} from 'notistack';

import {ButtonVariant, IconButton} from 'Button';

import {SizeTokenValue} from 'theme';
import {Close} from 'icons';

import {getAction} from '../Actions';

import type {RequiredQA} from 'common';
import type {SnackbarContentProps} from '../types';

const Container = styled.div`
  display: flex;
  align-items: flex-start;
`;

export const ActionsTop: React.FC<SnackbarContentProps & RequiredQA> = ({qa, message}) => {
  const {key, closable, actionsTop = []} = message;

  const child = actionsTop.map(getAction).filter(Boolean);

  if (closable) {
    const onClose = () => closeSnackbar(key);

    child.push(
      <IconButton
        key="closebutton"
        qa={`${qa}-close`}
        size={SizeTokenValue.Small}
        variant={ButtonVariant.inner}
        onClick={onClose}
      >
        <Close size={SizeTokenValue.Small} />
      </IconButton>
    );
  }

  if (!child.length) {
    return null;
  }

  return <Container data-qa={`${qa}-actions-top`}>{child}</Container>;
};

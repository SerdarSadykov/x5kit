import styled from '@emotion/styled';

import {SizeTokenValue, theme} from 'theme';

import {Check, Error, WarningOutline} from 'icons';

import {SnackbarVariant} from '../types';

import type {IconComponent} from 'icons';

import type {SnackbarContentProps} from '../types';

const variantIcon: Record<SnackbarVariant, IconComponent | null> = {
  [SnackbarVariant.default]: null,
  [SnackbarVariant.success]: Check,
  [SnackbarVariant.warning]: WarningOutline,
  [SnackbarVariant.error]: Error,
};

const variantColor: Record<SnackbarVariant, string> = {
  [SnackbarVariant.default]: theme.colors.white,
  [SnackbarVariant.success]: theme.colors.additional.green[50],
  [SnackbarVariant.warning]: theme.colors.additional.yellow[50],
  [SnackbarVariant.error]: theme.colors.additional.red[50],
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  min-height: 32px;
  padding: 4px;
  box-sizing: border-box;

  ${theme.typography.h4}
`;

export const MessageIcon: React.FC<SnackbarContentProps> = ({message: {icon, variant}}) => {
  if (typeof icon !== 'undefined' && icon !== true) {
    return icon;
  }

  const Component = variantIcon[variant];
  if (!Component) {
    return null;
  }

  return (
    <Container>
      <Component size={SizeTokenValue.Medium} color={variantColor[variant]} />
    </Container>
  );
};

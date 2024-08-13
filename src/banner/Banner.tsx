import styled, {CSSObject} from '@emotion/styled';

import {theme} from 'theme';

import {Content} from './Content';
import {Icon} from './Icon';
import {BannerProps, BannerStyles, BannerVariant} from './types';
import {CloseButton} from './CloseButton';

const variantProps: Record<BannerVariant, CSSObject> = {
  [BannerVariant.defaultBlue]: {
    backgroundColor: theme.colors.additional.blue[10],
    borderColor: theme.colors.additional.blue[30],
  },

  [BannerVariant.defaultGrey]: {
    backgroundColor: theme.colors.additional.blueGrey[10],
    borderColor: theme.colors.additional.blueGrey[30],
  },

  [BannerVariant.success]: {
    backgroundColor: theme.colors.additional.green[10],
    borderColor: theme.colors.additional.green[30],
  },

  [BannerVariant.warning]: {
    backgroundColor: theme.colors.additional.yellow[10],
    borderColor: theme.colors.additional.yellow[30],
  },

  [BannerVariant.error]: {
    backgroundColor: theme.colors.additional.red[10],
    borderColor: theme.colors.additional.red[30],
  },
};

const Container = styled.div<BannerStyles>`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid transparent;
  box-sizing: border-box;

  ${({variant, maxWidth, color = theme.colors.grey[100], ...props}) => {
    const typeProp = variantProps[variant];

    return {
      ...theme.typography.p1,

      color,
      maxWidth,

      backgroundColor: props.backgroundColor ?? typeProp.backgroundColor,
      borderColor: props.borderColor ?? typeProp.borderColor,
    };
  }};
`;

export const Banner: React.FC<BannerProps> = props => {
  const {
    children,
    icon,
    action,
    actionNextLine,
    title,
    onClose,

    variant = BannerVariant.defaultBlue,
    qa = 'banner',

    ...rest
  } = props;

  const bannerStyles = {...rest, variant};

  const iconProps = {variant, icon};

  const contentProps = {children, title, action, actionNextLine, qa};

  return (
    <Container data-qa={qa} {...bannerStyles}>
      <Icon {...iconProps} />
      <Content {...contentProps} />
      <CloseButton onClose={onClose} />
    </Container>
  );
};

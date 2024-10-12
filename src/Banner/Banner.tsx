import styled from '@emotion/styled';

import {SizeTokenValue, theme} from 'theme';

import {Content} from './Content';
import {Icon} from './Icon';

import {BannerVariant} from './types';
import {CloseButton} from './CloseButton';

import type {BannerProps, BannerStyles} from './types';
import type {CSSObject} from '@emotion/styled';

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

const sizeProps: Partial<Record<SizeTokenValue, CSSObject>> = {
  [SizeTokenValue.Large]: {
    ...theme.typography.p1,

    gap: 8,
  },

  [SizeTokenValue.Medium]: {
    ...theme.typography.p1,

    gap: 8,
  },

  [SizeTokenValue.Small]: {
    ...theme.typography.p1,

    gap: 8,
  },

  [SizeTokenValue.XSmall]: {
    ...theme.typography.p3,

    alignItems: 'center',
    padding: 8,
    gap: 4,
  },
};

const Container = styled.div<BannerStyles>`
  padding: 12px;
  border-radius: 8px;
  border: 1px solid transparent;
  box-sizing: border-box;

  ${({variant, size, width, maxWidth, color = theme.colors.grey[100], ...props}) => {
    const typeProp = variantProps[variant];
    const sizeProp = sizeProps[size];

    return {
      ...sizeProp,

      color,
      width,
      maxWidth,

      backgroundColor: props.backgroundColor ?? typeProp.backgroundColor,
      borderColor: props.borderColor ?? typeProp.borderColor,
    };
  }};
`;

const ContentContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  padding-top: 8px;
`;

export const Banner: React.FC<BannerProps> = props => {
  const {
    children,
    icon,
    actionsTop,
    actionsBottom,
    title,
    onClose,

    variant = BannerVariant.defaultBlue,
    size = SizeTokenValue.Medium,
    qa = 'banner',

    ...rest
  } = props;

  const bannerStyles = {...rest, variant, size};

  const iconProps = {variant, icon};

  const contentProps = {children, title, actionsTop, qa};

  const bottom = actionsBottom && <Actions data-qa={`${qa}-actions-bottom`}>{actionsBottom}</Actions>;

  return (
    <Container data-qa={qa} {...bannerStyles}>
      <ContentContainer>
        <Icon {...iconProps} />
        <Content {...contentProps} />
        <CloseButton qa={qa} onClose={onClose} />
      </ContentContainer>
      {bottom}
    </Container>
  );
};

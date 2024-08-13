import {ReactNode} from 'react';
import styled from '@emotion/styled';

import {SizeTokenValue, theme} from 'theme';
import {Check, Error, Info, WarningOutline} from 'icons';

import {BannerProps, BannerVariant} from '../types';

const typeIcon: Record<BannerVariant, ReactNode> = {
  [BannerVariant.defaultBlue]: <Info size={SizeTokenValue.Medium} color={theme.colors.additional.blue[80]} />,
  [BannerVariant.defaultGrey]: <Info size={SizeTokenValue.Medium} color={theme.colors.grey[60]} />,
  [BannerVariant.success]: <Check size={SizeTokenValue.Medium} color={theme.colors.additional.green[80]} />,
  [BannerVariant.warning]: <WarningOutline size={SizeTokenValue.Medium} color={theme.colors.additional.yellow[80]} />,
  [BannerVariant.error]: <Error size={SizeTokenValue.Medium} color={theme.colors.additional.red[80]} />,
}

const Container = styled.div`
  svg {
    vertical-align: top;
  }
`;

type IconProps = Pick<BannerProps, 'icon'> & Required<Pick<BannerProps, 'variant'>>;

export const Icon: React.FC<IconProps> = ({icon, variant}) => {
  if (icon === false) {
    return null;
  }

  const child = icon && typeof icon !== 'boolean' ? icon : typeIcon[variant];

  return <Container>{child}</Container>;
};

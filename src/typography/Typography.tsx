import {forwardRef, HTMLAttributes} from 'react';
import styled from '@emotion/styled';

import {theme} from 'theme';

export type TypographyProps = {
  variant: keyof typeof theme.typography;
} & HTMLAttributes<HTMLDivElement>;

const Container = styled.div<Pick<TypographyProps, 'variant'>>(props => theme.typography[props.variant]);

export const Typography = forwardRef<HTMLDivElement, TypographyProps>((props, ref) => (
  <Container {...props} ref={ref} />
));

import styled from '@emotion/styled';

import {SpaceTokenName, colorsUi, shadows, spaces} from 'tokens'

export const Container = styled.div`
  display: 'flex';
  width: 'fit-content';
  padding: ${spaces.join(SpaceTokenName.x10, SpaceTokenName.x8)};
  background: ${colorsUi.state};
  box-shadow: ${shadows.medium};
  border-radius: ${spaces.x4};
  box-sizing: 'border-box';
`;

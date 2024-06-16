import {css} from '@emotion/react';

import {
  X5SansUIRegular,
  X5SansUIRegular2,
  X5SansUIMedium,
  X5SansUIMedium2,
  X5SansUIBold,
  X5SansUIBold2,
} from './x5-sans-ui';

export const fonts = css`
  @font-face {
    font-family: 'X5 Sans UI';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src:
      url(${X5SansUIRegular2}) format('woff2'),
      url(${X5SansUIRegular}) format('woff');
  }

  @font-face {
    font-family: 'X5 Sans UI';
    font-style: normal;
    font-weight: 500;
    font-display: swap;
    src:
      url(${X5SansUIMedium2}) format('woff2'),
      url(${X5SansUIMedium}) format('woff');
  }

  @font-face {
    font-family: 'X5 Sans UI';
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src:
      url(${X5SansUIBold2}) format('woff2'),
      url(${X5SansUIBold}) format('woff');
  }
`;

import {css} from '@emotion/react';

export const scroll = css`
  ::-webkit-scrollbar {
    top: 0;
    left: 0;
    right: 0;
    width: 16px;
    bottom: 0;
    height: 16px;
    position: absolute;
  }
  ::-webkit-scrollbar-button {
    width: 0;
    height: 0;
    display: none;
  }
  ::-webkit-scrollbar-thumb {
    border: 4px solid rgba(0, 0, 0, 0);
    min-height: 32px;
    border-radius: 16px;
    background-clip: padding-box;
    background-color: #cfd4dc;
  }
  ::-webkit-scrollbar-corner {
    display: none;
    background-color: rgba(0, 0, 0, 0);
  }
`;

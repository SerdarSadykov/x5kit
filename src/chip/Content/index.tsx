import styled from '@emotion/styled';

import {ChipProps} from '../types';

const Container = styled.div<Pick<ChipProps, 'whiteSpace' | 'maxWidth'>>(({maxWidth, whiteSpace}) => ({
  maxWidth,
  whiteSpace,
  userSelect: 'none',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}));

export const Content: React.FC<ChipProps> = ({children, label, whiteSpace, maxWidth, maxLength, maxLengthFunc}) => {
  if (!label) {
    return children;
  }

  if (maxLength && label.length > maxLength) {
    label = maxLengthFunc?.(label) ?? `${label.slice(0, maxLength - 2)}...`;
  }

  return <Container {...{whiteSpace, maxWidth}}>{label}</Container>;
};

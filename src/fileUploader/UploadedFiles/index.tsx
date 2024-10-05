import styled from '@emotion/styled';

import {getUploadedFile} from '../UploadedFile';

import type {UploadedFilesProps} from '../types';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
`;

export const UploadedFiles: React.FC<UploadedFilesProps> = props => {
  const {items} = props;

  if (!items.length) {
    return null;
  }

  return <Container>{items.map(item => getUploadedFile(item, props))}</Container>;
};

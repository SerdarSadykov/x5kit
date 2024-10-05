import styled from '@emotion/styled';

import {theme} from 'theme';

import {Title} from './Title';
import {Caption} from './Caption';
import {UploadedFiles} from './UploadedFiles';
import {useFileUploader} from './hook';

import type {FileUploaderProps} from './types';

type DropzoneStyles = {
  isDisabled: boolean;
  isError: boolean;
  isDragActive: boolean;
};

const Dropzone = styled.div<DropzoneStyles>`
  position: relative;
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  gap: 12px;
  padding: 24px;
  border-radius: 4px;
  background-color: ${theme.colors.white};
  border: 2px dashed ${theme.colors.grey[30]};

  :hover {
    background-color: ${theme.colors.grey[5]};
    border-color: ${theme.colors.grey[40]};
  }

  ${props => {
    if (props.isDisabled) {
      return {
        borderColor: theme.colors.grey[20],
      };
    }

    if (props.isDragActive) {
      return {
        borderColor: theme.colors.accent[90],
        backgroundColor: theme.colors.accent[5],
      };
    }

    if (props.isError) {
      return {
        borderColor: theme.colors.additional.red[80],
      };
    }
  }}
`;

export const FileUploader: React.FC<FileUploaderProps> = props => {
  const {dzState, titleProps, captionProps, listProps} = useFileUploader(props);

  const FilesComponent = props.filesComponent ?? UploadedFiles;

  const dropzoneProps = {
    isDragActive: dzState.isDragActive,
    isError: !!props.error,
    isDisabled: !!props.disabled,
  };

  return (
    <div data-qa={props.qa}>
      <Dropzone {...dzState.getRootProps()} {...dropzoneProps}>
        <input {...dzState.getInputProps()} />

        <Title {...titleProps} />

        <FilesComponent {...listProps} />
      </Dropzone>

      <Caption {...captionProps} />
    </div>
  );
};

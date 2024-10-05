import {SizeTokenValue} from 'theme';
import {Download} from 'icons';
import {Loader} from 'loader';

import {Chip} from 'chip';

import {useUploadedFile} from './hook';

import type {ChipProps} from 'chip';

import type {FileItem, UploadedFilesProps} from 'fileUploader/types';

import type {UploadedFileProps} from './hook';

import type {ReactNode} from 'react';

const UploadedFile: React.FC<UploadedFileProps> = props => {
  const {item} = props;

  const {isHidden, isError, isLoading, onClick, onDelete} = useUploadedFile(props);

  if (isHidden) {
    return null;
  }

  let startAdornment: ReactNode;

  if (isLoading) {
    startAdornment = <Loader size={SizeTokenValue.Small} />;
  } else if (item.url) {
    startAdornment = <Download size={SizeTokenValue.Small} />;
  }

  const chipProps: ChipProps = {
    onClick,
    startAdornment,
    onDelete,

    label: item.name,
    tooltip: item.tooltip,
    href: item.url,
    error: isError,

    maxLength: props.maxLabelLength,
    maxLengthFunc: props.maxLabelLengthFunc,

    target: '_blank',
  };

  return <Chip {...chipProps} />;
};

export const getUploadedFile = (item: FileItem, props: UploadedFilesProps) => (
  <UploadedFile key={item.id} item={item} {...props} />
);

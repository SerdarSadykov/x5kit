import {ReactNode} from 'react';

import {SizeTokenValue} from 'theme';
import {Download} from 'icons';
import {Loader} from 'loader';
import {Chip, ChipProps} from 'chip';

import {UploadedFileProps, useUploadedFile} from './hook';
import {FileItem, UploadedFilesProps} from 'fileUploader/types';

const UploadedFile: React.FC<UploadedFileProps> = props => {
  const {item} = props;

  const {isLoading, isHidden, onClick, onDelete} = useUploadedFile(props);

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

    maxLength: props.maxLabelLength,
    maxLengthFunc: props.maxLabelLengthFunc,

    target: '_blank',
  };

  return <Chip {...chipProps} />;
};

export const getUploadedFile = (item: FileItem, props: UploadedFilesProps) => (
  <UploadedFile key={item.id} item={item} {...props} />
);

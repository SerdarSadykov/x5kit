import {MouseEventHandler} from 'react';

import {FileItem, FileItemStatus, FileUploaderProps} from '../types';

export type UploadedFileProps = {
  item: FileItem;
} & Pick<FileUploaderProps, 'disabled' | 'onClick' | 'onDelete' | 'maxLabelLength' | 'maxLabelLengthFunc'>;

export const useUploadedFile = (props: UploadedFileProps) => {
  const item = props.item;
  const status = item.status;
  const disabled = props.disabled || item.disabled;

  const isLoading = [FileItemStatus.loading, FileItemStatus.removing].includes(status);

  const isHidden = status === FileItemStatus.removed;

  const isDeletable = !isLoading
    && !disabled
    && !!props.onDelete
    && [FileItemStatus.initial, FileItemStatus.loaded].includes(status);

  const isClickable = !disabled && !!props.onClick;

  const onClick: MouseEventHandler = e => {
    e.stopPropagation();

    props.onClick?.(item, e);
  };

  const onDelete = () => props.onDelete?.(item);

  return {
    isLoading,
    isHidden,

    onClick: isClickable ? onClick : undefined,
    onDelete: isDeletable ? onDelete : undefined,
  };
};

import React, {MouseEvent, MutableRefObject, ReactNode} from 'react';
import {DropEvent, DropzoneOptions, DropzoneState} from 'react-dropzone';

import {QA} from 'common';

export enum FileItemStatus {
  initial = 'initial',
  loading = 'loading',
  loaded = 'loaded',
  removing = 'removing',
  removed = 'removed',
  error = 'error',
}

export type FileItem = {
  id: string | number;

  status: FileItemStatus;
  disabled?: boolean;

  url?: string;
  tooltip?: string;

  [key: string]: unknown;
} & Pick<File, 'name' | 'size'>;

export type UploadedFilesProps = Pick<
  FileUploaderProps,
  'items' | 'disabled' | 'onDelete' | 'onClick' | 'maxLabelLength' | 'maxLabelLengthFunc'
>;

export type FileUploaderProps = {
  items: FileItem[];

  title?: ReactNode;
  subTitle?: ReactNode;

  error?: boolean | ReactNode;
  caption?: ReactNode;
  absoluteCaption?: boolean;

  onDrop: (accepteds: File[], errors: Error[], event: DropEvent) => void;
  onClick?: (file: FileItem, e: MouseEvent) => void;
  onDelete?: (file: FileItem) => void;
  onTouched?: () => void;

  dropzoneStateRef?: MutableRefObject<DropzoneState>;

  maxSizeAll?: number;
  maxSizeAllError?: string;
  maxSizeError?: string;
  minSizeError?: string;
  maxFilesError?: string;
  fileTypeError?: string;

  maxLabelLength?: number;
  maxLabelLengthFunc?: (label: string) => string;

  filesComponent?: React.FC<UploadedFilesProps>;

  // renderPreviewsContent?: FC<DefaultPreviewsProps>;
  // onSelect?: (files: File[]) => void;
} & QA & Omit<DropzoneOptions, 'onDrop' | 'onError'>;

type s = DropzoneOptions[];
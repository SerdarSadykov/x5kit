import {ErrorCode, useDropzone} from 'react-dropzone';

import type {DropzoneOptions} from 'react-dropzone';

import type {FileUploaderProps} from './types';

export abstract class FileError extends Error {
  protected defaultMessage!: string;

  constructor(
    public readonly file: File,
    message?: string
  ) {
    super(message);

    this.message ??= this.defaultMessage;
  }
}

export class MaxSizeError extends FileError {
  protected defaultMessage = 'Файл превышает допустимый размер';
}

export class MinSizeError extends FileError {
  protected defaultMessage = 'Файл имеет недопустимый размер';
}

export class MaxSizeAllError extends FileError {
  protected defaultMessage = 'Файлы превышают допустимый размер';
}

export class MaxFilesError extends FileError {
  protected defaultMessage = 'Некоторые файлы не загрузились.';
}

export class FileTypeError extends FileError {
  protected defaultMessage = 'Формат файла не поддерживается. Удалите файл и загрузите другой формат';
}

export const useFileUploader = (props: FileUploaderProps) => {
  const {
    items,
    title,
    subTitle,
    disabled,
    error,
    caption,
    absoluteCaption,
    onDelete,
    onClick,
    onTouched,

    maxSizeAll,
    maxSizeAllError,
    maxSizeError,
    minSizeError,
    maxFilesError,
    fileTypeError,

    maxLabelLength,
    maxLabelLengthFunc,

    dropzoneStateRef,

    ...dropzoneProps
  } = props;

  const onDrop: DropzoneOptions['onDrop'] = (accepteds, rejecteds, event) => {
    const errors: Error[] = [];

    for (const rejected of rejecteds) {
      for (const item of rejected.errors) {
        switch (item.code) {
          case ErrorCode.FileTooLarge:
            errors.push(new MaxSizeError(rejected.file, maxSizeError));
            break;
          case ErrorCode.FileTooSmall:
            errors.push(new MinSizeError(rejected.file, minSizeError));
            break;
          case ErrorCode.TooManyFiles:
            errors.push(new MaxFilesError(rejected.file, maxFilesError));
            break;
          case ErrorCode.FileInvalidType:
            errors.push(new FileTypeError(rejected.file, fileTypeError));
            break;
        }
      }
    }

    if (maxSizeAll) {
      const newAccepteds: typeof accepteds = [];
      let curSize = items.reduce((acc, i) => acc + i.size, 0);

      for (const file of accepteds) {
        curSize += file.size;

        if (curSize > maxSizeAll) {
          errors.push(new MaxSizeAllError(file, maxSizeAllError));
          continue;
        }

        newAccepteds.push(file);
      }

      accepteds = newAccepteds;
    }

    props.onDrop(accepteds, errors, event);
    props.onTouched?.();
  };

  const dzState = useDropzone({
    onFileDialogCancel: onTouched,

    ...dropzoneProps,

    disabled,
    onDrop,
  });

  if (dropzoneStateRef) {
    dropzoneStateRef.current = dzState;
  }

  return {
    dzState,

    titleProps: {title, subTitle, disabled},

    captionProps: {error, caption, absoluteCaption},

    listProps: {
      items,
      disabled,
      onDelete,
      onClick,
      maxLabelLength,
      maxLabelLengthFunc,
    },
  };
};

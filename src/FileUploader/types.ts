import type {MouseEvent, ReactNode} from 'react';
import type React from 'react';
import type {DropEvent, DropzoneOptions, DropzoneState} from 'react-dropzone';

import type {QA} from 'common';

/** Статус файла */
export enum FileItemStatus {
  /** Исходный. Файлы которые были загружены ранее */
  initial = 'initial',
  /** Загружается */
  loading = 'loading',
  /** Загружен */
  loaded = 'loaded',
  /** Удаляется */
  removing = 'removing',
  /** Удален */
  removed = 'removed',
  /** Ошибка */
  error = 'error',
}

/** Элемент файла.
 *
 * Может быть расширен другими свойствами */
export type FileItem = {
  /** Идентификатор */
  id: string | number;

  /** Статус файла */
  status: FileItemStatus;

  /** Отключен - не редактируемый */
  disabled?: boolean;

  /** Ссылка на файл. Позволяет сказать по нажатию */
  url?: string;
  /** Всплывающая подсказка */
  tooltip?: string;

  [key: string]: unknown;
} & Pick<File, 'name' | 'size'>;

/** Пропсы компонента файлов */
export type UploadedFilesProps = Pick<
  FileUploaderProps,
  'items' | 'disabled' | 'onDelete' | 'onClick' | 'maxLabelLength' | 'maxLabelLengthFunc'
>;

export type FileUploaderProps = {
  /** Элементы файлов */
  items: FileItem[];

  /** Заголовок */
  title?: ReactNode;
  /** Подзаголовок */
  subTitle?: ReactNode;

  /** Ошибка */
  error?: boolean | ReactNode;
  /** Подпись */
  caption?: ReactNode;
  /** Абсолютное позиционирование caption, не занимает место между полями */
  absoluteCaption?: boolean;

  /** Обработчик загрузки */
  onDrop: (
    /** Файлы прошедшие проверку */
    accepteds: File[],
    /** Ошибки по файлам */
    errors: Error[],
    /** Событие загрузки */
    event: DropEvent
  ) => void;
  /** Обработчик нажания на элемент файла */
  onClick?: (file: FileItem, e: MouseEvent) => void;
  /** Обработчиу удаления элемента файла */
  onDelete?: (file: FileItem) => void;
  /** Обработчик события взаимодействия с полем */
  onTouched?: () => void;

  /** Коллбэк принимающий инстанс react-dropzone
   *
   * Используется в специфических ситуациях
   */
  setDropzone?: (dropzone: DropzoneState) => void;

  /** Максимальный размер всех файлов */
  maxSizeAll?: number;
  /** Текст ошибки максимального размера всех файлов */
  maxSizeAllError?: string;
  /** Текст ошибки максимального размера файла */
  maxSizeError?: string;
  /** Текст ошибки минимального размера файла */
  minSizeError?: string;
  /** Текст ошибки максимального количества файлов */
  maxFilesError?: string;
  /** Текст ошибки типа файлов */
  fileTypeError?: string;

  /** Максимальная длинна label элемента файла.
   *
   * Показывает tooltip при превышении */
  maxLabelLength?: number;
  /** Обработчик длинны label элемента файла*/
  maxLabelLengthFunc?: (label: string) => string;

  /** Компонент списка элементов файла */
  filesComponent?: React.FC<UploadedFilesProps>;
} & QA &
  Omit<DropzoneOptions, 'onDrop' | 'onError'>;

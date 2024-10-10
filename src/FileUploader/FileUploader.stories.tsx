import {useState} from 'react';

import {FileUploader as BaseFileUploader} from './FileUploader';
import {FileItemStatus} from './types';

import type {Meta} from '@storybook/react';
import type {FileItem, FileUploaderProps} from './types';

const defaultValue: FileItem[] = [
  {
    id: '1s0',
    name: 'File_unknown.doc',
    size: 100,
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    status: FileItemStatus.initial,
  },
  {
    id: '2s0',
    name: 'File_03.dic',
    size: 100,
    status: FileItemStatus.error,
  },
  {
    id: '3s0',
    name: 'File_disabled with long long name.dic',
    size: 100,
    disabled: true,
    status: FileItemStatus.loaded,
  },
];

export const FileUploader: React.FC<FileUploaderProps> = props => {
  const [items, setItems] = useState<FileItem[]>(defaultValue);

  const onClick = props.onClick ? (file: FileItem) => alert(`onClick ${file.name}`) : undefined;
  const onDelete = props.onDelete
    ? (file: FileItem) => {
        const newItems = items.filter(item => item.id !== file.id);

        setItems(newItems);
      }
    : undefined;

  const maxLabelLengthFunc = props.maxLabelLengthFunc
    ? (label: string) => label.slice(0, 3) + '...' + label.slice(-4)
    : undefined;

  const onDrop: FileUploaderProps['onDrop'] = (accepteds, rejecteds) => {
    if (rejecteds.length) {
      alert(JSON.stringify(rejecteds));
    }

    const newFiles = accepteds.map<FileItem>((item, indx) => ({
      id: items.length + indx + Math.floor(Math.random() * 1000),
      status: FileItemStatus.loading,
      name: item.name,
      size: item.size,
    }));

    setItems([...items, ...newFiles]);

    for (const indx in newFiles) {
      setTimeout(() => {
        newFiles[indx].status = FileItemStatus.loaded;

        setItems([...items, ...newFiles]);
      }, 600 * +indx);
    }
  };

  const resultProps = {
    ...props,

    items,

    onDrop,
    onClick,
    onDelete,
    maxLabelLengthFunc,
  };

  return (
    <div style={{width: 540}}>
      <BaseFileUploader {...resultProps} />
    </div>
  );
};

const meta = {
  title: 'FileUploader',
  component: FileUploader,
  parameters: {
    layout: 'centered',
  },

  argTypes: {
    maxSize: {
      type: 'number',
      control: 'number',
      description: 'Максимальный размер каждого файлов',
    },

    maxSizeAll: {
      type: 'number',
      control: 'number',
      description: 'Максимальный размер всех файлов',
    },

    maxLabelLength: {
      type: 'number',
      control: 'number',
    },

    maxLabelLengthFunc: {
      type: '(label: string) => string' as never,
      control: 'boolean',
      description: 'Контроль длины',
    },

    disabled: {
      type: 'boolean',
      control: 'boolean',
    },

    caption: {
      type: 'string',
      control: 'text',
      description: 'Подпись',
    },

    error: {
      type: 'boolean | string' as never,
      control: 'text',
    },

    onClick: {
      type: '(file: FileItem) => void' as never,
      control: 'boolean',
    },

    onDelete: {
      type: '(file: FileItem) => void' as never,
      control: 'boolean',
    },

    title: {
      type: 'ReactNode' as never,
      control: 'text',
    },

    subTitle: {
      type: 'ReactNode' as never,
      control: 'text',
    },

    qa: {type: 'string', control: 'text'},
  },
  args: {
    maxLabelLength: 25,
    subTitle: 'Не более 10-ти файлов до 10 Mб каждый, jpg, png, pdf, doc или zip',
  },
} satisfies Meta<typeof FileUploader>;

export default meta;

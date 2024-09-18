import type {Meta} from '@storybook/react';

import {FileUploader as BaseFileUploader} from './FileUploader';
import {FileItem, FileItemStatus, FileUploaderProps} from './types';
import {useState} from 'react';

export const FileUploader: React.FC<FileUploaderProps> = props => {
  const [items, setItems] = useState<FileItem[]>([]);
  
  const onClick = props.onClick ? (item: FileItem) => alert(`onClick ${item.name}`) : undefined;
  const onDelete = props.onDelete ? (item: FileItem) => alert(`onDelete ${item.name}`) : undefined;

  const maxLabelLengthFunc = props.maxLabelLengthFunc 
    ? (label: string) => label.slice(0, 3) + '...' + label.slice(-4) 
    : undefined;
  
  
  const onDrop: FileUploaderProps['onDrop'] = (accepteds) => {
    const newFiles = accepteds.map<FileItem>((item, indx) => ({
      id: items.length + indx + Math.floor(Math.random() * 1000),
      status: FileItemStatus.loading,
      name: item.name,
      size: item.size,
      // url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    }));

    setItems([...items, ...newFiles]);

    for(const indx in newFiles) {
      setTimeout(() => {
        newFiles[indx].status = FileItemStatus.loaded;

        setItems([...items, ...newFiles]);
      }, 600 * +indx);
    }
  }

  const resultProps = {
    ...props,

    items,

    onDrop,
    onClick,
    onDelete,
    maxLabelLengthFunc,
  };

  return (
    <div>
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

    error: {
      type: 'boolean | string',
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
      type: 'ReactNode',
      control: 'text',
    },

    subTitle: {
      type: 'ReactNode',
      control: 'text',
    },

    qa: {type: 'string', control: 'text'},
  },
  args: {
    label: 'Label',
    maxLabelLength: 25,
    subTitle: 'Не более 10-ти файлов до 10 Mб каждый, jpg, png, pdf, doc или zip',
  },
} satisfies Meta<typeof Chip>;

export default meta;

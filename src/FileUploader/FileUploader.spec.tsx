import {expect, it, describe, vi} from 'vitest';

import {act, fireEvent, render, screen} from '@testing-library/react';

import {FileUploader, FileItemStatus, FileTypeError, MaxFilesError, MaxSizeError, MaxSizeAllError} from '.';

import type {FileItem, FileUploaderProps} from '.';

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
    name: 'File_disabledFile_disabledFile_disabled.dic',
    size: 100,
    disabled: true,
    status: FileItemStatus.loaded,
  },
];

describe('FileUploader', () => {
  it('uploads', async () => {
    const onDrop = vi.fn();

    const uploaderProps = {
      title: 'file-title',
      subTitle: 'file-subTitle',
      onDrop,
      items: [],
      caption: 'file-caption',
    };

    render(<FileUploader {...uploaderProps} />);

    expect(screen.getByText(uploaderProps.title)).toBeDefined();
    expect(screen.getByText(uploaderProps.subTitle)).toBeDefined();
    expect(screen.getByText(uploaderProps.caption)).toBeDefined();

    const file = new File(['(⌐□_□)'], 'chucknorris.png', {type: 'image/png'});

    await act(async () => {
      await fireEvent.drop(screen.getByTestId('uploader-dropzone'), {
        dataTransfer: {
          files: [file],
          types: ['Files'],
        },
      });
    });

    expect(onDrop).toBeCalled();
    expect(onDrop.mock.calls[0][0][0]).toBe(file);
  });

  it('shows', async () => {
    const onDrop = vi.fn();

    const uploaderProps: FileUploaderProps = {
      onDrop,
      items: defaultValue,
      maxLabelLength: 20,
    };

    const comp = render(<FileUploader {...uploaderProps} />);

    for (const value of defaultValue) {
      const name = value.name.length > 20 ? value.name.slice(0, 18) + '...' : value.name;

      expect(screen.getByText(name)).toBeDefined();
    }

    uploaderProps.maxLabelLengthFunc = label => label.slice(-5);

    comp.rerender(<FileUploader {...uploaderProps} />);

    for (const value of defaultValue) {
      const name = value.name.length > 20 ? value.name.slice(-5) : value.name;

      expect(screen.getByText(name)).toBeDefined();
    }
  });

  it('accepts', async () => {
    const onDrop = vi.fn();

    const uploaderProps: FileUploaderProps = {
      onDrop,
      items: [],
      fileTypeError: 'file-fileTypeError',

      accept: {
        'image/png': ['.png'],
      },
    };

    render(<FileUploader {...uploaderProps} />);

    const file = new File(['(⌐□_□)'], 'chucknorris.bmp', {type: 'image/bmp'});

    await act(async () => {
      await fireEvent.drop(screen.getByTestId('uploader-dropzone'), {
        dataTransfer: {
          files: [file],
          types: ['Files'],
        },
      });
    });

    expect(onDrop).toBeCalled();
    expect(onDrop.mock.calls[0][1][0]).instanceOf(FileTypeError);
    expect(onDrop.mock.calls[0][1][0].message).toBe(uploaderProps.fileTypeError);
  });

  it('maxFiles', async () => {
    const onDrop = vi.fn();

    const uploaderProps: FileUploaderProps = {
      onDrop,
      items: [],
      maxFiles: 1,
      maxFilesError: 'file-maxFilesError',
    };

    render(<FileUploader {...uploaderProps} />);

    const file = new File(['(⌐□_□)'], 'chucknorris.bmp', {type: 'image/bmp'});
    const file2 = new File(['(⌐□_□)'], 'chucknorris2.bmp', {type: 'image/bmp'});

    await act(async () => {
      await fireEvent.drop(screen.getByTestId('uploader-dropzone'), {
        dataTransfer: {
          files: [file, file2],
          types: ['Files'],
        },
      });
    });

    expect(onDrop).toBeCalled();
    expect(onDrop.mock.calls[0][0]).toEqual([]);
    expect(onDrop.mock.calls[0][1][0]).instanceOf(MaxFilesError);
    expect(onDrop.mock.calls[0][1][0].message).toBe(uploaderProps.maxFilesError);
  });

  it('maxSize', async () => {
    const onDrop = vi.fn();

    const uploaderProps: FileUploaderProps = {
      onDrop,
      items: [],
      maxSize: 100,
      maxSizeAll: 200,
      maxSizeAllError: 'file-maxSizeAllError',
      maxSizeError: 'file-maxSizeError',
      minSizeError: 'file-minSizeError',
    };

    render(<FileUploader {...uploaderProps} />);

    const file = new File([new ArrayBuffer(100)], 'chucknorris.bmp', {type: 'image/bmp'});
    const file2 = new File([new ArrayBuffer(100)], 'chucknorris2.bmp', {type: 'image/bmp'});
    const file3 = new File([new ArrayBuffer(100)], 'chucknorris2.bmp', {type: 'image/bmp'});

    await act(async () => {
      await fireEvent.drop(screen.getByTestId('uploader-dropzone'), {
        dataTransfer: {
          files: [file, file2],
          types: ['Files'],
        },
      });
    });

    expect(onDrop).toBeCalled();
    expect(onDrop.mock.calls[0][0]).toEqual([file, file2]);
    expect(onDrop.mock.calls[0][1]).toEqual([]);

    await act(async () => {
      await fireEvent.drop(screen.getByTestId('uploader-dropzone'), {
        dataTransfer: {
          files: [file, file2, file3],
          types: ['Files'],
        },
      });
    });

    expect(onDrop.mock.calls[1][0]).toEqual([file, file2]);
    expect(onDrop.mock.calls[1][1][0]).toBeInstanceOf(MaxSizeAllError);
    expect(onDrop.mock.calls[1][1][0].message).toBe(uploaderProps.maxSizeAllError);

    const fileBig = new File([new ArrayBuffer(110)], 'chucknorrisBig.bmp', {type: 'image/bmp'});
    await act(async () => {
      await fireEvent.drop(screen.getByTestId('uploader-dropzone'), {
        dataTransfer: {
          files: [file, fileBig],
          types: ['Files'],
        },
      });
    });

    expect(onDrop.mock.calls[2][0]).toEqual([file]);
    expect(onDrop.mock.calls[2][1][0]).toBeInstanceOf(MaxSizeError);
    expect(onDrop.mock.calls[2][1][0].message).toBe(uploaderProps.maxSizeError);

    const fileBigBig = new File([new ArrayBuffer(210)], 'chucknorrisBigBig.bmp', {type: 'image/bmp'});
    await act(async () => {
      await fireEvent.drop(screen.getByTestId('uploader-dropzone'), {
        dataTransfer: {
          files: [fileBigBig],
          types: ['Files'],
        },
      });
    });

    expect(onDrop.mock.calls[3][0]).toEqual([]);
    expect(onDrop.mock.calls[3][1][0]).toBeInstanceOf(MaxSizeError);
    expect(onDrop.mock.calls[3][1][0].message).toBe(uploaderProps.maxSizeError);
  });

  // it('ThemeProvider', async () => {
  //   const content = 'content';

  //   const onDrop: FileUploaderProps['onDrop'] = vi.fn();

  //   const uploaderProps: FileUploaderProps = {
  //     title: 'file-title',
  //     subTitle: 'file-subTitle',
  //     onDrop,
  //     items: [],
  //     caption: 'file-caption',

  //     maxSize: 100,
  //     maxSizeAll: 1000,

  //     maxLabelLength: 100,
  //     maxLabelLengthFunc: label => label.slice(-5),

  //     filesComponent: () => 'file-filesComponent',
  //   };

  //   const comp = render(<FileUploader {...uploaderProps} />);

  //   expect(screen.getByText(content)).toBeDefined();
  // });
});

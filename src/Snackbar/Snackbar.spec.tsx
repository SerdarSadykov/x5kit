import {expect, it, describe, vi} from 'vitest';

import {act, fireEvent, render, screen, waitFor} from '@testing-library/react';

import {Link} from 'Link';

import {enqueueSnackbar, SnackbarProvider, SnackbarVariant} from '.';

import type {SnackbarMessage} from '.';

const actionsTop: SnackbarMessage['actionsTop'] = [
  {
    isButton: true,
    children: 'actionsTop',
    onClick: () => alert('onClick'),
  },
];

const actionsBottom: SnackbarMessage['actionsTop'] = [
  {
    isLink: true,
    children: 'actionsBottom1',
    href: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
  <Link key="item2" target="_blank" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
    actionsBottom2
  </Link>,
];

describe('Snackbar', () => {
  it('Snackbar', async () => {
    const onClose = vi.fn();

    render(
      <div data-qa="wrapper">
        <SnackbarProvider>
          <div style={{width: 100}}></div>
        </SnackbarProvider>
      </div>
    );

    await act(() =>
      enqueueSnackbar({
        onClose,
        actionsTop,
        actionsBottom,
        icon: <div data-qa="icon" />,
        content: 'snackbar-content',
        closable: true,
      })
    );

    expect(screen.getByText('snackbar-content')).toBeDefined();
    expect(screen.getByText('actionsTop')).toBeDefined();
    expect(screen.getByText('actionsBottom1')).toBeDefined();
    expect(screen.getByText('actionsBottom2')).toBeDefined();
    expect(screen.getByTestId('icon')).toBeDefined();
    expect(screen.getByTestId('snackbar-message-close')).toBeDefined();

    fireEvent.click(screen.getByTestId('snackbar-message-close'));

    expect(onClose).toBeCalled();

    waitFor(() => {
      expect(screen.queryByTestId('snackbar-message')).toBeNull();
    });

    await act(() =>
      enqueueSnackbar({
        onClose,
        variant: SnackbarVariant.error,
        content: 'snackbar-content',
        closable: true,
      })
    );

    expect(screen.getByTestId('snackbar-message-icon')).toBeDefined();
  });
});

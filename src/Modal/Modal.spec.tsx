import {expect, it, describe, beforeEach, vi, afterEach} from 'vitest';

import {act, fireEvent, render, screen} from '@testing-library/react';

import {ModalHeader} from './ModalHeader';
import {ModalFooter} from './ModalFooter';
import {ModalContent} from './ModalContent';

import {Modal} from '.';

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

describe('Modal', () => {
  it('Modal', async () => {
    const ResizeObserver = vi.fn().mockImplementation(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }));

    global.ResizeObserver = ResizeObserver;

    const onClose = vi.fn();

    const comp = render(
      <Modal isOpen={false}>
        <ModalHeader>header</ModalHeader>
        <ModalContent>content</ModalContent>
        <ModalFooter>footer</ModalFooter>
      </Modal>
    );

    expect(screen.queryByTestId('modal')).toBeNull();

    comp.rerender(
      <Modal isOpen>
        <ModalHeader onClose={onClose}>header</ModalHeader>
        <ModalContent>content</ModalContent>
        <ModalFooter>footer</ModalFooter>
      </Modal>
    );

    expect(screen.getByTestId('modal')).toBeDefined();
    expect(screen.getByText('header')).toBeDefined();
    expect(screen.getByText('content')).toBeDefined();
    expect(screen.getByText('footer')).toBeDefined();
    expect(screen.getByTestId('modal-header-close')).toBeDefined();

    expect(ResizeObserver).toBeCalled();

    fireEvent.click(screen.getByTestId('modal-header-close'));

    expect(onClose).toBeCalled();

    await act(() => ResizeObserver.mock.calls[0][0]([{target: screen.getByTestId('modal-content')}]));

    expect(screen.getByTestId('modal-content').getAttribute('data-overflown')).toBeDefined();
  });
});

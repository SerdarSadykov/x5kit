import {expect, it, describe, vi} from 'vitest';

import {fireEvent, render, screen} from '@testing-library/react';

import {Banner} from '.';

describe('Banner', () => {
  it('Banner', async () => {
    const content = 'content';
    const onClose = vi.fn();

    render(
      <Banner onClose={onClose} icon={<div data-qa="modal-icon" />}>
        {content}
      </Banner>
    );

    expect(screen.getByText(content)).toBeDefined();
    expect(screen.getByTestId('modal-icon')).toBeDefined();
    expect(screen.getByTestId('banner-close')).toBeDefined();

    fireEvent.click(screen.getByTestId('banner-close'));

    expect(onClose).toBeCalled();
  });
});

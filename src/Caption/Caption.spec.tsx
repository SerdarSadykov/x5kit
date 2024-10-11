import {expect, it, describe} from 'vitest';

import {render, screen} from '@testing-library/react';

import {Caption} from '.';

describe('Caption', () => {
  it('Caption', async () => {
    const content = 'content';

    render(<Caption error>{content}</Caption>);

    expect(screen.getByText(content)).toBeDefined();
  });

  it('Caption empty', async () => {
    render(<Caption>{null}</Caption>);

    expect(screen.queryByText(/./)).toBeNull();
  });
});

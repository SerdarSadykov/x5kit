import {expect, it, describe} from 'vitest';

import {render, screen} from '@testing-library/react';

import {Loader, LoaderBlock} from '.';

describe('Loader', () => {
  it('Loader', async () => {
    render(<Loader />);

    expect(screen.getByTestId('loader')).toBeDefined();
  });

  it('LoaderBlock', async () => {
    render(<LoaderBlock>content</LoaderBlock>);

    expect(screen.getByTestId('loader')).toBeDefined();
    expect(screen.getByText('content')).toBeDefined();
  });
});

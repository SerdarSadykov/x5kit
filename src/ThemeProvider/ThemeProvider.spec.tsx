import {expect, it, describe} from 'vitest';

import {render, screen} from '@testing-library/react';

import {ThemeProvider} from '.';

describe('ThemeProvider', () => {
  it('ThemeProvider', async () => {
    const content = 'content';

    render(<ThemeProvider>{content}</ThemeProvider>);

    expect(screen.getByText(content)).toBeDefined();
  });
});

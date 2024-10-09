import {expect, it, describe} from 'vitest';

import {render, screen} from '@testing-library/react';

import {Badge, BadgeDot} from '.';

import {BadgeDotSize} from './types';

describe('Badge', () => {
  it('Badge', async () => {
    const content = 'badgecontent';

    render(<Badge>{content}</Badge>);

    expect(screen.getByText(content)).toBeDefined();
  });

  it('BadgeDot', async () => {
    render(<BadgeDot size={BadgeDotSize.l} />);

    expect(screen.getByTestId('badge-dot')).toBeDefined();
  });
});

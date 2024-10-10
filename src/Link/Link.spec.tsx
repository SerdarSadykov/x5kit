import {expect, it, describe} from 'vitest';

import {render, screen} from '@testing-library/react';

import {Link} from '.';

describe('Link', () => {
  it('Link', async () => {
    const content = 'content';
    const href = '#content';

    render(<Link href={href}>{content}</Link>);

    expect(screen.getByText(content)).toBeDefined();
    expect(screen.getByText(content).getAttribute('href')).toBe(href);
  });
});

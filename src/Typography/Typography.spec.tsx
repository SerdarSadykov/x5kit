import {expect, it, describe} from 'vitest';

import {render, screen} from '@testing-library/react';

import {Typography} from '.';

describe('Typography', () => {
  it('Typography', async () => {
    const content = 'badgecontent';

    render(
      <Typography as="h1" variant="h1">
        {content}
      </Typography>
    );

    expect(screen.getByText(content)).toBeDefined();
    expect(screen.getByText(content).tagName).toBe('H1');
  });
});

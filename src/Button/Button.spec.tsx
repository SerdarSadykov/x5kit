import {expect, it, describe, vi} from 'vitest';

import {fireEvent, render, screen} from '@testing-library/react';

import {Button} from '.';

describe('Button', () => {
  it('Button', async () => {
    const content = 'content';
    const onClick = vi.fn();

    render(
      <Button onClick={onClick} startAdornment={<div data-qa="icon" />}>
        {content}
      </Button>
    );

    expect(screen.getByText(content)).toBeDefined();
    expect(screen.getByTestId('icon')).toBeDefined();

    fireEvent.click(screen.getByTestId('btn'));

    expect(onClick).toBeCalled();
  });
});

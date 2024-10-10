import {expect, it, describe, beforeEach, vi, afterEach} from 'vitest';

import {fireEvent, render, screen, waitFor} from '@testing-library/react';

import {Tooltip} from '.';

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

describe('Tooltip', () => {
  it('Tooltip', async () => {
    const content = 'content';
    const tooltipContent = 'tooltipContent';

    render(
      <Tooltip isPortal={false} content={tooltipContent}>
        <div data-qa="content">{content}</div>
      </Tooltip>
    );

    expect(screen.getByText(content)).toBeDefined();
    expect(screen.queryByTestId(tooltipContent)).toBeNull();

    fireEvent.mouseEnter(screen.getByTestId('content'));

    waitFor(() => {
      expect(screen.getByTestId(tooltipContent)).toBeDefined();
    });
  });
});

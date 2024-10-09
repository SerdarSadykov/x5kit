import {expect, it, describe} from 'vitest';

import {render, screen} from '@testing-library/react';

import {Chip} from '.';

describe('Chip', () => {
  it('Chip', async () => {
    const label = 'badgecontent';

    render(<Chip label={label} />);

    expect(screen.getByText(label)).toBeDefined();
  });

  it('Chip label', async () => {
    const label = 'badgecontentbadgecontentbadgecontentbadgecontent';

    const comp = render(<Chip label={label} maxLength={20} />);

    expect(screen.getByText(label.slice(0, 18) + '...')).toBeDefined();

    comp.rerender(<Chip label={label} maxLength={label.length} />);
    expect(screen.getByText(label)).toBeDefined();

    comp.rerender(<Chip label={label} maxLength={20} maxLengthFunc={v => `${v.slice(-20)}---`} />);

    expect(screen.getByText(`${label.slice(-20)}---`)).toBeDefined();
  });
});

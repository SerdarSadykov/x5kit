import {expect, it, describe} from 'vitest';

import {fireEvent, render, screen, waitFor} from '@testing-library/react';

import {SidebarMenu} from '.';

import type {SidebarMenuItemProps} from '.';

const items: SidebarMenuItemProps[] = [
  {
    id: 'menu1',
    label: 'menu1',
    icon: <div data-qa="menu1-icon" />,
    qa: 'menu1',
    href: '#1',
    tooltip: 'menu1',
  },
  {
    id: 'menu2',
    label: 'menu2',
    qa: 'menu2',
    href: '#2',

    childs: [
      {
        id: 'sub1',
        label: 'sub1',
        qa: 'sub1',
        href: '#sub1',
      },
      {
        id: 'sub2',
        label: 'sub2',
        qa: 'sub2',
        href: '#sub2',
      },
      {
        id: 'sub3',
        label: 'sub3',
        qa: 'sub3',
        disabled: true,
        href: '#sub3',
        badge: 'off',
      },
    ],
  },
];

describe('SidebarMenu', () => {
  it('SidebarMenu', async () => {
    render(<SidebarMenu items={items} />);

    expect(screen.getByTestId('sidebar-menu')).toBeDefined();
    expect(screen.queryByText('menu1')).toBeNull();
    expect(screen.getByTestId('sub1')).toBeDefined();
    expect(screen.getByTestId('menu1-icon')).toBeDefined();

    fireEvent.click(screen.getByTestId('sidebar-menu-toggle'));

    waitFor(() => {
      expect(screen.getByText('menu1')).toBeDefined();
    });
  });

  it('SidebarMenu expanded', async () => {
    render(<SidebarMenu isExpanded selected="menu2" items={items} />);
    expect(screen.getByText('menu2')).toBeDefined();
    expect(screen.getByText('sub1')).toBeDefined();
  });
});

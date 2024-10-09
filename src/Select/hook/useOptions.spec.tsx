import {expect, it, describe, vi} from 'vitest';

import {renderHook, act} from '@testing-library/react';

import {containsFilter} from 'Select/Filters';

import {useOptions} from './useOptions';

import type {SelectOption} from 'Select/types';

const getOptions = (i: number): SelectOption[] => [
  {
    label: `Andreev${i}`,
    value: `davletshin${i}`,
    disabled: false,
    childs: [
      {
        label: 'child1',
        value: 'child1',
      },
    ],
  },
  {label: `Glebov${i}`, value: `glebov${i}`, disabled: false},
  {label: `Sevostyanov${i}`, value: `sevostyanov${i}`, disabled: false},
];

describe('useOptions', () => {
  it('useOptions', async () => {
    const options = getOptions(1);
    const loadedOptions: SelectOption[] = [
      {
        label: 'l1',
        value: 'l1',
      },
    ];

    const onLoadMore = vi.fn().mockImplementation(async () => ({options: loadedOptions}));

    const {result} = renderHook(() => useOptions(options, containsFilter, onLoadMore));

    expect(result.current.options).toBe(options);
    expect(result.current.filtred).toEqual([]);

    act(() => {
      result.current.loadMore({scrollTop: 0, clientHeight: 100} as HTMLDivElement);
    });

    expect(onLoadMore).not.toBeCalled();

    await act(async () => {
      await result.current.loadMore({scrollTop: 80, clientHeight: 100} as HTMLDivElement);
    });

    expect(onLoadMore).toBeCalled();
  });
});

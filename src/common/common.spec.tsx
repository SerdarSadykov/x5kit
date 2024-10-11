import {expect, it, describe, vi} from 'vitest';

import {act, fireEvent, render, renderHook, screen, waitFor} from '@testing-library/react';
import {useRef, useState} from 'react';

import {getQAAttribute, startOfDay, useClickAway, useRefMerge, useUpdateEffect} from '.';

describe('common', () => {
  it('startOfDay', async () => {
    const value = new Date('2020-01-01T00:00:00Z');

    expect(startOfDay(value)).toBe(value);

    const difValue = new Date('2020-01-01T01:00:00Z');

    expect(startOfDay(difValue)).not.toBe(difValue);
    expect(startOfDay(difValue)).toEqual(value);
  });

  it('getQAAttribute', async () => {
    const getQA = getQAAttribute('test');

    expect(getQA()).toBe('test');
    expect(getQA('one')).toBe('test-one');
    expect(getQA('one', {isOpen: true, isClose: false, isVisible: true})).toBe('test-one:isOpen:isVisible');
  });

  it('useClickAway', async () => {
    const onClickAway = vi.fn();

    const ref = renderHook(() => useRef<HTMLDivElement>(null));
    const targetRef = renderHook(() => useRef<HTMLDivElement>(null));

    render(
      <div>
        <div data-qa="other" />
        <div data-qa="target" ref={targetRef.result.current} />
        <div data-qa="wrapper">
          <div data-qa="floating" ref={ref.result.current}>
            <div data-qa="floating-inner"></div>
          </div>
        </div>
      </div>
    );

    renderHook(() => useClickAway(onClickAway, targetRef.result.current, ref.result.current));

    fireEvent.click(screen.getByTestId('target'));
    fireEvent.click(screen.getByTestId('floating'));
    fireEvent.click(screen.getByTestId('floating-inner'));
    expect(onClickAway).not.toBeCalled();

    fireEvent.click(screen.getByTestId('other'));
    fireEvent.click(screen.getByTestId('wrapper'));
    expect(onClickAway).toBeCalledTimes(2);
  });

  it('useRefMerge', async () => {
    const ref = renderHook(() => useRef<HTMLDivElement>(null));

    const {result} = renderHook(() => useRefMerge(ref.result.current));

    expect(result.current).toBe(ref.result.current);
  });

  it('useRefMerge none', async () => {
    const {result} = renderHook(() => useRefMerge());

    expect(result.current).toBeDefined();
  });

  it('useRefMerge func', async () => {
    const ref = vi.fn();

    const {result} = renderHook(() => useRefMerge(ref));

    expect(ref).toBeCalledWith(result.current.current);
  });

  it('useUpdateEffect', async () => {
    const effect = vi.fn();

    const hook = renderHook(() => {
      const state = useState('val');

      useUpdateEffect(effect, [state[0]]);

      return state;
    });

    expect(effect).not.toBeCalled();

    act(() => hook.result.current[1]('newVal'));

    await waitFor(() => {
      expect(effect).toBeCalled();
    });
  });
});

import {useRef} from 'react';
import {expect, it, describe, vi} from 'vitest';

import {fireEvent, render, renderHook, screen} from '@testing-library/react';

import {Dropdown} from '.';

describe('Dropdown', () => {
  it('Dropdown', async () => {
    const setIsOpen = vi.fn();

    const ref = renderHook(() => useRef<HTMLDivElement>(null));

    const comp = render(
      <div data-qa="wrapper">
        <div ref={ref.result.current} style={{width: 100}}></div>
        <Dropdown isOpen setIsOpen={setIsOpen} targetRef={ref.result.current} width="target">
          content
        </Dropdown>
      </div>
    );

    expect(screen.getByText('content')).toBeDefined();
    expect(screen.getByTestId('dropdown').clientWidth).toBeDefined();

    fireEvent.click(screen.getByTestId('wrapper'));

    expect(setIsOpen).toBeCalledWith(false);

    comp.rerender(
      <div data-qa="wrapper">
        <div ref={ref.result.current}></div>
        <Dropdown isOpen={false} setIsOpen={setIsOpen} targetRef={ref.result.current}>
          content
        </Dropdown>
      </div>
    );

    expect(screen.queryByText('content')).toBeNull();
  });

  it('Dropdown mounted', async () => {
    const setIsOpen = vi.fn();

    const ref = renderHook(() => useRef<HTMLDivElement>(null));

    render(
      <div data-qa="wrapper">
        <div ref={ref.result.current}></div>
        <Dropdown isOpen={false} isMounted setIsOpen={setIsOpen} targetRef={ref.result.current}>
          content
        </Dropdown>
      </div>
    );

    expect(screen.getByText('content')).toBeDefined();
  });
});

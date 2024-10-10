import {expect, it, describe, vi} from 'vitest';

import {act, fireEvent, render, screen} from '@testing-library/react';

import {Tab, Tabs, TabContext, TabList, TabPanel} from '.';

describe('Tabs', () => {
  it('Tabs', async () => {
    const onChange = vi.fn();

    render(
      <Tabs onChange={onChange}>
        <Tab value="one">one label</Tab>
        <Tab value="two">two label</Tab>
        <Tab value="three">three label</Tab>
      </Tabs>
    );

    expect(screen.getByText('three label')).toBeDefined();

    fireEvent.click(screen.getByText('three label'));

    expect(onChange.mock.calls[0][0]).toBe('three');
  });

  it('TabsList', async () => {
    const onChange = vi.fn();

    const comp = render(
      <TabContext onChange={onChange}>
        <TabList>
          <Tab value="one">one label</Tab>
          <Tab value="two" disabled>
            two label
          </Tab>
          <Tab value="three">three label</Tab>
        </TabList>
        <TabPanel value="one">one panel</TabPanel>
        <TabPanel value="two">two panel</TabPanel>
        <TabPanel value="three">three panel</TabPanel>
      </TabContext>
    );

    expect(screen.getByText('three label')).toBeDefined();

    await fireEvent.click(screen.getByTestId('tab-two'));

    expect(onChange).not.toBeCalled();

    await fireEvent.click(screen.getByText('three label'));

    expect(onChange.mock.calls[0][0]).toBe('three');

    await fireEvent.keyDown(screen.getByTestId('tab-one'), {code: 'Enter'});
    expect(onChange.mock.calls[1][0]).toBe('one');

    const ResizeObserver = vi.fn().mockImplementation(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }));

    global.ResizeObserver = ResizeObserver;

    comp.rerender(
      <TabContext value="three" onChange={onChange}>
        <TabList arrows>
          <Tab value="one" badge="one badge">
            one label
          </Tab>
          <Tab value="two" disabled>
            two label
          </Tab>
          <Tab value="three">three label</Tab>
        </TabList>
        <TabPanel value="one">one panel</TabPanel>
        <TabPanel value="two">two panel</TabPanel>
        <TabPanel value="three">three panel</TabPanel>
      </TabContext>
    );

    expect(screen.getByTestId('tab-one')).toBeDefined();
    expect(screen.getByText('one badge')).toBeDefined();
    expect(screen.getByText('three panel')).toBeDefined();

    fireEvent.wheel(screen.getByTestId('tabs-scrollable'), {deltaY: 10});

    expect(screen.getByTestId('tabs-scrollable').scrollLeft).toBe(10);

    fireEvent.click(screen.getByTestId('tabs-arrow-left'));
    fireEvent.click(screen.getByTestId('tabs-arrow-right'));

    expect(ResizeObserver).toBeCalled();

    await act(() => ResizeObserver.mock.calls[0][0]([{target: screen.getByTestId('tabs-scrollable')}]));

    expect(screen.getByTestId('tabs-scrollable').getAttribute('data-arrows')).toBeDefined();
  });
});

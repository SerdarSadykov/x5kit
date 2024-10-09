import {useRef, useState} from 'react';

import {useUpdateEffect} from 'common';

import {SelectState} from '../types';

import type {LastResult, SelectContextProps, SelectOption, SelectProps, SelectSingleValue} from '../types';

export const useOptions = (
  baseOptions: SelectProps['options'],
  filter: SelectProps['filter'],
  onLoadMore: SelectProps['onLoadMore']
) => {
  const [state, setStateValue] = useState<SelectState>(SelectState.default);
  const [options, setOptions] = useState<SelectContextProps['options']>(baseOptions);
  const [filtred, setFiltred] = useState<SelectContextProps['options']>([]);

  const lastQuery = useRef<string>('');
  const lastFilterResult = useRef<LastResult>();
  const lastMoreResult = useRef<LastResult>();

  const insertOptions = (newOptions: SelectOption[]) => {
    const currentOptionValues = options.reduce(
      (acc, option) => {
        acc[option.value] = true;
        return acc;
      },
      {} as Record<SelectSingleValue, true>
    );

    const diffOptions = newOptions.filter(option => !currentOptionValues[option.value]);
    if (!diffOptions.length) {
      return;
    }

    setOptions([...options, ...diffOptions]);
  };

  const setState: SelectContextProps['setState'] = (newState, filtred) => {
    if (state === SelectState.filtred && newState === SelectState.default) {
      lastFilterResult.current = undefined;
      lastQuery.current = '';
    }

    setStateValue(newState);

    if (filtred) {
      setFiltred(filtred);
    }
  };

  const filterOptions = (query: string) => {
    if (!filter) {
      return;
    }

    setState(SelectState.searching);

    filter
      .cb(query, options, lastFilterResult.current)
      .then(newResult => {
        insertOptions(newResult.options);

        setState(SelectState.filtred, newResult.options);

        lastQuery.current = query;
        lastFilterResult.current = newResult;
      })
      .catch(e => {
        setState(SelectState.default, []);

        // eslint-disable-next-line  no-console
        console.error(e);
      });
  };

  const loadMore: SelectContextProps['loadMore'] = target => {
    if (
      !target ||
      !onLoadMore ||
      state === SelectState.loadingMore ||
      !target.scrollTop ||
      target.scrollTop + target.clientHeight < target.scrollHeight - 200
    ) {
      return;
    }

    if (state === SelectState.filtred) {
      if (filter && lastQuery.current) {
        filter
          .cb(lastQuery.current, options, lastFilterResult.current)
          .then(newResult => {
            insertOptions(newResult.options);

            setState(SelectState.filtred, [...filtred, ...newResult.options]);

            lastFilterResult.current = newResult;
          })
          .catch(e => {
            setState(SelectState.default, []);

            // eslint-disable-next-line  no-console
            console.error(e);
          });
      }

      return;
    }

    setState(SelectState.loadingMore);

    onLoadMore(options, lastMoreResult.current)
      .then(newResult => {
        insertOptions(newResult.options);

        lastMoreResult.current = newResult;
      })
      // eslint-disable-next-line  no-console
      .catch(console.error)
      .finally(() => {
        setState(SelectState.default);
      });
  };

  useUpdateEffect(() => {
    setOptions(baseOptions);

    lastMoreResult.current = undefined;
  }, [baseOptions]);

  return {
    options,
    filtred,
    state,
    setState,
    filterOptions,
    loadMore,
  };
};

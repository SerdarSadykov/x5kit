import {useState} from 'react';

import {getQAAttribute, useRefMerge} from 'common';

import {useOptions} from './useOptions';

import type {ForwardedRef} from 'react';

import type {DropdownProps} from 'dropdown';

import type {SelectContextProps, SelectProps} from '../types';

export const useSelect = (props: SelectProps, baseRef: ForwardedRef<HTMLInputElement> | undefined) => {
  const [isOpenValue, setIsOpenValue] = useState<boolean>(false);

  const {
    value,
    onChange,
    multiple,
    disabled,
    readOnly,
    noWrap,
    showChips,
    filter,
    virtualize,
    whiteSpace,
    components,
    onLoadMore,

    isOpen = isOpenValue,
    setIsOpen = setIsOpenValue,

    dropdownProps: baseDropdownProps,
    options: baseOptions,
    qa = 'select',

    ...baseInputProps
  } = props;

  const ref = useRefMerge<HTMLInputElement>(baseRef);
  const getQA = getQAAttribute(qa);

  const {options, filtred, state, setState, filterOptions, loadMore} = useOptions(baseOptions, filter, onLoadMore);

  const onClear = () => onChange([]);

  const dropdownProps: Omit<DropdownProps, 'children'> & Pick<SelectContextProps, 'maxHeight'> = {
    isOpen,
    setIsOpen,

    targetRef: ref,
    isPortal: true,
    maxHeight: 304,
    qa: getQA('dropdown'),
    width: 'target',

    ...baseDropdownProps,
  };

  const context: SelectContextProps = {
    state,
    setState,
    getQA,

    options,
    loadMore,
    filterOptions,

    filtred,

    value,
    onChange,
    onClear,
    multiple,
    disabled,
    readOnly,
    noWrap,
    showChips,
    filter,
    isOpen,
    setIsOpen,
    virtualize,
    whiteSpace,

    height: dropdownProps.height,
    maxHeight: dropdownProps.maxHeight,
  };

  const inputProps = {
    ...baseInputProps,

    disabled,
    readOnly,
    qa,
  };

  return {ref, inputProps, context, dropdownProps, components};
};

import {ForwardedRef, useEffect, useState} from 'react';

import {getQAAttribute, useRefMerge} from 'common';
import {DropdownProps} from 'dropdown';

import {SelectContextProps, SelectProps, SelectState} from './types';

export const useSelect = (props: SelectProps, baseRef: ForwardedRef<HTMLInputElement> | undefined) => {
  const [isOpenValue, setIsOpenValue] = useState<boolean>(false);

  const {
    value,
    onChange,
    multiple,
    filter,
    listComponent,

    hint,
    header,
    footer,
    searching,
    notFound,
    itemComponent,
    isOpen = isOpenValue,
    setIsOpen = setIsOpenValue,

    dropdownProps: baseDropdownProps,
    options: baseOptions,
    qa = 'select',

    ...baseInputProps
  } = props;

  const ref = useRefMerge<HTMLInputElement>(baseRef);
  const [state, setState] = useState<SelectState>(SelectState.default);
  const [options, setOptions] = useState<SelectContextProps['options']>(() => ({all: [], filtred: []}));
  const getQA = getQAAttribute(qa);

  useEffect(() => {
    setOptions({all: baseOptions, filtred: []});
  }, [baseOptions]);

  const context: SelectContextProps = {
    state,
    setState,
    getQA,
    options,
    setOptions,

    value,
    onChange,
    multiple,
    filter,
    isOpen,
    setIsOpen,

    hint,
    header,
    footer,
    searching,
    notFound,
    itemComponent,
  };

  const dropdownProps: Omit<DropdownProps, 'children'> = {
    isOpen,
    setIsOpen,

    targetRef: ref,
    isPortal: true,
    height: 304,
    qa: getQA('dropdown'),

    ...baseDropdownProps,
  };

  const inputProps = {
    ...baseInputProps,
    qa,
    ref,
  };

  return {listComponent, inputProps, context, dropdownProps};
};
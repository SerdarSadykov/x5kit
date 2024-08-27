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
    showChips,
    filter,
    virtualize,
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

  const onClear = () => onChange([]);

  useEffect(() => {
    setOptions({all: baseOptions, filtred: []});
  }, [baseOptions]);

  const dropdownProps: Omit<DropdownProps, 'children'> & Pick<SelectContextProps, 'maxHeight'> = {
    isOpen,
    setIsOpen,

    targetRef: ref,
    isPortal: true,
    maxHeight: 304,
    qa: getQA('dropdown'),

    ...baseDropdownProps,
  };

  const context: SelectContextProps = {
    state,
    setState,
    getQA,
    options,
    setOptions,

    value,
    onChange,
    onClear,
    multiple,
    showChips,
    filter,
    isOpen,
    setIsOpen,
    virtualize,

    hint,
    header,
    footer,
    searching,
    notFound,
    itemComponent,

    height: dropdownProps.height,
    maxHeight: dropdownProps.maxHeight,
  };

  const inputProps = {
    ...baseInputProps,
    qa,
    ref,
  };

  return {listComponent, inputProps, context, dropdownProps};
};
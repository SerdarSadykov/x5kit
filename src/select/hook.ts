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
    disabled,
    readOnly,
    showChips,
    filter,
    virtualize,
    whiteSpace,
    listComponent,

    hint,
    header,
    footer,
    searching,
    notFound,
    itemComponent,
    itemsComponent,
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
    disabled,
    readOnly,
    showChips,
    filter,
    isOpen,
    setIsOpen,
    virtualize,
    whiteSpace,

    hint,
    header,
    footer,
    searching,
    notFound,
    itemComponent,
    itemsComponent,

    height: dropdownProps.height,
    maxHeight: dropdownProps.maxHeight,
  };

  const inputProps = {
    ...baseInputProps,
    disabled,
    readOnly,
    qa,
    ref,
  };

  return {listComponent, inputProps, context, dropdownProps};
};
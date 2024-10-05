import {useEffect} from 'react';
import {useFloating, flip} from '@floating-ui/react';

import type {MouseEventHandler} from 'react';

import type {DropdownProps} from './types';

export const useDropdown = ({onChange, isOpen, setIsOpen}: DropdownProps) => {
  const floating = useFloating({placement: 'bottom-start', middleware: [flip()]});

  const onToggle = () => {
    setIsOpen(!isOpen);

    if (!isOpen) {
      floating.update?.();
    }
  };

  const onClickContainer: MouseEventHandler = e => {
    e.stopPropagation();
  };

  const onClickItem: DropdownProps['onChange'] = newItem => {
    setIsOpen(false);
    onChange(newItem);
  };

  useEffect(() => {
    const listner = () => setIsOpen(false);

    document.addEventListener('click', listner);

    return () => document.removeEventListener('click', listner);
  }, [setIsOpen]);

  return {floating, onToggle, onClickContainer, onClickItem};
};

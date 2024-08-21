// import React, {Fragment, useEffect, MouseEvent, Children, ReactNode} from 'react';
// import {ListCheckedItem} from '../ListCheckedItem';
// import {ListItem} from '../ListItem';
// import {useScrollStyles} from '../Scroll';
//import {StyledSelectMenu} from './styles';
// import {getQAAttribute, QA} from 'common';
// import {CheckboxTree} from 'checkboxTree';

import {useContext} from 'react';
import styled from '@emotion/styled';

import {DropdownContent} from 'dropdown';
import {LoaderItem} from 'loader';
import {theme} from 'theme';

import {SelectContext} from '../Select';
import {SelectItems, SelectItemsProps} from '../SelectItems';
import {Hint} from '../Hint';
import {SelectInternalValue, SelectOption, SelectState} from '../types';

const Container = styled(DropdownContent)``;

const NotFound = styled.div`
  color: ${theme.colors.grey[40]};

  ${theme.typography.p1};
`;

const getValues = (option: SelectOption): SelectInternalValue => {
  return option.childs ? [option.value, ...option.childs.flatMap(getValues)] : [option.value];
};

export const SelectList: React.FC = () => {
  const {options, value, onChange, multiple, state, getQA, hint, header, footer, searching, notFound} =
    useContext(SelectContext);

    const isFiltred = state === SelectState.filtred;

  if (state === SelectState.loading) {
    const child = searching ?? <LoaderItem>Поиск совпадений</LoaderItem>;

    return <Container>{child}</Container>;
  }

  if (isFiltred && !options.filtred.length) {
    const child = notFound ?? <NotFound>Ничего не найдено</NotFound>;

    return <Container>{child}</Container>;
  }

  const selectItemsProps: SelectItemsProps = {
    value,
    onChange,
    multiple,
    options: isFiltred ? options.filtred : options.all,
    opened: isFiltred ? options.filtred.flatMap(getValues) : undefined,
    qa: getQA('list'),
  };

  return (
    <Container>
      {hint && <Hint>{hint}</Hint>}
      {header}
      <SelectItems {...selectItemsProps} />
      {footer}
    </Container>
  );
};

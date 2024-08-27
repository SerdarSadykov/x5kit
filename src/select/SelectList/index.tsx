import {useContext, useState} from 'react';
import styled from '@emotion/styled';

import {DropdownContent} from 'dropdown';
import {LoaderItem} from 'loader';
import {SizeTokenValue, theme} from 'theme';

import {SelectContext} from '../Select';
import {SelectItems} from '../SelectItems';
import {Hint} from '../Hint';
import {SelectState, SelectItemsProps} from '../types';

const Empty = styled.div`
  padding: 12px;
  color: ${theme.colors.grey[40]};

  ${theme.typography.p1};
`;

export const SelectList: React.FC = () => {
  const context = useContext(SelectContext);
  const {state, hint} = context;

  const [clientWidth, setClientWidth] = useState<number>();

  if (state === SelectState.loading) {
    const child = context.searching ?? (
      <Empty>
        <LoaderItem size={SizeTokenValue.Small}>Поиск совпадений</LoaderItem>
      </Empty>
    );

    return <DropdownContent>{child}</DropdownContent>;
  }

  const isFiltred = state === SelectState.filtred;

  if (isFiltred && !context.options.filtred.length) {
    const child = context.notFound ?? <Empty>Ничего не найдено</Empty>;
    return <DropdownContent>{child}</DropdownContent>;
  }

  const options = isFiltred ? context.options.filtred : context.options.all;
  if (!options.length) {
    const child = context.empty ?? <Empty>Ничего не найдено</Empty>;
    return <DropdownContent>{child}</DropdownContent>;
  }

  const ref = (e: HTMLDivElement | null) => {
    if (!e?.clientWidth) {
      return;
    }

    setClientWidth(e.clientWidth);
  };

  const selectItemsProps: SelectItemsProps = {
    state,
    options,
    clientWidth,
    value: context.value,
    onChange: context.onChange,
    multiple: context.multiple,
    setIsOpen: context.setIsOpen,
    height: context.height,
    maxHeight: context.maxHeight,
    virtualize: context.virtualize && options.length > 20,
    qa: context.getQA('list'),
  };

  const Component = context.itemsComponent ?? SelectItems;

  const child = !!clientWidth && <Component {...selectItemsProps} />;

  return (
    <DropdownContent ref={ref}>
      {hint && <Hint>{hint}</Hint>}
      {context.header}
      {child}
      {context.footer}
    </DropdownContent>
  );
};

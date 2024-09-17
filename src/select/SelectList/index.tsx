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
  const {state, components} = context;

  const isFiltred = state === SelectState.filtred;
  const options = isFiltred ? context.options.filtred : context.options.all;

  const [clientWidth, setClientWidth] = useState<number>();

  if (state === SelectState.searching) {
    const child = components?.searching ?? (
      <Empty>
        <LoaderItem size={SizeTokenValue.Small}>Поиск совпадений</LoaderItem>
      </Empty>
    );

    return <DropdownContent>{child}</DropdownContent>;
  }

  if (isFiltred && !options.length) {
    const child = components?.notFound ?? <Empty>Ничего не найдено</Empty>;
    return <DropdownContent>{child}</DropdownContent>;
  }

  if (!options.length && !components?.header && !components?.footer) {
    return null;
  }

  const ref = (e: HTMLDivElement | null) => {
    setTimeout(() => {
      if (!e?.clientWidth) {
        return;
      }
  
      setClientWidth(e.clientWidth);  
    })
  };

  const Component = components?.items ?? SelectItems;

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
    whiteSpace: context.whiteSpace,
    item: components?.item,
    qa: context.getQA('list'),
  };

  const child = !!clientWidth && <Component {...selectItemsProps} />;

  return (
    <DropdownContent ref={ref}>
      {components?.hint && <Hint>{components.hint}</Hint>}
      {components?.header}
      {child}
      {components?.footer}
    </DropdownContent>
  );
};

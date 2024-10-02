import {createContext} from 'react';
import styled from '@emotion/styled';

import {theme} from 'theme';

import {getMenuItem} from './MenuItem';
import {ExpandButton} from './ExpandButton';
import {useSidebarMenu} from './hook';
import {SidebarMenuContextProps, SidebarMenuProps} from './types';

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  min-height: 100%;
  user-select: none;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${theme.colors.grey[10]};
`;

const Items = styled.div`
  flex-grow: 1;

  ${theme.scroll};
`;

export const SidebarMenuContext = createContext({} as SidebarMenuContextProps);

export const SidebarMenu: React.FC<SidebarMenuProps> = props => {
  const {context, isExpanded} = useSidebarMenu(props);

  const containerStyle = {
    width: isExpanded ? (props.width ?? 228) : 56,
    zIndex: props.zIndex ?? 1,
  }

  const child = props.items.map(getMenuItem);

  return (
    <SidebarMenuContext.Provider value={context}>
      <Container data-qa={props.qa} style={containerStyle}>
        <Items>{child}</Items>
        <ExpandButton />
      </Container>
    </SidebarMenuContext.Provider>
  );
};

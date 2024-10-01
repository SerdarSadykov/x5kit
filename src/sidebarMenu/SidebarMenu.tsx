import {createContext} from 'react';
import styled from '@emotion/styled';

import {theme} from 'theme';

import {getMenuItem} from './MenuItem';
import {SidebarMenuContextProps, SidebarMenuProps} from './types';

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  user-select: none;
  overflow: auto;
  background-color: ${theme.colors.grey[10]};

  ${theme.scroll};
`;

export const SidebarMenuContext = createContext<SidebarMenuContextProps>({selected: undefined});

export const SidebarMenu: React.FC<SidebarMenuProps> = ({items, selected, onChange, qa, width = 228}) => {
  const child = items.map(getMenuItem(0));

  return (
    <SidebarMenuContext.Provider value={{selected, onChange}}>
      <Container data-qa={qa} style={{width}}>
        {child}
      </Container>
    </SidebarMenuContext.Provider>
  );
};

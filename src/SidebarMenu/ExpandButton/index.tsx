import {useContext} from 'react';
import styled from '@emotion/styled';

import {SizeTokenValue, theme} from 'theme';
import {ChevronLeft, ChevronRight} from 'icons';

import {SidebarMenuContext} from '../SidebarMenu';

const Button = styled.button`
  display: block;
  outline: none;
  border: 0;
  width: 100%;
  padding: 4px;
  flex-shrink: 0;
  background-color: transparent;
  cursor: pointer;

  span {
    padding: 2px 4px 2px 0;
    color: ${theme.colors.grey[100]};

    ${theme.typography.p1compact};
  }

  svg {
    color: ${theme.colors.grey[60]};
  }

  div {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px;
    border-radius: 4px;
  }

  :hover > div {
    background-color: ${theme.colors.grey[20]};
  }
`;

export const ExpandButton: React.FC = () => {
  const {isExpanded, setIsExpanded} = useContext(SidebarMenuContext);

  const onClick = () => {
    setIsExpanded(!isExpanded);
  };

  const Icon = isExpanded ? ChevronLeft : ChevronRight;

  return (
    <Button onClick={onClick}>
      <div>
        <Icon size={SizeTokenValue.Medium} />
        {isExpanded && <span>Свернуть</span>}
      </div>
    </Button>
  );
};

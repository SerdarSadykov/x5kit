import {ElementType, useContext} from 'react';
import styled from '@emotion/styled';

import {Placement, theme} from 'theme';
import {Tooltip} from 'tooltip';

import {SidebarMenuContext} from '../SidebarMenu';
import {SidebarMenuItemStyles, SidebarMenuItemProps} from '../types';

import {Left} from './Left';
import {Dropdown} from './Dropdown';
import {MenuItemChild} from './MenuItemChild';
import {MenuItemBadge} from './MenuItemBadge';
import {MenuItemArrow} from './MenuItemArrow';

const Container = styled.div<SidebarMenuItemStyles>`
  position: relative;
  display: block;
  padding: 4px;
  text-decoration: none;

  cursor: ${props => (props.disabled ? 'default' : 'pointer')};

  :before {
    content: '';
    position: absolute;
    top: calc(50% - 13px);
    left: 4px;
    width: 3px;
    height: 26px;
    border-radius: 0 20px 20px 0;
    background-color: ${theme.colors.accent[90]};

    display: ${props => (props.isSelected ? 'block' : 'none')};
  }

  > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 4px;
    padding: 12px;
    border-radius: 4px;

    background-color: ${props => (props.isSelected ? theme.colors.white : undefined)};
  }

  :hover > div {
    background-color: ${props => (!props.isSelected ? theme.colors.grey[20] : undefined)};
  }
`;

const ExpandedContainer = styled(Container)`
  > div {
    padding: 12px 8px 12px 12px;
  }
`;

const DropdownWrapper = styled.div`
  position: relative;

  > div:last-child {
    display: none;
    z-index: ${theme.sizes.zIndex.dropdown};
  }

  :hover {
    > div:last-child {
      display: block;
    }

    > div:first-child {
      z-index: ${theme.sizes.zIndex.dropdown + 1};

      > div {
        background-color: ${theme.colors.white};
        border-radius: 4px 0 0 4px;
      }
    }
  }
`;

const MenuItem: React.FC<SidebarMenuItemProps> = props => {
  const {isExpanded, isSelected, onClick} = useContext(SidebarMenuContext);

  const {label, tooltip, icon, badge, disabled, childs, qa, href, target} = props;

  const hasChilds = !!childs?.length;

  const styles = {disabled, isSelected: isSelected(props)};

  const anchorProps = !hasChilds && href ? {href, target, as: 'a' as ElementType} : undefined;

  const containerProps = {
    ...styles,
    ...anchorProps,

    'data-qa': qa,
  };

  if (isExpanded) {
    const leftProps = {...styles, label, icon};

    const child = styles.isSelected && childs?.map(item => <MenuItemChild key={item.id} {...item} />);

    return (
      <div>
        <ExpandedContainer {...containerProps} onClick={onClick(props)}>
          <div>
            <Left {...leftProps} />
            <MenuItemBadge {...styles} badge={badge} />
            <MenuItemArrow {...styles} childs={childs} />
          </div>
        </ExpandedContainer>
        {child}
      </div>
    );
  }

  const leftProps = {...styles, badge, icon};

  if (!hasChilds || disabled) {
    return (
      <div>
        <Tooltip placement={Placement.right} content={tooltip ?? label}>
          <Container {...containerProps} onClick={onClick(props)}>
            <div>
              <Left {...leftProps} />
            </div>
          </Container>
        </Tooltip>
      </div>
    );
  }

  return (
    <DropdownWrapper>
      <Container {...containerProps}>
        <div>
          <Left {...leftProps} />
        </div>
      </Container>
      <Dropdown label={label} childs={childs} />
    </DropdownWrapper>
  );
};

export const getMenuItem = (item: SidebarMenuItemProps) => <MenuItem key={item.id} {...item} />;

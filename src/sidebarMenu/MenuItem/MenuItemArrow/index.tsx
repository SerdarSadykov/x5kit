import {SizeTokenValue} from 'theme';
import {ArrowDown, ArrowUp} from 'icons';
import {ButtonVariant, IconButton} from 'button';

import {SidebarMenuItemStyles, SidebarMenuItemProps} from 'sidebarMenu/types';

type RightProps = SidebarMenuItemStyles & Pick<SidebarMenuItemProps, 'badge' | 'childs'>;

export const MenuItemArrow: React.FC<RightProps> = ({childs, isSelected}) => {
  if (!childs?.length) {
    return null;
  }

  const Component = isSelected ? ArrowUp : ArrowDown;

  return (
    <IconButton variant={ButtonVariant.innerInput} size={SizeTokenValue.XXSmall}>
      <Component size={SizeTokenValue.Small} />
    </IconButton>
  );
};

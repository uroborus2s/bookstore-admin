import {
  Menu,
  menuClasses,
  MenuItem,
  type MenuItemStyles,
  Sidebar,
  SubMenu,
} from 'react-pro-sidebar';
import {
  createElement,
  Dispatch,
  type PropsWithChildren,
  SetStateAction,
} from 'react';
import { SidebarHeader } from '@/components/Sidebar/sidebar-header';
import { siteConfig } from '@/config/site';
import { MenuTitle } from '@/types';
import Link from 'next/link';

const renderMenuItems = (items: Record<string, MenuTitle>) => {
  return Object.keys(items).map((key) => {
    const { label, Icon, childNode, path } = items[key] as MenuTitle;

    if (childNode && Object.keys(childNode).length > 0) {
      return (
        <SubMenu label={label} icon={Icon && createElement(Icon)} key={key}>
          {renderMenuItems(childNode)}
        </SubMenu>
      );
    }

    return (
      <MenuItem
        key={key}
        icon={Icon && createElement(Icon)}
        component={<Link href={path || '/'} />}
      >
        {label}
      </MenuItem>
    );
  });
};

interface AdminSidebarProps {
  collapsed: boolean;
  toggled: boolean;
  setToggled: Dispatch<SetStateAction<boolean>>;
  setBroken: Dispatch<SetStateAction<boolean>>;
}

export function AdminSidebar({
  collapsed,
  toggled,
  setBroken,
  setToggled,
}: PropsWithChildren<AdminSidebarProps>) {
  const menuItemStyles: MenuItemStyles = {
    root: {
      fontSize: '13px',
      fontWeight: 400,
    },
    icon: {
      color: 'var(--color-blue)',
      [`&.${menuClasses.disabled}`]: 'var(--color-cyan)',
    },
    SubMenuExpandIcon: {
      color: '#b6b7b9',
    },
    subMenuContent: { backgroundColor: 'transparent' },
    button: {
      '&:hover': {
        backgroundColor: 'var(--color-gray)',
        color: 'var(--color-cyan)',
      },
    },
    label: ({ open }) => ({
      fontWeight: open ? 600 : undefined,
    }),
  };

  const titles = siteConfig.modules;

  return (
    <Sidebar
      onBreakPoint={setBroken}
      collapsed={collapsed}
      toggled={toggled}
      onBackdropClick={() => setToggled(false)}
      breakPoint="md"
      backgroundColor={'hsl(var(--popover))'}
      rootStyles={{
        color: 'hsl(var(--popover-foreground))',
        borderColor: 'hsl(var(--popover))',
      }}
    >
      <div className={`flex flex-col h-screen`}>
        <SidebarHeader className={`mt-6 mb-4`}></SidebarHeader>
        <Menu menuItemStyles={menuItemStyles}>
          {renderMenuItems(titles.childNode!)}
        </Menu>
      </div>
    </Sidebar>
  );
}

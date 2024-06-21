import React from 'react';
import { CDBSidebarMenuItem } from 'cdbreact';

const AppSideNav = ({ menus }) => {
  return (
    <>
      {menus.map((menu, index) => (
        <CDBSidebarMenuItem
          key={index}
          icon={menu.iconClass}
          iconType={menu.iconType || 'regular'}
          href={menu.to}
        >
          {menu.name}
        </CDBSidebarMenuItem>
      ))}
    </>
  );
};

export default AppSideNav;

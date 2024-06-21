import React from 'react';
import { CDBSidebarMenuItem } from 'cdbreact';
import { Link } from 'react-router-dom';

const AppSideNav = ({ menus }) => {
  return (
    <>
      {menus.map((menu, index) => (
        <CDBSidebarMenuItem
        >
          <Link to={menu.to}>
            <div className='row flex-sec'>
              <img src={menu.iconClass} alt="menu-icon" className='menu-icon' />
              <div className='side-section'>
                <p>{menu.name}</p>
                {/* <p className='menu-small'><small>{menu.subName}</small></p> */}
              </div>
            </div>
          </Link>
        </CDBSidebarMenuItem>
      ))}
    </>
  );
};

export default AppSideNav;

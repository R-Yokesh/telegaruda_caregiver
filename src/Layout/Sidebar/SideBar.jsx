import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarFooter,
} from 'cdbreact';
import { Sidebar_Menus } from './nav';
import AppSideNav from './AppSideNav';
import './Sidebarstyle.css';

const SideBar = () => {
  return (
    <div className='app_sidebar vh-100'>
      <CDBSidebar className='sidebar_container'>
        <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>
          Menu
        </CDBSidebarHeader>
        <CDBSidebarContent>
          <CDBSidebarMenu>
            <AppSideNav menus={Sidebar_Menus} />
          </CDBSidebarMenu>
        </CDBSidebarContent>
        {/* <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div className="sidebar-btn-wrapper" style={{ padding: '20px 5px' }}>
            Sidebar Footer
          </div>
        </CDBSidebarFooter> */}
      </CDBSidebar>
    </div>
  );
};

export default SideBar;

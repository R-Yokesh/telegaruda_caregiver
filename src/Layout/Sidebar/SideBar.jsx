
import React from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarFooter,
} from "cdbreact";
import { Sidebar_Menus } from "./nav";
import AppSideNav from "./AppSideNav";
import "./Sidebarstyle.css";

const SideBar = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <div>
      {/* For mobile, show the sidebar only if isSidebarOpen is true */}
      <div className={`app_sidebar vh-100 mobile-sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="sidebar_container">
            <button className="close-button" onClick={toggleSidebar}>
            <i class="fa fa-close"></i> CLOSE
            </button>
              <AppSideNav menus={Sidebar_Menus} />
        </div>
      </div>

      {/* Desktop sidebar stays always visible */}
      <div className="app_sidebar vh-100 desktop-sidebar">
        <CDBSidebar className="sidebar_container">
          <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>
            Menu
          </CDBSidebarHeader>
          <CDBSidebarContent>
            <CDBSidebarMenu>
              <AppSideNav menus={Sidebar_Menus} />
            </CDBSidebarMenu>
          </CDBSidebarContent>
        </CDBSidebar>
      </div>
    </div>
  );
};

export default SideBar;


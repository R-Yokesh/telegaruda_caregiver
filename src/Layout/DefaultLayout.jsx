import React from "react";
import Header from "./Header/Header";
import SideBar from "./Sidebar/SideBar";
import AppContent from "./AppContent/AppContent";

const DefaultLayout = () => {
  return (
    <div>
      <div className="d-flex">
        <SideBar />
        <div className="flex-grow-1 d-flex flex-column">
          <Header />
          <div className="flex-grow-1 light-back px-5 py-5">
            <AppContent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;

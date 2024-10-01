import React, { useState, useEffect } from "react";
import Header from "./Header/Header";
import SideBar from "./Sidebar/SideBar";
import AppContent from "./AppContent/AppContent";
import useAuthCheck from "../contexts/useAuthCheck";
import { useAuth } from "../contexts/AuthContext";
import SessionExpiredModal from "../Components/Modal/SessionExpiredModal";
import { useNavigate } from "react-router-dom";

const DefaultLayout = () => {
  // useAuthCheck();
  const { ses_exp, logout, setSes_exp } = useAuth();
  const navigate = useNavigate();
  console.log("first", ses_exp);
  // State to manage the sidebar visibility on mobile
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div>
      <div className="d-flex">
        {/* Pass the toggle and isSidebarOpen state to Sidebar */}
        <SideBar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="flex-grow-1 d-flex flex-column">
          <Header toggleSidebar={toggleSidebar} />
          <div className="flex-grow-1 light-back  py-4 content-sec-main">
            <AppContent />
            {ses_exp && (
              <SessionExpiredModal
                show={ses_exp}
                onClose={() => {
                  setSes_exp(false);
                  logout();
                  navigate("/");
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;

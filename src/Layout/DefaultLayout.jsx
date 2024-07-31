import React, { useEffect } from "react";
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
  return (
    <div>
      <div className="d-flex">
        <SideBar />
        <div className="flex-grow-1 d-flex flex-column">
          <Header />
          <div className="flex-grow-1 light-back px-4 py-4">
            <AppContent />
            {ses_exp && (
              <SessionExpiredModal
                show={ses_exp}
                onClose={() => {
                  setSes_exp(false);
                  logout(); // Handle logout
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

import React, { useEffect } from "react";
import Header from "./Header/Header";
import SideBar from "./Sidebar/SideBar";
import AppContent from "./AppContent/AppContent";
import { useAuth } from "../contexts/AuthContext";

const DefaultLayout = () => {
  const checkSessionExpiration = () => {
    const expirationTime = localStorage.getItem("token_expiration_time");
    if (!expirationTime) {
      return; // No expiration time found, session is considered expired
    }
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

    if (currentTime >= expirationTime) {
      // Session has expired, clear localStorage and redirect to login page
      localStorage.removeItem("token");
      localStorage.removeItem("token_expiration_time");
      window.location.href = "/login"; // Redirect to your login page
    }
  };

  // Check session expiration periodically (e.g., every minute)
  setInterval(checkSessionExpiration, 60000); // Check every minute (adjust as needed)

  const { user } = useAuth();

  console.log(user, "user");
  return (
    <div>
      <div className="d-flex">
        <SideBar />
        <div className="flex-grow-1 d-flex flex-column">
          <Header />
          <div className="flex-grow-1 light-back px-4 py-4">
            <AppContent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;

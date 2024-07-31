import React, { useState } from "react";
import "./Header.css";
import { Assets } from "../../assets/Assets";
import { useNavigate } from "react-router-dom";
import { CContainer, CModal, CModalBody } from "@coreui/react";
import CloseButton from "../../Components/Buttons/CloseButton/CloseButton";
import SecondaryButton from "../../Components/Buttons/SecondaryButton/SecondaryButton";
import { useAuth } from "../../contexts/AuthContext";
// import logo from './path/to/logo.png'; // Ensure you have the logo image in the specified path
// import profilePic from './path/to/profilePic.png'; // Ensure you have the profile picture in the specified path

const Header = () => {
  const [exit, setExit] = useState(false);
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  console.log("first user", user);
  const Logout = (e) => {
    sessionStorage.setItem("loggedIn", "false");
    navigate("/");
    logout();
  };
  return (
    <header className="header">
      <div className="logo">{/* <img src={""} alt="Apollo Logo" /> */}</div>
      <div className="sbn">
        <div className="search-bar">
          <input type="text" placeholder="Search Patient" />
          <button type="submit">
            <i className="fas fa-search"></i>
          </button>
        </div>
        <div className="profile-info">
          <img src={user?.profileImage || Assets.user} alt="Profile" />
          <div className="profile-text">
            <span className="profile-name">{user?.name || ""}</span>
            <span className="profile-location">
              Caregiver{" "}
              <button className="signout-btn" onClick={() => setExit(true)}>
                Signout
              </button>
            </span>
          </div>
        </div>
      </div>

      {/* Sign out alert modal */}
      <CModal
        alignment="center"
        visible={exit}
        onClose={() => setExit(false)}
        aria-labelledby="VerticallyCenteredExample"
        size="lg"
        className="signout-modal"
      >
        <CModalBody>
          <CContainer className="p-2 d-flex flex-column align-items-center mb-2">
            <span className="signout-message mb-3">
              Are you sure want to close this session?
            </span>
            <div className="w-100 d-flex justify-content-center gap-3 flex-wrap">
              <div style={{ width: "128px" }}>
                <CloseButton onClick={(e) => Logout(e)}>CLOSE</CloseButton>
              </div>
              <div style={{ width: "128px" }}>
                <SecondaryButton onClick={() => setExit(false)}>
                  CANCEL
                </SecondaryButton>
              </div>
            </div>
          </CContainer>
        </CModalBody>
      </CModal>
    </header>
  );
};

export default Header;

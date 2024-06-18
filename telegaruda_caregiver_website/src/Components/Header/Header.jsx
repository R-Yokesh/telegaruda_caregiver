import React from 'react';
import './Header.css';
// import logo from './path/to/logo.png'; // Ensure you have the logo image in the specified path
// import profilePic from './path/to/profilePic.png'; // Ensure you have the profile picture in the specified path

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src={""} alt="Apollo Logo" />
      </div>
      <div className="sbn">
        <div className="search-bar">
          <input type="text" placeholder="Search Patient" />
          <button type="submit">
            <i className="fas fa-search"></i>
          </button>
        </div>
        <div className="profile-info">
          <img src={""} alt="Profile" />
          <div className="profile-text">
            <span className="profile-name">Merry Jane</span>
            <span className="profile-location">Apollo Hospitals, Chennai, Tamilnadu</span>
          </div>
        </div>
      </div>

    </header>
  );
};

export default Header;

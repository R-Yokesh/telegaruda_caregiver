import React from 'react';
import './Header.css';
import { Assets } from '../../assets/Assets';
import { useNavigate } from 'react-router-dom';
// import logo from './path/to/logo.png'; // Ensure you have the logo image in the specified path
// import profilePic from './path/to/profilePic.png'; // Ensure you have the profile picture in the specified path

const Header = () => {
  const navigate = useNavigate();
  const Logout = (e) => {
    sessionStorage.setItem('loggedIn', 'false')
    navigate('/')
  }
  return (
    <header className="header">
      <div className="logo">
        {/* <img src={""} alt="Apollo Logo" /> */}
      </div>
      <div className="sbn">
        <div className="search-bar">
          <input type="text" placeholder="Search Patient" />
          <button type="submit">
            <i className="fas fa-search"></i>
          </button>
        </div>
        <div className="profile-info">
          <img src={Assets.user} alt="Profile" />
          <div className="profile-text">
            <span className="profile-name">Merry Jane</span>
            <span className="profile-location">Provider <button className='signout-btn' onClick={(e) => Logout(e)}>signout</button></span>
          </div>
        </div>
      </div>

    </header>
  );
};

export default Header;

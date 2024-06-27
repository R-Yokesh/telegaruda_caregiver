import React, { useState } from "react";
import "./Login.css";
import Footer from "../../Layout/Footer/Footer";
import { Assets } from "../../assets/Assets";
import { Navigate, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const loginSec = (e) => {
    sessionStorage.setItem('loggedIn', 'true')
    navigate('/patients')
  }
  return (
    <div className="login-container-logiss">
      <div className="login-left-logiss">
        <div className="login-image-logiss">
          <img className="loginbsn" src={Assets?.loginbanner} alt="" />
        </div>
      </div>
      <div className="login-right-logiss">
        <div className="logoandname">
          <h2 className="login-title-logiss">Sign in</h2>
          <img src={Assets.logomain} alt="Logo" className="login-logo-logiss" />
        </div>
        <div className="login-form-logiss">
          <div className="comndivs">
            {/* <form method="post"> */}
            <div className="input-group-logiss">
              <label htmlFor="username" className="login-label-logiss">
                User name
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="login-input-logiss"
                required
              />
            </div>
            <div className="password-wrapper-logiss">
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                name="password"
                className="login-input-logiss"
                required
              />
              <span
                onClick={togglePasswordVisibility}
                className="eye-icon-logiss"
              >
                <img src={Assets.eyei} alt="Show Password" />
              </span>
            </div>
            <button className="login-button-logiss" onClick={(e) => loginSec(e)}>
              Login
            </button>
            <a href="#" className="forgot-password-logiss">
              Forgot Password
            </a>
            {/* </form> */}
          </div>
        </div>
        <div className="fotrins">
          {" "}
          <Footer />{" "}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

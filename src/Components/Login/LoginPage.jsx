import React, { useState } from "react";
import "./Login.css";
import Footer from "../../Layout/Footer/Footer";
import { Assets } from "../../assets/Assets";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;
  const apiKey = process.env.REACT_APP_API_KEY;

  const { login } = useAuth();
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const loginSec = async (e) => {
    setLoading(true);
    try {
      const loginData = {
        username,
        password,
        role: "hospital",
      };

      const response = await fetch(apiUrl + "users/authenticate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": apiKey,
        },
        body: JSON.stringify(loginData),
      });
      if (!response.ok) {
        throw new Error("These credentials do not match our records.");
      }
      const data = await response.json();
      if (data.code === 200) {
        login(
          data?.data?.info,
          data?.data?.token,
          data?.data?.token_expiration_time
        );
        // console.log("Post created:", data);
        toast.success("Login Successful");
        navigate("/patients");
        sessionStorage.setItem("loggedIn", "true");
      }
    } catch (error) {
      setError(error.message);
      toast.error("Login Failed");
    } finally {
      setLoading(false);
    }
  };
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
              {/* <label htmlFor="username" className="login-label-logiss">
                User name
              </label> */}
              <input
                type="text"
                id="username"
                name="username"
                className="login-input-logiss"
                required
                placeholder="User name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="password-wrapper-logiss">
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                name="password"
                className="login-input-logiss"
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                onClick={togglePasswordVisibility}
                className="eye-icon-logiss"
              >
                <img
                  src={Assets.eyei}
                  alt="Show Password"
                  style={{ width: "24px" }}
                />
              </span>
            </div>
            <button
              className="login-button-logiss"
              onClick={(e) => loginSec(e)}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
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

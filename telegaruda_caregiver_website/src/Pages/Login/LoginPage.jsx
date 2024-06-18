import React, { useState } from 'react';
import "./Login.css"
import Footer from '../../Components/Footer/Footer';
import { login } from '../../assets/Images';

const LoginPage = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
    return (
        <div className="login-container-logiss">
            <div className="login-left-logiss">
                <div className="login-image-logiss">
                    <img className='loginbsn' src={login?.loginbanner} alt="" />
                </div>
            </div>
            <div className="login-right-logiss">
                <div className="logoandname">
                    <h2 className="login-title-logiss">Sign in</h2>
                    <img src={login.logomain} alt="Logo" className="login-logo-logiss" />

                </div>
                <div className="login-form-logiss">


                    <div className="comndivs">
                        <form>
                            <div className="input-group-logiss">
                                <label htmlFor="username" className="login-label-logiss">User name</label>
                                <input type="text" id="username" name="username" className="login-input-logiss" required />
                            </div>
                            <div className="password-wrapper-logiss">
                                <input
                                    type={passwordVisible ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    className="login-input-logiss"
                                    required
                                />
                               <span onClick={togglePasswordVisibility} className="eye-icon-logiss">
                        <img src={login.eyei} alt="Show Password" />
                      </span>
                            </div>
                            <button type="submit" className="login-button-logiss">Signup</button>
                            <a href="#" className="forgot-password-logiss">Forgot Password</a>
                        </form>

                    </div>

                </div>
                <div className="fotrins">  <Footer />  </div>

            </div>

        </div>
    );
}

export default LoginPage;

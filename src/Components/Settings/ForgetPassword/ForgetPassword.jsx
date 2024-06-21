import { CCol, CContainer, CFormInput, CRow } from "@coreui/react";
import React, { useState } from "react";
import PrimaryButton from "../../Buttons/PrimaryButton/PrimaryButton";
import SecondaryButton from "../../Buttons/SecondaryButton/SecondaryButton";
import "./ForgetPassword.css";
import { Assets } from "../../../assets/Assets";

const ForgetPassword = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <CContainer className="settings-container-whole">
      <CRow className="mb-3">
        <CCol xs={6} md={4}>
          <div className="password-input">
            <CFormInput
              type={passwordVisible ? "text" : "password"}
              id="password"
              placeholder="Enter"
              label={<span>Current Password *</span>}
            />
            <button
              type="button"
              className="password-toggle"
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? (
                <img src={Assets.EyeOpen} alt="eye-open" />
              ) : (
                <img src={Assets.EyeClose} alt="eye-close" />
              )}
            </button>
          </div>
        </CCol>
        <CCol xs={6} md={4}>
          <div className="password-input">
            <CFormInput
              type={passwordVisible ? "text" : "password"}
              id="password"
              placeholder="Enter"
              label={<span>New Password *</span>}
            />
            <button
              type="button"
              className="password-toggle"
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? (
                <img src={Assets.EyeOpen} alt="eye-open" />
              ) : (
                <img src={Assets.EyeClose} alt="eye-close" />
              )}
            </button>
          </div>
        </CCol>
        <CCol xs={6} md={4}>
          <div className="password-input">
            <CFormInput
              type={passwordVisible ? "text" : "password"}
              id="password"
              placeholder="Enter"
              label={<span>Confirm Password *</span>}
            />
            <button
              type="button"
              className="password-toggle"
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? (
                <img src={Assets.EyeOpen} alt="eye-open" />
              ) : (
                <img src={Assets.EyeClose} alt="eye-close" />
              )}
            </button>
          </div>
        </CCol>
      </CRow>
      <CRow className="mb-3">
        <CCol xs={3} md={2}>
          <PrimaryButton>SAVE</PrimaryButton>
        </CCol>
        <CCol xs={3} md={2}>
          <SecondaryButton>CANCEL</SecondaryButton>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default ForgetPassword;

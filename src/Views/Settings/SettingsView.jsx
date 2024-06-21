import { CDBBox, CDBContainer } from "cdbreact";
import React, { useState } from "react";
import { Assets } from "../../assets/Assets";
import "./SettingsView.css";
import ForgetPassword from "../../Components/Settings/ForgetPassword/ForgetPassword";
import TwoFactor from "../../Components/Settings/2FA/TwoFactor";
import Communication from "../../Components/Settings/Communication/Communication";

const SettingsView = () => {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);

  return (
    <div className="setting-div1">
      <CDBContainer className="setting-container mb-3">
        <CDBBox tag="div" className="setting-whole-div">
          <CDBBox tag="div" className="setting-personal-icon">
            <img alt="account" src={Assets.ForgetPass} />
            <CDBBox tag="div" className="setting-personal">
              <span className="setting-personal-span-1">Change Password</span>
              <span className="setting-personal-span-2">
                Update your new password{" "}
              </span>
            </CDBBox>
          </CDBBox>
          <CDBBox tag="div" onClick={() => setOpen(!open)}>
            {!open ? (
              <img
                alt="account"
                src={Assets.ExpandClose}
                className="setting-edit"
              />
            ) : (
              <img
                alt="account"
                src={Assets.ExpandOpen}
                className="setting-edit"
              />
            )}
          </CDBBox>
        </CDBBox>
        {open && (
          <CDBBox className="setting-line">
            <ForgetPassword />
          </CDBBox>
        )}
      </CDBContainer>
      <CDBContainer className="setting-container mb-3">
        <CDBBox tag="div" className="setting-whole-div">
          <CDBBox tag="div" className="setting-personal-icon">
            <img alt="account" src={Assets.TwoFA} />
            <CDBBox tag="div" className="setting-personal">
              <span className="setting-personal-span-1">2FA</span>
              <span className="setting-personal-span-2">
                Update your two factor verification{" "}
              </span>
            </CDBBox>
          </CDBBox>
          <CDBBox tag="div" onClick={() => setOpen2(!open2)}>
            {!open2 ? (
              <img
                alt="account"
                src={Assets.ExpandClose}
                className="setting-edit"
              />
            ) : (
              <img
                alt="account"
                src={Assets.ExpandOpen}
                className="setting-edit"
              />
            )}
          </CDBBox>
        </CDBBox>
        {open2 && (
          <CDBBox className="setting-line">
            <TwoFactor />
          </CDBBox>
        )}
      </CDBContainer>
      <CDBContainer className="setting-container mb-3">
        <CDBBox tag="div" className="setting-whole-div">
          <CDBBox tag="div" className="setting-personal-icon">
            <img alt="account" src={Assets.Notify} />
            <CDBBox tag="div" className="setting-personal">
              <span className="setting-personal-span-1">Communication</span>
              <span className="setting-personal-span-2">
                Update your notification{" "}
              </span>
            </CDBBox>
          </CDBBox>
          <CDBBox tag="div" onClick={() => setOpen3(!open3)}>
            {!open3 ? (
              <img
                alt="account"
                src={Assets.ExpandClose}
                className="setting-edit"
              />
            ) : (
              <img
                alt="account"
                src={Assets.ExpandOpen}
                className="setting-edit"
              />
            )}
          </CDBBox>
        </CDBBox>
        {open3 && (
          <CDBBox className="setting-line">
            <Communication />
          </CDBBox>
        )}
      </CDBContainer>
    </div>
  );
};

export default SettingsView;

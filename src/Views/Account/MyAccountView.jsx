import { CDBBox, CDBContainer } from "cdbreact";
import "./MyAccountView.css";
import React, { useState } from "react";
import { Assets } from "../../assets/Assets";
import AccountsForm from "../../Components/Accounts/AccountsForm/AccountsForm";

const MyAccountView = () => {
  const [formDisplay, setFormDisplay] = useState(false);
  return (
    <div className={"div1"}>
      {!formDisplay && (
        <CDBContainer className="acc-container">
          <CDBBox tag="div" className="acc-whole-div">
            <CDBBox tag="div" className="acc-personal-icon">
              <img alt="account" src={Assets.MyAcc} />
              <CDBBox tag="div" className="acc-personal">
                <span className="acc-personal-span-1">
                  Personal Information
                </span>
                <span className="acc-personal-span-2">
                  Update your personal information{" "}
                </span>
              </CDBBox>
            </CDBBox>
            <CDBBox tag="div" onClick={() => setFormDisplay(true)}>
              <img alt="account" src={Assets.Edit} className="acc-edit" />
            </CDBBox>
          </CDBBox>
        </CDBContainer>
      )}
      {formDisplay && (
        <CDBContainer className="acc-container">
          <CDBBox tag="div" className="acc-whole-div">
            <CDBBox tag="div" className="acc-personal-icon">
              <img alt="account" src={Assets.MyAcc} />
              <CDBBox tag="div" className="acc-personal">
                <span className="acc-personal-span-1">
                  Personal Information
                </span>
                <span className="acc-personal-span-2">
                  Update your personal information{" "}
                </span>
              </CDBBox>
            </CDBBox>
            <CDBBox tag="div" onClick={() => setFormDisplay(false)}>
              <img alt="account" src={Assets.Close} className="acc-edit" />
            </CDBBox>
          </CDBBox>
          <CDBBox className="acc-form">
            <AccountsForm />
          </CDBBox>
        </CDBContainer>
      )}
    </div>
  );
};

export default MyAccountView;

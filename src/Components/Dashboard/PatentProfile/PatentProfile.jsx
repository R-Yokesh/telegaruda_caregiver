import { CCard, CCardBody } from "@coreui/react";
import React from "react";
import "./PatentProfile.css";
import { Assets } from "../../../assets/Assets";

const PatentProfile = () => {
  return (
    <>
      <CCard className="card-profile">
        <CCardBody className="d-flex gap-4">
          <div className="img-container">
            <img src={Assets.patient1} alt="profile-img" />
          </div>
          <div className="user-details">
            <span className="user-title">Ramesh H</span>
            <div className="d-flex flex-wrap gap-2">
              <p className="user-email">rammohan@cure.com</p>
              <p className="user-email">|</p>
              <p className="user-email">+91 98765 43210</p>
            </div>
            <div className="d-flex flex-wrap gap-2">
              <p className="user-email">MRN: MRN 3</p>
              <p className="user-email">|</p>
              <p className="user-email">34 yrs (M)</p>
            </div>
          </div>
        </CCardBody>
      </CCard>
    </>
  );
};

export default PatentProfile;

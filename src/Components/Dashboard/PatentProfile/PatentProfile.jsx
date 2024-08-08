import { CCard, CCardBody } from "@coreui/react";
import React from "react";
import "./PatentProfile.css";
import { Assets } from "../../../assets/Assets";
import { useLocation } from "react-router-dom";

const PatentProfile = () => {
  const location = useLocation();
  const data = location.state?.PatientDetail;
  return (
    <>
      <CCard className="card-profile">
        <CCardBody className="d-flex gap-4">
          <div className="img-container">
            <img src={Assets.patient1} alt="profile-img" />
          </div>
          <div className="user-details">
            <span className="user-title">
              {data?.user?.first_name} {data?.user?.last_name}
            </span>
            <div className="d-flex flex-wrap gap-2">
              <p className="user-email">{data?.user?.email ?? "--"}</p>
              <p className="user-email">|</p>
              <p className="user-email">
                {data?.user?.isd_code} {data?.user?.mobile ?? "--"}
              </p>
            </div>
            <div className="d-flex flex-wrap gap-2">
              <p className="user-email">
                MRN: {data?.additional_info?.mrn_number ?? "--"}
              </p>
              <p className="user-email">|</p>
              <p className="user-email">
                {data?.additional_info?.age ?? "--"} yrs (
                {data?.user?.gender === "Male" ? " M " : " F "})
              </p>
            </div>
          </div>
        </CCardBody>
      </CCard>
    </>
  );
};

export default PatentProfile;

import React from "react";
import { Assets } from "../../assets/Assets";
import { formatDateTime } from "../../Utils/dateUtils";
import useApi from "../../ApiServices/useApi";
import { useLocation } from "react-router-dom";

const RegisteredDoctorCards = ({ DoctorDetail, getselectedProviderData }) => {
  return (
    <div className="card-sec">
      <div className="row align-items-center">
        <div className="profile col-4">
          <img
            src={DoctorDetail?.profile || Assets.NoImg}
            alt="Patient-image"
          />
        </div>
        <div className="patient-details col-8 p-2">
          <h5>
            Dr. {DoctorDetail?.user?.first_name} {DoctorDetail?.user?.last_name}
          </h5>
          <p className="gap-sec d-flex flex-wrap">
            <small className="fs-10 fw-500" style={{ wordBreak: "break-all" }}>
              {DoctorDetail?.user?.email}
            </small>
            <small className="fs-10 fw-500">|</small>
            <small className="fs-10 fw-500">{DoctorDetail?.user?.mobile}</small>
          </p>
          <p className="flex-sec-wrap gap-sec">
            <small className="fs-10 fw-600">
              {DoctorDetail?.provider_speciality
                ?.map((item, i) => item?.speciality)
                .filter(Boolean)
                .join(", ")}
            </small>
            <small className="fs-10 fw-600">|</small>
            <small className="fs-10 fw-600">{DoctorDetail?.date}</small>
            <small className="fs-10 fw-600">{DoctorDetail?.time}</small>
          </p>
        </div>
      </div>
      <img
        src={Assets.videoCall_icon}
        className="edit-icon"
        alt="edit-icon"
        onClick={() => getselectedProviderData(DoctorDetail)}
      />
    </div>
  );
};

export default RegisteredDoctorCards;

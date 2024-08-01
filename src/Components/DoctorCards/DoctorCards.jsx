import React from "react";
import { Assets } from "../../assets/Assets";

function DoctorCards({ DoctorDetail }) {
  //   console.log("DoctorDetail", DoctorDetail);
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
            Dr.{" "}
            {DoctorDetail?.participants
              ? DoctorDetail?.participants[1]?.participant_info?.name
              : "--"}
          </h5>
          <p className="gap-sec d-flex flex-wrap">
            <small className="fs-10 fw-500">
              {DoctorDetail?.participants
                ? DoctorDetail?.participants[1]?.participant_info?.email
                : "--"}
            </small>
            <small className="fs-10 fw-500">|</small>
            <small className="fs-10 fw-500">
              {DoctorDetail?.participants
                ? DoctorDetail?.participants[1]?.participant_info?.phone
                : "--"}
            </small>
          </p>
          <p className="flex-sec-wrap gap-sec">
            <small className="fs-10 fw-600">Oncology</small>
            <small className="fs-10 fw-600">|</small>
            <small className="fs-10 fw-600">02-04-2024 12:13PM</small>
          </p>
        </div>
      </div>
      <img src={Assets.notes} className="edit-icon" alt="edit-icon" />
    </div>
  );
}

export default DoctorCards;

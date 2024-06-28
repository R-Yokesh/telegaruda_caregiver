import React from "react";
import { Assets } from "../../assets/Assets";
import { useNavigate } from "react-router-dom";

function PatientCard({ PatientDetail }) {
  const navigate = useNavigate();

  const goTo = () => {
    navigate("/patients/history");
  };
  return (
    <div className="card-sec">
      <div className="row align-items-center">
        <div className="profile col-4">
          <img src={PatientDetail.profile} alt="Patient-image" />
        </div>
        <div className="patient-details col-8">
          <h5>{PatientDetail.name}</h5>
          <p className="flex-sec-wrap gap-sec">
            <small className="fs-10 fw-500">{PatientDetail.email}</small>
            <small className="fs-10 fw-500">|</small>
            <small className="fs-10 fw-500">{PatientDetail.mobile}</small>
          </p>
          <p className="flex-sec-wrap gap-sec">
            <small className="fs-10 fw-600">MRN: {PatientDetail.mrn}</small>
            <small className="fs-10 fw-600">|</small>
            <small className="fs-10 fw-600">{PatientDetail.age}</small>
          </p>
        </div>
      </div>
      <img
        src={Assets.Edit}
        className="edit-icon cursor"
        alt="edit-icon"
        onClick={goTo}
      />
    </div>
  );
}

export default PatientCard;

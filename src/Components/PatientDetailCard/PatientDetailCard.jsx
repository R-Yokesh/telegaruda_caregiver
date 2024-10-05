import React from "react";
import { CRow, CCol } from "@coreui/react";
import { formatDateTime } from "../../Utils/dateUtils";

function PatientDetailCard({ data }) {
  return (
    <div className="patient-card-details">
      <CRow>
        <CCol sm={12} lg={6}>
          <div className="blue-card patient-box">
            <h5>Patient Details</h5>
            <CRow>
              <CCol sm={6}>
                <span>
                  Patient Name:{" "}
                  {data?.a_profile?.first_name +
                    " " +
                    data?.a_profile?.last_name}
                </span>
              </CCol>
              <CCol sm={6}>
                <span>
                  Date Of Birth & Age: {data?.a_profile?.dob ?? "-"}{" "}
                  {data?.b_patient?.additional_info?.age &&
                    "& " +
                      data?.b_patient?.additional_info?.age +
                      " Years"}{" "}
                </span>
              </CCol>
            </CRow>
            <CRow>
              <CCol sm={6}>
                <span>Gender: {data?.a_profile?.gender}</span>
              </CCol>
              <CCol sm={6}>
                <span>Blood Group: {data?.a_profile?.blood_group}</span>
              </CCol>
            </CRow>
          </div>
        </CCol>
        <CCol sm={12} lg={6}>
          <div className="black-card patient-box">
            <h5>Consult Details</h5>
            <CRow>
              <CCol sm={6}>
                <span>
                  Scheduled at: 
                  {formatDateTime(data?.b_consult_details?.scheduled_at) ??
                    "--"}
                </span>
              </CCol>
              <CCol sm={6}>
                <span>
                  Started at:{" "}
                  {formatDateTime(data?.b_consult_details?.started_at) ?? "--"}
                </span>
              </CCol>
            </CRow>
            <CRow>
              <CCol sm={6}>
                <span>
                  Ended at:{" "}
                  {formatDateTime(data?.b_consult_details?.ended_at) ?? "--"}
                </span>
              </CCol>
              <CCol sm={6}>
                <span>
                  Additional Notes:{" "}
                  {data?.b_consult_details?.additional_info?.consult_notes ??
                    "--"}
                </span>
              </CCol>
            </CRow>
          </div>
        </CCol>
      </CRow>
    </div>
  );
}

export default PatientDetailCard;

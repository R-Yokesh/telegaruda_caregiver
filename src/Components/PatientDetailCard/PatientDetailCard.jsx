import React from "react";
import { CRow, CCol } from "@coreui/react";
import { useLocation } from "react-router-dom";

function PatientDetailCard() {
  const location = useLocation();
  const data = location.state?.PatientDetail;
  console.log("patient", data);
  return (
    <div className="patient-card-details">
      <CRow>
        <CCol sm={12} lg={6}>
          <div className="blue-card patient-box">
            <h5>Patient Details</h5>
            <CRow>
              <CCol sm={6}>
                <span>Patient Name: Ram Mohan S R</span>
              </CCol>
              <CCol sm={6}>
                <span>Date Of Birth & Age: 04-02-1997 & 27 Years</span>
              </CCol>
            </CRow>
            <CRow>
              <CCol sm={6}>
                <span>Gender: Male</span>
              </CCol>
              <CCol sm={6}>
                <span>Blood Group: O+</span>
              </CCol>
            </CRow>
          </div>
        </CCol>
        <CCol sm={12} lg={6}>
          <div className="black-card patient-box">
            <h5>Consult Details</h5>
            <CRow>
              <CCol sm={6}>
                <span>Scheduled at: 21-06-2024 12:34 PM</span>
              </CCol>
              <CCol sm={6}>
                <span>Started at:</span>
              </CCol>
            </CRow>
            <CRow>
              <CCol sm={6}>
                <span>Ended at:</span>
              </CCol>
              <CCol sm={6}>
                <span>Additional Notes:</span>
              </CCol>
            </CRow>
          </div>
        </CCol>
      </CRow>
    </div>
  );
}

export default PatientDetailCard;

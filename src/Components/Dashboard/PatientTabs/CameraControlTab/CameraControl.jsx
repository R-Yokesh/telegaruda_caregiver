import { CCard, CCardBody, CCol, CContainer, CRow } from "@coreui/react";
import React from "react";
import { Assets } from "../../../../assets/Assets";
import { useLocation } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import CameraComponent from "./CameraComponent";

const CameraControl = () => {
  const location = useLocation();
  const data = location.state?.PatientDetail;

  return (
    <CContainer>
      <CRow>
        <CCol md={12} className="p-0">
          <CCard className="mb-2">
            <CCardBody>
              <div className="d-flex justify-content-center align-items-center gap-3">
                <CameraComponent />
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default CameraControl;

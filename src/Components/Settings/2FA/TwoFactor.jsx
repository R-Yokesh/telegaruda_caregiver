import { CCol, CFormCheck, CFormInput, CRow } from "@coreui/react";
import React from "react";

const TwoFactor = () => {
  return (
    <div className="settings-container-whole">
      <CRow className="mb-3">
        <CCol xs={6} md={4}>
          <CFormCheck id="flexCheckDefault" label="Enable 2FA" />
        </CCol>
      </CRow>
    </div>
  );
};

export default TwoFactor;

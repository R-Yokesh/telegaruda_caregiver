import { CCol, CFormCheck, CFormInput, CRow } from "@coreui/react";
import React from "react";

const Communication = () => {
  return (
    <div className="settings-container-whole">
      <CRow className="mb-3">
        <CCol xs={6} md={4}>
          <CFormCheck id="flexCheckDefault" label="Email" />
        </CCol>
        <CCol xs={6} md={4}>
          <CFormCheck id="flexCheckDefault" label="SMS" />
        </CCol>
      </CRow>
    </div>
  );
};

export default Communication;

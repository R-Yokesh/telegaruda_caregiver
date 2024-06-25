import { CCard, CCardBody, CCol, CContainer, CRow } from "@coreui/react";
import React from "react";
import { Assets } from "../../../../assets/Assets";

const PairTab = () => {
  return (
    <CContainer>
      <CRow>
        <CCol md={12} className="p-0">
          <CCard>
            <CCardBody>
              <div className="d-flex justify-content-center align-items-center gap-3">
                <div>
                  <img alt="qrCode" src={Assets.QrCode} />
                </div>
                <div className="d-flex flex-column mb-3">
                  <span className="fs-16 fw-600 text-secondary">
                    User Name : <strong style={{ color: "black" }}>10</strong>
                  </span>
                  <span className="fs-16 fw-600 text-secondary">
                    Password : <strong style={{ color: "black" }}>98786</strong>
                  </span>
                </div>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default PairTab;

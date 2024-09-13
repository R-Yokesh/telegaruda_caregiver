import { CCard, CCardBody, CCol, CContainer, CRow } from "@coreui/react";
import React from "react";
import { Assets } from "../../../../assets/Assets";
import { useLocation } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";

const PairTab = () => {
  const location = useLocation();
  const data = location.state?.PatientDetail;

  return (
    <CContainer>
      <CRow>
        <CCol md={12} className="p-0">
          <CCard>
            <CCardBody>
              <div className="d-flex justify-content-center align-items-center gap-3">
                <div>
                  {/* <img alt="qrCode" src={Assets.QrCode} /> */}
                  <QRCodeSVG
                    value={data?.peripheral_credentials?.salt_key ?? ""}
                    size={240}
                  />
                </div>
                <div className="d-flex flex-column mb-3">
                  <span className="fs-16 fw-600 text-secondary">
                    User Name :{" "}
                    <strong style={{ color: "black" }}>
                      {data?.peripheral_credentials?.username ?? ""}
                    </strong>
                  </span>
                  <span className="fs-16 fw-600 text-secondary">
                    Password :{" "}
                    <strong style={{ color: "black" }}>
                      {data?.peripheral_credentials?.otp ?? ""}
                    </strong>
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

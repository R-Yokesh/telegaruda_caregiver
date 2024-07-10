import React from "react";
import Breadcrumb from "../../../../../Breadcrumb/Breadcrumb";
import { CCol, CRow } from "@coreui/react";
import { Assets } from "../../../../../../assets/Assets";
import ProcedureTab from "./ProcedureTab/ProcedureTab";

const Cpt = ({ onClose }) => {
  return (
    <>
      <CRow className="mb-0">
        <CCol md={4} className="mb-2">
          <div className="d-flex gap-2">
            <img
              alt="BackBtn"
              src={Assets.BackBtn}
              style={{ width: "35px" }}
              onClick={onClose}
              className="cursor"
            />
            <span className="Obj-name d-flex align-items-center">
              Procedure (CPT Code)
            </span>
          </div>
        </CCol>
        <CCol md={8} className="mb-2 d-flex justify-content-end">
          <div className="d-flex mt-2">
            <Breadcrumb
              paths={[
                { label: "Home", to: "/patients" },
                { label: "Patient List", to: "/patients" },
                { label: "Medical Profile", to: "/patients/history" },
                { label: "Procedure (CPT Code)", to: "/patients/history" },
              ]}
            />
          </div>
        </CCol>
        <CCol>
          <ProcedureTab />
        </CCol>
      </CRow>
    </>
  );
};

export default Cpt;

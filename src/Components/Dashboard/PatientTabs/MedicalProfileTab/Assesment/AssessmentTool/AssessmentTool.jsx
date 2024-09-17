import React, { useState } from "react";
import Breadcrumb from "../../../../../Breadcrumb/Breadcrumb";
import { CCol, CRow } from "@coreui/react";
import { Assets } from "../../../../../../assets/Assets";
import MedicalTab from "../../MedicalTab";
import Psychiatric from "./Psychiatric/Psychiatric";
import Neurological from "./Neurological/Neurological";
import Peadiatric from "./Peadiatric/Peadiatric";
import Ophthalmic from "./Ophthalmic/Ophthalmic";
import { useNavigate } from "react-router-dom";

const AssessmentTool = ({ onClose }) => {
  const tabs = [
    { id: 1, title: "Psychiatric" },
    { id: 2, title: "Neurological" },
    { id: 3, title: "Pediatric" },
    { id: 4, title: "Ophthalmic" },
  ];
  const navigate = useNavigate();
  const PatientSubMenu2 = localStorage.getItem("PatientSubMenu-3");
  const ParsedPatientSubMenu = PatientSubMenu2
    ? JSON.parse(PatientSubMenu2)
    : 1;
  const GoTOConsultPage = localStorage.getItem("PatientConsultTab");
  const parsedConsult = GoTOConsultPage ? JSON.parse(GoTOConsultPage) : false;
  const [currentTab, setCurrentTab] = useState(ParsedPatientSubMenu);
  const getCurrentTab = (data) => {
    setCurrentTab(data);
  };

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
              Assessment Tools
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
                {
                  label: "Assessment Tools",
                  to: "/patients/history",
                },
              ]}
            />
          </div>
        </CCol>
      </CRow>
      <CRow>
        <CCol md={12}>
          <MedicalTab
            tabs={tabs}
            getCurrentTab={getCurrentTab}
            defaultTab={ParsedPatientSubMenu - 1}
          />
        </CCol>
      </CRow>
      <CRow className="mt-3">
        {currentTab === 1 && (
          <>
            <Psychiatric />
          </>
        )}
        {currentTab === 2 && (
          <>
            <Neurological />
          </>
        )}
        {currentTab === 3 && (
          <>
            <Peadiatric />
          </>
        )}
        {currentTab === 4 && (
          <>
            <Ophthalmic />
          </>
        )}
      </CRow>
    </>
  );
};

export default AssessmentTool;

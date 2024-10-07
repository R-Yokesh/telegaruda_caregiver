import React, { useState } from "react";
import Breadcrumb from "../../../../../Breadcrumb/Breadcrumb";
import { CCol, CRow } from "@coreui/react";
import { Assets } from "../../../../../../assets/Assets";
import MedicalTab from "../../MedicalTab";
import SignsSymptoms from "./Signs And Symptoms/SignsSymptoms";
import Medication from "./Medication/Medication";
import Allergies from "./Allergies/Allergies";

const PresentIllness = ({ OnClose }) => {
  const tabs = [
    { id: 1, title: "Symptoms" },
    { id: 2, title: "Medication" },
    { id: 3, title: "Allergies" },
  ];
  const PatientSubMenu3 = localStorage.getItem("PatientSubMenu-3");
  const ParsedPatientSubMenu = PatientSubMenu3
    ? JSON.parse(PatientSubMenu3)
    : 1;
  const [currentTab, setCurrentTab] = useState(ParsedPatientSubMenu);
  const getCurrentTab = (data) => {
    setCurrentTab(data);
  };
  console.log("first", currentTab);
  return (
    <>
      <CRow className="mb-0">
        <CCol md={4} className="">
          <div className="d-flex gap-2">
            <img
              alt="BackBtn"
              src={Assets.BackBtn}
              style={{ width: "35px" }}
              onClick={OnClose}
              className="cursor"
            />
            <span className="Obj-name d-flex align-items-center">
              History of Present Illness (HPI)
            </span>
          </div>
        </CCol>
        <CCol md={8} className=" d-flex justify-content-end">
          <div className="d-flex mt-2">
            <Breadcrumb
              paths={[
                { label: "Home", to: "/patients" },
                { label: "Patient List", to: "/patients" },
                { label: "Medical Profile", to: "/patients/history" },
                {
                  label: "History of Present Illness (HPI)",
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
            defaultTab={currentTab - 1}
          />
        </CCol>
      </CRow>
      <CRow className="mt-3">
        {currentTab === 1 && (
          <>
            <SignsSymptoms />
          </>
        )}
        {currentTab === 2 && (
          <>
            <Medication />
          </>
        )}
        {currentTab === 3 && (
        <> 
        <Allergies />
        </>
        )}
      </CRow>
    </>
  );
};

export default PresentIllness;

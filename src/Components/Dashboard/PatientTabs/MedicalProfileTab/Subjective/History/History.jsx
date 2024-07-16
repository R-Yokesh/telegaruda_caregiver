import React, { useState } from "react";
import Breadcrumb from "../../../../../Breadcrumb/Breadcrumb";
import { CCol, CRow } from "@coreui/react";
import { Assets } from "../../../../../../assets/Assets";
import MedicalTab from "../../MedicalTab";
import MedicalHistory from "./Medical History/MedicalHistory";
import SurgicalHistory from "./Surgical History/SurgicalHistory";

const History = ({ OnClose }) => {
  const tabs = [
    { id: 1, title: "Medical History" },
    { id: 2, title: "O/G History" },
    { id: 3, title: "Surgical History" },
    { id: 4, title: "Family History" },
    { id: 5, title: "Social History" },
  ];
  const [currentTab, setCurrentTab] = useState(1);
  const getCurrentTab = (data) => {
    setCurrentTab(data);
  };
  console.log("first", currentTab);
  return (
    <>
      <CRow className="mb-0">
        <CCol md={4} className="mb-2">
          <div className="d-flex gap-2">
            <img
              alt="BackBtn"
              src={Assets.BackBtn}
              style={{ width: "35px" }}
              onClick={OnClose}
              className="cursor"
            />
            <span className="Obj-name d-flex align-items-center">History</span>
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
                  label: "History",
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
            defaultTab={0}
          />
        </CCol>
      </CRow>
      <CRow className="mt-3">
        {currentTab === 1 && (
          <>
            <MedicalHistory />
          </>
        )}
        {currentTab === 2 && <></>}
        {currentTab === 3 && (
          <>
            <SurgicalHistory />
          </>
        )}
      </CRow>
    </>
  );
};

export default History;

import React, { useState } from "react";
import Breadcrumb from "../../../../../Breadcrumb/Breadcrumb";
import { CCol, CRow } from "@coreui/react";
import { Assets } from "../../../../../../assets/Assets";
import MedicalTab from "../../MedicalTab";
import MedicalHistory from "./Medical History/MedicalHistory";
import SurgicalHistory from "./Surgical History/SurgicalHistory";
import OGHistory from "./OG History/OGHistory";
import SocialHistory from "./Social History/SocialHistory";
import FamilyHistory from "./Family History/FamilyHistory";
import { useLocation } from "react-router-dom";

const History = ({ OnClose }) => {
  const location = useLocation();
  const data = location.state?.PatientDetail;
  console.log(data?.user?.gender, "userData Female ");
  const tabs =
    data?.user?.gender === "Female"
      ? [
          { id: 1, title: "Medical History" },
          { id: 2, title: "O/G History" },
          { id: 3, title: "Surgical History" },
          { id: 4, title: "Family History" },
          { id: 5, title: "Social History" },
        ]
      : [
          { id: 1, title: "Medical History" },
          { id: 2, title: "Surgical History" },
          { id: 3, title: "Family History" },
          { id: 4, title: "Social History" },
        ];
  const PatientSubMenu3 = localStorage.getItem("PatientSubMenu-3");
  const ParsedPatientSubMenu = PatientSubMenu3
    ? JSON.parse(PatientSubMenu3)
    : 1;
  const [currentTab, setCurrentTab] = useState(ParsedPatientSubMenu);
  const getCurrentTab = (data) => {
    setCurrentTab(data);
  };
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
            <span className="Obj-name d-flex align-items-center">History</span>
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
            defaultTab={ParsedPatientSubMenu - 1}
          />
        </CCol>
      </CRow>
      <CRow className="mt-3">
        {currentTab === 1 && (
          <>
            <MedicalHistory />
          </>
        )}
        {currentTab === 2 && (
          <>
            <OGHistory from={""} back={OnClose} />
          </>
        )}
        {currentTab === 3 && (
          <>
            <SurgicalHistory />
          </>
        )}
        {currentTab === 4 && (
          <>
            <FamilyHistory />
          </>
        )}
        {currentTab === 5 && (
          <>
            <SocialHistory back={OnClose} />
          </>
        )}
      </CRow>
    </>
  );
};

export default History;

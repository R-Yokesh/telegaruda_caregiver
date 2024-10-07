import React, { useState } from "react";
import Breadcrumb from "../../../../../Breadcrumb/Breadcrumb";
import { CCol, CRow } from "@coreui/react";
import { Assets } from "../../../../../../assets/Assets";
import MedicalTab from "../../MedicalTab";
import ExcerciseHabit from "./ExerciseHabit/ExerciseHabit";
import Mood from "./Mood/Mood";
import Nutrition from "./Nutrition/Nutrition";
import SexualStatus from "./SexualStatus/SexualStatus";
import Sleep from "./Sleep/Sleep";

const WellnessProfile = ({ OnClose }) => {
  const tabs = [
    { id: 1, title: "Exercise Habit" },
    { id: 2, title: "Nutrition" },
    { id: 3, title: "Sleep" },
    { id: 4, title: "Mood" },
    { id: 5, title: "Sexual Status" },
  ];
  const PatientSubMenu2 = localStorage.getItem("PatientSubMenu-3");
  const ParsedPatientSubMenu = PatientSubMenu2
    ? JSON.parse(PatientSubMenu2)
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
            <span className="Obj-name d-flex align-items-center">Wellness</span>
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
                  label: "Wellness",
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
            <ExcerciseHabit />
          </>
        )}
        {currentTab === 2 && (
          <>
            <Nutrition />
          </>
        )}
        {currentTab === 3 && (
          <>
            <Sleep />
          </>
        )}
        {currentTab === 4 && (
          <>
            <Mood />
          </>
        )}
        {currentTab === 5 && (
          <>
            <SexualStatus back={OnClose}/>
          </>
        )}
      </CRow>
    </>
  );
};

export default WellnessProfile;

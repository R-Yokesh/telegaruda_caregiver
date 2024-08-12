import React, { useState } from "react";
import MedicalTab from "./MedicalTab";
import Objective from "./Objective/Objective";
import Assesment from "./Assesment/Assesment";
import Plan from "./Plan/Plan";
import Subjective from "./Subjective/Subjective";

const MedicalProfile = () => {
  const tabs = [
    { id: 1, title: "Subjective" },
    { id: 2, title: "Objective" },
    { id: 3, title: "Assesment" },
    { id: 4, title: "Plan" },
  ];
  const PatientSubMenu = localStorage.getItem("PatientSubMenu-1");
  const ParsedPatientSubMenu = PatientSubMenu ? JSON.parse(PatientSubMenu) : 1;

  const [currentTab, setCurrentTab] = useState(ParsedPatientSubMenu);

  const getCurrentTab = (data) => {
    setCurrentTab(data);
  };

  return (
    <>
      <div>
        <MedicalTab tabs={tabs} getCurrentTab={getCurrentTab} defaultTab={currentTab - 1} />
        {currentTab === 1 && <Subjective />}
        {currentTab === 2 && <Objective />}
        {currentTab === 3 && <Assesment />}
        {currentTab === 4 && <Plan />}
      </div>
    </>
  );
};

export default MedicalProfile;

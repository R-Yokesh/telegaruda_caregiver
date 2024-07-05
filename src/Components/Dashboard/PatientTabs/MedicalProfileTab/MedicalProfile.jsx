import React, { useState } from "react";
import MedicalTab from "./MedicalTab";
import Objective from "./Objective/Objective";
import Assesment from "./Assesment/Assesment";
import Plan from "./Plan/Plan";

const MedicalProfile = () => {
  const tabs = [
    { id: 1, title: "Subjective" },
    { id: 2, title: "Objective" },
    { id: 3, title: "Assesment" },
    { id: 4, title: "Plan" },
  ];
  const [currentTab, setCurrentTab] = useState(2);

  const getCurrentTab = (data) => {
    setCurrentTab(data);
  };

  return (
    <>
      <div>
        <MedicalTab tabs={tabs} getCurrentTab={getCurrentTab} defaultTab={1} />
        {currentTab === 2 && <Objective />}
        {currentTab === 3 && <Assesment />}
        {currentTab === 4 && <Plan />}
      </div>
    </>
  );
};

export default MedicalProfile;

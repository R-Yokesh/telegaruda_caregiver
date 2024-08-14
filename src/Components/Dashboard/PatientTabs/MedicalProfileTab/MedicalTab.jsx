import { CCard, CCardBody } from "@coreui/react";
import React, { useState } from "react";
import "./MedicalProfile.css";

const MedicalTab = ({ tabs, getCurrentTab, defaultTab }) => {
  console.log("first", tabs, getCurrentTab, defaultTab);
  const [currentTab, setCurrentTab] = useState(tabs[defaultTab]);

  const switchTab = (data) => {
    setCurrentTab(data);
    getCurrentTab(data.id);
  };
  return (
    <CCard className="medical-tabs">
      <CCardBody className="medical-tabs-container">
        {tabs.map((data, index) => (
          <div
            key={index}
            className={`medical-tab-items ${
              data.id === currentTab?.id ? "medical-tab-active" : ""
            }`}
            onClick={() => switchTab(data)}
          >
            <span
              className={
                data.id === currentTab?.id
                  ? "medical-tab-title-active"
                  : "medical-tab-title"
              }
            >
              {data.title}
            </span>
          </div>
        ))}
      </CCardBody>
    </CCard>
  );
};

export default MedicalTab;

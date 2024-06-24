import { CCard, CCardBody } from "@coreui/react";
import React, { useState } from "react";
import "./PatientTabs.css";

const PatientTabs = ({ tabs, getCurrentTab }) => {
  const [currentTab, setCurrentTab] = useState(tabs[1]);

  const switchTab = (data) => {
    setCurrentTab(data);
    getCurrentTab(data.id);
  };
  return (
    <CCard className="card-tabs">
      <CCardBody className="tabs-container">
        {tabs.map((data, index) => (
          <div
            key={index}
            className={`tab-items ${
              data.id === currentTab?.id ? "tab-active" : ""
            }`}
            onClick={() => switchTab(data)}
          >
            <img src={data.image} alt="call" className="tab-icon" />
            <span className="tab-title">{data.title}</span>
          </div>
        ))}
      </CCardBody>
    </CCard>
  );
};

export default PatientTabs;

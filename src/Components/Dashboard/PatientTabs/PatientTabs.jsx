import { CCard, CCardBody } from "@coreui/react";
import React, { useState } from "react";
import "./PatientTabs.css";
import { Assets } from "../../../assets/Assets";

const PatientTabs = ({ getCurrentTab }) => {
  const tabs = [
    {
      id: 1,
      title: "Call",
      image: Assets.Call,
    },
    {
      id: 2,
      title: "Medical Profile",
      image: Assets.Notes,
    },

    {
      id: 3,
      title: "Camera Control",
      image: Assets.Camera,
    },
    {
      id: 4,
      title: "Pair",
      image: Assets.Qr,
    },
    // {
    //   id: 5,
    //   title: "Call2",
    //   image: Assets.Call,
    // },
  ];

  const [currentTab, setCurrentTab] = useState(() => {
    // Initial state setup using localStorage
    const storedCount = localStorage.getItem("patiendDetailTab");
    const storedFrom = localStorage.getItem("PatientMenu");

    const findObjectById = () => {
      const findedObj = tabs?.find(
        (option) => option?.id === Number(storedFrom)
      );
      return findedObj;
    };
    console.log(findObjectById());
    return storedCount
      ? JSON.parse(storedCount)
      : storedFrom
      ? findObjectById()
      : null;
  });

  const switchTab = (data) => {
    
    localStorage.removeItem("PatientSubMenu-1");
    localStorage.removeItem("PatientSubMenu-2");
    localStorage.removeItem("PatientSubMenu-3");
    localStorage.removeItem("PatientSubMenu-4");
    localStorage.removeItem("PatientSubMenu-5");
    localStorage.removeItem("PatientMenu");
    localStorage.removeItem("PatientConsultTab");
    
    localStorage.setItem("patiendDetailTab", JSON.stringify(data));

    setCurrentTab(data);
    getCurrentTab(data?.id);
    if (data?.id === currentTab?.id) {
      getCurrentTab(null);
      setCurrentTab(null);
    }
  };
  return (
    <CCard className="card-tabs">
      <CCardBody className="tabs-container">
        {tabs.map((data, index) => (
          <div
            key={index}
            className={`tab-items ${
              data?.id === currentTab?.id ? "tab-active" : ""
            }`}
            onClick={() => switchTab(data)}
          >
            <img src={data?.image} alt="call" className="tab-icon" />
            <span className="tab-title">{data?.title}</span>
          </div>
        ))}
      </CCardBody>
    </CCard>
  );
};

export default PatientTabs;

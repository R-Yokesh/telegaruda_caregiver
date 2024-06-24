import React, { useState } from "react";
import "./PatientDetailsView.css";
import PatentProfile from "../../../Components/Dashboard/PatentProfile/PatentProfile";
import { CCol, CContainer, CRow } from "@coreui/react";
import PatientTabs from "../../../Components/Dashboard/PatientTabs/PatientTabs";
import Breadcrumb from "../../../Components/Breadcrumb/Breadcrumb";
import VitalsTab from "../../../Components/Dashboard/PatientTabs/VitalsTab/VitalsTab";
import { Assets } from "../../../assets/Assets";
import MedicalProfile from "../../../Components/Dashboard/PatientTabs/MedicalProfileTab/MedicalProfile";

const PatientDetailsView = () => {
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
  ];
  const [currentTab, setCurrentTab] = useState(2);
  const getCurrentTab = (data) => {
    setCurrentTab(data);
  };
  return (
    <div className="p-3">
      <CContainer>
        <CRow className="mb-4">
          <CCol md={12} xl={5} className="mb-2">
            <PatentProfile />
          </CCol>
          <CCol md={12} xl={7}>
            <PatientTabs tabs={tabs} getCurrentTab={getCurrentTab} />
          </CCol>
        </CRow>

        {currentTab === 2 && (
          <CRow>
            <CCol md={12}>
              {/* <VitalsTab /> */}
              <MedicalProfile />
            </CCol>
          </CRow>
        )}
      </CContainer>
    </div>
  );
};

export default PatientDetailsView;

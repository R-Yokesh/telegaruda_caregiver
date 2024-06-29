import React, { useState } from "react";
import "./PatientDetailsView.css";
import PatentProfile from "../../../Components/Dashboard/PatentProfile/PatentProfile";
import { CCol, CContainer, CRow } from "@coreui/react";
import PatientTabs from "../../../Components/Dashboard/PatientTabs/PatientTabs";
import Breadcrumb from "../../../Components/Breadcrumb/Breadcrumb";
import VitalsTab from "../../../Components/Dashboard/PatientTabs/VitalsTab/VitalsTab";
import { Assets } from "../../../assets/Assets";
import MedicalProfile from "../../../Components/Dashboard/PatientTabs/MedicalProfileTab/MedicalProfile";
import PairTab from "../../../Components/Dashboard/PatientTabs/PairTab/PairTab";
import CallHistoryView from "../../CallHistory/CallHistoryView";

const PatientDetailsView = () => {
  const [currentTab, setCurrentTab] = useState(() => {
    // Initial state setup using localStorage
    const storedCount = localStorage.getItem("patiendDetailTab");
    const parsedData = storedCount && JSON.parse(storedCount);
    return storedCount ? parsedData?.id : 1;
  });
  const getCurrentTab = (data) => {
    setCurrentTab(data);
  };
  return (
    <div className="">
      {/* <CContainer> */}
      <CRow className="mb-2">
        <CCol md={12} xl={5} className="mb-2">
          <PatentProfile />
        </CCol>
        <CCol md={12} xl={7}>
          {/* tabs={tabs} */}
          <PatientTabs getCurrentTab={getCurrentTab} />
        </CCol>
      </CRow>
      {currentTab === 1 && <CallHistoryView />}

      {currentTab === 2 && (
        <CRow>
          <CCol md={12}>
            <MedicalProfile />
          </CCol>
        </CRow>
      )}
      {currentTab === 4 && (
        <CRow>
          <CCol md={12}>
            <PairTab />
          </CCol>
        </CRow>
      )}
      {/* </CContainer> */}
    </div>
  );
};

export default PatientDetailsView;

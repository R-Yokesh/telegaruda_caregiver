import React, { useEffect, useState } from "react";
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
import CallTab from "../../../Components/Dashboard/PatientTabs/CallTab/CallTab";
import { useLocation } from "react-router-dom";
import CameraControl from "../../../Components/Dashboard/PatientTabs/CameraControlTab/CameraControl";
import CommonCallButton from "../../../Components/Dashboard/PatientTabs/CallTab/CallButton/CommonCallButton";

const PatientDetailsView = () => {
  const [currentTab, setCurrentTab] = useState(() => {
    // Initial state setup using localStorage
    const storedCount = localStorage.getItem("patiendDetailTab");
    const storedFrom = localStorage.getItem("PatientMenu");
    const parsedData = storedCount && JSON.parse(storedCount);
    return storedCount
      ? parsedData?.id
      : storedFrom
      ? Number(storedFrom)
      : null;
  });
  const storedCallStatusData = localStorage.getItem("callStatus");
  const [callStart, setCallStart] = useState(
    storedCallStatusData ? storedCallStatusData : false
  );
  const getCurrentTab = (data) => {
    setCurrentTab(data);
  };
  useEffect(() => {
    setCallStart(storedCallStatusData);
  }, [storedCallStatusData, callStart]);
  return (
    <div className="">
      {/* <CContainer> */}
      <CRow className="d-flex justify-content-center">
        {currentTab !== 1 && (
          <CCol md={12} xl={5} className="mb-2 d-flex justify-content-center">
            {storedCallStatusData === "true" && <CommonCallButton />}
          </CCol>
        )}
      </CRow>
      <CRow className="mb-2 card-profile-sec">
        <CCol md={12} xl={5} className="mb-2">
          <PatentProfile />
        </CCol>
        <CCol md={12} xl={7}>
          {/* tabs={tabs} */}
          <PatientTabs getCurrentTab={getCurrentTab} />
        </CCol>
      </CRow>
      {!currentTab && <CallHistoryView />}

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
      {currentTab === 1 && (
        <CRow>
          <CCol md={12}>
            <CallTab />
          </CCol>
        </CRow>
      )}
      {currentTab === 3 && (
        <CRow>
          <CCol md={12}>
            <CameraControl />
          </CCol>
        </CRow>
      )}
      {/* </CContainer> */}
    </div>
  );
};

export default PatientDetailsView;

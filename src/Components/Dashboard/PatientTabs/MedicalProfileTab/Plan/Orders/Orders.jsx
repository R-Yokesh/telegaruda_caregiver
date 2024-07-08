import React, { useState } from "react";
import Breadcrumb from "../../../../../Breadcrumb/Breadcrumb";
import { CCol, CRow } from "@coreui/react";
import { Assets } from "../../../../../../assets/Assets";
import MedicalTab from "../../MedicalTab";
import LabOrder from "./Lab Order/LabOrder";
import ImagingOrder from "./Imaging Order/ImagingOrder";
import MedicationOrder from "./Medication Order/MedicationOrder";

const Orders = ({ onClose }) => {
  const tabs = [
    { id: 1, title: "Medication Order" },
    { id: 2, title: "Lab Order" },
    { id: 3, title: "Imaging Order" },
  ];
  const [currentTab, setCurrentTab] = useState(2);
  const getCurrentTab = (data) => {
    setCurrentTab(data);
  };
  console.log("first", currentTab);
  return (
    <>
      <CRow className="mb-0">
        <CCol md={4} className="mb-2">
          <div className="d-flex gap-2">
            <img
              alt="BackBtn"
              src={Assets.BackBtn}
              style={{ width: "35px" }}
              onClick={onClose}
              className="cursor"
            />
            <span className="Obj-name d-flex align-items-center">Orders</span>
          </div>
        </CCol>
        <CCol md={8} className="mb-2 d-flex justify-content-end">
          <div className="d-flex mt-2">
            <Breadcrumb
              paths={[
                { label: "Home", to: "/patients" },
                { label: "Patient List", to: "/patients" },
                { label: "Medical Profile", to: "/patients/history" },
                { label: "Orders", to: "/patients/history" },
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
            defaultTab={1}
          />
        </CCol>
      </CRow>
      <CRow className="mt-3">
        {currentTab === 1 && (
          <>
            <MedicationOrder />
          </>
        )}
        {currentTab === 2 && (
          <>
            <LabOrder />
          </>
        )}
        {currentTab === 3 && (
          <>
            <ImagingOrder />
          </>
        )}
      </CRow>
    </>
  );
};

export default Orders;

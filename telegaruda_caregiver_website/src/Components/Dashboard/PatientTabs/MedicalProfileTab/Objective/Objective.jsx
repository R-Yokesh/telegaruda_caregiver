import { CCol, CContainer, CRow } from "@coreui/react";
import React, { useState } from "react";
import { Assets } from "../../../../../assets/Assets";
import Card from "../../../../Cards/Card";
import Breadcrumb from "../../../../Breadcrumb/Breadcrumb";
import "./Objective.css";
import MedicalTab from "../MedicalTab";
import VitalsTab from "../../VitalsTab/VitalsTab";

const Objective = () => {
  const cardData = [
    { id: 1, name: "Vital Signs", image: Assets.VitalSig },
    { id: 2, name: "Physical Exam", image: Assets.PhyExam },
    { id: 3, name: "Lab", image: Assets.Lab },
    { id: 4, name: "Imaging", image: Assets.Imaging },
  ];
  const tabs = [
    { id: 1, title: "Primary Vitals" },
    { id: 2, title: "Metabolic And Biochemical Profile" },
    { id: 3, title: "Hematologic Profile" },
    { id: 4, title: "Renal and Metabolic Markers" },
  ];
  const [currentTab, setCurrentTab] = useState({
    id: 1,
    title: "Primary Vitals",
  });
  const [selectedData, setSelectedData] = useState();
  const [cardView, setCardView] = useState(false);

  const getSelectedData = (data) => {
    setSelectedData(data);
    if (data?.id === 1) {
      setCardView(true);
    }
  };
  const getCurrentTab = (data) => {
    setCurrentTab(data);
  };

  function findTitleById(id) {
    const titleObject = tabs?.find((title) => title.id === id);
    return titleObject ? titleObject?.title : "Primary Vitals"; // Return the title or a message if not found
  }

  const currentTabtitle = findTitleById(currentTab);
  return (
    <CContainer className="mt-3">
      {!cardView ? (
        <CRow>
          {cardData.map((dt, i) => (
            <CCol md={3} className="mb-3">
              <Card data={dt} getSelectedData={getSelectedData} />
            </CCol>
          ))}
        </CRow>
      ) : (
        <>
          <CRow className="mt-2">
            <CCol md={7} className="mb-3">
              <div className="d-flex gap-2">
                <div className="back-box" onClick={() => setCardView(false)}>
                  &#8592;
                </div>
                <span className="Obj-name">Vital Signs</span>
              </div>
            </CCol>
            <CCol md={5} className="mb-3">
              <Breadcrumb
                paths={[
                  { label: "Home", to: "/" },
                  { label: "Patient List", to: "/patient/details" },
                  { label: "Medical Profile", to: "/patient/details" },
                  { label: "Vital Signs", to: "/patient/details" },
                ]}
              />
            </CCol>
          </CRow>
          <CRow className="mt-2">
            <MedicalTab
              tabs={tabs}
              getCurrentTab={getCurrentTab}
              defaultTab={0}
            />
          </CRow>
          <CRow>
            <VitalsTab category={currentTabtitle} />
          </CRow>
        </>
      )}
    </CContainer>
  );
};

export default Objective;

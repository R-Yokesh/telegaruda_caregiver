import { CCol, CContainer, CRow } from "@coreui/react";
import React, { useState } from "react";
import { Assets } from "../../../../../assets/Assets";
import Card from "../../../../Cards/Card";
import Breadcrumb from "../../../../Breadcrumb/Breadcrumb";
import "./Objective.css";
import MedicalTab from "../MedicalTab";
import VitalsTab from "../../VitalsTab/VitalsTab";
import Modal from "../../../../Modal/Modal";
import ObjectiveDetailPage from "./DetailPage/ObjectiveDetailPage";

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
  const [cardSelectedData, setSelectedCardData] = useState();

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (data) => {
    setSelectedCardData(data);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <CContainer className="mt-3">
        {!cardView ? (
          <CRow>
            {cardData.map((dt, i) => (
              <CCol md={4} xl={3} className="mb-3">
                <Card data={dt} getSelectedData={getSelectedData} />
              </CCol>
            ))}
          </CRow>
        ) : (
          <>
            <CRow className="mt-4">
              <CCol md={6} className="mb-3">
                <div className="d-flex">
                  <div className="back-box" onClick={() => setCardView(false)}>
                    <img
                      alt="BackBtn"
                      src={Assets.BackBtn}
                      style={{ width: "60px" }}
                    />
                  </div>
                  <span className="Obj-name">Vital Signs</span>
                </div>
              </CCol>
              <CCol md={6} className="mb-3">
                <Breadcrumb
                  paths={[
                    { label: "Home", to: "/patients" },
                    { label: "Patient List", to: "/patients" },
                    { label: "Medical Profile", to: "/patients/history" },
                    { label: "Vital Signs", to: "/patients/history" },
                  ]}
                />
              </CCol>
            </CRow>
            <CRow>
              <MedicalTab
                tabs={tabs}
                getCurrentTab={getCurrentTab}
                defaultTab={0}
              />
            </CRow>
            <CRow>
              <VitalsTab category={currentTabtitle} openModal={openModal} />
            </CRow>
          </>
        )}
      </CContainer>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <CContainer className="p-0">
          <CRow>
            <CCol className="mb-3">
              <ObjectiveDetailPage data={cardSelectedData} />
            </CCol>
          </CRow>
        </CContainer>
      </Modal>
    </>
  );
};

export default Objective;

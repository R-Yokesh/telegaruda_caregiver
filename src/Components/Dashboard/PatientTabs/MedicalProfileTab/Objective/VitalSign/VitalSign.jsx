import React, { useState } from "react";
import VitalsTab from "../../../VitalsTab/VitalsTab";
import { CCol, CContainer, CRow } from "@coreui/react";
import { Assets } from "../../../../../../assets/Assets";
import Breadcrumb from "../../../../../Breadcrumb/Breadcrumb";
import MedicalTab from "../../MedicalTab";
import Modal from "../../../../../Modal/Modal";
import ObjectiveDetailPage from "../DetailPage/ObjectiveDetailPage";

const VitalSign = ({ setVitalView }) => {
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
  const getCurrentTab = (data) => {
    setCurrentTab(data);
  };
  function findTitleById(id) {
    const titleObject = tabs?.find((title) => title.id === id);
    return titleObject ? titleObject?.title : "Primary Vitals"; // Return the title or a message if not found
  }

  const currentTabtitle = findTitleById(currentTab);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cardSelectedData, setSelectedCardData] = useState();

  const openModal = (data) => {
    setSelectedCardData(data);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <CRow>
        <CCol md={6} className="mb-2">
          <div className="d-flex gap-2">
            <img
              alt="BackBtn"
              src={Assets.BackBtn}
              style={{ width: "35px" }}
              onClick={setVitalView}
              className="cursor"
            />
            <span className="Obj-name d-flex align-items-center">
              Vital Signs
            </span>
          </div>
        </CCol>
        <CCol md={6} className="mb-2 d-flex justify-content-end">
          <div className="d-flex mt-2">
            <Breadcrumb
              paths={[
                { label: "Home", to: "/patients" },
                { label: "Patient List", to: "/patients" },
                { label: "Medical Profile", to: "/patients/history" },
                { label: "Vital Signs", to: "/patients/history" },
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
            defaultTab={0}
          />
        </CCol>
      </CRow>
      <CRow>
        <CCol md={12}>
          <VitalsTab category={currentTabtitle} openModal={openModal} />
        </CCol>
      </CRow>

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

export default VitalSign;

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
import VitalSign from "./VitalSign/VitalSign";
import PhysicalExam from "./PhysicalExam/PhysicalExam";
import Lab from "./Lab/Lab";
import Imaging from "./Imaging/Imaging";

const Objective = () => {
  const cardData = [
    { id: 1, name: "Vital Signs", image: Assets.VitalSig },
    { id: 2, name: "Physical Exam", image: Assets.PhyExam },
    // { id: 3, name: "Lab", image: Assets.Lab },
    // { id: 4, name: "Imaging", image: Assets.Imaging },
  ];

  // const [selectedData, setSelectedData] = useState();
  const [vitalView, setVitalView] = useState(false);
  const [phyView, setPhyView] = useState(false);
  const [labView, setLabView] = useState(false);
  const [imagingView, setImagingView] = useState(false);

  const getSelectedData = (data) => {
    console.log("first data", data);
    // setSelectedData(data);
    if (data?.id === 1) {
      setVitalView(true);
    }
    if (data?.id === 2) {
      setPhyView(true);
    }
    if (data?.id === 3) {
      setLabView(true);
    }
    if (data?.id === 4) {
      setImagingView(true);
    }
  };

  return (
    <>
      <div className="mt-3">
        {!vitalView && !phyView && !labView && !imagingView ? (
          <CRow>
            {cardData.map((dt, i) => (
              <CCol md={4} xl={3} className="mb-3">
                <Card data={dt} getSelectedData={getSelectedData} />
              </CCol>
            ))}
          </CRow>
        ) : vitalView ? (
          <VitalSign setVitalView={() => setVitalView(false)} />
        ) : phyView ? (
          <PhysicalExam onClose={() => setPhyView(false)} />
        ) : labView ? (
          <Lab onClose={() => setLabView(false)} />
        ) : imagingView ? (
          <Imaging onClose={() => setImagingView(false)} />
        ) : null}
      </div>
    </>
  );
};

export default Objective;

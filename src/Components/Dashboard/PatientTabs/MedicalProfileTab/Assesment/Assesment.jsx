import React, { useState } from "react";
import { Assets } from "../../../../../assets/Assets";
import { CCol, CRow } from "@coreui/react";
import Card from "../../../../Cards/Card";

const Assesment = () => {
  const cardData = [
    { id: 1, name: "Vital Signs", image: Assets.VitalSig },
    { id: 2, name: "Physical Exam", image: Assets.PhyExam },
    { id: 3, name: "Lab", image: Assets.Lab },
    { id: 4, name: "Imaging", image: Assets.Imaging },
  ];
  const [vitalView, setVitalView] = useState(false);

  const getSelectedData = (data) => {
    console.log("first data", data);
    // setSelectedData(data);
    if (data?.id === 1) {
      setVitalView(true);
    }
  };
  return (
    <div className="mt-3">
      <CRow>
        {cardData.map((dt, i) => (
          <CCol md={4} xl={3} className="mb-3">
            <Card data={dt} getSelectedData={getSelectedData} />
          </CCol>
        ))}
      </CRow>
    </div>
  );
};

export default Assesment;

import React, { useState } from "react";
import { Assets } from "../../../../../assets/Assets";
import { CCol, CRow } from "@coreui/react";
import Card from "../../../../Cards/Card";
import Diagnosis from "./Diagnosis/Diagnosis";
import Immunization from "./Immunization/Immunization";
import AssessmentTool from "./AssessmentTool/AssessmentTool";

const Assesment = () => {
  const cardData = [
    { id: 1, name: "Diagnosis (Including ICD)", image: Assets.Diagnosis },
    { id: 2, name: "Immunization Status", image: Assets.Immunizaion },
    { id: 3, name: "Assessment Tool", image: Assets.AssesmentTool },
  ];
  const [diagnosisView, setDiagnosisView] = useState(false);
  const [immunizationView, setImmunizationView] = useState(false);
  const [assessmentView, setAssessmentView] = useState(false);

  const getSelectedData = (data) => {
    console.log("first data", data);
    // setSelectedData(data);
    if (data?.id === 1) {
      setDiagnosisView(true);
    }
    if (data?.id === 2) {
      setImmunizationView(true);
    }
    if (data?.id === 3) {
      setAssessmentView(true);
    }
  };
  return (
    <div className="mt-3">
      {!diagnosisView && !immunizationView && !assessmentView ? (
        <CRow>
          {cardData.map((dt, i) => (
            <CCol md={4} xl={3} className="mb-3">
              <Card data={dt} getSelectedData={getSelectedData} />
            </CCol>
          ))}
        </CRow>
      ) : diagnosisView ? (
        <Diagnosis onClose={() => setDiagnosisView(false)} />
      ) : immunizationView ? (
        <Immunization onClose={() => setImmunizationView(false)} />
      ) : assessmentView ? (
        <AssessmentTool onClose={() => setAssessmentView(false)} />
      ) : null}
    </div>
  );
};

export default Assesment;

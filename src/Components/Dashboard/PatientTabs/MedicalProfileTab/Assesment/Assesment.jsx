import React, { useState } from "react";
import { Assets } from "../../../../../assets/Assets";
import { CCol, CRow } from "@coreui/react";
import Card from "../../../../Cards/Card";
import Diagnosis from "./Diagnosis/Diagnosis";
import Immunization from "./Immunization/Immunization";
import AssessmentTool from "./AssessmentTool/AssessmentTool";
import { useNavigate } from "react-router-dom";

const Assesment = () => {
  const cardData = [
    { id: 1, name: "Diagnosis (Including ICD)", image: Assets.Diagnosis },
    { id: 2, name: "Immunization Status", image: Assets.Immunizaion },
    { id: 3, name: "Assessment Tool", image: Assets.AssesmentTool },
  ];
  const navigate = useNavigate();
  const PatientSubMenu2 = localStorage.getItem("PatientSubMenu-2");
  const ParsedPatientSubMenu = PatientSubMenu2
    ? JSON.parse(PatientSubMenu2)
    : 0;
  const GoTOConsultPage = localStorage.getItem("PatientConsultTab");
  const parsedConsult = GoTOConsultPage ? JSON.parse(GoTOConsultPage) : false;

  const [diagnosisView, setDiagnosisView] = useState(
    ParsedPatientSubMenu === 1 ? true : false
  );
  const [immunizationView, setImmunizationView] = useState(
    ParsedPatientSubMenu === 2 ? true : false
  );
  const [assessmentView, setAssessmentView] = useState(
    ParsedPatientSubMenu === 3 ? true : false
  );

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
            <CCol md={4} xl={3} className="mb-3 d-flex">
              <Card data={dt} getSelectedData={getSelectedData} />
            </CCol>
          ))}
        </CRow>
      ) : diagnosisView ? (
        <Diagnosis
          onClose={() => {
            if (parsedConsult) {
              navigate(-1);
              setDiagnosisView(false);
              localStorage.setItem("PatientConsultTab", JSON.stringify(false));
            } else {
              setDiagnosisView(false);
            }
          }}
        />
      ) : immunizationView ? (
        <Immunization
          onClose={() => {
            if (parsedConsult) {
              navigate(-1);
              setImmunizationView(false);
              localStorage.setItem("PatientConsultTab", JSON.stringify(false));
            } else {
              setImmunizationView(false);
            }
          }}
        />
      ) : assessmentView ? (
        <AssessmentTool
          onClose={() => {
            if (parsedConsult) {
              navigate(-1);
              setAssessmentView(false);
              localStorage.setItem("PatientConsultTab", JSON.stringify(false));
            } else {
              setAssessmentView(false);
            }
          }}
        />
      ) : null}
    </div>
  );
};

export default Assesment;

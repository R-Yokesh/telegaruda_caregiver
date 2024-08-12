import { CCol, CContainer, CRow } from "@coreui/react";
import React, { useState } from "react";
import { Assets } from "../../../../../assets/Assets";
import Card from "../../../../Cards/Card";
import Breadcrumb from "../../../../Breadcrumb/Breadcrumb";
import "../Objective/Objective.css";
import Table from "../../../../Tables/Table";
import ChiefComplaints from "./Chief Complaints/ChiefComplaints";
import PresentIllness from "./Present Illness/PresentIllness";
import History from "./History/History";
import WellnessProfile from "./WellnessProfile/WellnessProfile";
import Ros from "./Ros/Ros";
import { useNavigate } from "react-router-dom";

const Subjective = () => {
  const cardData = [
    { id: 1, name: "Chief Complaints", image: Assets.VitalSig },
    { id: 2, name: "History of Present Illness (HPI)", image: Assets.PhyExam },
    { id: 3, name: "History", image: Assets.History },
    { id: 4, name: "Wellness Profile", image: Assets.WellnessProfile },
    { id: 5, name: "Review of Systems (ROS)", image: Assets.ReviewSytm },
  ];
  const navigate = useNavigate();
  const PatientSubMenu2 = localStorage.getItem("PatientSubMenu-2");
  const ParsedPatientSubMenu = PatientSubMenu2
    ? JSON.parse(PatientSubMenu2)
    : 0;
  const GoTOConsultPage = localStorage.getItem("PatientConsultTab");
  const parsedConsult = GoTOConsultPage ? JSON.parse(GoTOConsultPage) : false;
 
  const [selectedData, setSelectedData] = useState();
  const [cardView, setCardView] = useState(
    ParsedPatientSubMenu === 1 ? true : false
  );
  const [presentIll, setPresentIll] = useState(
    ParsedPatientSubMenu === 2 ? true : false
  );
  const [historyView, setHistoryView] = useState(
    ParsedPatientSubMenu === 3 ? true : false
  );
  const [wellnessView, setWellnessView] = useState(
    ParsedPatientSubMenu === 4 ? true : false
  );
  const [rosView, setRosView] = useState(
    ParsedPatientSubMenu === 5 ? true : false
  );

  const getSelectedData = (data) => {
    setSelectedData(data);
    if (data?.id === 1) {
      setCardView(true);
    }
    if (data?.id === 2) {
      setPresentIll(true);
    }
    if (data?.id === 3) {
      setHistoryView(true);
    }
    if (data?.id === 4) {
      setWellnessView(true);
    }
    if (data?.id === 5) {
      setRosView(true);
    }
  };

  return (
    <>
      <div className="mt-3">
        {!cardView &&
        !presentIll &&
        !historyView &&
        !wellnessView &&
        !rosView ? (
          <CRow>
            {cardData.map((dt, i) => (
              <CCol md={4} xl={3} className="mb-3">
                <Card
                  className="min-height-200"
                  data={dt}
                  getSelectedData={getSelectedData}
                />
              </CCol>
            ))}
          </CRow>
        ) : cardView ? (
          <>
            <ChiefComplaints
              OnClose={() => {
                if (parsedConsult) {
                  navigate(-1);
                  setCardView(false);
                  localStorage.setItem(
                    "PatientConsultTab",
                    JSON.stringify(false)
                  );
                } else {
                  setCardView(false);
                }
              }}
            />
          </>
        ) : presentIll ? (
          <>
            <PresentIllness
              OnClose={() => {
                if (parsedConsult) {
                  navigate(-1);
                  setPresentIll(false);
                  localStorage.setItem(
                    "PatientConsultTab",
                    JSON.stringify(false)
                  );
                } else {
                  setPresentIll(false);
                }
              }}
            />
          </>
        ) : historyView ? (
          <>
            <History
              OnClose={() => {
                if (parsedConsult) {
                  navigate(-1);
                  setHistoryView(false);
                  localStorage.setItem(
                    "PatientConsultTab",
                    JSON.stringify(false)
                  );
                } else {
                  setHistoryView(false);
                }
              }}
            />
          </>
        ) : wellnessView ? (
          <>
            <WellnessProfile
              OnClose={() => {
                if (parsedConsult) {
                  navigate(-1);
                  setWellnessView(false);
                  localStorage.setItem(
                    "PatientConsultTab",
                    JSON.stringify(false)
                  );
                } else {
                  setWellnessView(false);
                }
              }}
            />
          </>
        ) : rosView ? (
          <>
            <Ros
              onClose={() => {
                if (parsedConsult) {
                  navigate(-1);
                  setRosView(false);
                  localStorage.setItem(
                    "PatientConsultTab",
                    JSON.stringify(false)
                  );
                } else {
                  setRosView(false);
                }
              }}
            />
          </>
        ) : null}
      </div>
    </>
  );
};

export default Subjective;

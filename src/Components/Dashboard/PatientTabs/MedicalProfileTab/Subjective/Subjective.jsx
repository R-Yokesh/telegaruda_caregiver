import { CCol, CContainer, CRow } from "@coreui/react";
import React, { useState } from "react";
import { Assets } from "../../../../../assets/Assets";
import Card from "../../../../Cards/Card";
import Breadcrumb from "../../../../Breadcrumb/Breadcrumb";
import "../Objective/Objective.css";
import Table from "../../../../Tables/Table";
import ChiefComplaints from "./Chief Complaints/ChiefComplaints";
import PresentIllness from "./Present Illness/PresentIllness";

const Subjective = () => {
  const cardData = [
    { id: 1, name: "Chief Complaints", image: Assets.VitalSig },
    { id: 2, name: "History of Present Illness (HPI)", image: Assets.PhyExam },
    { id: 3, name: "History", image: Assets.History },
    { id: 4, name: "Wellness Profile", image: Assets.WellnessProfile },
    { id: 5, name: "Review of Systems (ROS)", image: Assets.ReviewSytm },
    { id: 6, name: "Assessment Tool", image: Assets.AssesmentTool },
  ];

  const [selectedData, setSelectedData] = useState();
  const [cardView, setCardView] = useState(false);
  const [presentIll, setPresentIll] = useState(false);

  const getSelectedData = (data) => {
    setSelectedData(data);
    if (data?.id === 1) {
      setCardView(true);
    }
    if (data?.id === 2) {
      setPresentIll(true);
    }
  };

  return (
    <>
      <CContainer className="mt-3">
        {!cardView && !presentIll ? (
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
            <ChiefComplaints OnClose={() => setCardView(false)} />
          </>
        ) : presentIll ? (
          <>
            <PresentIllness OnClose={() => setPresentIll(false)} />
          </>
        ) : null}
      </CContainer>
    </>
  );
};

export default Subjective;

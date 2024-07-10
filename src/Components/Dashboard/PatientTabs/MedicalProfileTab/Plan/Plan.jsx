import React, { useState } from "react";
import { Assets } from "../../../../../assets/Assets";
import { CCol, CRow } from "@coreui/react";
import Card from "../../../../Cards/Card";
import Orders from "./Orders/Orders";
import Cpt from "./Procedure CPT/Cpt";

const Plan = () => {
  const cardData = [
    { id: 1, name: "Orders", image: Assets.Orders },
    { id: 2, name: "Therapies", image: Assets.Therapies },
    { id: 3, name: "Vaccinations", image: Assets.Vaccine },
    { id: 4, name: "Procedure (CPT Code)", image: Assets.CPT },
    { id: 5, name: "Patient Education", image: Assets.PatEdu },
  ];
  const [ordersView, setOrdersView] = useState(false);
  const [cptView, setCptView] = useState(false);

  const getSelectedData = (data) => {
    // setSelectedData(data);
    if (data?.id === 1) {
      setOrdersView(true);
    }
    if (data?.id === 4) {
      setCptView(true);
    }
  };
  return (
    <div className="mt-3">
      {!ordersView && !cptView ? (
        <CRow>
          {cardData.map((dt, i) => (
            <CCol md={4} xl={3} className="mb-3">
              <Card data={dt} getSelectedData={getSelectedData} />
            </CCol>
          ))}
        </CRow>
      ) : ordersView ? (
        <Orders onClose={() => setOrdersView(false)} />
      ) : cptView ? (
        <Cpt onClose={() => setCptView(false)} />
      ) : null}
    </div>
  );
};

export default Plan;

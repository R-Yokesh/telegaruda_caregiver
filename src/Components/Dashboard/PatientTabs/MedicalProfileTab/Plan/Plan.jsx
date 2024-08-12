import React, { useState } from "react";
import { Assets } from "../../../../../assets/Assets";
import { CCol, CRow } from "@coreui/react";
import Card from "../../../../Cards/Card";
import Orders from "./Orders/Orders";
import Cpt from "./Procedure CPT/Cpt";
import Therapies from "./Therapies/Therapies";
import PatientEducation from "./PatientEducation/PatientEducation";
import NextAppointment from "./NextAppointment/NextAppointment";

const Plan = () => {
  const cardData = [
    { id: 1, name: "Orders", image: Assets.Orders },
    { id: 2, name: "Therapies", image: Assets.Therapies },
    { id: 3, name: "Vaccinations", image: Assets.Vaccine },
    { id: 4, name: "Procedure (CPT Code)", image: Assets.CPT },
    { id: 5, name: "Patient Education", image: Assets.PatEdu },
    { id: 6, name: "Next Appointment", image: Assets.PatEdu },
  ];
  const [ordersView, setOrdersView] = useState(false);
  const [cptView, setCptView] = useState(false);
  const [therapiesView, setTherapiesView] = useState(false);
  const [patientView, setPatientView] = useState(false);
  const [appointView, setAppointmentView] = useState(false);

  const getSelectedData = (data) => {
    // setSelectedData(data);
    if (data?.id === 1) {
      setOrdersView(true);
    }
    if (data?.id === 2) {
      setTherapiesView(true);
    }
    if (data?.id === 4) {
      setCptView(true);
    }
    if (data?.id === 5) {
      setPatientView(true);
    }
    if (data?.id === 6) {
      setAppointmentView(true);
    }
  };
  return (
    <div className="mt-3">
      {!ordersView && !cptView && !therapiesView && !patientView  && !appointView ? (
        <CRow>
          {cardData.map((dt, i) => (
            <CCol md={4} xl={3} className="mb-3">
              <Card data={dt} getSelectedData={getSelectedData} />
            </CCol>
          ))}
        </CRow>
      ) : ordersView ? (
        <Orders onClose={() => setOrdersView(false)} />
      )  : therapiesView ? (
        <Therapies onClose={() => setTherapiesView(false)} />
     ) : cptView ? (
        <Cpt onClose={() => setCptView(false)} />
      ) : patientView ? (
      <PatientEducation onClose={() => setPatientView(false)} />
     ) : appointView ? (
      <NextAppointment onClose={() => setAppointmentView(false)} />
     )  : null}
    
      
      
    </div>
  );
};

export default Plan;

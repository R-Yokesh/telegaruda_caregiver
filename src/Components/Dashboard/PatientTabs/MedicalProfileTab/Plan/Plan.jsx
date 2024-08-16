import React, { useState } from "react";
import { Assets } from "../../../../../assets/Assets";
import { CCol, CRow } from "@coreui/react";
import Card from "../../../../Cards/Card";
import Orders from "./Orders/Orders";
import Cpt from "./Procedure CPT/Cpt";
import Therapies from "./Therapies/Therapies";
import PatientEducation from "./PatientEducation/PatientEducation";
import NextAppointment from "./NextAppointment/NextAppointment";
import { useNavigate } from "react-router-dom";

const Plan = () => {
  const cardData = [
    { id: 1, name: "Orders", image: Assets.Orders },
    { id: 2, name: "Therapies", image: Assets.Therapies },
    { id: 3, name: "Vaccinations", image: Assets.Vaccine },
    { id: 4, name: "Procedure (CPT Code)", image: Assets.CPT },
    { id: 5, name: "Patient Education", image: Assets.PatEdu },
    { id: 6, name: "Next Appointment", image: Assets.History },
  ];
  const navigate = useNavigate();
  const PatientSubMenu2 = localStorage.getItem("PatientSubMenu-2");
  const ParsedPatientSubMenu = PatientSubMenu2
    ? JSON.parse(PatientSubMenu2)
    : 0;
  const GoTOConsultPage = localStorage.getItem("PatientConsultTab");
  const parsedConsult = GoTOConsultPage ? JSON.parse(GoTOConsultPage) : false;
  const [ordersView, setOrdersView] = useState(
    ParsedPatientSubMenu === 1 ? true : false
  );
  const [cptView, setCptView] = useState(
    ParsedPatientSubMenu === 1 ? true : false
  );
  const [therapiesView, setTherapiesView] = useState(
    ParsedPatientSubMenu === 2 ? true : false
  );
  const [patientView, setPatientView] = useState(
    ParsedPatientSubMenu === 4 ? true : false
  );
  const [appointView, setAppointmentView] = useState(
    ParsedPatientSubMenu === 5 ? true : false
  );

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
      {!ordersView &&
      !cptView &&
      !therapiesView &&
      !patientView &&
      !appointView ? (
        <CRow>
          {cardData.map((dt, i) => (
            <CCol md={4} xl={3} className="mb-3">
              <Card data={dt} getSelectedData={getSelectedData} />
            </CCol>
          ))}
        </CRow>
      ) : ordersView ? (
        <Orders
          onClose={() => {
            if (parsedConsult) {
              navigate(-1);
              setOrdersView(false);
              localStorage.setItem("PatientConsultTab", JSON.stringify(false));
            } else {
              setOrdersView(false);
            }
          }}
        />
      ) : therapiesView ? (
        <Therapies
          onClose={() => {
            if (parsedConsult) {
              navigate(-1);
              setTherapiesView(false);
              localStorage.setItem("PatientConsultTab", JSON.stringify(false));
            } else {
              setTherapiesView(false);
            }
          }}
        />
      ) : cptView ? (
        <Cpt
          onClose={() => {
            if (parsedConsult) {
              navigate(-1);
              setCptView(false);
              localStorage.setItem("PatientConsultTab", JSON.stringify(false));
            } else {
              setCptView(false);
            }
          }}
        />
      ) : patientView ? (
        <PatientEducation
          onClose={() => {
            if (parsedConsult) {
              navigate(-1);
              setPatientView(false);
              localStorage.setItem("PatientConsultTab", JSON.stringify(false));
            } else {
              setPatientView(false);
            }
          }}
        />
      ) : appointView ? (
        <NextAppointment
          onClose={() => {
            if (parsedConsult) {
              navigate(-1);
              setAppointmentView(false);
              localStorage.setItem("PatientConsultTab", JSON.stringify(false));
            } else {
              setAppointmentView(false);
            }
          }}
        />
      ) : null}
    </div>
  );
};

export default Plan;

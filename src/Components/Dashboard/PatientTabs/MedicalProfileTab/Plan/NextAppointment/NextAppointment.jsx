import React from "react";
import Breadcrumb from "../../../../../Breadcrumb/Breadcrumb";
import { CCol, CRow } from "@coreui/react";
import { Assets } from "../../../../../../assets/Assets";
import PatientEducationTab from "./NextAppointmentTab/NextAppointmentTab";

const NextAppointment = ({ onClose, from }) => {
  return (
    <>
      <CRow className="mb-0">
        {from !== "Consult" && (
          <>
            <CCol md={4} className="">
              <div className="d-flex gap-2">
                <img
                  alt="BackBtn"
                  src={Assets.BackBtn}
                  style={{ width: "35px" }}
                  onClick={onClose}
                  className="cursor"
                />
                <span className="Obj-name d-flex align-items-center">
                  Next Appointment
                </span>
              </div>
            </CCol>
            <CCol md={8} className=" d-flex justify-content-end">
              <div className="d-flex mt-2">
                <Breadcrumb
                  paths={[
                    { label: "Home", to: "/patients" },
                    { label: "Patient List", to: "/patients" },
                    { label: "Medical Profile", to: "/patients/history" },
                    { label: "Next Appointment", to: "/patients/history" },
                  ]}
                />
              </div>
            </CCol>
          </>
        )}
        <CCol>
          <PatientEducationTab from={from} />
        </CCol>
      </CRow>
    </>
  );
};

export default NextAppointment;

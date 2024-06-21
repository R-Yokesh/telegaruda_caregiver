import { CBadge, CCard, CCardBody, CCol, CRow } from "@coreui/react";
import React from "react";
import Breadcrumb from "../../../Breadcrumb/Breadcrumb";
import "./VitalsTab.css";
import { Assets } from "../../../../assets/Assets";

const VitalsTab = () => {
  const data = [
    {
      id: 1,
      icon: Assets.VitalBP,
      name: "Blood Pressure",
      date: "Recently Added 27-03-2024",
      badge: [
        { label: "SYS : 112", color: "success" },
        { label: "DIA : 71", color: "success" },
        { label: "Pulse : 89", color: "success" },
      ],
    },
    {
      id: 2,
      icon: Assets.VitalBs,
      name: "Blood Sugar",
      date: "Recently Added 27-03-2024",
      badge: [{ label: "110 mg/DL", color: "success" }],
    },
    {
      id: 3,
      icon: Assets.VitalBMI,
      name: "BMI",
      date: "Recently Added 27-03-2024",
      badge: [{ label: "24.13", color: "success" }],
    },
    {
      id: 4,
      icon: Assets.VitalHCT,
      name: "HCT",
      date: "Recently Added 27-03-2024",
      badge: [{ label: "23", color: "danger" }],
    },
    {
      id: 5,
      icon: Assets.VitalHBeat,
      name: "Heart Rate",
      date: "Recently Added 27-03-2024",
      badge: [{ label: "1 Bpm", color: "primary" }],
    },
    {
      id: 6,
      icon: Assets.VitalHae,
      name: "Haemoglobin",
      date: "Recently Added 27-03-2024",
      badge: [{ label: "1212", color: "danger" }],
    },
    {
      id: 7,
      icon: Assets.VitalKetone,
      name: "Ketone",
      date: "Recently Added 27-03-2024",
      badge: [{ label: "121", color: "danger" }],
    },
    {
      id: 8,
      icon: Assets.VitalLipid,
      name: "Lipid Profile",
      date: "Recently Added 27-03-2024",
      badge: [
        { label: "LDL: Optimal", color: "success" },
        { label: "MDL: High", color: "danger" },
        { label: "VLDL: High", color: "danger" },
        { label: "TG: Optimal", color: "danger" },
        { label: "Total: Optimal", color: "success" },
      ],
    },
    {
      id: 9,
      icon: Assets.VitalRespi,
      name: "Respiration Rate",
      date: "Recently Added 27-03-2024",
      badge: [{ label: "44", color: "danger" }],
    },
  ];
  return (
    <>
      <CRow className="mb-1">
        <CCol md={12}>
          <Breadcrumb
            paths={[
              { label: "Patient", to: "/patient" },
              { label: "Vitals", to: "/patient/details" },
            ]}
          />
        </CCol>
        <CCol md={12}>
          <span className="vitals-title">VITALS</span>
          <CRow className="mt-3 ">
            {data.map((item, index) => (
              <CCol md={4} key={index} className="mb-3">
                <CCard className="vital-cards">
                  <CCardBody>
                    <div className="vital-icon-and-title">
                      <div>
                        <img alt="bp" src={item.icon} />
                      </div>
                      <div className="vital-card-title">
                        <span className="vital-card-text-bold">
                          {item.name}
                        </span>
                        <span className="vital-card-text">{item.date}</span>
                      </div>
                    </div>
                    <div className="vital-badge">
                      <div className="vital-badge-list">
                        {item.badge.map((dt, i) => (
                          <CBadge color={dt.color} key={i}>
                            {dt.label}
                          </CBadge>
                        ))}
                      </div>
                    </div>
                    <div className="vital-line-container">
                      <img alt="line" src={Assets.Vitalline} />
                    </div>
                  </CCardBody>
                </CCard>
              </CCol>
            ))}
          </CRow>
        </CCol>
      </CRow>
    </>
  );
};

export default VitalsTab;

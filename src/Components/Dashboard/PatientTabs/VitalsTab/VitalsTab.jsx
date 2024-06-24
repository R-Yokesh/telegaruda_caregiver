import { CBadge, CCard, CCardBody, CCol, CRow } from "@coreui/react";
import React from "react";
import "./VitalsTab.css";
import { Assets } from "../../../../assets/Assets";
import Badge from "../../../Badge/Badge";

const VitalsTab = ({ category, openModal }) => {
  const data = [
    {
      id: 1,
      icon: Assets.VitalBP,
      name: "Blood Pressure",
      date: "Recently Added 27-03-2024",
      category: "Primary Vitals",
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
      category: "Metabolic And Biochemical Profile",
      date: "Recently Added 27-03-2024",
      badge: [{ label: "110 mg/DL", color: "success" }],
    },
    {
      id: 3,
      icon: Assets.VitalBMI,
      name: "BMI",
      category: "Primary Vitals",
      date: "Recently Added 27-03-2024",
      badge: [{ label: "24.13", color: "success" }],
    },
    {
      id: 4,
      icon: Assets.VitalHCT,
      name: "HCT",
      category: "Hematologic Profile",
      date: "Recently Added 27-03-2024",
      badge: [{ label: "23", color: "error" }],
    },
    {
      id: 5,
      icon: Assets.VitalHBeat,
      name: "Heart Rate",
      category: "Primary Vitals",
      date: "Recently Added 27-03-2024",
      badge: [{ label: "1 Bpm", color: "success" }],
    },
    {
      id: 6,
      icon: Assets.VitalHae,
      name: "Haemoglobin",
      category: "Hematologic Profile",
      date: "Recently Added 27-03-2024",
      badge: [{ label: "1212", color: "error" }],
    },
    {
      id: 7,
      icon: Assets.VitalKetone,
      name: "Blood Ketone",
      category: "Hematologic Profile",
      date: "Recently Added 27-03-2024",
      badge: [{ label: "121", color: "error" }],
    },
    {
      id: 8,
      icon: Assets.VitalLipid,
      name: "Lipid Profile",
      category: "Metabolic And Biochemical Profile",
      date: "Recently Added 27-03-2024",
      badge: [
        { label: "LDL: Optimal", color: "success" },
        { label: "MDL: High", color: "error" },
        { label: "VLDL: High", color: "error" },
        { label: "TG: Optimal", color: "error" },
        { label: "Total: Optimal", color: "success" },
      ],
    },
    {
      id: 9,
      icon: Assets.VitalRespi,
      name: "Respiration Rate",
      category: "Primary Vitals",
      date: "Recently Added 27-03-2024",
      badge: [{ label: "44", color: "error" }],
    },
    {
      id: 10,
      icon: Assets.VitalBMI,
      name: "Sp02",
      category: "Primary Vitals",
      date: "Recently Added 27-03-2024",
      badge: [{ label: "92%", color: "success" }],
    },
    {
      id: 11,
      icon: Assets.VitalBMI,
      name: "Temperature",
      category: "Primary Vitals",
      date: "Recently Added 27-03-2024",
      badge: [{ label: "36.6*C", color: "success" }],
    },
    {
      id: 12,
      icon: Assets.VitalLipid,
      name: "Lung Function Test (LFT)",
      date: "Recently Added 27-03-2024",
      category: "Primary Vitals",
      badge: [
        { label: "FEV1: 1L", color: "error" },
        { label: "FVC: 1L", color: "error" },
        { label: "FEV1/FVC: 40", color: "error" },
        { label: "PEF: 1L/min", color: "error" },
      ],
    },
    {
      id: 13,
      icon: Assets.VitalHCT,
      name: "Blood Uric Acid",
      category: "Hematologic Profile",
      date: "Recently Added 27-03-2024",
      badge: [{ label: "6mg/dl", color: "error" }],
    },
    {
      id: 14,
      icon: Assets.VitalBMI,
      name: "Urinalysis",
      category: "Renal and Metabolic Markers",
      date: "Recently Added 27-03-2024",
      badge: [{ label: "100pmol/d", color: "error" }],
    },
    {
      id: 15,
      icon: Assets.VitalLipid,
      name: "Urea",
      date: "Recently Added 27-03-2024",
      category: "Renal and Metabolic Markers",
      badge: [{ label: "20mg/dl", color: "error" }],
    },
    {
      id: 16,
      icon: Assets.VitalHCT,
      name: "Creatinine",
      category: "Renal and Metabolic Markers",
      date: "Recently Added 27-03-2024",
      badge: [{ label: "85pmol/L", color: "error" }],
    },
    {
      id: 17,
      icon: Assets.VitalHCT,
      name: "GFR",
      category: "Renal and Metabolic Markers",
      date: "Recently Added 27-03-2024",
      badge: [{ label: "90ml/min", color: "error" }],
    },
  ];

  const filteredProducts = data.filter(
    (product) => product.category === category
  );
  return (
    <>
      <CRow className="mb-1">
        {/* <CCol md={12}>
          <Breadcrumb
            paths={[
              { label: "Patient", to: "/patient" },
              { label: "Vitals", to: "/patient/details" },
            ]}
          />
        </CCol> */}
        <CCol md={12}>
          {/* <span className="vitals-title">VITALS</span> */}
          <CRow className="mt-3 ">
            {filteredProducts?.map((item, index) => (
              <CCol md={6} xl={4} key={index} className="mb-3">
                <CCard className="vital-cards" onClick={() => openModal(item)}>
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
                          // <CBadge color={dt.color} key={i}>
                          //   {dt.label}
                          // </CBadge>
                          <Badge label={dt?.label} color={dt?.color} />
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
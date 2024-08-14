import { CBadge, CCard, CCardBody, CCol, CRow } from "@coreui/react";
import React from "react";
import "./VitalsTab.css";
import { Assets } from "../../../../assets/Assets";
import Badge from "../../../Badge/Badge";
import CardChart from "../../../Charts/CardChart";

const VitalsTab = ({ category, openModal }) => {
  console.log("category", category);
  const data = [
    {
      id: 1,
      icon: Assets.VitalBP,
      name: "Blood Pressure",
      date: "Recently Added 27-03-2024",
      category: "Primary Vitals",
      badge: [
        { label: "120/80 mm Hg", color: "success" },
        // { label: "DIA : 71", color: "success" },
        // { label: "Pulse : 89", color: "success" },
      ],
      columnsData: [
        { id: 1, label: "NO." },
        { id: 2, label: "RESULT" },
        { id: 3, label: "SYSTOLIC" },
        { id: 4, label: "DIASTOLIC" },
        { id: 5, label: "PULSE (IN BPM)" },
        { id: 6, label: "DATE" },
        { id: 7, label: "ACTION" },
      ],
      tableData: [
        {
          "no.": 1,
          result: { status: "success", name: "Normal" },
          systolic: "112",
          diastolic: "25",
          "pulse_(in_bpm)": "89",
          chartLabel1: "PULSE (IN BPM)",
          date: "02-04-2024 12:13",
          action: [{ type: "warning" }],
          name: "Blood Pressure",
        },
        {
          "no.": 2,
          result: {
            status: "error",
            name: "High Blood Pressure (Hypertension) Stage 1",
          },
          systolic: "112",
          diastolic: "25",
          "pulse_(in_bpm)": "125",
          date: "05-04-2024 13:15",
          action: [{ type: "warning" }],
          name: "Blood Pressure",
        },
      ],
      chartLabel1: "PULSE (IN BPM)",
    },
    {
      id: 2,
      icon: Assets.VitalBs,
      name: "Blood Sugar",
      category: "Metabolic And Biochemical Profile",
      date: "Recently Added 27-03-2024",
      badge: [{ label: "110 mg/DL", color: "success" }],
      chartLabel1: "Blood Sugar (mg/DL)",
      columnsData: [
        { id: 1, label: "NO." },
        { id: 2, label: "RESULT" },
        { id: 3, label: "Blood Sugar" },
        { id: 4, label: "Type" },
        { id: 5, label: "DATE" },
        { id: 6, label: "ACTION" },
      ],
      tableData: [
        {
          "no.": 1,
          result: { status: "success", name: "Normal" },
          blood_sugar: "110 mg/dL",
          blood_sugar_value: "110",
          type: "Random",
          date: "06-24-2024 10:15",
          action: [{ type: "warning" }],
          name: "Blood Sugar",
        },
        {
          "no.": 2,
          result: {
            status: "success",
            name: "Normal",
          },
          blood_sugar: "110 mg/dL",
          blood_sugar_value: "110",
          type: "Random",
          date: "05-24-2024 10:15",
          action: [{ type: "edit" }, { type: "delete" }],
          name: "Blood Sugar",
        },
      ],
    },
    {
      id: 3,
      icon: Assets.VitalBMI,
      name: "BMI",
      category: "Primary Vitals",
      date: "Recently Added 27-03-2024",
      badge: [{ label: "24.5 kg/m²", color: "success" }],
      chartLabel1: "BMI (kg/m²)",
      columnsData: [
        { id: 1, label: "NO." },
        { id: 2, label: "RESULT" },
        { id: 3, label: "BMI" },
        { id: 4, label: "Height" },
        { id: 5, label: "Weight" },
        { id: 6, label: "DATE" },
        { id: 7, label: "ACTION" },
      ],
      tableData: [
        {
          "no.": 1,
          result: { status: "success", name: "Normal" },
          bmi: "24.13",
          height: "159cm",
          weight: "61kg",
          date: "06-24-2024 10:15",
          action: [{ type: "warning" }],
          name: "BMI",
        },
        {
          "no.": 2,
          result: {
            status: "error",
            name: "Overweight",
          },
          bmi: "27.01",
          height: "180cm",
          weight: "87.5kg",
          date: "05-24-2024 10:15",
          action: [{ type: "edit" }, { type: "delete" }],
          name: "BMI",
        },
      ],
    },
    {
      id: 4,
      icon: Assets.VitalHCT,
      name: "HCT",
      category: "Hematologic Profile",
      date: "Recently Added 27-03-2024",
      badge: [{ label: "23%", color: "error" }],
      chartLabel1: "HCT Rate (in %)",
      columnsData: [
        { id: 1, label: "NO." },
        { id: 2, label: "RESULT" },
        { id: 3, label: "HCT Rate" },
        { id: 4, label: "DATE" },
        { id: 5, label: "ACTION" },
      ],
      tableData: [
        {
          "no.": 1,
          result: { status: "success", name: "Normal" },
          hct_rate: "42%",
          date: "06-24-2024 10:15",
          action: [{ type: "warning" }],
          name: "HCT",
        },
        {
          "no.": 2,
          result: {
            status: "success",
            name: "Normal",
          },
          hct_rate: "45%",
          date: "05-24-2024 10:15",
          action: [{ type: "edit" }, { type: "delete" }],
          name: "HCT",
        },
      ],
    },
    {
      id: 5,
      icon: Assets.VitalHBeat,
      name: "ECG",
      category: "Primary Vitals",
      date: "Recently Added 27-03-2024",
      badge: [{ label: "1 Bpm", color: "success" }],
      chartLabel1: "Heart Rate (BPM)",
      columnsData: [
        { id: 1, label: "NO." },
        { id: 2, label: "INTERPRETATION" },
        { id: 3, label: "ECG" },
        { id: 4, label: "ECG TYPE" },
        { id: 5, label: "DATE" },
        { id: 6, label: "ACTION" },
      ],
      tableData: [
        {
          "no.": 1,
          ecg_result: { status: "error", name: "Abnormal Heart Rate" },
          ecg: {
            contentType: "image",
            link: Assets.ecgSample,
          },
          "heart_rate_(bpm)": "120",
          date: "05-24-2024 10:15",
          action: [{ type: "warning" }],
          name: "Heart Rate",
          interpretation: "ECG Interpretation",
          ecg_type: "3 Lead",
        },
        {
          "no.": 2,
          ecg_result: {
            status: "success",
            name: "Normal",
          },
          ecg: {
            contentType: "pdf",
            link: "https://www.orimi.com/pdf-test.pdf",
          },
          "heart_rate_(bpm)": "70",
          date: "06-24-2024 10:15",
          action: [{ type: "edit" }, { type: "delete" }],
          name: "Heart Rate",
          interpretation: "ECG Interpretation",
          ecg_type: "3 Lead",
        },
      ],
    },
    {
      id: 6,
      icon: Assets.VitalHae,
      name: "Hemoglobin",
      category: "Hematologic Profile",
      date: "Recently Added 27-03-2024",
      badge: [{ label: "14 g/dL", color: "error" }],
      chartLabel1: "Hemoglobin (g/dL)",
      columnsData: [
        { id: 1, label: "NO." },
        { id: 2, label: "RESULT" },
        { id: 3, label: "Hemoglobin" },
        { id: 4, label: "DATE" },
        { id: 5, label: "ACTION" },
      ],
      tableData: [
        {
          "no.": 1,
          result: { status: "success", name: "Normal" },
          hemoglobin: "15 g/dL",
          hemoglobinValue: "15",
          date: "06-24-2024 10:15",
          action: [{ type: "warning" }],
          name: "Hemoglobin",
        },
        {
          "no.": 2,
          result: {
            status: "success",
            name: "Normal",
          },
          hemoglobin: "15 g/dL",
          hemoglobinValue: "15",
          date: "05-24-2024 10:15",
          action: [{ type: "edit" }, { type: "delete" }],
          name: "Hemoglobin",
        },
      ],
    },
    {
      id: 7,
      icon: Assets.BKetone,
      name: "Blood Ketone",
      category: "Hematologic Profile",
      date: "Recently Added 27-03-2024",
      badge: [{ label: "0.5 mmol/L", color: "error" }],
      chartLabel1: "Blood Ketone (mmol/L)",
      columnsData: [
        { id: 1, label: "NO." },
        { id: 2, label: "RESULT" },
        { id: 3, label: "BLOOD KETONE" },
        { id: 4, label: "DATE" },
        { id: 5, label: "ACTION" },
      ],
      tableData: [
        {
          "no.": 1,
          result: { status: "success", name: "Normal" },
          blood_ketone: "0.33 mmol/L",
          blood_ketone_value: "0.33",
          date: "06-24-2024 10:15",
          action: [{ type: "warning" }],
          name: "Blood Ketone",
        },
        {
          "no.": 2,
          result: {
            status: "warning",
            name: "Normal",
          },
          blood_ketone: "0.33 mmol/L",
          blood_ketone_value: "0.33",
          date: "05-24-2024 10:15",
          action: [{ type: "edit" }, { type: "delete" }],
          name: "Blood Ketone",
        },
      ],
    },
    {
      id: 8,
      icon: Assets.VitalLipid,
      name: "Lipid Profile",
      category: "Metabolic And Biochemical Profile",
      date: "Recently Added 27-03-2024",
      badge: [
        { label: "Total Cholesterol: 180 mg/dL ", color: "success" },
        { label: "LDL: 100 mg/dL", color: "error" },
        { label: "HDL: 50 mg/dL ", color: "error" },
        // { label: "TG: Optimal", color: "error" },
        { label: "Triglycerides: 150 mg/dL", color: "success" },
      ],
      chartLabel1: "Lipid Profile (mg/dL)",
      columnsData: [
        { id: 1, label: "NO." },
        { id: 2, label: "RESULT" },
        { id: 3, label: "Total Cholesterol" },
        { id: 4, label: "Triglycerides" },
        { id: 5, label: "HDL" },
        { id: 6, label: "LDL" },
        { id: 7, label: "LDL/HDL" },
        { id: 8, label: "VLDL" },
        { id: 9, label: "DATE" },
        { id: 10, label: "ACTION" },
      ],
      tableData: [
        {
          "no.": 1,
          result: { status: "success", name: "Normal" },
          total_cholesterol: "180 mg/dL",
          totalOnly: "180",
          triglycerides: "140 mg/dL",
          hdl: "60 mg/dL",
          ldl: "60 mg/dL",
          "ldl/hdl": "1",
          vldl: "5 mg/dL",
          date: "06-24-2024 10:15",
          action: [{ type: "warning" }],
          name: "Lipid Profile",
        },
        {
          "no.": 2,
          result: {
            status: "success",
            name: "Normal",
          },
          total_cholesterol: "180 mg/dL",
          totalOnly: "190",
          triglycerides: "140 mg/dL",
          hdl: "60 mg/dL",
          ldl: "60 mg/dL",
          "ldl/hdl": "1",
          vldl: "5 mg/dL",
          date: "05-24-2024 10:15",
          action: [{ type: "edit" }, { type: "delete" }],
          name: "Lipid Profile",
        },
      ],
    },
    {
      id: 9,
      icon: Assets.VitalRespi,
      name: "Respiration Rate",
      category: "Primary Vitals",
      date: "Recently Added 27-03-2024",
      badge: [{ label: "16 bpm", color: "error" }],
      chartLabel1: "Respiration Rate (BPM)",
      columnsData: [
        { id: 1, label: "NO." },
        { id: 2, label: "RESULT" },
        { id: 3, label: "Respiration Rate (BPM)" },
        { id: 4, label: "DATE" },
        { id: 5, label: "ACTION" },
      ],
      tableData: [
        {
          "no.": 1,
          result: { status: "error", name: "High" },
          "respiration_rate_(bpm)": "44",
          date: "06-24-2024 10:15",
          action: [{ type: "warning" }],
          name: "Respiration Rate",
        },
        {
          "no.": 2,
          result: {
            status: "success",
            name: "Normal",
          },
          "respiration_rate_(bpm)": "18",
          date: "05-24-2024 10:15",
          action: [{ type: "edit" }, { type: "delete" }],
          name: "Respiration Rate",
        },
      ],
    },
    {
      id: 10,
      icon: Assets.SpO2,
      name: "SpO2",
      category: "Primary Vitals",
      date: "Recently Added 27-03-2024",
      badge: [{ label: "92%", color: "success" }],
      chartLabel1: "SpO2 (%)",
      columnsData: [
        { id: 1, label: "NO." },
        { id: 2, label: "RESULT" },
        // { id: 3, label: "Pulse Rate (BPM)" },
        { id: 3, label: "SpO2" },
        { id: 4, label: "DATE" },
        { id: 5, label: "ACTION" },
      ],
      tableData: [
        {
          "no.": 1,
          result: { status: "error", name: "Abnormal" },
          "pulse_rate_(bpm)": "120",
          spo2: "99%",
          date: "06-24-2024 10:15",
          action: [{ type: "warning" }],
          name: "SpO2",
        },
        {
          "no.": 2,
          result: {
            status: "success",
            name: "Normal",
          },
          spo2: "90%",
          "pulse_rate_(bpm)": "70",
          date: "05-24-2024 10:15",
          action: [{ type: "edit" }, { type: "delete" }],
          name: "SpO2",
        },
      ],
    },
    {
      id: 11,
      icon: Assets.Temp,
      name: "Temperature",
      category: "Primary Vitals",
      date: "Recently Added 27-03-2024",
      badge: [{ label: "36.6*C", color: "success" }],
      chartLabel1: "Temperature (°F)",
      columnsData: [
        { id: 1, label: "NO." },
        { id: 2, label: "RESULT" },
        { id: 3, label: "Temperature" },
        { id: 4, label: "Type" },
        { id: 5, label: "DATE" },
        { id: 6, label: "ACTION" },
      ],
      tableData: [
        {
          "no.": 1,
          result: { status: "success", name: "Normal" },
          temperature: "96.80 ° F, 36 ° C",
          temperature_value: "96.8",
          type: "Oral",
          date: "06-24-2024 10:15",
          action: [{ type: "warning" }],
          name: "Temperature",
        },
        {
          "no.": 2,
          result: {
            status: "success",
            name: "Normal",
          },
          temperature: "97.88 ° F, 36.6 ° C",
          temperature_value: "97.8",
          type: "Oral",
          date: "05-24-2024 10:15",
          action: [{ type: "edit" }, { type: "delete" }],
          name: "Temperature",
        },
      ],
    },
    {
      id: 12,
      icon: Assets.LFT,
      name: "Lung Function Test (LFT)",
      date: "Recently Added 27-03-2024",
      category: "Primary Vitals",
      chartLabel1: "FVC (L)",
      badge: [
        { label: "FEV1: 1L", color: "error" },
        { label: "FVC: 1L", color: "error" },
        { label: "FEV1/FVC: 40", color: "error" },
        { label: "PEF: 1L/min", color: "error" },
      ],
      columnsData: [
        { id: 1, label: "NO." },
        { id: 2, label: "FVC (L)" },
        { id: 3, label: "FEV1 (L)" },
        { id: 4, label: "FEV1/FVC" },
        { id: 5, label: "PEF (L/MIN)" },
        { id: 6, label: "SVC (L)" },
        { id: 7, label: "DATE" },
        { id: 8, label: "ACTION" },
      ],
      tableData: [
        {
          "no.": 1,
          "fvc_(l)": "5.94",
          "fev1_(l)": "2.45",
          "fev1/fvc": "41",
          "pef_(l/min)": "2.62",
          "svc_(l)": "3.51",
          date: "06-24-2024 10:15",
          action: [{ type: "warning" }],
          name: "Lung Function Test (LFT)",
        },
        {
          "no.": 2,
          "fvc_(l)": "6.94",
          "fev1_(l)": "2.45",
          "fev1/fvc": "41",
          "pef_(l/min)": "2.62",
          "svc_(l)": "3.51",
          date: "05-24-2024 10:15",
          action: [{ type: "edit" }, { type: "delete" }],
          name: "Lung Function Test (LFT)",
        },
      ],
    },
    {
      id: 13,
      icon: Assets.BUAcid,
      name: "Blood Uric Acid",
      category: "Hematologic Profile",
      date: "Recently Added 27-03-2024",
      badge: [{ label: "6 mg/dL", color: "error" }],
      chartLabel1: "Blood Uric Acid (mg/dL)",
      columnsData: [
        { id: 1, label: "NO." },
        { id: 2, label: "RESULT" },
        { id: 3, label: "BLOOD URIC ACID" },
        { id: 4, label: "DATE" },
        { id: 5, label: "ACTION" },
      ],
      tableData: [
        {
          "no.": 1,
          result: { status: "success", name: "Normal" },
          blood_uric_acid: "5 mg/dL",
          blood_uric_acid_value: "5",
          date: "06-24-2024 10:15",
          action: [{ type: "warning" }],
          name: "Blood Uric Acid",
        },
        {
          "no.": 2,
          result: {
            status: "warning",
            name: "Normal",
          },
          blood_uric_acid: "5 mg/dL",
          blood_uric_acid_value: "5",
          date: "05-24-2024 10:15",
          action: [{ type: "edit" }, { type: "delete" }],
          name: "Blood Uric Acid",
        },
      ],
    },
    // {
    //   id: 14,
    //   icon: Assets.Urinalysis,
    //   name: "Urinalysis",
    //   category: "Renal and Metabolic Markers",
    //   date: "Recently Added 27-03-2024",
    //   badge: [{ label: "100pmol/d", color: "error" }],
    //   chartLabel1: "Urine (μmol/kg/d)",
    //   chartLabel2: "ph",
    //   columnsData: [
    //     { id: 1, label: "NO." },
    //     { id: 2, label: "RESULT" },
    //     { id: 3, label: "URINE" },
    //     { id: 4, label: "PH" },
    //     { id: 5, label: "SUGAR" },
    //     { id: 6, label: "PROTEIN" },
    //     { id: 7, label: "LEUKOCYTES" },
    //     { id: 8, label: "RBC" },
    //     { id: 9, label: "DATE" },
    //     { id: 10, label: "ACTION" },
    //   ],
    //   tableData: [
    //     {
    //       "no.": 1,
    //       result: { status: "success", name: "Normal" },
    //       urine: "100 μmol/kg/d",
    //       chartValue: "100",
    //       ph: "17.5",
    //       sugar: "0.8 mmol/L",
    //       protein: "None",
    //       leukocytes: "None",
    //       rbc: "None",
    //       date: "06-24-2024 10:15",
    //       action: [{ type: "warning" }],
    //       name: "Urinalysis",
    //     },
    //     {
    //       "no.": 2,
    //       result: {
    //         status: "success",
    //         name: "Normal",
    //       },
    //       urine: "110 μmol/kg/d",
    //       chartValue: "110",
    //       ph: "6.5",
    //       sugar: "0.8 mmol/L",
    //       protein: "None",
    //       leukocytes: "None",
    //       rbc: "None",
    //       date: "05-24-2024 10:15",
    //       action: [{ type: "edit" }, { type: "delete" }],
    //       name: "Urinalysis",
    //     },
    //   ],
    // },
    {
      id: 14,
      icon: Assets.Urinalysis,
      name: "Urinalysis",
      category: "Renal and Metabolic Markers",
      date: "Recently Added 27-03-2024",
      // badge: [{ label: "100pmol/d", color: "error" }],
      badge: [
        { label: "Color: Straw ", color: "success" },
        { label: "Clarity: Clear", color: "success" },
        { label: "Specific Gravity: 1.008 ", color: "success" },
        { label: "PH: Normal (6-7)", color: "success" },
        { label: "Protein: Trace", color: "success" },
        { label: "Glucose: Negative", color: "success" },
      ],
      chartLabel1: "Specific gravity",
      chartLabel2: "ph",
      columnsData: [
        { id: 1, label: "NO." },
        { id: 2, label: "Color" },
        { id: 3, label: "Clarity" },
        { id: 4, label: "Specific Gravity" },
        { id: 5, label: "PH" },
        { id: 6, label: "Protein" },
        { id: 7, label: "Glucose" },
        { id: 8, label: "ACTION" },
      ],
      tableData: [
        {
          "no.": 1,
          color: "Straw",
          chartValue: "1.008",
          specific_gravity: "1.008",
          ph: "Normal (6-7)",
          clarity: "Clear",
          protein: "Trace",
          glucose: "Negative",
          action: [{ type: "warning" }],
          name: "Urinalysis",
        },
        {
          "no.": 2,
          color: "Straw",
          chartValue: "1.308",
          specific_gravity: "1.308",
          ph: "Normal (6-7)",
          clarity: "Clear",
          protein: "Trace",
          glucose: "Negative",
          action: [{ type: "edit" }, { type: "delete" }],
          name: "Urinalysis",
        },
      ],
    },
    {
      id: 15,
      icon: Assets.Urea,
      name: "Urea",
      date: "Recently Added 27-03-2024",
      category: "Renal and Metabolic Markers",
      badge: [{ label: "32mg/dl", color: "error" }],
      chartLabel1: "Urea (mg/dL)",
      columnsData: [
        { id: 1, label: "NO." },
        { id: 2, label: "RESULT" },
        { id: 3, label: "UREA" },
        { id: 4, label: "DATE" },
        { id: 5, label: "ACTION" },
      ],
      tableData: [
        {
          "no.": 1,
          result: { status: "success", name: "Normal" },
          urea: "20 mg/dL",
          urea_value: "20",
          date: "06-24-2024 10:15",
          action: [{ type: "warning" }],
          name: "Urea",
        },
        {
          "no.": 2,
          result: {
            status: "warning",
            name: "Normal",
          },
          urea: "20 mg/dL",
          urea_value: "20",
          date: "05-24-2024 10:15",
          action: [{ type: "edit" }, { type: "delete" }],
          name: "Urea",
        },
      ],
    },
    {
      id: 16,
      icon: Assets.Creatinine,
      name: "Creatinine",
      category: "Renal and Metabolic Markers",
      date: "Recently Added 27-03-2024",
      badge: [{ label: "1.7 mg/dL", color: "error" }],
      chartLabel1: "Creatinine (mg/dL)",
      columnsData: [
        { id: 1, label: "NO." },
        { id: 2, label: "RESULT" },
        { id: 3, label: "CREATININE" },
        { id: 4, label: "DATE" },
        { id: 5, label: "ACTION" },
      ],
      tableData: [
        {
          "no.": 1,
          result: { status: "success", name: "Normal" },
          creatinine: "1.2 mg/dL",
          creatinine_value: "1.2",
          date: "06-24-2024 10:15",
          action: [{ type: "warning" }],
          name: "Creatinine",
        },
        {
          "no.": 2,
          result: {
            status: "warning",
            name: "Normal",
          },
          creatinine: "1.2 mg/dL",
          creatinine_value: "1.2",
          date: "05-24-2024 10:15",
          action: [{ type: "edit" }, { type: "delete" }],
          name: "Creatinine",
        },
      ],
    },
    {
      id: 17,
      icon: Assets.GFR,
      name: "GFR",
      category: "Renal and Metabolic Markers",
      date: "Recently Added 27-03-2024",
      badge: [{ label: "55 mL/min/1.73m²", color: "error" }],
      chartLabel1: "GFR (mL/min/1.73m²)",
      columnsData: [
        { id: 1, label: "NO." },
        { id: 2, label: "RESULT" },
        { id: 3, label: "GFR" },
        { id: 4, label: "DATE" },
        { id: 5, label: "ACTION" },
      ],
      tableData: [
        {
          "no.": 1,
          result: { status: "success", name: "Normal" },
          gfr: "92 mL/min/1.73m²",
          gfr_value: "92",
          date: "06-24-2024 10:15",
          action: [{ type: "warning" }],
          name: "GFR",
        },
        {
          "no.": 2,
          result: {
            status: "warning",
            name: "Normal",
          },
          gfr: "90 mL/min/1.73m²",
          gfr_value: "90",
          date: "05-24-2024 10:15",
          action: [{ type: "edit" }, { type: "delete" }],
          name: "GFR",
        },
      ],
    },
  ];

  const filteredProducts = data.filter(
    (product) => product.category === category
  );

  const renderImage = (contentUrl) => {
    return (
      <img
        src={contentUrl}
        alt="mage1"
        style={{ maxWidth: "100%", maxHeight: "100%" }}
      />
    );
  };

  // // Function to render PDF content
  const renderPdf = (contentUrl) => {
    return (
      <iframe
        title="PDF Viewer"
        src={contentUrl}
        style={{ width: "100%", height: "140px", border: "none" }}
      />
    );
  };
  return (
    <>
      <CRow className="mb-1">
        <CCol md={12}>
          <CRow className="mt-3 ">
            {filteredProducts?.map((item, index) => (
              <CCol md={6} xl={4} key={index} className="mb-3">
                <CCard
                  className={`vital-cards`}
                  onClick={() => {
                    openModal(item);
                  }}
                >
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
                          <div key={i} style={{ height: "24px" }}>
                            <Badge label={dt?.label} color={dt?.color} />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="vital-line-container">
                      {/* <img alt="line" src={Assets.Vitalline} /> */}
                      {item?.name === "ECG" ? (
                        <div className="chart-item">
                          {/* <div className="rectangle">
                            <img src={Assets.ecgSample} alt="ecg" />
                          </div> */}
                          {renderImage(Assets.ecgSample)}
                          {/* {renderPdf("https://www.orimi.com/pdf-test.pdf")} */}
                        </div>
                      ) : (
                        <CardChart datas={item} />
                      )}
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

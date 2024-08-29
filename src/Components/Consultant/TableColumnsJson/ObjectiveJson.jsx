import { Assets } from "../../../assets/Assets";

export const ObjectiveDatas = [
  {
    id: 1,
    icon: Assets.VitalBP,
    slug: "blood-pressure",
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
    slug: "blood-sugar",
    name: "Blood Sugar",
    category: "Metabolic And Biochemical Profile",
    date: "Recently Added 27-03-2024",
    badge: [{ label: "110 mg/dL", color: "success" }],
    chartLabel1: "Blood Sugar (mg/dL)",
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
    slug: "bmi",
    name: "BMI",
    category: "Primary Vitals",
    date: "Recently Added 27-03-2024",
    badge: [{ label: "24.5 kg/m²", color: "success" }],
    chartLabel1: "BMI (kg/m²)",
    columnsData: [
      { id: 1, label: "NO." },
      { id: 2, label: "RESULT" },
      { id: 3, label: "BMI (kg/m²)" },
      { id: 4, label: "Height (cm)" },
      { id: 5, label: "Weight (kg)" },
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
    slug: "hct",
    name: "Hematocrit (HCT)",
    category: "Hematologic Profile",
    date: "Recently Added 27-03-2024",
    badge: [{ label: "23%", color: "error" }],
    chartLabel1: "HCT (%)",
    columnsData: [
      { id: 1, label: "NO." },
      { id: 2, label: "RESULT" },
      { id: 3, label: "HCT %" },
      { id: 4, label: "DATE" },
      { id: 5, label: "ACTION" },
    ],
    tableData: [
      {
        "no.": 1,
        result: { status: "success", name: "Normal" },
        "hct_%": "42%",
        date: "06-24-2024 10:15",
        action: [{ type: "warning" }],
        name: "Hematocrit (HCT)",
      },
      {
        "no.": 2,
        result: {
          status: "success",
          name: "Normal",
        },
        "hct_%": "45%",
        date: "05-24-2024 10:15",
        action: [{ type: "edit" }, { type: "delete" }],
        name: "Hematocrit (HCT)",
      },
    ],
  },
  {
    id: 5,
    icon: Assets.VitalHBeat,
    slug: "heart-rate",
    name: "Heart",
    category: "Primary Vitals",
    date: "Recently Added 27-03-2024",
    badge: [{ label: "1 bpm", color: "success" }],
    chartLabel1: "Heart Rate (bpm)",
    columnsData: [
      { id: 1, label: "NO." },
      { id: 2, label: "Result" },
      { id: 3, label: "HR (bpm)" },
      { id: 4, label: "Type" },
      { id: 5, label: "Result File" },
      { id: 6, label: "Interpretation" },
      { id: 7, label: "DATE" },
      { id: 8, label: "ACTION" },
    ],
    tableData: [
      {
        "no.": 1,
        result: { status: "error", name: "Abnormal Heart Rate" },
        // ecg: {
        //   contentType: "image",
        //   link: Assets.ecgSample,
        // },
        "hr_(bpm)": "120",
        date: "05-24-2024 10:15",
        action: [{ type: "warning" }],
        name: "Heart Rate",
        interpretation: "ECG Interpretation",
        type: "3 Lead",
        // result_file: "heart.png",
        result_file: {
          contentType: "image",
          link: Assets.ecgSample,
          name: "heart.png",
        },
      },
      {
        "no.": 2,
        result: {
          status: "success",
          name: "Normal",
        },
        // ecg: {
        //   contentType: "pdf",
        //   link: "https://www.orimi.com/pdf-test.pdf",
        // },
        "hr_(bpm)": "80",
        date: "06-24-2024 10:15",
        action: [{ type: "edit" }, { type: "delete" }],
        name: "Heart Rate",
        interpretation: "ECG Interpretation",
        type: "3 Lead",
        // result_file: "heart.pdf",
        result_file: {
          contentType: "pdf",
          link: "https://www.orimi.com/pdf-test.pdf",
          name: "heart.pdf",
        },
      },
    ],
  },
  {
    id: 6,
    icon: Assets.VitalHae,
    slug: "hemoglobin",
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
        hemoglobin: "15",
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
        hemoglobin: "15",
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
    slug: "keytone",
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
    slug: "lipid-profile",
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
    chartLabel1: "LDL (mg/dL)",
    chartLabel2: "HDL (mg/dL)",
    chartLabel3: "VLDL (mg/dL)",
    chartLabel4: "LDL/HDL (mg/dL)",
    chartLabel5: "Triglycerides (mg/dL)",
    chartLabel6: "Total Cholesterol (mg/dL)",
    columnsData: [
      { id: 1, label: "NO." },
      { id: 2, label: "RESULT" },
      { id: 3, label: "LDL(mg/dL)" },
      { id: 4, label: "HDL(mg/dL)" },
      { id: 5, label: "VLDL(mg/dL)" },
      { id: 6, label: "LDL/HDL(mg/dL)" },
      { id: 7, label: "Triglycerides(mg/dL)" },
      { id: 8, label: "Total Cholesterol(mg/dL)" },
      { id: 9, label: "DATE" },
      { id: 10, label: "ACTION" },
    ],
    tableData: [
      {
        "no.": 1,
        result: { status: "success", name: "Normal" },
        "ldl(mg/dl)": "60 mg/dL",
        "hdl(mg/dl)": "50 mg/dL",
        "vldl(mg/dl)": "5 mg/dL",
        "ldl/hdl(mg/dl)": "1",
        "triglycerides(mg/dl)": "140 mg/dL",
        "total_cholesterol(mg/dl)": "180 mg/dL",
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
        "ldl(mg/dl)": "60 mg/dL",
        "hdl(mg/dl)": "50 mg/dL",
        "vldl(mg/dl)": "5 mg/dL",
        "ldl/hdl(mg/dl)": "1",
        "triglycerides(mg/dl)": "140 mg/dL",
        "total_cholesterol(mg/dl)": "180 mg/dL",
        date: "05-24-2024 10:15",
        action: [{ type: "edit" }, { type: "delete" }],
        name: "Lipid Profile",
      },
    ],
  },
  {
    id: 9,
    icon: Assets.VitalRespi,
    slug: "respiration",
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
    slug: "spO2",
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
    slug: "temperature",
    name: "Temperature",
    category: "Primary Vitals",
    date: "Recently Added 27-03-2024",
    badge: [
      { label: "36.6*C", color: "success" },
      { label: "96.80 ° F", color: "success" },
    ],
    chartLabel1: "Temperature (°F) ",
    chartLabel2: "Temperature (°C)",
    columnsData: [
      { id: 1, label: "NO." },
      { id: 2, label: "RESULT" },
      { id: 3, label: "Temperature" },
      { id: 4, label: "Method" },
      { id: 5, label: "DATE" },
      { id: 6, label: "ACTION" },
    ],
    tableData: [
      {
        "no.": 1,
        result: { status: "success", name: "Normal" },
        // temperature_fahrenheit: "96.80 ° F",
        // temperature_celsius: "36 ° C",
        method: "Oral",
        date: "06-24-2024 10:15",
        action: [{ type: "warning" }],
        name: "Temperature",
        temperature: "96",
        unit: "Celsius",
      },
      {
        "no.": 2,
        result: {
          status: "success",
          name: "Normal",
        },
        // temperature_fahrenheit: "96.80 ° F",
        // temperature_celsius: "36 ° C",
        method: "Oral",
        date: "05-24-2024 10:15",
        action: [{ type: "edit" }, { type: "delete" }],
        name: "Temperature",
        temperature: "36",
        unit: "Celsius",
      },
    ],
  },
  {
    id: 12,
    icon: Assets.LFT,
    slug: "spirometer",
    name: "Lung Function Test (LFT)",
    date: "Recently Added 27-03-2024",
    category: "Primary Vitals",
    chartLabel1: "FVC (%)",
    chartLabel2: "FEV1 (%)",
    chartLabel4: "FEV1/FVC Ratio (%)",
    chartLabel3: "PEF (%)",
    badge: [
      { label: "FEV1 (%): 1L", color: "error" },
      { label: "FVC (%): 1L", color: "error" },
      { label: "FEV1/FVC Ratio (%): 49", color: "error" },
      { label: "PEF (%): 1L/min", color: "error" },
    ],
    columnsData: [
      { id: 1, label: "NO." },
      { id: 2, label: "Result" },
      { id: 3, label: "FVC (L)" },
      { id: 4, label: "FEV1 (L)" },
      { id: 5, label: "PEF (L/s)" },
      { id: 6, label: "FEV1/FVC (%)" },
      { id: 7, label: "DATE" },
      { id: 8, label: "ACTION" },
    ],
    tableData: [
      {
        "no.": 1,
        "fvc_(l)": "5.94",
        "fev1_(l)": "12.45",
        "fev1/fvc_(%)": "41",
        "pef_(l/s)": "2.62",
        date: "06-24-2024 10:15",
        action: [{ type: "warning" }],
        name: "Lung Function Test (LFT)",
        result: "Lorem Ipsum",
      },
      {
        "no.": 2,
        "fvc_(l)": "6.94",
        "fev1_(l)": "2.45",
        "fev1/fvc_(%)": "41",
        "pef_(l/s)": "2.62",
        date: "05-24-2024 10:15",
        action: [{ type: "edit" }, { type: "delete" }],
        name: "Lung Function Test (LFT)",
        result: "Lorem Ipsum",
      },
    ],
  },
  {
    id: 13,
    icon: Assets.BUAcid,
    slug: "uric_acid",
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
    chartLabel2: "PH",
    chartLabel3: "Urobilinogen",
    chartLabel4: "Red Blood Cells",
    chartLabel5: "White Blood Cells",
    columnsData: [
      { id: 1, label: "NO." },
      { id: 2, label: "Color" },
      { id: 3, label: "Clarity" },
      { id: 4, label: "PH" },
      { id: 5, label: "Protein" },
      { id: 6, label: "Glucose" },
      { id: 7, label: "Leukocyte" },
      { id: 8, label: "Bilirubin" },
      { id: 9, label: "ACTION" },
    ],
    tableData: [
      {
        "no.": 1,
        color: "Straw",
        specific_gravity: "1.308",
        ph: "7",
        clarity: "Clear",
        protein: "Trace",
        glucose: "Negative",
        leukocyte: "79",
        bilirubin: "120",
        urobilinogen: "70",
        red_blood_cells: "120",
        white_blood_cells: "110",
        action: [{ type: "warning" }],
        name: "Urinalysis",
      },
      {
        "no.": 2,
        color: "Straw",
        specific_gravity: "1.308",
        ph: "7",
        clarity: "Clear",
        protein: "Trace",
        glucose: "Negative",
        leukocyte: "79",
        bilirubin: "120",
        urobilinogen: "70",
        red_blood_cells: "120",
        white_blood_cells: "110",

        action: [{ type: "edit" }, { type: "delete" }],
        name: "Urinalysis",
      },
    ],
  },
  {
    id: 15,
    icon: Assets.Urea,
    slug: "urea",
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
    slug: "creatinine",
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
    slug: "gfr",
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

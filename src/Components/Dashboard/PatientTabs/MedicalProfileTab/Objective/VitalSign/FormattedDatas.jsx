import { Assets } from "../../../../../../assets/Assets";
import { findColorCodefev1_fvc } from "../../../../../../Utils/colorUtils";
import {
  celsiusToFahrenheit,
  fahrenheitToCelsius,
} from "../../../../../../Utils/commonUtils";

export const transformBPData = (originalData, pagination) => {
  if (!Array.isArray(originalData) || originalData.length === 0) {
    return {
      id: 1,
      icon: Assets.VitalBP,
      name: "Blood Pressure",
      date: "-",
      total: 0,
      category: "Primary Vitals",
      badge: [],
      columnsData: [
        { id: 1, label: "NO." },
        { id: 2, label: "RESULT" },
        { id: 3, label: "SYSTOLIC" },
        { id: 4, label: "DIASTOLIC" },
        { id: 5, label: "PULSE (bpm)" },
        { id: 6, label: "DATE" },
        { id: 7, label: "ACTION" },
      ],
      tableData: [],
      chartLabel1: "PULSE (bpm)",
      chartLabel2: "SYSTOLE (mm Hg)",
      chartLabel3: "DIASTOLE (mm Hg)",
    };
  }

  // Map through original data to create tableData
  const tableData = originalData?.map((item, index) => ({
    "no.": index + 1,
    result: {
      status: item.details.bpFlagColor === "success" ? "success" : "error",
      name: item.details.bpFlag || "Unknown",
    },
    systolic: Number(item.details.systolic),
    diastolic: item.details.diastolic,
    "pulse_(bpm)": item.details.pulse,
    date: `${item.details.date} ${item.details.time || ""}`,
    action:
      item?.consult_id === null
        ? [{ type: "edit", disabled: item?.freeze === 1 }, { type: "delete" }]
        : [{ type: "warning" }],
    name: "Blood Pressure",
    id: item.id,
    user_id: item.user_id,
    slug: "blood-pressure",
  }));

  // Create badge and other static information
  const badge =
    tableData.length > 0
      ? [
          {
            label: `${tableData[0].systolic}/${tableData[0].diastolic} mm Hg`,
            color: tableData[0].result.status,
          },
          {
            label: `${tableData[0]["pulse_(bpm)"]} Pulse (bpm)`,
            color: tableData[0].result.status,
          },
        ]
      : [];

  return {
    id: 1,
    icon: Assets.VitalBP,
    name: "Blood Pressure",
    date: `Recently Added ${tableData[0].date
      .split(" ")[0]
      .split("-")
      .reverse()
      .join("-")}`,
    category: "Primary Vitals",
    badge,
    columnsData: [
      { id: 1, label: "NO." },
      { id: 2, label: "RESULT" },
      { id: 3, label: "SYSTOLIC" },
      { id: 4, label: "DIASTOLIC" },
      { id: 5, label: "PULSE (bpm)" },
      { id: 6, label: "DATE" },
      { id: 7, label: "ACTION" },
    ],
    tableData,
    chartLabel1: "PULSE (bpm)",
    chartLabel2: "SYSTOLE (mm Hg)",
    chartLabel3: "DIASTOLE (mm Hg)",
    total: pagination?.total,
  };
};

export const transformBMIData = (originalData, pagination) => {
  if (!Array.isArray(originalData) || originalData.length === 0) {
    return {
      id: 3,
      icon: Assets.VitalBMI,
      name: "BMI",
      date: "-",
      total: 0,
      category: "Primary Vitals",
      badge: [],
      columnsData: [
        { id: 1, label: "NO." },
        { id: 2, label: "RESULT" },
        { id: 3, label: "BMI (kg/m²)" },
        { id: 4, label: "HEIGHT (cm)" },
        { id: 5, label: "WEIGHT (kg)" },
        { id: 6, label: "DATE" },
        { id: 7, label: "ACTION" },
      ],
      tableData: [],
      chartLabel1: "BMI (kg/m²)",
      chartLabel2: "Height (cm)",
      chartLabel3: "Weight (kg)",
    };
  }

  // Map through original data to create tableData
  const tableData = originalData.map((item, index) => ({
    "no.": index + 1,
    result: {
      status: item?.details?.bmiFlagColor,
      name: item?.details?.bmiFlag || "Unknown",
    },
    "bmi_(kg/m²)": item?.details?.bmi || "N/A",
    "height_(cm)": item?.details?.height || "N/A",
    "weight_(kg)": item?.details?.weight || "N/A",
    date: `${item.details.date} ${item.details.time || ""}`,
    action:
      item?.consult_id === null
        ? [{ type: "edit", disabled: item?.freeze === 1 }, { type: "delete" }]
        : [{ type: "warning" }],
    name: "BMI",
    id: item.id,
    user_id: item.user_id,
    slug: "bmi",
    height_unit: item?.details?.height_unit || "",
    weight_unit: item?.details?.weight_unit || "",
  }));

  // Create badge and other static information
  const badge =
    tableData.length > 0
      ? [
          {
            label: `${tableData[0]["bmi_(kg/m²)"]} kg/m²`,
            color: tableData[0].result.status,
          },
        ]
      : [];

  return {
    id: 3,
    icon: Assets.VitalBMI,
    name: "BMI",
    date: `Recently Added ${tableData[0].date
      .split(" ")[0]
      .split("-")
      .reverse()
      .join("-")}`,
    category: "Primary Vitals",
    badge,
    columnsData: [
      { id: 1, label: "NO." },
      { id: 2, label: "RESULT" },
      { id: 3, label: "BMI (kg/m²)" },
      { id: 4, label: "HEIGHT (cm)" },
      { id: 5, label: "WEIGHT (kg)" },
      { id: 6, label: "DATE" },
      { id: 7, label: "ACTION" },
    ],
    tableData,
    chartLabel1: "BMI (kg/m²)",
    chartLabel2: "Height (cm)",
    chartLabel3: "Weight (kg)",
    total: pagination?.total,
  };
};

export const transformRespirationRateData = (originalData, pagination) => {
  if (!Array.isArray(originalData) || originalData.length === 0) {
    return {
      id: 9,
      icon: Assets.VitalRespi,
      name: "Respiration Rate",
      date: "-",
      total: 0,
      category: "Primary Vitals",
      badge: [],
      columnsData: [
        { id: 1, label: "NO." },
        { id: 2, label: "RESULT" },
        { id: 3, label: "RESPIRATION RATE (bpm)" },
        { id: 4, label: "DATE" },
        { id: 5, label: "ACTION" },
      ],
      tableData: [],
      chartLabel1: "Respiration Rate (bpm)",
    };
  }

  // Map through original data to create tableData
  const tableData = originalData?.map((item, index) => ({
    "no.": index + 1,
    result: {
      status: item.details.respirationFlagColor,
      name: item.details.respirationFlag,
    },
    "respiration_rate_(bpm)": item.details.respiration || "N/A",
    date: `${item.details.date} ${item.details.time || ""}`,
    action:
      item?.consult_id === null
        ? [{ type: "edit", disabled: item?.freeze === 1 }, { type: "delete" }]
        : [{ type: "warning" }],
    name: "Respiration Rate",
    id: item.id,
    user_id: item.user_id,
    slug: "respiration",
  }));

  // Create badge and other static information
  const badge =
    tableData.length > 0
      ? [
          {
            label: `${tableData[0]["respiration_rate_(bpm)"]} bpm`,
            color: tableData[0].result.status,
          },
        ]
      : [];

  return {
    id: 9,
    icon: Assets.VitalRespi,
    name: "Respiration Rate",
    date: `Recently Added ${tableData[0].date
      .split(" ")[0]
      .split("-")
      .reverse()
      .join("-")}`,
    category: "Primary Vitals",
    badge,
    columnsData: [
      { id: 1, label: "NO." },
      { id: 2, label: "RESULT" },
      { id: 3, label: "RESPIRATION RATE (bpm)" },
      { id: 4, label: "DATE" },
      { id: 5, label: "ACTION" },
    ],
    tableData,
    chartLabel1: "Respiration Rate (bpm)",
    total: pagination?.total,
  };
};

export const transformSpO2Data = (originalData, pagination) => {
  if (!Array.isArray(originalData) || originalData.length === 0) {
    return {
      id: 10,
      icon: Assets.SpO2,
      name: "SpO2",
      date: "-",
      total: 0,
      category: "Primary Vitals",
      badge: [],
      columnsData: [
        { id: 1, label: "NO." },
        { id: 2, label: "RESULT" },
        { id: 3, label: "SPO2" },
        { id: 4, label: "DATE" },
        { id: 5, label: "ACTION" },
      ],
      tableData: [],
      chartLabel1: "SpO2 (%)",
    };
  }

  // Map through original data to create tableData
  const tableData = originalData?.map((item, index) => ({
    "no.": index + 1,
    result: {
      status: item?.details?.spo2FlagColor,
      name: item?.details?.spo2Flag,
    },
    spo2: item?.details?.spo2 + "" + item?.details?.unit || "N/A",
    date: `${item?.details?.date} ${item?.details?.time || ""}`,
    action:
      item?.consult_id === null
        ? [{ type: "edit", disabled: item?.freeze === 1 }, { type: "delete" }]
        : [{ type: "warning" }],
    name: "SpO2",
    id: item?.id,
    user_id: item?.user_id,
    slug: "spO2",
    unit: item?.details?.unit,
  }));

  // Create badge and other static information
  const badge =
    tableData.length > 0
      ? [
          {
            label: `${tableData[0]?.spo2}`,
            color: tableData[0]?.result?.status,
          },
        ]
      : [];

  return {
    id: 10,
    icon: Assets.SpO2,
    name: "SpO2",
    date: `Recently Added ${tableData[0]?.date
      .split(" ")[0]
      .split("-")
      .reverse()
      .join("-")}`,
    category: "Primary Vitals",
    badge,
    columnsData: [
      { id: 1, label: "NO." },
      { id: 2, label: "RESULT" },
      { id: 3, label: "SPO2" },
      { id: 4, label: "DATE" },
      { id: 5, label: "ACTION" },
    ],
    tableData,
    chartLabel1: "SpO2 (%)",
    total: pagination?.total,
  };
};

export const transformTemperatureData = (originalData, pagination) => {
  if (!Array.isArray(originalData) || originalData.length === 0) {
    return {
      id: 11,
      icon: Assets.Temp,
      name: "Temperature",
      date: "-",
      total: 0,
      category: "Primary Vitals",
      badge: [],
      columnsData: [
        { id: 1, label: "NO." },
        { id: 2, label: "RESULT" },
        { id: 3, label: "TEMPERATURE" },
        { id: 4, label: "METHOD" },
        { id: 5, label: "DATE" },
        { id: 6, label: "ACTION" },
      ],
      tableData: [],
      chartLabel1: "Temperature (°F)",
    };
  }

  // Map through original data to create tableData
  const tableData = originalData?.map((item, index) => ({
    "no.": index + 1,
    result: {
      status: item?.details?.temperatureFlagColor,
      name: item?.details?.temperatureFlag,
    },
    temperature_value_units: `${item?.details?.temperature}${
      item?.details?.unit === "Fahrenheit" ? "°F" : "°C" || "N/A"
    }`,

    temperature:
      item?.details?.unit === "Fahrenheit"
        ? item?.details?.temperature +
          " °F, " +
          fahrenheitToCelsius(item?.details?.temperature) +
          " °C"
        : celsiusToFahrenheit(item?.details?.temperature) +
          " °F, " +
          item?.details?.temperature +
          " °C",
    temperatureValueF:
      item?.details?.unit === "Fahrenheit"
        ? item?.details?.temperature
        : celsiusToFahrenheit(item?.details?.temperature),
    method: item?.details?.type,
    date: `${item?.details?.date} ${item?.details?.time || ""}`,
    action:
      item?.consult_id === null
        ? [{ type: "edit", disabled: item?.freeze === 1 }, { type: "delete" }]
        : [{ type: "warning" }],
    name: "Temperature",
    id: item?.id,
    unit: item?.details?.unit,
    slug: "temperature",
  }));

  // Create badge and other static information
  const badge =
    tableData.length > 0
      ? [
          {
            label: `${tableData[0]?.temperature}`,
            color: tableData[0]?.result?.status,
          },
        ]
      : [];

  return {
    id: 11,
    icon: Assets.Temp,
    name: "Temperature",
    date: `Recently Added ${
      tableData[0]?.date.split(" ")[0]?.split("-")?.reverse()?.join("-") || "-"
    }`,
    category: "Primary Vitals",
    badge,
    columnsData: [
      { id: 1, label: "NO." },
      { id: 2, label: "RESULT" },
      { id: 3, label: "TEMPERATURE" },
      { id: 4, label: "METHOD" },
      { id: 5, label: "DATE" },
      { id: 6, label: "ACTION" },
    ],
    tableData,
    chartLabel1: "Temperature (°F)",
    total: pagination?.total,
  };
};

export const transformLFTData = (originalData, pagination) => {
  if (!Array.isArray(originalData) || originalData.length === 0) {
    return {
      id: 12,
      icon: Assets.LFT,
      name: "Lung Function Test (LFT)",
      date: "-",
      total: 0,
      category: "Primary Vitals",
      badge: [],
      columnsData: [
        { id: 1, label: "NO." },
        { id: 2, label: "RESULT" },
        { id: 3, label: "FVC (%)" },
        { id: 4, label: "FEV1 (%)" },
        { id: 5, label: "PEF (%)" },
        { id: 6, label: "FEV1/FVC (%)" },
        { id: 7, label: "DATE" },
        { id: 8, label: "ACTION" },
      ],
      tableData: [],
      chartLabel1: "FVC (L)",
      chartLabel2: "FEV1 (%)",
      chartLabel3: "FEV1/FVC Ratio (%)",
      chartLabel4: "PEF (%)",
    };
  }

  // Map through original data to create tableData
  const tableData = originalData?.map((item, index) => ({
    "no.": index + 1,
    result: {
      status: item?.details?.spirometerFlagColor,
      name: item?.details?.spirometerFlag || "Unknown",
    },
    "fvc_(%)": item?.details?.fvc || "N/A",
    "fev1_(%)": item?.details?.fev1 || "N/A",
    "fev1/fvc_(%)": item?.details?.fev1_fvc || "N/A",
    "pef_(%)": item?.details?.pef || "N/A",
    date: `${item.details.date} ${item.details.time || ""}`,
    action:
      item?.consult_id === null
        ? [{ type: "edit", disabled: item?.freeze === 1 }, { type: "delete" }]
        : [{ type: "warning" }],
    name: "Lung Function Test (LFT)",
    id: item.id,
    user_id: item.user_id,
    slug: "spirometer",
    fvcPercent: item?.details?.fvcPercent,
    fev1Percent: item?.details?.fev1Percent,
    pefPercent: item?.details?.pefPercent,
    fef25: item?.details?.fef25,
    fef25Percent: item?.details?.fef25Percent,
    fef50: item?.details?.fef50,
    fef50Percent: item?.details?.fef50Percent,
    fef75: item?.details?.fef75,
    fef75Percent: item?.details?.fef75Percent,
    fef2575: item?.details?.fef2575,
    fef2575Percent: item?.details?.fef2575Percent,
    notes: item?.details?.notes,
    flags: item?.details?.flags,
    "lung_function_test_(lft)": [
      {
        label: "FVC (%)",
        flagName: item?.details?.flags?.fvcFlag,
        flagColor: item?.details?.flags?.fvcFlagColor,
        percent: item?.details?.fvc,
      },
      {
        label: "FEV1 (%)",
        flagName: item?.details?.flags?.fev1Flag,
        flagColor: item?.details?.flags?.fev1FlagColor,
        percent: item?.details?.fev1,
      },
      {
        label: "PEF (%)",
        flagName: item?.details?.flags?.pefFlag,
        flagColor: item?.details?.flags?.pefFlagColor,
        percent: item?.details?.pef,
      },
      {
        label: "FEV1/FVC (%)",
        flagName: item?.details?.flags?.fev1FvcFlag,
        flagColor: item?.details?.flags?.fev1FvcFlagColor,
        percent: item?.details?.fev1_fvc,
      },
    ],
  }));

  // Create badge and other static information
  const badge = [
    {
      label: `FVC (%): ${tableData[0]?.["fvc_(%)"] || "N/A"}`,
      color: tableData[0].flags?.fvcFlagColor,
    },
    {
      label: `FEV1 (%): ${tableData[0]?.["fev1_(%)"] || "N/A"}`,
      color: tableData[0].flags?.fev1FlagColor,
    },

    {
      label: `PEF (%): ${tableData[0]?.["pef_(%)"] || "N/A"}`,
      color: tableData[0].flags?.pefFlagColor,
    },
    {
      label: `FEV1/FVC Ratio (%): ${tableData[0]?.["fev1/fvc_(%)"] || "N/A"}`,
      color: tableData[0]?.flags?.fev1FvcFlagColor,
    },
  ];

  return {
    id: 12,
    icon: Assets.LFT,
    name: "Lung Function Test (LFT)",
    date: `Recently Added ${tableData[0].date
      .split(" ")[0]
      .split("-")
      .reverse()
      .join("-")}`,
    category: "Primary Vitals",
    badge,
    columnsData: [
      { id: 1, label: "NO." },
      { id: 2, label: "LUNG FUNCTION TEST (LFT)" },
      // { id: 3, label: "FVC (%)" },
      // { id: 4, label: "FEV1 (%)" },
      // { id: 5, label: "PEF (%)" },
      // { id: 6, label: "FEV1/FVC (%)" },
      { id: 7, label: "DATE" },
      { id: 8, label: "ACTION" },
    ],
    tableData,
    chartLabel1: "FVC (%)",
    chartLabel2: "FEV1 (%)",
    chartLabel4: "FEV1/FVC Ratio (%)",
    chartLabel3: "PEF (%)",
    total: pagination?.total,
  };
};

export const transformHeartRateData = (originalData, pagination) => {
  if (!Array.isArray(originalData) || originalData.length === 0) {
    return {
      id: 5,
      icon: Assets.VitalHBeat,
      name: "Heart",
      date: "-",
      total: 0,
      category: "Primary Vitals",
      badge: [],
      columnsData: [
        { id: 1, label: "NO." },
        { id: 2, label: "RESULT" },
        { id: 3, label: "HR (bpm)" },
        { id: 4, label: "TYPE" },
        { id: 5, label: "RESULT FILE" },
        { id: 6, label: "INTERPRETATION" },
        { id: 7, label: "DATE" },
        { id: 8, label: "ACTION" },
      ],
      tableData: [],
      chartLabel1: "Heart Rate (bpm)",
    };
  }

  // Map through original data to create tableData
  const tableData = originalData.map((item, index) => ({
    "no.": index + 1,
    result: {
      status: item?.details?.heartRateFlagColor || "unknown",
      name: item?.details?.heartRateFlag || "Unknown",
    },
    unit: item?.details?.unit || "N/A",
    "hr_(bpm)": item?.details?.heart || "N/A",
    date: `${item.details.date} ${item.details.time || ""}`,
    action:
      item?.consult_id === null
        ? [{ type: "edit", disabled: item?.freeze === 1 }, { type: "delete" }]
        : [{ type: "warning" }],
    name: "Heart",
    type: item?.details?.type || "Unknown",
    interpretation: item?.details?.interpretation || "-",
    result_file: item?.document || "-",
    id: item.id,
    user_id: item.user_id,
    slug: "heart-rate",
  }));

  // Create badge and other static information
  const badge =
    tableData.length > 0
      ? [
          {
            label: `${tableData[0]?.["hr_(bpm)"] || "N/A"} bpm`,
            color: tableData[0].result.status,
          },
        ]
      : [];

  return {
    id: 5,
    icon: Assets.VitalHBeat,
    name: "Heart",
    date: `Recently Added ${
      tableData[0]?.date?.split(" ")[0]?.split("-")?.reverse()?.join("-") || "-"
    }`,
    category: "Primary Vitals",
    badge,
    columnsData: [
      { id: 1, label: "NO." },
      { id: 2, label: "RESULT" },
      { id: 3, label: "HR (bpm)" },
      { id: 4, label: "TYPE" },
      { id: 5, label: "RESULT FILE" },
      { id: 6, label: "INTERPRETATION" },
      { id: 7, label: "DATE" },
      { id: 8, label: "ACTION" },
    ],
    tableData,
    chartLabel1: "Heart Rate (bpm)",
    total: pagination?.total,
  };
};

export const transformBloodSugarData = (originalData, pagination) => {
  if (!Array.isArray(originalData) || originalData.length === 0) {
    return {
      id: 2,
      icon: Assets.VitalBs,
      name: "Blood Sugar",
      date: "-",
      total: 0,
      category: "Metabolic And Biochemical Profile",
      badge: [],
      columnsData: [
        { id: 1, label: "NO." },
        { id: 2, label: "RESULT" },
        { id: 3, label: "BLOOD SUGAR (mg/dL)" },
        { id: 4, label: "TYPE" },
        { id: 5, label: "DATE" },
        { id: 6, label: "ACTION" },
      ],
      tableData: [],
      chartLabel1: "Blood Sugar (mg/dL)",
      chartLabel2: "Type",
    };
  }

  // Map through original data to create tableData
  const tableData = originalData.map((item, index) => ({
    "no.": index + 1,
    result: {
      status: item?.details?.bsFlagColor,
      name: item?.details?.bsFlag || "Unknown",
    },
    "blood_sugar_(mg/dl)": item?.details?.blood_sugar || "N/A",
    blood_sugar_value: item?.details?.blood_sugar || "N/A",
    type: item?.details?.type || "N/A",
    date: `${item.details.date} ${item.details.time || ""}`,
    action:
      item?.consult_id === null
        ? [{ type: "edit", disabled: item?.freeze === 1 }, { type: "delete" }]
        : [{ type: "warning" }],
    name: "Blood Sugar",
    id: item.id,
    user_id: item.user_id,
    slug: "blood-sugar",
  }));

  // Create badge and other static information
  const badge =
    tableData.length > 0
      ? [
          {
            label: `${tableData[0]["blood_sugar_(mg/dl)"]} mg/dL`,
            color: tableData[0].result.status,
          },
        ]
      : [];

  return {
    id: 2,
    icon: Assets.VitalBs,
    name: "Blood Sugar",
    date: `Recently Added ${tableData[0].date
      .split(" ")[0]
      .split("-")
      .reverse()
      .join("-")}`,
    category: "Metabolic And Biochemical Profile",
    badge,
    columnsData: [
      { id: 1, label: "NO." },
      { id: 2, label: "RESULT" },
      { id: 3, label: "BLOOD SUGAR (mg/dL)" },
      { id: 4, label: "TYPE" },
      { id: 5, label: "DATE" },
      { id: 6, label: "ACTION" },
    ],
    tableData,
    chartLabel1: "Blood Sugar (mg/dL)",
    chartLabel2: "Type",
    total: pagination?.total,
  };
};

export const transformLipidProfileData = (originalData, pagination) => {
  if (!Array.isArray(originalData) || originalData.length === 0) {
    return {
      id: 8,
      icon: Assets.VitalLipid,
      name: "Lipid Profile",
      date: "-",
      total: 0,
      category: "Metabolic And Biochemical Profile",
      badge: [],
      columnsData: [
        { id: 1, label: "NO." },
        { id: 2, label: "RESULT" },
        { id: 3, label: "LDL (mg/dL)" },
        { id: 4, label: "HDL (mg/dL)" },
        { id: 5, label: "VLDL (mg/dL)" },
        { id: 6, label: "LDL/HDL (mg/dL)" },
        { id: 7, label: "TRIGLYCERIDES (mg/dL)" },
        { id: 8, label: "TOTAL CHOLESTEROL (mg/dL)" },
        { id: 9, label: "DATE" },
        { id: 10, label: "ACTION" },
      ],
      tableData: [],
      chartLabel1: "LDL (mg/dL)",
      chartLabel2: "HDL (mg/dL)",
      chartLabel3: "VLDL (mg/dL)",
      chartLabel4: "LDL/HDL",
      chartLabel5: "Triglycerides (mg/dL)",
      chartLabel6: "Total Cholesterol (mg/dL)",
    };
  }

  // Map through original data to create tableData
  const tableData = originalData.map((item, index) => ({
    "no.": index + 1,
    result: {
      status: item?.details?.total_message_flag || "unknown",
      name: item?.details?.total_message || "Unknown",
    },
    "ldl_(mg/dl)": item?.details?.ldl || "",
    "hdl_(mg/dl)": item?.details?.hdl || "",
    "vldl_(mg/dl)": item?.details?.vldl || "",
    "ldl/hdl_(mg/dl)": item?.details?.hdl_ldl || "",
    "triglycerides_(mg/dl)": item?.details?.triglycerides || "",
    ldl_message_flag: item?.details?.ldl_message_flag,
    triglycerides_message_flag: item?.details?.triglycerides_message_flag,
    hdl_message_flag: item?.details?.hdl_message_flag,
    "total_cholesterol_(mg/dl)": item?.details?.total || "",
    date: `${item.details?.date || ""} ${item.details?.time || ""}`,
    action:
      item?.consult_id === null
        ? [{ type: "edit", disabled: item?.freeze === 1 }, { type: "delete" }]
        : [{ type: "warning" }],
    name: "Lipid Profile",
    id: item.id,
    user_id: item.user_id,
    slug: "lipid-profile",
    lipid_profile: [
      {
        label: "LDL (mg/dL)",
        flagName: item?.details?.ldl_message,
        flagColor: item?.details?.ldl_message_flag,
        percent: item?.details?.ldl,
      },
      {
        label: "HDL (mg/dL)",
        flagName: item?.details?.hdl_message,
        flagColor: item?.details?.hdl_message_flag,
        percent: item?.details?.hdl,
      },
      {
        label: "VLDL (mg/dL)",
        flagName: item?.details?.vldl_message,
        flagColor: item?.details?.vldl_message_flag,
        percent: item?.details?.vldl,
      },
      {
        label: "HDL/LDL (mg/dL)",
        flagName: item?.details?.hdl_ldl_message,
        flagColor: item?.details?.hdl_ldl_message_flag,
        percent: item?.details?.hdl_ldl,
      },
      {
        label: "Triglycerides (mg/dL)",
        flagName: item?.details?.triglycerides_message,
        flagColor: item?.details?.triglycerides_message_flag,
        percent: item?.details?.triglycerides,
      },
    ],
  }));

  // Create badges
  const badge = [
    {
      label: `Total Cholesterol: ${
        tableData[0]?.["total_cholesterol_(mg/dl)"] || "N/A"
      } mg/dl`,
      color: `${tableData[0]?.result.status}`,
    },
    {
      label: `LDL: ${tableData[0]?.["ldl_(mg/dl)"] || "N/A"} mg/dl`,
      color: `${tableData[0]?.ldl_message_flag}`,
    },
    {
      label: `HDL: ${tableData[0]?.["hdl_(mg/dl)"] || "N/A"} mg/dl`,
      color: `${tableData[0]?.hdl_message_flag}`,
    },
    {
      label: `Triglycerides: ${
        tableData[0]?.["triglycerides_(mg/dl)"] || "N/A"
      } mg/dl`,
      color: `${tableData[0]?.triglycerides_message_flag}`,
    },
  ];

  return {
    id: 8,
    icon: Assets.VitalLipid,
    name: "Lipid Profile",
    date: `Recently Added ${
      tableData[0]?.date.split(" ")[0].split("-").reverse().join("-") || "-"
    }`,
    category: "Metabolic And Biochemical Profile",
    badge,
    columnsData: [
      { id: 1, label: "NO." },
      { id: 2, label: "LIPID PROFILE" },
      // { id: 3, label: "LDL (mg/dL)" },
      // { id: 4, label: "HDL (mg/dL)" },
      // { id: 5, label: "VLDL (mg/dL)" },
      // { id: 6, label: "LDL/HDL (mg/dL)" },
      // { id: 7, label: "TRIGLYCERIDES (mg/dL)" },
      { id: 8, label: "TOTAL CHOLESTEROL (mg/dL)" },
      { id: 9, label: "DATE" },
      { id: 10, label: "ACTION" },
    ],
    tableData,
    chartLabel1: "LDL (mg/dL)",
    chartLabel2: "HDL (mg/dL)",
    chartLabel3: "VLDL (mg/dL)",
    chartLabel4: "LDL/HDL",
    chartLabel5: "Triglycerides (mg/dL)",
    chartLabel6: "Total Cholesterol (mg/dL)",
    total: pagination?.total,
  };
};

export const transformHematocritData = (originalData, pagination) => {
  if (!Array.isArray(originalData) || originalData.length === 0) {
    return {
      id: 4,
      icon: Assets.VitalHCT,
      name: "Hematocrit (HCT)",
      date: "-",
      total: 0,
      category: "Hematologic Profile",
      badge: [],
      columnsData: [
        { id: 1, label: "NO." },
        { id: 2, label: "RESULT" },
        { id: 3, label: "HCT %" },
        { id: 4, label: "DATE" },
        { id: 5, label: "ACTION" },
      ],
      tableData: [],
      chartLabel1: "HCT (%)",
    };
  }

  // Map through original data to create tableData
  const tableData = originalData?.map((item, index) => ({
    "no.": index + 1,
    result: {
      status: item?.details?.hctFlagColor,
      name: item?.details?.hctFlag || "Unknown",
    },
    "hct_%": item?.details?.hct || 0,
    date: `${item.details.date} ${item.details.time || ""}`,
    action:
      item?.consult_id === null
        ? [{ type: "edit", disabled: item?.freeze === 1 }, { type: "delete" }]
        : [{ type: "warning" }],
    name: "Hematocrit (HCT)",
    id: item.id,
    user_id: item.user_id,
    slug: "hct",
  }));

  // Create badge and other static information
  const badge =
    tableData.length > 0
      ? [
          {
            label: `${tableData[0]["hct_%"]} %`,
            color: tableData[0].result.status,
          },
        ]
      : [];

  return {
    id: 4,
    icon: Assets.VitalHCT,
    name: "Hematocrit (HCT)",
    date: `Recently Added ${tableData[0].date
      .split(" ")[0]
      .split("-")
      .reverse()
      .join("-")}`,
    category: "Hematologic Profile",
    badge,
    columnsData: [
      { id: 1, label: "NO." },
      { id: 2, label: "RESULT" },
      { id: 3, label: "HCT %" },
      { id: 4, label: "DATE" },
      { id: 5, label: "ACTION" },
    ],
    tableData,
    chartLabel1: "HCT (%)",
    total: pagination?.total,
  };
};

export const transformHemoglobinData = (originalData, pagination) => {
  if (!Array.isArray(originalData) || originalData.length === 0) {
    return {
      id: 6,
      icon: Assets.VitalHae,
      name: "Hemoglobin",
      date: "-",
      category: "Hematologic Profile",
      badge: [],
      columnsData: [
        { id: 1, label: "NO." },
        { id: 2, label: "RESULT" },
        { id: 3, label: "HEMOGLOBIN (g/dL)" },
        { id: 4, label: "DATE" },
        { id: 5, label: "ACTION" },
      ],
      tableData: [],
      chartLabel1: "Hemoglobin (g/dL)",
      total: 0,
    };
  }

  // Map through original data to create tableData
  const tableData = originalData.map((item, index) => ({
    "no.": index + 1,
    result: {
      status: item?.details?.hemoglobinFlagColor,
      name: item?.details?.hemoglobinFlag || "Unknown",
    },
    "hemoglobin_(g/dl)": item?.details?.hemoglobin || "N/A",
    hemoglobinValue: item?.details?.hemoglobin || "N/A",
    date: `${item.details.date} ${item.details.time || ""}`,
    action:
      item?.consult_id === null
        ? [{ type: "edit", disabled: item?.freeze === 1 }, { type: "delete" }]
        : [{ type: "warning" }],
    name: "Hemoglobin",
    id: item.id,
    user_id: item.user_id,
    slug: "hemoglobin",
  }));

  // Create badge and other static information
  const badge =
    tableData.length > 0
      ? [
          {
            label: `${tableData[0]["hemoglobin_(g/dl)"]} g/dL`,
            color: tableData[0].result.status,
          },
        ]
      : [];

  return {
    id: 6,
    icon: Assets.VitalHae,
    name: "Hemoglobin",
    date: `Recently Added ${tableData[0].date
      .split(" ")[0]
      .split("-")
      .reverse()
      .join("-")}`,
    category: "Hematologic Profile",
    badge,
    columnsData: [
      { id: 1, label: "NO." },
      { id: 2, label: "RESULT" },
      { id: 3, label: "HEMOGLOBIN (g/dL)" },
      { id: 4, label: "DATE" },
      { id: 5, label: "ACTION" },
    ],
    tableData,
    chartLabel1: "Hemoglobin (g/dL)",
    total: pagination?.total,
  };
};

export const transformBloodKetoneData = (originalData, pagination) => {
  if (!Array.isArray(originalData) || originalData.length === 0) {
    return {
      id: 7,
      icon: Assets.BKetone,
      name: "Blood Ketone",
      date: "-",
      category: "Hematologic Profile",
      badge: [],
      columnsData: [
        { id: 1, label: "NO." },
        { id: 2, label: "RESULT" },
        { id: 3, label: "BLOOD KETONE (mmol/L)" },
        { id: 4, label: "DATE" },
        { id: 5, label: "ACTION" },
      ],
      tableData: [],
      chartLabel1: "Blood Ketone (mmol/L)",
    };
  }

  // Map through original data to create tableData
  const tableData = originalData.map((item, index) => ({
    "no.": index + 1,
    result: {
      status: item?.details?.keytoneFlagColor,
      name: item?.details?.keytoneFlag || "Unknown",
    },
    "blood_ketone_(mmol/l)": item?.details?.keytone || "N/A",
    blood_ketone_value: item?.details?.keytone || "N/A",
    date: `${item.details.date} ${item.details.time || ""}`,
    action:
      item?.consult_id === null
        ? [{ type: "edit", disabled: item?.freeze === 1 }, { type: "delete" }]
        : [{ type: "warning" }],
    name: "Blood Ketone",
    id: item.id,
    user_id: item.user_id,
    slug: "keytone",
  }));

  // Create badge and other static information
  const badge =
    tableData.length > 0
      ? [
          {
            label: `${tableData[0]["blood_ketone_(mmol/l)"]} mmol/L`,
            color: tableData[0].result.status,
          },
        ]
      : [];

  return {
    id: 7,
    icon: Assets.BKetone,
    name: "Blood Ketone",
    date: `Recently Added ${tableData[0].date
      .split(" ")[0]
      .split("-")
      .reverse()
      .join("-")}`,
    category: "Hematologic Profile",
    badge,
    columnsData: [
      { id: 1, label: "NO." },
      { id: 2, label: "RESULT" },
      { id: 3, label: "BLOOD KETONE (mmol/L)" },
      { id: 4, label: "DATE" },
      { id: 5, label: "ACTION" },
    ],
    tableData,
    chartLabel1: "Blood Ketone (mmol/L)",
    total: pagination?.total,
  };
};

export const transformBloodUricAcidData = (originalData, pagination) => {
  if (!Array.isArray(originalData) || originalData.length === 0) {
    return {
      id: 13,
      icon: Assets.BUAcid,
      name: "Blood Uric Acid",
      date: "-",
      category: "Hematologic Profile",
      badge: [],
      columnsData: [
        { id: 1, label: "NO." },
        { id: 2, label: "RESULT" },
        { id: 3, label: "BLOOD URIC ACID (mg/dL)" },
        { id: 4, label: "DATE" },
        { id: 5, label: "ACTION" },
      ],
      tableData: [],
      chartLabel1: "Blood Uric Acid (mg/dL)",
      total: 0,
    };
  }

  // Map through original data to create tableData
  const tableData = originalData.map((item, index) => ({
    "no.": index + 1,
    result: {
      status: item?.details?.uricFlagColor,
      name: item?.details?.uricFlag || "Unknown",
    },
    "blood_uric_acid_(mg/dl)": item?.details?.uric_acid || "N/A",
    blood_uric_acid_value: item?.details?.uric_acid || "N/A",
    date: `${item.details.date} ${item.details.time || ""}`,
    action:
      item?.consult_id === null
        ? [{ type: "edit", disabled: item?.freeze === 1 }, { type: "delete" }]
        : [{ type: "warning" }],
    name: "Blood Uric Acid",
    id: item.id,
    user_id: item.user_id,
    slug: "uric_acid",
  }));

  // Create badge and other static information
  const badge =
    tableData.length > 0
      ? [
          {
            label: `${tableData[0]["blood_uric_acid_(mg/dl)"]} mg/dL`,
            color: tableData[0].result.status,
            // color: "success",
          },
        ]
      : [];

  return {
    id: 13,
    icon: Assets.BUAcid,
    name: "Blood Uric Acid",
    date: `Recently Added ${tableData[0].date
      .split(" ")[0]
      .split("-")
      .reverse()
      .join("-")}`,
    category: "Hematologic Profile",
    badge,
    columnsData: [
      { id: 1, label: "NO." },
      { id: 2, label: "RESULT" },
      { id: 3, label: "BLOOD URIC ACID (mg/dL)" },
      { id: 4, label: "DATE" },
      { id: 5, label: "ACTION" },
    ],
    tableData,
    chartLabel1: "Blood Uric Acid (mg/dL)",
    total: pagination?.total,
  };
};

export const transformUreaData = (originalData, pagination) => {
  if (!Array.isArray(originalData) || originalData.length === 0) {
    return {
      id: 15,
      icon: Assets.Urea,
      name: "Urea",
      date: "-",
      category: "Renal And Metabolic Markers",
      badge: [],
      columnsData: [
        { id: 1, label: "NO." },
        { id: 2, label: "RESULT" },
        { id: 3, label: "UREA (mg/dL)" },
        { id: 4, label: "DATE" },
        { id: 5, label: "ACTION" },
      ],
      tableData: [],
      chartLabel1: "Urea (mg/dL)",
      total: 0,
    };
  }

  // Map through original data to create tableData
  const tableData = originalData.map((item, index) => ({
    "no.": index + 1,
    result: {
      status: item?.details?.ureaFlagColor,
      name: item?.details?.ureaFlag || "Unknown",
    },
    "urea_(mg/dl)": item.details?.urea || "N/A",
    urea_value: item?.details?.urea || "N/A",
    date: `${item.details.date} ${item.details.time || ""}`,
    action:
      item?.consult_id === null
        ? [{ type: "edit", disabled: item?.freeze === 1 }, { type: "delete" }]
        : [{ type: "warning" }],
    name: "Urea",
    id: item.id,
    user_id: item.user_id,
    slug: "urea",
  }));

  // Create badge and other static information
  const badge =
    tableData.length > 0
      ? [
          {
            label: `${tableData[0]["urea_(mg/dl)"]} mg/dL`,
            color: tableData[0].result.status,
          },
        ]
      : [];

  return {
    id: 15,
    icon: Assets.Urea,
    name: "Urea",
    date: `Recently Added ${
      tableData.length > 0
        ? tableData[0].date.split(" ")[0].split("-").reverse().join("-")
        : "-"
    }`,
    category: "Renal And Metabolic Markers",
    badge,
    columnsData: [
      { id: 1, label: "NO." },
      { id: 2, label: "RESULT" },
      { id: 3, label: "UREA (mg/dL)" },
      { id: 4, label: "DATE" },
      { id: 5, label: "ACTION" },
    ],
    tableData,
    chartLabel1: "Urea (mg/dL)",
    total: pagination?.total,
  };
};

export const transformCreatinineData = (originalData, pagination) => {
  if (!Array.isArray(originalData) || originalData.length === 0) {
    return {
      id: 16,
      icon: Assets.Creatinine,
      name: "Creatinine",
      date: "-",
      category: "Renal And Metabolic Markers",
      badge: [],
      columnsData: [
        { id: 1, label: "NO." },
        { id: 2, label: "RESULT" },
        { id: 3, label: "CREATININE (mg/dL)" },
        { id: 4, label: "DATE" },
        { id: 5, label: "ACTION" },
      ],
      tableData: [],
      total: 0,
      chartLabel1: "Creatinine (mg/dL)",
    };
  }

  // Map through original data to create tableData
  const tableData = originalData.map((item, index) => ({
    "no.": index + 1,
    result: {
      status: item?.details?.creatinineFlagColor,
      name: item?.details?.creatinineFlag || "Unknown",
    },
    "creatinine_(mg/dl)": item?.details?.creatinine || "N/A",
    creatinine_value: item?.details?.creatinine || "N/A",
    date: `${item?.details?.date} ${item?.details?.time || ""}`,
    action:
      item?.consult_id === null
        ? [{ type: "edit", disabled: item?.freeze === 1 }, { type: "delete" }]
        : [{ type: "warning" }],
    name: "Creatinine",
    id: item?.id,
    user_id: item?.user_id,
    slug: "creatinine",
  }));

  // Create badge and other static information
  const badge =
    tableData.length > 0
      ? [
          {
            label: `${tableData[0]["creatinine_(mg/dl)"]} mg/dL`,
            color: tableData[0]?.result?.status,
          },
        ]
      : [];

  return {
    id: 16,
    icon: Assets.Creatinine,
    name: "Creatinine",
    date: `Recently Added ${tableData[0].date
      .split(" ")[0]
      .split("-")
      .reverse()
      .join("-")}`,
    category: "Renal And Metabolic Markers",
    badge,
    columnsData: [
      { id: 1, label: "NO." },
      { id: 2, label: "RESULT" },
      { id: 3, label: "CREATININE (mg/dL)" },
      { id: 4, label: "DATE" },
      { id: 5, label: "ACTION" },
    ],
    tableData,
    chartLabel1: "Creatinine (mg/dL)",
    total: pagination?.total,
  };
};

export const transformGFRData = (originalData, pagination) => {
  if (!Array.isArray(originalData) || originalData.length === 0) {
    return {
      id: 17,
      icon: Assets.GFR,
      name: "GFR",
      date: "-",
      category: "Renal And Metabolic Markers",
      badge: [],
      columnsData: [
        { id: 1, label: "NO." },
        { id: 2, label: "RESULT" },
        { id: 3, label: "GFR (mL/min/1.73m²)" },
        { id: 4, label: "DATE" },
        { id: 5, label: "ACTION" },
      ],
      tableData: [],
      total: 0,
      chartLabel1: "GFR (mL/min/1.73m²)",
    };
  }

  // Map through original data to create tableData
  const tableData = originalData.map((item, index) => ({
    "no.": index + 1,
    result: {
      status: item?.details?.gfrFlagColor,
      name: item?.details?.gfrFlag || "Unknown",
    },
    "gfr_(ml/min/1.73m²)": item?.details?.gfr || "N/A",
    gfr_value: item?.details?.gfr || "N/A",
    date: `${item?.details?.date} ${item?.details?.time || ""}`,
    action:
      item?.consult_id === null
        ? [{ type: "edit", disabled: item?.freeze === 1 }, { type: "delete" }]
        : [{ type: "warning" }],
    name: "GFR",
    id: item.id,
    user_id: item.user_id,
    slug: "gfr",
  }));

  // Create badge and other static information
  const badge =
    tableData.length > 0
      ? [
          {
            label: `${tableData[0]["gfr_(ml/min/1.73m²)"]} mL/min/1.73m²`,
            color: tableData[0].result.status,
          },
        ]
      : [];

  return {
    id: 17,
    icon: Assets.GFR,
    name: "GFR",
    date: `Recently Added ${tableData[0].date
      .split(" ")[0]
      .split("-")
      .reverse()
      .join("-")}`,
    category: "Renal And Metabolic Markers",
    badge,
    columnsData: [
      { id: 1, label: "NO." },
      { id: 2, label: "RESULT" },
      { id: 3, label: "GFR (mL/min/1.73m²)" },
      { id: 4, label: "DATE" },
      { id: 5, label: "ACTION" },
    ],
    tableData,
    chartLabel1: "GFR (mL/min/1.73m²)",
    total: pagination?.total,
  };
};

export const transformUrinalysisData = (originalData, pagination) => {
  if (!Array.isArray(originalData) || originalData.length === 0) {
    return {
      id: 14,
      icon: Assets.Urinalysis,
      name: "Urinalysis",
      date: "-",
      category: "Renal And Metabolic Markers",
      badge: [],
      columnsData: [
        { id: 1, label: "NO." },
        { id: 2, label: "COLOR" },
        { id: 3, label: "CLARITY" },
        { id: 4, label: "PH" },
        { id: 5, label: "PROTEIN" },
        { id: 6, label: "GLUCOSE" },
        { id: 7, label: "LEUKOCYTE" },
        { id: 8, label: "BILIRUBIN" },
        { id: 9, label: "ACTION" },
      ],
      tableData: [],
      chartLabel1: "Specific gravity",
      chartLabel2: "PH",
      chartLabel3: "Urobilinogen",
      chartLabel4: "Red Blood Cells",
      chartLabel5: "White Blood Cells",
      total: 0,
    };
  }

  // Map through original data to create tableData
  const tableData = originalData.map((item, index) => ({
    "no.": index + 1,
    color: item?.details?.color || "N/A",
    specific_gravity: item?.details?.specific_gravity || "N/A",
    ph: item?.details?.ph || "N/A",
    clarity: item?.details?.clarity || "N/A",
    protein: item?.details?.protein || "N/A",
    glucose: item?.details?.glucose || "N/A",
    leukocyte: item?.details?.leukocytes || "N/A",
    leukocytes_flag: item?.details?.leukocytes_flag,
    bilirubin: item?.details?.bilirubin || "N/A",
    urobilinogen: item?.details?.urobilinogen || "N/A",
    red_blood_cells: item?.details?.red_blood_cells || "N/A",
    white_blood_cells: item?.details?.white_blood_cells || "N/A",
    date: `${item.details.date} ${item.details.time || ""}`,
    action:
      item?.consult_id === null
        ? [{ type: "edit", disabled: item?.freeze === 1 }, { type: "delete" }]
        : [{ type: "warning" }],
    name: "Urinalysis",
    id: item.id,
    user_id: item.user_id,
  }));

  // Create badges based on the first item in tableData if available
  const badge =
    tableData.length > 0
      ? [
          { label: `Color: ${tableData[0].color}`, color: "success" },
          { label: `Clarity: ${tableData[0].clarity}`, color: "success" },
          { label: `Glucose: ${tableData[0].glucose}`, color: "success" },
          {
            label: `Specific Gravity: ${tableData[0].specific_gravity}`,
            color: "success",
          },
          { label: `PH: ${tableData[0].ph}`, color: "success" },
          { label: `Protein: ${tableData[0].protein}`, color: "success" },
        ]
      : [];

  return {
    id: 14,
    icon: Assets.Urinalysis,
    name: "Urinalysis",
    date: `Recently Added ${tableData[0].date
      .split(" ")[0]
      .split("-")
      .reverse()
      .join("-")}`,
    category: "Renal And Metabolic Markers",
    badge,
    columnsData: [
      { id: 1, label: "NO." },
      { id: 2, label: "COLOR" },
      { id: 3, label: "CLARITY" },
      { id: 4, label: "PH" },
      { id: 5, label: "PROTEIN" },
      { id: 6, label: "GLUCOSE" },
      { id: 7, label: "LEUKOCYTE" },
      { id: 8, label: "BILIRUBIN" },
      { id: 9, label: "ACTION" },
    ],
    tableData,
    chartLabel1: "Specific gravity",
    chartLabel2: "PH",
    chartLabel3: "Urobilinogen",
    chartLabel4: "Red Blood Cells",
    chartLabel5: "White Blood Cells",
    total: pagination?.total,
  };
};

import { Assets } from "../../../../../../assets/Assets";

export const transformBPData = (originalData, pagination) => {
  if (!Array.isArray(originalData) || originalData.length === 0) {
    return {
      id: 1,
      icon: Assets.VitalBP,
      name: "Blood Pressure",
      date: "-",
      category: "Primary Vitals",
      badge: [],
      columnsData: [
        { id: 1, label: "NO." },
        { id: 2, label: "RESULT" },
        { id: 3, label: "SYSTOLIC" },
        { id: 4, label: "DIASTOLIC" },
        { id: 5, label: "PULSE (IN BPM)" },
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
    systolic: item.details.systolic || "N/A",
    diastolic: item.details.diastolic || "N/A",
    "pulse_(in_bpm)": item.details.pulse || "N/A",
    date: `${item.details.date} ${item.details.time || ""}`,
    action:
      item.freeze === 1
        ? [{ type: "warning" }]
        : [{ type: "edit" }, { type: "delete" }],
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
            label: `${tableData[0]["pulse_(in_bpm)"]} Pulse (bpm)`,
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
      { id: 5, label: "PULSE (IN BPM)" },
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
      category: "Primary Vitals",
      badge: [],
      columnsData: [
        { id: 1, label: "NO." },
        { id: 2, label: "RESULT" },
        { id: 3, label: "BMI (kg/m²)" },
        { id: 4, label: "Height (cm)" },
        { id: 5, label: "Weight (kg)" },
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
      item.freeze === 1
        ? [{ type: "warning" }]
        : [{ type: "edit" }, { type: "delete" }],
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
      { id: 4, label: "Height (cm)" },
      { id: 5, label: "Weight (kg)" },
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
      category: "Primary Vitals",
      badge: [],
      columnsData: [
        { id: 1, label: "NO." },
        { id: 2, label: "RESULT" },
        { id: 3, label: "Respiration Rate (BPM)" },
        { id: 4, label: "DATE" },
        { id: 5, label: "ACTION" },
      ],
      tableData: [],
      chartLabel1: "Respiration Rate (BPM)",
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
      item.freeze === 1
        ? [{ type: "warning" }]
        : [{ type: "edit" }, { type: "delete" }],
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
      { id: 3, label: "Respiration Rate (BPM)" },
      { id: 4, label: "DATE" },
      { id: 5, label: "ACTION" },
    ],
    tableData,
    chartLabel1: "Respiration Rate (BPM)",
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
      category: "Primary Vitals",
      badge: [],
      columnsData: [
        { id: 1, label: "NO." },
        { id: 2, label: "RESULT" },
        { id: 3, label: "SpO2" },
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
    spo2: item.details.spo2 + "" + item?.details?.unit || "N/A",
    date: `${item.details.date} ${item.details.time || ""}`,
    action:
      item.freeze === 1
        ? [{ type: "warning" }]
        : [{ type: "edit" }, { type: "delete" }],
    name: "SpO2",
    id: item.id,
    user_id: item.user_id,
    slug: "spO2",
    unit: item?.details?.unit,
  }));

  // Create badge and other static information
  const badge =
    tableData.length > 0
      ? [
          {
            label: `${tableData[0].spo2}`,
            color: tableData[0].result.status,
          },
        ]
      : [];

  return {
    id: 10,
    icon: Assets.SpO2,
    name: "SpO2",
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
      { id: 3, label: "SpO2" },
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
      category: "Primary Vitals",
      badge: [],
      columnsData: [
        { id: 1, label: "NO." },
        { id: 2, label: "RESULT" },
        { id: 3, label: "Temperature" },
        { id: 4, label: "Method" },
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
    temperature: `${item?.details?.temperature}${
      item?.details?.unit === "Fahrenheit" ? "°F" : "°C" || "N/A"
    }`,
    method: item?.details?.type,
    date: `${item?.details?.date} ${item?.details?.time || ""}`,
    action:
      item.freeze === 1
        ? [{ type: "warning" }]
        : [{ type: "edit" }, { type: "delete" }],
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
      { id: 3, label: "Temperature" },
      { id: 4, label: "Method" },
      { id: 5, label: "DATE" },
      { id: 6, label: "ACTION" },
    ],
    tableData,
    chartLabel1: "Temperature(°F / °C)",
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
      category: "Primary Vitals",
      badge: [],
      columnsData: [
        { id: 1, label: "NO." },
        { id: 2, label: "RESULT" },
        { id: 3, label: "FVC (L)" },
        { id: 4, label: "FEV1 (L)" },
        { id: 5, label: "PEF (L/s)" },
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
    "fvc_(l)": item?.details?.fvc || "N/A",
    "fev1_(l)": item?.details?.fev1 || "N/A",
    "fev1/fvc_(%)": item?.details?.fev1_fvc || "N/A",
    "pef_(l/s)": item?.details?.pef || "N/A",
    date: `${item.details.date} ${item.details.time || ""}`,
    action:
      item.freeze === 1
        ? [{ type: "warning" }]
        : [{ type: "edit" }, { type: "delete" }],
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
  }));

  // Create badge and other static information
  const badge = [
    {
      label: `FVC (%): ${tableData[0]?.["fvc_(l)"] || "N/A"}`,
      color: tableData[0].result.status,
    },
    {
      label: `FEV1 (%): ${tableData[0]?.["fev1_(l)"] || "N/A"}`,
      color: tableData[0].result.status,
    },

    {
      label: `PEF (%): ${tableData[0]?.["pef_(l/s)"] || "N/A"}`,
      color: tableData[0].result.status,
    },
    {
      label: `FEV1/FVC Ratio (%): ${tableData[0]?.["fev1/fvc_(%)"] || "N/A"}`,
      color: tableData[0].result.status,
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
      { id: 2, label: "RESULT" },
      { id: 3, label: "FVC (L)" },
      { id: 4, label: "FEV1 (L)" },
      { id: 5, label: "PEF (L/s)" },
      { id: 6, label: "FEV1/FVC (%)" },
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
      category: "Primary Vitals",
      badge: [],
      columnsData: [
        { id: 1, label: "NO." },
        { id: 2, label: "RESULT" },
        { id: 3, label: "HR (bpm)" },
        { id: 4, label: "Type" },
        { id: 5, label: "Result File" },
        { id: 6, label: "Interpretation" },
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
      item.freeze === 1
        ? [{ type: "warning" }]
        : [{ type: "edit" }, { type: "delete" }],
    name: "Heart",
    type: item?.details?.type || "Unknown",
    interpretation: item?.details?.interpretation || "-",
    result_file: item?.details?.result_file || "-",
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
      { id: 4, label: "Type" },
      { id: 5, label: "Result File" },
      { id: 6, label: "Interpretation" },
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
      category: "Metabolic And Biochemical Profile",
      badge: [],
      columnsData: [
        { id: 1, label: "NO." },
        { id: 2, label: "RESULT" },
        { id: 3, label: "Blood Sugar" },
        { id: 4, label: "Type" },
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
    blood_sugar: item?.details?.blood_sugar || "N/A",
    blood_sugar_value: item?.details?.blood_sugar || "N/A",
    type: item?.details?.type || "N/A",
    date: `${item.details.date} ${item.details.time || ""}`,
    action:
      item.freeze === 1
        ? [{ type: "warning" }]
        : [{ type: "edit" }, { type: "delete" }],
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
            label: `${tableData[0]["blood_sugar"]} mg/dL`,
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
      { id: 3, label: "Blood Sugar" },
      { id: 4, label: "Type" },
      { id: 5, label: "DATE" },
      { id: 6, label: "ACTION" },
    ],
    tableData,
    chartLabel1: "Blood Sugar (mg/dL)",
    chartLabel2: "Type",
    total: pagination?.total,
  };
};

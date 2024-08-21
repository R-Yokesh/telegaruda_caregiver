import { Assets } from "../../../../../../assets/Assets";

export const transformBPData = (originalData) => {
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
  };
};

export const transformBMIData = (originalData) => {
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
    date: item?.details?.date || "N/A",
    action:
      item.freeze === 1
        ? [{ type: "warning" }]
        : [{ type: "edit" }, { type: "delete" }],
    name: "BMI",
    id: item.id,
    user_id: item.user_id,
    slug: "bmi",
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
  };
};

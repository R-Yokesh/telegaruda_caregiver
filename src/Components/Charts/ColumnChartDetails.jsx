import React from "react";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const ColumnChartDetails = ({ datas }) => {
  function removePercent(str) {
    // Remove trailing percent sign (%) using String.replace() method
    // Replace '%' with an empty string ''
    return str?.replace("%", "");
  }
  // Transform tableData to the desired format
  const formattedData = datas?.tableData?.map((item) => ({
    name: item?.date?.split(" ")[0].split("-").reverse().join("-"),
    data1: parseFloat(
      item?.["blood_ketone_value"] ||
        item?.["hemoglobinValue"] ||
        item?.["bmi_(kg/m²)"] ||
        item?.["blood_sugar_value"] ||
        item?.["pulse_(in_bpm)"] ||
        item?.["hr_(bpm)"] ||
        item?.["respiration_rate_(bpm)"] ||
        removePercent(item?.["spo2"]) ||
        item?.["hct_%"] ||
        item?.["fvc_(l)"] ||
        item?.["totalOnly"] ||
        item?.["specific_gravity"] ||
        item?.["temperature"] ||
        item?.["blood_uric_acid_value"] ||
        item?.["urea_value"] ||
        item?.["creatinine_value"] ||
        item?.["gfr_value"] ||
        item?.["ldl(mg/dl)"]
    ),

    data2: parseInt(
      item?.["systolic"]
        ? item?.["systolic"]
        : item?.["fev1_(l)"]
        ? item?.["fev1_(l)"]
        : item?.["hdl(mg/dl)"]
        ? item?.["hdl(mg/dl)"]
        : item?.["ph"]
        ? item?.["ph"]
        : item?.["temperature_fahrenheit"]
        ? item?.["temperature_fahrenheit"]
        : ""
    ),

    data3: parseInt(
      item?.["diastolic"]
        ? item?.["diastolic"]
        : item?.["fev1/fvc_(%)"]
        ? item?.["fev1/fvc_(%)"]
        : item?.["vldl(mg/dl)"]
        ? item?.["vldl(mg/dl)"]
        : item?.["urobilinogen"]
        ? item?.["urobilinogen"]
        : ""
    ),

    data4: parseInt(
      item?.["pef_(l/s)"]
        ? item?.["pef_(l/s)"]
        : item?.["ldl/hdl(mg/dl)"]
        ? item?.["ldl/hdl(mg/dl)"]
        : item?.["red_blood_cells"]
        ? item?.["red_blood_cells"]
        : ""
    ),

    data5: parseInt(
      item?.["triglycerides(mg/dl)"]
        ? item?.["triglycerides(mg/dl)"]
        : item?.["white_blood_cells"]
        ? item?.["white_blood_cells"]
        : ""
    ),
    data6: parseInt(
      item?.["total_cholesterol(mg/dl)"]
        ? item?.["total_cholesterol(mg/dl)"]
        : ""
    ),
    // For temperature C / F
    unit: item.unit,
  }));

  const minValue = Math?.min(...formattedData?.map((item) => item.data1));
  const maxValue = Math?.max(
    ...formattedData?.map((item) =>
      !isNaN(item?.data1) ? item?.data1 : -Infinity
    )
  );
  const bloodPressureValues = new Set(
    formattedData?.map((item) => datas?.name)
  ); // Create a Set with "Blood Pressure"

  const tooltipFormatter = (value, name, props) => {
    const item = formattedData.find((d) => d.name === props.payload.name);
    if (datas.slug === "temperature" && name === "data1") {
      const unit = item?.unit || "N/A";
      const temperature = item?.data1 || "N/A";
      return unit === "Celsius"
        ? [`Temperature: ${temperature}°C`]
        : [`Temperature: ${temperature}°F`];
    }

    if (name === "data1") {
      return [value, datas?.chartLabel1];
    }
    if (name === "data2") {
      return [value, datas?.chartLabel2];
    }
    if (name === "data3") {
      return [value, datas?.chartLabel3];
    }
    if (name === "data4") {
      return [value, datas?.chartLabel4];
    }
    if (name === "data5") {
      return [value, datas?.chartLabel5];
    }
    if (name === "data6") {
      return [value, datas?.chartLabel6];
    }
    return [name, value];
  };
  return (
    <BarChart
      width={1000}
      height={350}
      data={formattedData}
      margin={{ top: 20, right: 5, left: 10, bottom: 5 }}
    >
      <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
      <YAxis domain={[0, maxValue + 10]} axisLine={false} tickLine={false} />
      {/* {datas.name === "SpO2" ? (
        <Tooltip formatter={(value) => `${value}%`} />
      ) : ( */}
      <Tooltip formatter={tooltipFormatter} />

      {formattedData[0].data6 &&
      formattedData[0].data5 &&
      formattedData[0].data4 &&
      formattedData[0].data3 &&
      formattedData[0].data2 &&
      formattedData[0].data1 ? (
        <Legend
          payload={[
            { value: datas?.chartLabel1, type: "line", color: "#0084CF" },
            { value: datas?.chartLabel2, type: "line", color: "#166da9" },
            { value: datas?.chartLabel3, type: "line", color: "#1858c6" },
            { value: datas?.chartLabel4, type: "line", color: "#1858c7" },
            { value: datas?.chartLabel5, type: "line", color: "#1858c7" },
            { value: datas?.chartLabel6, type: "line", color: "#1858c7" },
          ]}
        />
      ) : formattedData[0].data5 &&
        formattedData[0].data4 &&
        formattedData[0].data3 &&
        formattedData[0].data2 &&
        formattedData[0].data1 ? (
        <Legend
          payload={[
            { value: datas?.chartLabel1, type: "line", color: "#0084CF" },
            { value: datas?.chartLabel2, type: "line", color: "#166da9" },
            { value: datas?.chartLabel3, type: "line", color: "#1858c6" },
            { value: datas?.chartLabel4, type: "line", color: "#1858c7" },
            { value: datas?.chartLabel5, type: "line", color: "#1858c7" },
          ]}
        />
      ) : formattedData[0].data4 &&
        formattedData[0].data3 &&
        formattedData[0].data2 &&
        formattedData[0].data1 ? (
        <Legend
          payload={[
            { value: datas?.chartLabel1, type: "line", color: "#0084CF" },
            { value: datas?.chartLabel2, type: "line", color: "#166da9" },
            { value: datas?.chartLabel3, type: "line", color: "#1858c6" },
            { value: datas?.chartLabel4, type: "line", color: "#1858c7" },
          ]}
        />
      ) : formattedData[0].data3 &&
        formattedData[0].data2 &&
        formattedData[0].data1 ? (
        <Legend
          payload={[
            { value: datas?.chartLabel1, type: "line", color: "#0084CF" },
            { value: datas?.chartLabel2, type: "line", color: "#166da9" },
            { value: datas?.chartLabel3, type: "line", color: "#1858c6" },
          ]}
        />
      ) : formattedData[0].data2 && formattedData[0].data1 ? (
        <Legend
          payload={[
            { value: datas?.chartLabel1, type: "line", color: "#0084CF" },
            { value: datas?.chartLabel2, type: "line", color: "#166da9" },
          ]}
        />
      ) : formattedData[0].data1 ? (
        <Legend
          payload={[
            { value: datas?.chartLabel1, type: "line", color: "#0084CF" },
          ]}
        />
      ) : null}
      <Bar dataKey="data1" fill="#0084CF" />
      {formattedData[0].data2 && <Bar dataKey="data2" fill="#166da9" />}
      {formattedData[0].data3 && <Bar dataKey="data3" fill="#1858c6" />}
      {formattedData[0].data4 && <Bar dataKey="data4" fill="#1858c7" />}
      {formattedData[0].data5 && <Bar dataKey="data5" fill="#1858c7" />}
      {formattedData[0].data6 && <Bar dataKey="data6" fill="#1858c7" />}
    </BarChart>
  );
};

export default ColumnChartDetails;

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
        item?.["pulse_(bpm)"] ||
        item?.["hr_(bpm)"] ||
        item?.["respiration_rate_(bpm)"] ||
        removePercent(item?.["spo2"]) ||
        item?.["hct_%"] ||
        item?.["fvc_(%)"] ||
        item?.["totalOnly"] ||
        item?.["specific_gravity"] ||
        item?.["temperatureValueF"] ||
        item?.["blood_uric_acid_value"] ||
        item?.["urea_value"] ||
        item?.["creatinine_value"] ||
        item?.["gfr_value"] ||
        item?.["ldl_(mg/dl)"] || 0
    ),

    data2: parseInt(
      item?.["systolic"]
        ? item?.["systolic"]
        : item?.["fev1_(%)"]
        ? item?.["fev1_(%)"]
        : item?.["hdl_(mg/dl)"]
        ? item?.["hdl_(mg/dl)"]
        : item?.["ph"]
        ? item?.["ph"]
        : item?.["temperature_fahrenheit"]
        ? item?.["temperature_fahrenheit"]
        : 0
    ),

    data3: parseInt(
      item?.["diastolic"]
        ? item?.["diastolic"]
        : item?.["fev1/fvc_(%)"]
        ? item?.["fev1/fvc_(%)"]
        : item?.["vldl_(mg/dl)"]
        ? item?.["vldl_(mg/dl)"]
        : item?.["urobilinogen"]
        ? item?.["urobilinogen"]
        : 0
    ),

    data4: parseInt(
      item?.["pef_(%)"]
        ? item?.["pef_(%)"]
        : item?.["ldl/hdl_(mg/dl)"]
        ? item?.["ldl/hdl_(mg/dl)"]
        : item?.["red_blood_cells"]
        ? item?.["red_blood_cells"]
        : 0
    ),

    data5: parseInt(
      item?.["triglycerides_(mg/dl)"]
        ? item?.["triglycerides_(mg/dl)"]
        : item?.["white_blood_cells"]
        ? item?.["white_blood_cells"]
        : 0
    ),
    data6: parseInt(
      item?.["total_cholesterol_(mg/dl)"]
        ? item?.["total_cholesterol_(mg/dl)"]
        : 0
    ),
    // For temperature C / F
    unit: item.unit,
  }))?.reverse();

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
    // if (datas.slug === "temperature" && name === "data1") {
    //   const unit = item?.unit || "N/A";
    //   const temperature = item?.data1 || "N/A";
    //   return unit === "Celsius"
    //     ? [`Temperature: ${temperature}°C`]
    //     : [`Temperature: ${temperature}°F`];
    // }

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
  const legendPayload = [];

  // Define the labels and their corresponding data checks
  const labels = [
    { key: "data6", label: datas?.chartLabel6, color: "#E5A000" },
    { key: "data5", label: datas?.chartLabel5, color: "#5157F3" },
    { key: "data4", label: datas?.chartLabel4, color: "#B37655" },
    { key: "data3", label: datas?.chartLabel3, color: "#8AC185" },
    { key: "data2", label: datas?.chartLabel2, color: "#EC5A5A" },
    { key: "data1", label: datas?.chartLabel1, color: "#0084CF" },
  ];

  // Check each data key and build the payload
  labels.forEach(({ key, label, color }) => {
    if (formattedData.some((entry) => entry[key])) {
      legendPayload.push({ value: label, type: "line", color });
    }
  });
    // Check if any entry in formattedData has the corresponding data points
    const hasData1 = formattedData.some((entry) => entry.data1);
    const hasData2 = formattedData.some((entry) => entry.data2);
    const hasData3 = formattedData.some((entry) => entry.data3);
    const hasData4 = formattedData.some((entry) => entry.data4);
    const hasData5 = formattedData.some((entry) => entry.data5);
    const hasData6 = formattedData.some((entry) => entry.data6);
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
      <Legend payload={legendPayload} />

      {/* {formattedData[0]?.data6 &&
      formattedData[0]?.data5 &&
      formattedData[0]?.data4 &&
      formattedData[0]?.data3 &&
      formattedData[0]?.data2 &&
      formattedData[0]?.data1 ? (
        <Legend
          payload={[
            { value: datas?.chartLabel1, type: "line", color: "#0084CF" },
            { value: datas?.chartLabel2, type: "line", color: "#EC5A5A" },
            { value: datas?.chartLabel3, type: "line", color: "#8AC185" },
            { value: datas?.chartLabel4, type: "line", color: "#B37655" },
            { value: datas?.chartLabel5, type: "line", color: "#5157F3" },
            { value: datas?.chartLabel6, type: "line", color: "#E5A000" },
          ]}
        />
      ) : formattedData[0]?.data5 &&
        formattedData[0]?.data4 &&
        formattedData[0]?.data3 &&
        formattedData[0]?.data2 &&
        formattedData[0]?.data1 ? (
        <Legend
          payload={[
            { value: datas?.chartLabel1, type: "line", color: "#0084CF" },
            { value: datas?.chartLabel2, type: "line", color: "#EC5A5A" },
            { value: datas?.chartLabel3, type: "line", color: "#8AC185" },
            { value: datas?.chartLabel4, type: "line", color: "#B37655" },
            { value: datas?.chartLabel5, type: "line", color: "#5157F3" },
          ]}
        />
      ) : formattedData[0]?.data4 &&
        formattedData[0]?.data3 &&
        formattedData[0]?.data2 &&
        formattedData[0]?.data1 ? (
        <Legend
          payload={[
            { value: datas?.chartLabel1, type: "line", color: "#0084CF" },
            { value: datas?.chartLabel2, type: "line", color: "#EC5A5A" },
            { value: datas?.chartLabel3, type: "line", color: "#8AC185" },
            { value: datas?.chartLabel4, type: "line", color: "#B37655" },
          ]}
        />
      ) : formattedData[0]?.data3 &&
        formattedData[0]?.data2 &&
        formattedData[0]?.data1 ? (
        <Legend
          payload={[
            { value: datas?.chartLabel1, type: "line", color: "#0084CF" },
            { value: datas?.chartLabel2, type: "line", color: "#EC5A5A" },
            { value: datas?.chartLabel3, type: "line", color: "#8AC185" },
          ]}
        />
      ) : formattedData[0]?.data2 && formattedData[0]?.data1 ? (
        <Legend
          payload={[
            { value: datas?.chartLabel1, type: "line", color: "#0084CF" },
            { value: datas?.chartLabel2, type: "line", color: "#EC5A5A" },
          ]}
        />
      ) : formattedData[0]?.data1 ? (
        <Legend
          payload={[
            { value: datas?.chartLabel1, type: "line", color: "#0084CF" },
          ]}
        />
      ) : null} */}
      {/* <Bar dataKey="data1" fill="#0084CF" />
      {formattedData[0]?.data2 && <Bar dataKey="data2" fill="#EC5A5A" />}
      {formattedData[0]?.data3 && <Bar dataKey="data3" fill="#8AC185" />}
      {formattedData[0]?.data4 && <Bar dataKey="data4" fill="#B37655" />}
      {formattedData[0]?.data5 && <Bar dataKey="data5" fill="#5157F3" />}
      {formattedData[0]?.data6 && <Bar dataKey="data6" fill="#E5A000" />} */}
      {hasData1 && <Bar dataKey="data1" fill="#0084CF" />}
    {hasData2 && <Bar dataKey="data2" fill="#EC5A5A" />}
    {hasData3 && <Bar dataKey="data3" fill="#8AC185" />}
    {hasData4 && <Bar dataKey="data4" fill="#B37655" />}
    {hasData5 && <Bar dataKey="data5" fill="#5157F3" />}
    {hasData6 && <Bar dataKey="data6" fill="#E5A000" />}
    </BarChart>
  );
};

export default ColumnChartDetails;

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
    name: item?.date.split(" ")[0],
    data1: parseInt(
      item?.["pulse_(in_bpm)"] ||
        item?.["heart_rate_(bpm)"] ||
        item?.["respiration_rate_(bpm)"] ||
        removePercent(item?.["spo2"]) ||
        item?.["fvc_(l)"] ||
        item?.["totalOnly"] ||
        item?.["chartValue"]
    ),
    data2: parseInt(item?.["ph"] ? item?.["ph"] : ""),
  }));
  const data = [
    {
      name: "21-03-2024",
      bloodPressure: 70,
    },
    {
      name: "22-03-2024",
      bloodPressure: 70,
    },
    {
      name: "23-03-2024",
      bloodPressure: 100,
    },
    {
      name: "24-03-2024",
      bloodPressure: 95,
    },
    {
      name: "25-03-2024",
      bloodPressure: 70,
    },
    {
      name: "26-03-2024",
      bloodPressure: 77,
    },
    {
      name: "27-03-2024",
      bloodPressure: 100,
    },
  ];
  const minValue = Math?.min(...formattedData?.map((item) => item.data1));
  const maxValue = Math?.max(
    ...formattedData?.map((item) =>
      !isNaN(item?.data1) ? item?.data1 : -Infinity
    )
  );
  const bloodPressureValues = new Set(
    formattedData?.map((item) => datas?.name)
  ); // Create a Set with "Blood Pressure"
  return (
    <BarChart
      width={720}
      height={300}
      data={formattedData}
      margin={{ top: 20, right: 5, left: 10, bottom: 5 }}
    >
      <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
      <YAxis domain={[0, maxValue + 10]} axisLine={false} tickLine={false} />
      {datas.name === "SpO2" ? (
        <Tooltip formatter={(value) => `${value}%`} />
      ) : (
        <Tooltip />
      )}
      <Legend
        payload={[...bloodPressureValues]?.map((value) => ({
          id: value, // Set id (optional)
          value: value, // Legend label
          color: "#0084CF",
        }))}
      />
      <Bar dataKey="data1" fill="#0084CF" />
      {formattedData[0].data2 && <Bar dataKey="data2" fill="#0094CF" />}
    </BarChart>
  );
};

export default ColumnChartDetails;

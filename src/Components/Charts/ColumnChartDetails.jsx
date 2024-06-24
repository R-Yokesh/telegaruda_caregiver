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

const ColumnChartDetails = () => {
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
  const minValue = Math.min(...data.map((item) => item.bloodPressure));
  const maxValue = Math.max(
    ...data.map((item) =>
      !isNaN(item?.bloodPressure) ? item?.bloodPressure : -Infinity
    )
  );
  const bloodPressureValues = new Set(data.map((item) => "Blood Pressure")); // Create a Set with "Blood Pressure"
  return (
    <BarChart
      width={720}
      height={300}
      data={data}
      margin={{ top: 20, right: 5, left: 10, bottom: 5 }}
    >
      <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
      <YAxis domain={[0, maxValue + 10]} axisLine={false} tickLine={false} />
      <Tooltip />
      <Legend
        payload={[...bloodPressureValues].map((value) => ({
          id: value, // Set id (optional)
          value: value, // Legend label
          color: "#0084CF",
        }))}
      />
      <Bar dataKey="bloodPressure" fill="#0084CF" />
    </BarChart>
  );
};

export default ColumnChartDetails;

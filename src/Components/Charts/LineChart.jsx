import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const LineChartDetails = ({ datas }) => {
  console.log(datas, "chart");

  function removePercent(str) {
    // Remove trailing percent sign (%) using String.replace() method
    // Replace '%' with an empty string ''
    return str?.replace("%", "");
  }

  // Transform tableData to the desired format
  const formattedData = datas?.tableData?.map((item) => ({
    name: item?.date?.split(" ")[0], // Extract date part only
    data1: parseInt(
      item?.["pulse_(in_bpm)"] ||
        item?.["heart_rate_(bpm)"] ||
        item?.["respiration_rate_(bpm)"] ||
        removePercent(item?.["spo2"]) ||
        item?.["fvc_(l)"] ||
        item?.["totalOnly"] ||
        item?.["chartValue"]
    ), // Convert pluse to integer if needed
    data2: parseInt(item?.["ph"] ? item?.["ph"] : ""),
  }));

  const data = [
    {
      name: "21-03-2024",
      amt: 70,
    },
    {
      name: "22-03-2024",
      amt: 70,
    },
    {
      name: "23-03-2024",
      amt: 100,
    },
    {
      name: "24-03-2024",
      amt: 95,
    },
    {
      name: "25-03-2024",
      amt: 70,
    },
    {
      name: "26-03-2024",
      amt: 77,
    },
    {
      name: "27-03-2024",
      amt: 100,
    },
  ];

  const minValue = Math?.min(...formattedData?.map((item) => item.data1));
  const maxValue = Math?.max(
    ...formattedData?.map((item) =>
      !isNaN(item?.data1) ? item?.data1 : -Infinity
    )
  );

  return (
    <LineChart
      width={750}
      height={300}
      data={formattedData}
      margin={{ top: 20, right: 5, left: 10, bottom: 5 }}
    >
      <XAxis
        dataKey="name"
        padding={{ left: 30, right: 30, bottom: 20 }}
        axisLine={false}
        tickLine={false}
      />
      <YAxis
        yMax={Math.min(...formattedData?.map((item) => item?.data1))}
        domain={[minValue, maxValue + 10]}
        axisLine={false}
        tickLine={false}
      />
      <CartesianGrid horizontal={true} vertical={false} strokeWidth={1} />
      <Line type="linear" dataKey="data1" stroke="#0084CF" dot={false} />
      {formattedData[0].data2 && (
        <Line type="linear" dataKey="data2" stroke="#0094CF" dot={false} />
      )}
    </LineChart>
  );
};

export default LineChartDetails;

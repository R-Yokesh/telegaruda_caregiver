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

const LineChartDetails = () => {
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
  const minValue = Math.min(...data.map((item) => item.amt));
  const maxValue = Math.max(
    ...data.map((item) => (!isNaN(item?.amt) ? item?.amt : -Infinity))
  );

  return (
    <LineChart
      width={750}
      height={300}
      data={data}
      margin={{ top: 20, right: 5, left: 10, bottom: 5 }}
    >
      <XAxis
        dataKey="name"
        padding={{ left: 30, right: 30, bottom: 20 }}
        axisLine={false}
        tickLine={false}
      />
      <YAxis
        yMax={Math.min(...data.map((item) => item.amt))}
        domain={[minValue, maxValue + 10]}
        axisLine={false}
        tickLine={false}
      />
      <CartesianGrid horizontal={true} vertical={false} strokeWidth={1} />
      <Line type="linear" dataKey="amt" stroke="#0084CF" dot={false} />
    </LineChart>
  );
};

export default LineChartDetails;

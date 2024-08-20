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
  function removePercent(str) {
    // Remove trailing percent sign (%) using String.replace() method
    // Replace '%' with an empty string ''
    return str?.replace("%", "");
  }

  // Transform tableData to the desired format
  const formattedData = datas?.tableData?.map((item) => ({
    name: item?.date?.split(" ")[0], // Extract date part only
    data1: parseFloat(
      item?.["blood_ketone_value"] ||
        item?.["hemoglobinValue"] ||
        item?.["bmi"] ||
        item?.["blood_sugar_value"] ||
        item?.["pulse_(in_bpm)"] ||
        item?.["heart_rate_(bpm)"] ||
        item?.["respiration_rate_(bpm)"] ||
        removePercent(item?.["spo2"]) ||
        removePercent(item?.["hct_%"]) ||
        item?.["fvc_(l)"] ||
        item?.["totalOnly"] ||
        item?.["chartValue"] ||
        item?.["temperature_value"] ||
        item?.["blood_uric_acid_value"] ||
        item?.["urea_value"] ||
        item?.["creatinine_value"] ||
        item?.["gfr_value"]
    ), // Convert pluse to integer if needed
    data2: parseInt(
      item?.["ph"]
        ? item?.["ph"]
        : item?.["systolic"]
        ? item?.["systolic"]
        : item?.["fev1_(l)"]
        ? item?.["fev1_(l)"]
        : ""
    ),
    data3: parseInt(item?.["diastolic"] ? item?.["diastolic"] : ""),
    
  }));

  const minValue = Math?.min(...formattedData?.map((item) => item.data1));
  const maxValue = Math?.max(
    ...formattedData?.map((item) =>
      !isNaN(item?.data1) ? item?.data1 : -Infinity
    )
  );
  // Custom tooltip formatter function
  const tooltipFormatter = (value, name, props) => {
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
    return [name, value];
  };
  return (
    <LineChart
      width={1000}
      height={350}
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
      <Tooltip formatter={tooltipFormatter} />
      {!formattedData[0].data2 && !formattedData[0].data3 ? (
        <Legend
          payload={[
            { value: datas?.chartLabel1, type: "line", color: "#0084CF" },
          ]}
        />
      ) : formattedData[0].data2 && !formattedData[0].data3 ? (
        <Legend
          payload={[
            { value: datas?.chartLabel1, type: "line", color: "#0084CF" },
            { value: datas?.chartLabel2, type: "line", color: "#166da9" },
          ]}
        />
      ) : (
        <Legend
          payload={[
            { value: datas?.chartLabel1, type: "line", color: "#0084CF" },
            { value: datas?.chartLabel2, type: "line", color: "#166da9" },
            { value: datas?.chartLabel3, type: "line", color: "#1858c6" },
          ]}
        />
      )}
      <CartesianGrid horizontal={true} vertical={false} strokeWidth={1} />
      <Line type="linear" dataKey="data1" stroke="#0084CF" />
      {formattedData[0].data2 && (
        <Line type="linear" dataKey="data2" stroke="#166da9" />
      )}
      {formattedData[0].data3 && (
        <Line type="linear" dataKey="data3" stroke="#1858c6" />
      )}
    </LineChart>
  );
};

export default LineChartDetails;

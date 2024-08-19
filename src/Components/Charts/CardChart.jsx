import React from "react";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";

const CardChart = ({ datas }) => {
  function removePercent(str) {
    // Remove trailing percent sign (%) using String.replace() method
    // Replace '%' with an empty string ''
    return str?.replace("%", "");
  }

  // Transform tableData to the desired format
  const formattedData = datas?.tableData?.map((item) => {
    const datePart = item?.date?.split(" ")[0]; // Extract date part only

    return {
      name: datePart,
      data1: parseInt(
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
      ),
    };
  });

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            padding: "10px",
          }}
        >
          <h5>{payload[0].payload.name}</h5>
          <p className="label">{`${datas?.chartLabel1} : ${payload[0].value}`}</p>
          {/* <p className="intro">{getIntroOfPage(label)}</p> */}
        </div>
      );
    }

    return null;
  };
  return (
    <>
      <LineChart
        width={250}
        height={90}
        data={formattedData}
        margin={{ top: 20, right: 5, left: 10, bottom: 5 }}
      >
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          dataKey="data1"
          stroke="#0084CF"
          strokeWidth={2}
        />
      </LineChart>
    </>
  );
};

export default CardChart;

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
    const datePart = item?.date?.split(" ")[0].split("-").reverse().join("-"); // Extract date part only

    return {
      name: datePart,
      data1: parseInt(
        item?.["blood_ketone_value"] ||
          item?.["hemoglobinValue"] ||
          item?.["bmi_(kg/m²)"] ||
          item?.["blood_sugar_value"] ||
          item?.["pulse_(bpm)"] ||
          item?.["hr_(bpm)"] ||
          item?.["respiration_rate_(bpm)"] ||
          item?.["spo2"] ||
          item?.["hct_%"] ||
          item?.["fev1/fvc_(%)"] ||
          item?.["totalOnly"] ||
          item?.["chartValue"] ||
          item?.["temperatureValueF"] ||
          item?.["blood_uric_acid_value"] ||
          item?.["specific_gravity"] ||
          item?.["urea_value"] ||
          item?.["creatinine_value"] ||
          item?.["gfr_value"] ||
          item?.["ldl_(mg/dl)"]
      ),
      // For temperature C / F
      unit: item?.unit,
    };
  });

  // const CustomTooltip = ({ active, payload, label }) => {
  //   if (active && payload && payload.length) {
  //     return (
  //       <div
  //         style={{
  //           backgroundColor: "#fff",
  //           border: "1px solid #ccc",
  //           padding: "10px",
  //         }}
  //       >
  //         <h5>{payload[0].payload.name}</h5>
  //         <p className="label">{`${datas?.chartLabel1} : ${payload[0].value}`}</p>
  //         {/* <p className="intro">{getIntroOfPage(label)}</p> */}
  //       </div>
  //     );
  //   }

  //   return null;
  // };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      // Determine the temperature unit and format the tooltip content accordingly
      let tooltipContent = "";
      // if (datas.slug === "temperature" && payload[0]?.dataKey === "data1") {
      //   const unit = payload[0].payload?.unit || "N/A";
      //   const temperature = payload[0].value || "N/A";
      //   tooltipContent =
      //     unit === "Celsius"
      //       ? `Temperature: ${temperature}°C`
      //       : `Temperature: ${temperature}°F`;
      // } else 
      if (
        datas.slug === "spirometer" &&
        payload[0]?.dataKey === "data1"
      ) {
        tooltipContent = `${datas.chartLabel3} : ${payload[0].value}`;
      } else {
        tooltipContent = `${datas.chartLabel1} : ${payload[0].value}`;
      }

      return (
        <div
          style={{
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            padding: "10px",
            borderRadius: "4px",
          }}
        >
          <h5>{payload[0].payload.name}</h5>
          <p className="label">{tooltipContent}</p>
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

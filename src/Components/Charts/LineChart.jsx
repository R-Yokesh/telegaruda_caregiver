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
  const formattedData = datas?.tableData
    ?.map((item) => ({
      name: item?.date?.split(" ")[0].split("-").reverse().join("-"), // Extract date part only
      data1: parseFloat(
        item?.["blood_ketone_value"] ||
          item?.["hemoglobinValue"] ||
          item?.["bmi_(kg/m²)"] ||
          item?.["blood_sugar_value"] ||
          Number(item?.["pulse_(bpm)"]) ||
          item?.["hr_(bpm)"] ||
          item?.["respiration_rate_(bpm)"] ||
          item?.["spo2"] ||
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
      ), // Convert pluse to integer if needed

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
          : item?.["pef_(%)"]
          ? item?.["pef_(%)"]
          : item?.["vldl_(mg/dl)"]
          ? item?.["vldl_(mg/dl)"]
          : item?.["urobilinogen"]
          ? item?.["urobilinogen"]
          : 0
      ),

      data4: parseInt(
        item?.["fev1/fvc_(%)"]
          ? item?.["fev1/fvc_(%)"]
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
      unit: item?.unit,
    }))
    ?.reverse();
  console.log("first", formattedData);
  const minValue = Math?.min(...formattedData?.map((item) => item.data1)) || 3;
  const maxValue =
    Math?.max(
      ...formattedData?.map((item) =>
        !isNaN(item?.data1) ? item?.data1 : -Infinity
      )
    ) || 30;
  // Custom tooltip formatter function
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
      {formattedData[0]?.data6 &&
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
      ) : null}

      <CartesianGrid horizontal={true} vertical={false} strokeWidth={1} />
      <Line type="linear" dataKey="data1" stroke="#0084CF" />
      {formattedData[0]?.data2 && (
        <Line type="linear" dataKey="data2" stroke="#EC5A5A" />
      )}
      {formattedData[0]?.data3 && (
        <Line type="linear" dataKey="data3" stroke="#8AC185" />
      )}
      {formattedData[0]?.data4 && (
        <Line type="linear" dataKey="data4" stroke="#B37655" />
      )}
      {formattedData[0]?.data5 && (
        <Line type="linear" dataKey="data5" stroke="#5157F3" />
      )}
      {formattedData[0]?.data6 && (
        <Line type="linear" dataKey="data6" stroke="#E5A000" />
      )}
    </LineChart>
  );
};

export default LineChartDetails;

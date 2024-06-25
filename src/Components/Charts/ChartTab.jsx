import React, { useState } from "react";
import LineChartDetails from "./LineChart";
import ColumnChartDetails from "./ColumnChartDetails";

const ChartTab = ({ data }) => {
  console.log(data, "data d");
  const tabs = [
    {
      id: 1,
      title: "LINE",
    },
    {
      id: 2,
      title: "COLUMN",
    },
  ];
  const [currentTab, setCurrentTab] = useState(tabs[0]);

  const switchTab = (data) => {
    setCurrentTab(data);
  };
  return (
    <div>
      <div className="chart-tabs-container mb-3">
        {tabs.map((data, index) => (
          <div
            key={index}
            className={`chart-tab-items ${
              data.id === currentTab?.id ? "chart-tab-active" : ""
            }`}
            onClick={() => switchTab(data)}
          >
            <span
              className={`chart-tab-title ${
                data.id === currentTab?.id ? "chart-tab-title-active" : ""
              }`}
            >
              {data.title}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-2">
        {currentTab?.id === 1 && <LineChartDetails datas={data} />}
        {currentTab?.id === 2 && <ColumnChartDetails datas={data}/>}
      </div>
    </div>
  );
};

export default ChartTab;

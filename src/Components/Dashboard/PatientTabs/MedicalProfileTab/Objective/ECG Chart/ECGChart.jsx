import React, { useEffect, useState } from "react";
import "./ECGChart.css";
import { Assets } from "../../../../../../assets/Assets";

const ECGChart = ({ data }) => {
  console.log("data", data.tableData);
  const dateOnly = (data) => {
    // Create a new Date object with the specified date and time
    const date = new Date(data);

    // Get individual date and time components
    const day = ("0" + date.getDate()).slice(-2); // Get day with leading zero if necessary
    const month = ("0" + (date.getMonth() + 1)).slice(-2); // Get month with leading zero if necessary
    const year = date.getFullYear();
    // const hours = ("0" + date.getHours()).slice(-2); // Get hours with leading zero if necessary
    // const minutes = ("0" + date.getMinutes()).slice(-2); // Get minutes with leading zero if necessary

    // Format the date in DD-MM-YYYY HH:mm format
    const formattedDate = `${day}-${month}-${year}`;

    return formattedDate; // Output: 24-06-2024 10:15
  };

  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("Single Lead"); // Initial filter set to 'A'

  // Function to handle filtering based on category
  const handleFilter = (category) => {
    setFilter(category);
  };

  // Effect to filter items based on the current filter
  useEffect(() => {
    const filteredItems = data?.tableData?.filter(
      (item) => item.ecg_type === filter
    );
    setItems(filteredItems);
  }, [filter]);

  // Initialize items on component mount
  useEffect(() => {
    handleFilter("Single Lead"); // Default to 'A' category initially
  }, []);
  return (
    <>
      <div className="carousel-container">
        {items.length === 0 ? (
          <span className="fs-18 fw-600">No Data</span>
        ) : (
          <div className="carousel">
            {items?.map((item, i) => (
              <>
                <div key={i} className="chart-item">
                  <div className="rectangle">
                    <img src={Assets.ecgSample} alt="ecg" />
                  </div>
                  <div className="captions">
                    <span>{dateOnly(item?.date)}</span>
                  </div>
                </div>
              </>
            ))}
          </div>
        )}
      </div>
      <div className="ecg_btngrp">
        <button
          onClick={() => handleFilter("Single Lead")}
          style={{
            backgroundColor: filter === "Single Lead" ? "#0084CF" : "initial",
            color: filter === "Single Lead" ? "white" : "black",
          }}
          className="ecg_button"
        >
          Single Lead
        </button>
        <button
          onClick={() => handleFilter("3 Lead")}
          style={{
            backgroundColor: filter === "3 Lead" ? "#0084CF" : "initial",
            color: filter === "3 Lead" ? "white" : "black",
          }}
          className="ecg_button"
        >
          3 Lead
        </button>
        <button
          onClick={() => handleFilter("12 Lead")}
          style={{
            backgroundColor: filter === "12 Lead" ? "#0084CF" : "initial",
            color: filter === "12 Lead" ? "white" : "black",
          }}
          className="ecg_button"
        >
          12 Lead
        </button>
      </div>
    </>
  );
};

export default ECGChart;

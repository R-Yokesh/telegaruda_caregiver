import { CCol, CRow } from "@coreui/react";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { Assets } from "../../assets/Assets";
import PrimaryButton from "../Buttons/PrimaryButton/PrimaryButton";
import { DATE_FORMAT } from "../../Config/config";
import { formatDate } from "../../Utils/dateUtils";

const DateSelector = ({ getFilterValues }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Get today's date
  const today = new Date();

  const onSearch = () => {
    const formattedStart =
      formatDate(startDate) === "01-01-1970" ? null : formatDate(startDate);
    const formattedEnd =
      formatDate(endDate) === "01-01-1970" ? null : formatDate(endDate);
    getFilterValues(formattedStart, formattedEnd);
  };
  return (
    <>
      <CRow className="mb-2">
        <CCol md={3} className="d-flex flex-column gap-1">
          <span className="fs-18 fw-400 label-color">Start Date *</span>
          <div style={{ width: "100%" }}>
            <DatePicker
              showIcon
              selected={startDate}
              onChange={(date) => {
                if (date === null) {
                  // Explicitly set to null if the clear button is clicked
                  setStartDate(null);
                } else {
                  setStartDate(date);
                }
              }}
              className="date-range-selector"
              maxDate={today}
              dateFormat={DATE_FORMAT}
              isClearable
            />
          </div>
        </CCol>
        <CCol md={3} className="d-flex flex-column gap-1">
          <span className="fs-18 fw-400 label-color">End Date *</span>
          <div style={{ width: "100%" }}>
            <DatePicker
              showIcon
              selected={endDate}
              onChange={(date) => {
                if (date === null) {
                  // Explicitly set to null if the clear button is clicked
                  setEndDate(null);
                } else {
                  setEndDate(date);
                }
              }}
              className="date-range-selector"
              maxDate={today}
              dateFormat={DATE_FORMAT}
              isClearable
            />
          </div>
        </CCol>
        <CCol
          md={3}
          className="d-flex flex-column gap-1 justify-content-end"
          style={{ width: "60px" }}
        >
          <PrimaryButton onClick={() => onSearch()}>
            <div className="d-flex align-items-center gap-2">
              <img src={Assets.search} alt="close" />
            </div>
          </PrimaryButton>
        </CCol>
      </CRow>
    </>
  );
};

export default DateSelector;

import { CCol, CRow } from "@coreui/react";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { Assets } from "../../assets/Assets";
import PrimaryButton from "../Buttons/PrimaryButton/PrimaryButton";

const DateSelector = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  // Get today's date
  const today = new Date();
  return (
    <>
      <CRow className="mb-2">
        <CCol md={3} className="d-flex flex-column gap-1">
          <span className="fs-18 fw-400 label-color">Start Date *</span>
          <div style={{ width: "100%" }}>
            <DatePicker
              showIcon
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="date-range-selector"
              maxDate={today}
            />
          </div>
        </CCol>
        <CCol md={3} className="d-flex flex-column gap-1">
          <span className="fs-18 fw-400 label-color">End Date *</span>
          <div style={{ width: "100%" }}>
            <DatePicker
              showIcon
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              className="date-range-selector"
              maxDate={today}
            />
          </div>
        </CCol>
        <CCol
          md={3}
          className="d-flex flex-column gap-1 justify-content-end"
          style={{ width: "60px" }}
        >
          <PrimaryButton>
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

import { CCol, CRow } from "@coreui/react";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { Assets } from "../../assets/Assets";
import ActiveButton from "../Buttons/ActiveButton/ActiveButton";
import { DATE_FORMAT } from "../../Config/config";

const DateRangePicker = ({ onClose }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Get today's date
  const today = new Date();
  return (
    <>
      <CRow className="mb-2 p-3">
        <CCol md={3} className="d-flex flex-column gap-1">
          <span>From Date *</span>
          <DatePicker
            showIcon
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            isClearable
            className="date-range-picker"
            maxDate={today}
            dateFormat={DATE_FORMAT}
          />
        </CCol>
        <CCol md={3} className="d-flex flex-column gap-1">
          <span>To Date *</span>
          <DatePicker
            showIcon
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            isClearable
            className="date-range-picker"
            maxDate={today}
            dateFormat={DATE_FORMAT}
          />
        </CCol>
        <CCol md={3} className="d-flex flex-column gap-1 justify-content-end">
          <div
            className="search-bar"
            style={{ width: "100%", borderRadius: "10px" }}
          >
            <input
              type="text"
              placeholder="Search"
              style={{ padding: "7px" }}
            />
          </div>
        </CCol>
        <CCol
          md={3}
          className="d-flex flex-column gap-1 justify-content-end"
          style={{ width: "60px" }}
        >
          <ActiveButton onClick={onClose}>
            <div className="d-flex align-items-center gap-2">
              <img src={Assets.CloseX} alt="close" />
            </div>
          </ActiveButton>
        </CCol>
      </CRow>
    </>
  );
};

export default DateRangePicker;

import { CCol, CRow } from "@coreui/react";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { Assets } from "../../assets/Assets";
import ActiveButton from "../Buttons/ActiveButton/ActiveButton";
import { DATE_FORMAT } from "../../Config/config";
import PrimaryButton from "../Buttons/PrimaryButton/PrimaryButton";

import { formatDate } from "../../Utils/dateUtils";

const DateSearch = ({ getFilterValues }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [errors, setErrors] = useState({
    startDate: "",
    endDate: "",
  });
  // Get today's date
  const today = new Date();
  const validate = () => {
    let isValid = true;
    const newErrors = {
      startDate: "",
      endDate: "",
    };

    if (startDate && endDate && startDate > endDate) {
      newErrors.startDate = "Start date must be before end date.";
      newErrors.endDate = "End date must be after start date.";
      isValid = false;
    }

    if (!startDate && endDate) {
      newErrors.startDate = "Start date is required when end date is selected.";
      isValid = false;
    }

    if (startDate && !endDate) {
      newErrors.endDate = "End date is required when start date is selected.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };
  const onSearch = () => {
    if (validate()) {
      const formattedStart = startDate
        ? formatDate(startDate) === "01-01-1970"
          ? null
          : formatDate(startDate)
        : null;
      const formattedEnd = endDate
        ? formatDate(endDate) === "01-01-1970"
          ? null
          : formatDate(endDate)
        : null;
      getFilterValues(formattedStart, formattedEnd, searchValue);
    }
  };

  function ClearFunction() {
    setStartDate();
    setEndDate();
    setErrors({
      startDate: "",
      endDate: "",
      doctor: "",
    });
    getFilterValues(null, null, "");
  }

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
              isClearable
              className="date-range-selector"
              maxDate={today}
              dateFormat={DATE_FORMAT}
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
              dateFormat={DATE_FORMAT}
              isClearable
            />
          </div>
        </CCol>
        {/* <CCol md={3} className="d-flex flex-column gap-1 justify-content-end">
          <div
            className="search-bar"
            style={{ width: "100%", borderRadius: "10px" }}
          >
            <input
              type="text"
              placeholder="Search"
              style={{ padding: "7px" }}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
        </CCol> */}
        <CCol
          md={3}
          className="d-flex flex-column gap-1 justify-content-end"
          style={{ width: "60px" }}
        >
          <PrimaryButton onClick={onSearch}>
            <div className="d-flex align-items-center gap-2">
              <img src={Assets.search} alt="close" />
            </div>
          </PrimaryButton>
        </CCol>
        {startDate && endDate ? (
          <CCol
            md={3}
            className="d-flex flex-column gap-1 justify-content-end"
            style={{ width: "60px" }}
          >
            <button
              onClick={ClearFunction}
              className="cursor button"
              style={{ background: "#fefefec9" }}
            >
              <div className="d-flex align-items-center gap-2">
                <img
                  src={Assets.ResetSearch}
                  alt="close"
                  style={{ width: "20px" }}
                />
              </div>
            </button>
          </CCol>
        ) : null}
      </CRow>
      <CRow>
        <CCol md={3}>
          {errors.startDate && <p className="error-text">{errors.startDate}</p>}
        </CCol>
        <CCol md={3}>
          {errors.endDate && <p className="error-text">{errors.endDate}</p>}
        </CCol>
      </CRow>
    </>
  );
};

export default DateSearch;

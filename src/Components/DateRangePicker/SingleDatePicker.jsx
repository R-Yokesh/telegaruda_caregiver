import { CCol, CRow } from "@coreui/react";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { DATE_FORMAT } from "../../Config/config";
import { formatDate } from "../../Utils/dateUtils";

const SingleDatePicker = ({ getStartDate, date }) => {
  const [startDate, setStartDate] = useState(date || new Date());

  // Get today's date
  const today = new Date();
  const onChange = (date) => {
    setStartDate(date);
    const formattedStart =
      formatDate(date) === "01-01-1970" ? null : formatDate(date);
    getStartDate(formattedStart);
  };
  return (
    <>
      <CRow className="mb-2">
        <CCol md={12} className="d-flex flex-column gap-1">
          <div style={{ width: "100%" }}>
            <DatePicker
              showIcon
              selected={startDate}
              onChange={(date) => onChange(date)}
              className="date-range-selector"
              maxDate={today}
              dateFormat={DATE_FORMAT}
            />
          </div>
        </CCol>
      </CRow>
    </>
  );
};

export default SingleDatePicker;

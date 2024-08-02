import { CCol, CRow } from "@coreui/react";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { DATE_FORMAT } from "../../Config/config";

const SingleDatePicker = ({ defaultDate }) => {
  const [startDate, setStartDate] = useState(
    defaultDate ? new Date(defaultDate) : new Date()
  );

  // Get today's date
  const today = new Date();
  return (
    <>
      <CRow className="mb-2">
        <CCol md={12} className="d-flex flex-column gap-1">
          <div style={{ width: "100%" }}>
            <DatePicker
              showIcon
              selected={startDate}
              onChange={(date) => setStartDate(date)}
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

import { CCol, CRow } from "@coreui/react";
import React, { useEffect, useState } from "react";
import PrimaryButton from "../../../../../Buttons/PrimaryButton/PrimaryButton";
import SecondaryButton from "../../../../../Buttons/SecondaryButton/SecondaryButton";
import DatePicker from "react-datepicker";

const ImmunizationForm = ({ back, defaultValues }) => {
  console.log("first", defaultValues);
  const [date, setDate] = useState(null);
  const [takendate, setTakenDate] = useState(null);

  useEffect(() => {
    // Function to parse date string "MM-DD-YYYY HH:mm" to Date object
    const parseDateString = (dateString) => {
      const parts = dateString?.split(" ");
      const datePart = parts[0];
      const [month, day, year] = datePart?.split("-")?.map(Number);
      return new Date(year, month - 1, day);
    };

    // Example default date string
    const defaultDateString = defaultValues?.dosage_date;
    const defaultDateString1 = defaultValues?.taken_date;

    // Parse default date string to Date object
    const defaultDate = defaultValues?.dosage_date
      ? parseDateString(defaultDateString)
      : new Date();
    const defaultDate1 = defaultValues?.taken_date
      ? parseDateString(defaultDateString1)
      : new Date();

    // Set default date in state
    setDate(defaultDate);
    setTakenDate(defaultDate1);
  }, [defaultValues]);

  return (
    <>
      <CRow className="mb-3">
        <CCol lg={6}>
          <div style={{ width: "100%" }}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Vaccine *
              </label>
              <input
                type="text"
                class="form-control pad-10"
                id="validationTooltip01"
                placeholder="Enter"
                defaultValue={defaultValues?.vaccine}
              />
            </div>
          </div>
        </CCol>
        <CCol lg={6}>
          <div style={{ width: "100%" }}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Period *
              </label>
              <input
                type="text"
                class="form-control  pad-10"
                id="validationTooltip01"
                placeholder="Enter"
                defaultValue={defaultValues?.period}
              />
            </div>
          </div>
        </CCol>
      </CRow>
      <CRow className="mb-3">
        <CCol lg={4}>
          <div style={{ width: "100%" }}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Status *
              </label>
              <input
                type="text"
                class="form-control  pad-10"
                id="validationTooltip01"
                placeholder="Enter"
                defaultValue={defaultValues?.status}
              />
            </div>
          </div>
        </CCol>
        <CCol lg={4}>
          <div class="position-relative">
            <label for="validationTooltip01" class="form-label">
              Dosage Date *
            </label>
            <div className="date-size">
              <DatePicker
                showIcon
                selected={date}
                onChange={(date) => setDate(date)}
              />
            </div>
          </div>
        </CCol>
        <CCol lg={4}>
          <div class="position-relative">
            <label for="validationTooltip01" class="form-label">
              Taken Date *
            </label>
            <div className="date-size">
              <DatePicker
                showIcon
                selected={takendate}
                onChange={(date) => setTakenDate(date)}
              />
            </div>
          </div>
        </CCol>
      </CRow>
      <CRow className="mb-1">
        <div style={{ width: "128px" }}>
          <PrimaryButton>SAVE</PrimaryButton>
        </div>
        <div style={{ width: "128px" }}>
          <SecondaryButton onClick={back}>CANCEL</SecondaryButton>
        </div>
      </CRow>
    </>
  );
};

export default ImmunizationForm;

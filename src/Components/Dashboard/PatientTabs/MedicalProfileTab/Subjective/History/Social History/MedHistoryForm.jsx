import { CCol, CRow } from "@coreui/react";
import React, { useEffect, useState } from "react";
import SecondaryButton from "../../../../../../Buttons/SecondaryButton/SecondaryButton";
import PrimaryButton from "../../../../../../Buttons/PrimaryButton/PrimaryButton";
import Dropdown from "../../../../../../Dropdown/Dropdown";
import DatePicker from "react-datepicker";

const MedHistoryForm = ({ back, defaultValues }) => {
  const [date, setDate] = useState(null);

  useEffect(() => {
    // Function to parse date string "MM-DD-YYYY HH:mm" to Date object
    const parseDateString = (dateString) => {
      const parts = dateString?.split(" ");
      const datePart = parts[0];
      const [month, day, year] = datePart?.split("-")?.map(Number);
      return new Date(year, month - 1, day);
    };

    // Example default date string
    const defaultDateString = defaultValues?.onset;

    // Parse default date string to Date object
    const defaultDate = defaultValues?.onset
      ? parseDateString(defaultDateString)
      : new Date();

    // Set default date in state
    setDate(defaultDate);
  }, [defaultValues]);
  const options = ["Normal", "Mild", "Moderate"];

  return (
    <>
      <CRow className="mb-3">
        <CCol lg={4}>
          <div style={{ width: "100%" }}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
              Smoking *
              </label>
              <input
                type="text"
                class="form-control  pad-10"
                id="validationTooltip01"
                placeholder="Enter"
                defaultValue={defaultValues?.smoking}
              />
            </div>
          </div>
        </CCol>
        <CCol lg={4}>
          <div style={{ width: "100%" }}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
              Alcohol *
              </label>
              <input
                type="text"
                class="form-control  pad-10"
                id="validationTooltip01"
                placeholder="Enter"
                defaultValue={defaultValues?.alcohol}
              />
            </div>
          </div>
        </CCol>
        <CCol lg={4}>
          <div style={{ width: "100%" }}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
              Drugs *
              </label>
              <input
                type="text"
                class="form-control  pad-10"
                id="validationTooltip01"
                placeholder="Enter"
                defaultValue={defaultValues?.drugs}
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

export default MedHistoryForm;

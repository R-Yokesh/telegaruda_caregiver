import { CCol, CRow } from "@coreui/react";
import React, { useEffect, useState } from "react";
import PrimaryButton from "../../../../../Buttons/PrimaryButton/PrimaryButton";
import SecondaryButton from "../../../../../Buttons/SecondaryButton/SecondaryButton";
import DatePicker from "react-datepicker";
import Dropdown from "../../../../../Dropdown/Dropdown";
import { DATE_FORMAT } from "../../../../../../Config/config";

const DiagnosisForm = ({ back, defaultValues }) => {
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
    const defaultDateString = defaultValues?.date;

    // Parse default date string to Date object
    const defaultDate = defaultValues?.date
      ? parseDateString(defaultDateString)
      : new Date();

    // Set default date in state
    setDate(defaultDate);
  }, [defaultValues]);
  const [disableText, setDisableText] = useState(false);
  const gravidaoptions = ["E11.8", "E11.9", "E12.0", "E12.1", "E12.2"];
  const findgravidaIndex =
    defaultValues?.condition &&
    gravidaoptions?.indexOf(defaultValues?.condition);
  const getSelectedGravida = (data) => {
    console.log(data);
    setDisableText(true);
  };
  return (
    <>
      <CRow className="mb-3">
        <CCol lg={4}>
          <div style={{ width: "100%" }}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Date *
              </label>
              {/* <input
                type="text"
                class="form-control pad-10"
                id="validationTooltip01"
                placeholder="Enter"
                defaultValue={defaultValues?.condition}
              /> */}
              <div className="date-size">
                <DatePicker
                  showIcon
                  selected={date}
                  onChange={(date) => setDate(date)}
                  dateFormat={DATE_FORMAT}
                />
              </div>
            </div>
          </div>
        </CCol>
        <CCol lg={8}>
          <div style={{ width: "100%" }}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                ICD Code *
              </label>
              {/* <input
                type="text"
                class="form-control  pad-10"
                id="validationTooltip01"
                placeholder="Enter"
                defaultValue={defaultValues?.condition}
              /> */}
              <div
                className="w-100"
                style={{
                  border: "1px solid #17171D33",
                  borderRadius: "5px",
                }}
              >
                <Dropdown
                  getSelectedValue={getSelectedGravida}
                  options={gravidaoptions}
                  defaultValue={gravidaoptions[findgravidaIndex]}
                />
              </div>
            </div>
          </div>
        </CCol>
      </CRow>
      <CRow className="mb-3">
        <CCol lg={12}>
          <div style={{ width: "100%" }}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Description
              </label>
              <input
                type="text"
                class="form-control  pad-10"
                id="validationTooltip01"
                // placeholder="Enter"
                disabled
                defaultValue={defaultValues?.treatment}
                value={
                  disableText
                    ? "Type 2 diabetes mellitus without complications"
                    : null
                }
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

export default DiagnosisForm;

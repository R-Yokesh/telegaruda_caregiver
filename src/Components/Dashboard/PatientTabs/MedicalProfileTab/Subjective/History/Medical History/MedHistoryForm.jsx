import { CCol, CFormCheck, CFormTextarea, CRow } from "@coreui/react";
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
  const options = ["Yes", "No"];
  const findIndex = defaultValues?.prev_illness
    ? options?.indexOf(defaultValues?.prev_illness)
    : 0;

  const findIndex1 = defaultValues?.chronic
    ? options?.indexOf(defaultValues?.chronic)
    : 0;

  const icdoptions = [
    "E11.5 - Type 2 diabetes mellitus without complications",
    "E11.6 - Type 2 diabetes mellitus without complications",
    "E11.7 - Type 2 diabetes mellitus without complications",
  ];

  const findIndex2 = defaultValues?.icd10
    ? icdoptions?.indexOf(defaultValues?.icd10)
    : 0;

  const [trimester, setTrimester] = useState("");

  const getSelectedValue = (data) => {
    setTrimester(data);
  };
  return (
    <>
      <CRow className="mb-3">
        <CCol lg={4}>
          <div style={{ width: "100%" }}>
            <div class="position-relative d-flex flex-column gap-1">
              <label for="validationTooltip01" class="form-label">
                Onset Date *
              </label>
              <div className="date-size">
                <DatePicker
                  showIcon
                  selected={date}
                  onChange={(date) => setDate(date)}
                  isClearable
                  closeOnScroll={true}
                  wrapperClassName="date-picker-wrapper"
                />
              </div>
            </div>
          </div>
        </CCol>
        <CCol lg={4}>
          <div style={{ width: "100%" }}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Conditions *
              </label>
              <input
                type="text"
                class="form-control pad-10"
                id="validationTooltip01"
                placeholder="Enter"
                defaultValue={defaultValues?.conditions}
              />
            </div>
          </div>
        </CCol>
        <CCol lg={4}>
          <div style={{ width: "100%" }}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                ICD
              </label>
              {/* <input
                type="text"
                class="form-control  pad-10"
                id="validationTooltip01"
                placeholder="Enter"
                defaultValue={defaultValues?.icd10}
              /> */}
              <div
                className="w-100"
                style={{
                  border: "1px solid #17171D33",
                  borderRadius: "5px",
                }}
              >
                <Dropdown
                  options={icdoptions}
                  defaultValue={
                    defaultValues?.icd10 ? icdoptions[findIndex2] : null
                  }
                  getSelectedValue={getSelectedValue}
                />
              </div>
            </div>
          </div>
        </CCol>
      </CRow>
      <CRow className="mb-3">
        <CCol lg={4}>
          <div style={{ width: "100%" }}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Chronic
              </label>
              <CFormCheck
                type="radio"
                label="Yes"
                value="Yes"
                checked={defaultValues?.chronic === "Yes"}
                // onChange={handleChange}
              />
              <CFormCheck
                type="radio"
                label="No"
                value="No"
                checked={defaultValues?.chronic === "No"}
              />
              {/* <input
                type="text"
                class="form-control  pad-10"
                id="validationTooltip01"
                placeholder="Enter"
                defaultValue={defaultValues?.chronic}
              /> */}
              {/* <div
                className="w-100"
                style={{
                  border: "1px solid #17171D33",
                  borderRadius: "5px",
                }}
              >
                <Dropdown
                  options={options}
                  defaultValue={
                    defaultValues?.chronic ? options[findIndex1] : null
                  }
                  getSelectedValue={getSelectedValue}
                />
              </div> */}
            </div>
          </div>
        </CCol>
        <CCol lg={4}>
          <div style={{ width: "100%" }}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Previous Illness
              </label>
              <CFormCheck
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
                label="Yes"
                value="Yes"
                checked={defaultValues?.prev_illness === "Yes"}
                // onChange={handleChange}
              />
              <CFormCheck
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault2"
                label="No"
                value="No"
                checked={defaultValues?.prev_illness === "No"}
              />
              {/* <input
                type="text"
                class="form-control  pad-10"
                id="validationTooltip01"
                placeholder="Enter"
                defaultValue={defaultValues?.prev_illness}
              /> */}
              {/* <div
                className="w-100"
                style={{
                  border: "1px solid #17171D33",
                  borderRadius: "5px",
                }}
              >
                <Dropdown
                  options={options}
                  defaultValue={
                    defaultValues?.prev_illness ? options[findIndex] : null
                  }
                  getSelectedValue={getSelectedValue}
                />
              </div> */}
            </div>
          </div>
        </CCol>
        <CCol lg={4}>
          <div style={{ width: "100%" }}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Notes
              </label>
              <CFormTextarea
                type="text"
                class="form-control  pad-10"
                id="validationTooltip01"
                placeholder="Enter"
                defaultValue={defaultValues?.notes}
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

import { CCol, CFormTextarea, CRow } from "@coreui/react";
import React, { useEffect, useState } from "react";
import SecondaryButton from "../../../../../../Buttons/SecondaryButton/SecondaryButton";
import PrimaryButton from "../../../../../../Buttons/PrimaryButton/PrimaryButton";
import Dropdown from "../../../../../../Dropdown/Dropdown";
import DatePicker from "react-datepicker";

const MedHistoryForm = ({ back, defaultValues }) => {
  const [date, setDate] = useState(null);
  const [smokingStatus, setSmokingStatus] = useState(
    defaultValues?.smoking || "No"
  );

  const [alcoholStatus, setAlcoholStatus] = useState(
    defaultValues?.alcohol || "No"
  );

  const [drugStatus, setDrugStatus] = useState(defaultValues?.drugs || "No");

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

  const getSelectedValue1 = (data) => {
    setSmokingStatus(data);
  };

  const findIndex = defaultValues?.smoking
    ? options?.indexOf(defaultValues?.smoking)
    : 1;

  const getSelectedValue2 = (data) => {
    setAlcoholStatus(data);
  };

  const findIndex2 = defaultValues?.alcohol
    ? options?.indexOf(defaultValues?.alcohol)
    : 1;

  const getSelectedValue3 = (data) => {
    setDrugStatus(data);
  };

  const findIndex3 = defaultValues?.drugs
    ? options?.indexOf(defaultValues?.drugs)
    : 1;
  return (
    <>
      <CRow className="mb-3">
        <CCol lg={4}>
          <div style={{ width: "100%" }}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Smoking *
              </label>
              {/* <input
                type="text"
                class="form-control  pad-10"
                id="validationTooltip01"
                placeholder="Enter"
                defaultValue={defaultValues?.smoking}
              /> */}
              <div
                className="w-100"
                style={{
                  border: "1px solid #17171D33",
                  borderRadius: "5px",
                }}
              >
                <Dropdown
                  options={options}
                  defaultValue={options[findIndex]}
                  getSelectedValue={getSelectedValue1}
                />
              </div>
            </div>
          </div>
        </CCol>
        {smokingStatus === "Yes" && (
          <CCol lg={4} className="mb-3">
            <div style={{ width: "100%" }}>
              <div class="position-relative">
                <label for="validationTooltip01" class="form-label">
                  Smoking details*
                </label>
                <CFormTextarea
                  id="exampleFormControlTextarea1"
                  // label="Example textarea"
                  rows={3}
                  // text="Must be 8-20 words long."
                ></CFormTextarea>
              </div>
            </div>
          </CCol>
        )}
        <CCol lg={4}>
          <div style={{ width: "100%" }}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Alcohol *
              </label>
              {/* <input
                type="text"
                class="form-control  pad-10"
                id="validationTooltip01"
                placeholder="Enter"
                defaultValue={defaultValues?.alcohol}
              /> */}
              <div
                className="w-100"
                style={{
                  border: "1px solid #17171D33",
                  borderRadius: "5px",
                }}
              >
                <Dropdown
                  options={options}
                  defaultValue={options[findIndex2]}
                  getSelectedValue={getSelectedValue2}
                />
              </div>
            </div>
          </div>
        </CCol>
        {alcoholStatus === "Yes" && (
          <CCol lg={4} className="mb-3">
            <div style={{ width: "100%" }}>
              <div class="position-relative">
                <label for="validationTooltip01" class="form-label">
                  Alcohol details*
                </label>
                <CFormTextarea
                  id="exampleFormControlTextarea1"
                  // label="Example textarea"
                  rows={3}
                  // text="Must be 8-20 words long."
                ></CFormTextarea>
              </div>
            </div>
          </CCol>
        )}
        <CCol lg={4}>
          <div style={{ width: "100%" }}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Drugs *
              </label>
              {/* <input
                type="text"
                class="form-control  pad-10"
                id="validationTooltip01"
                placeholder="Enter"
                defaultValue={defaultValues?.drugs}
              /> */}
              <div
                className="w-100"
                style={{
                  border: "1px solid #17171D33",
                  borderRadius: "5px",
                }}
              >
                <Dropdown
                  options={options}
                  defaultValue={options[findIndex3]}
                  getSelectedValue={getSelectedValue3}
                />
              </div>
            </div>
          </div>
        </CCol>
        {drugStatus === "Yes" && (
          <CCol lg={4} className="mb-3">
            <div style={{ width: "100%" }}>
              <div class="position-relative">
                <label for="validationTooltip01" class="form-label">
                Drugs details*
                </label>
                <CFormTextarea
                  id="exampleFormControlTextarea1"
                  // label="Example textarea"
                  rows={3}
                  // text="Must be 4-20 words long."
                ></CFormTextarea>
              </div>
            </div>
          </CCol>
        )}
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

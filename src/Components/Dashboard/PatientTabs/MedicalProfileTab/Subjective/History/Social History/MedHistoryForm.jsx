import { CCol, CFormTextarea,CFormCheck, CRow } from "@coreui/react";
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

  
  const handleSmokingStatus = (event) => {
    setSmokingStatus(event.target.value === "yes" ? "Yes" : "No");
  };

  const handleAlcoholStatus = (event) => {
    setAlcoholStatus(event.target.value === "yes" ? "Yes" : "No");
  };

  const handleDrugStatus = (event) => {
    setDrugStatus(event.target.value === "yes" ? "Yes" : "No");
  };

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
        <p className="radio-label">Smoking</p>
          <div className="d-flex align-items-end w-100">
            <div
              style={{
                boxSizing: "border-box",
                borderRadius: "5px",
                border: "1px solid #17171D33",
                padding: "10px",
              }}
            >
              <CFormCheck
                className="mb-0"
                inline
                type="radio"
                id="smokingYes"
                value="yes"
                label={<label className="form-label mb-0">Yes</label>}
                name="smoking"
                checked={smokingStatus === "Yes"}
                onChange={handleSmokingStatus}
              />
              <CFormCheck
                className="mb-0"
                inline
                type="radio"
                id="smokingNo"
                value="no"
                label={<label className="form-label mb-0">No</label>}
                name="smoking"
                checked={smokingStatus === "No"}
                onChange={handleSmokingStatus}
              />
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
        <p className="radio-label">Alcohol</p>
          <div className="d-flex align-items-end w-100">
            <div
              style={{
                boxSizing: "border-box",
                borderRadius: "5px",
                border: "1px solid #17171D33",
                padding: "10px",
              }}
            >
              <CFormCheck
                className="mb-0"
                inline
                type="radio"
                id="alcoholYes"
                value="yes"
                label={<label className="form-label mb-0">Yes</label>}
                name="alcohol"
                checked={alcoholStatus === "Yes"}
                onChange={handleAlcoholStatus}
              />
              <CFormCheck
                className="mb-0"
                inline
                type="radio"
                id="alcoholNo"
                value="no"
                label={<label className="form-label mb-0">No</label>}
                name="alcohol"
                checked={alcoholStatus === "No"}
                onChange={handleAlcoholStatus}
              />
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
        <p className="radio-label">Drugs</p>
          <div className="d-flex align-items-end w-100">
            <div
              style={{
                boxSizing: "border-box",
                borderRadius: "5px",
                border: "1px solid #17171D33",
                padding: "10px",
              }}
            >
              <CFormCheck
                className="mb-0"
                inline
                type="radio"
                id="drugsYes"
                value="yes"
                label={<label className="form-label mb-0">Yes</label>}
                name="drugs"
                checked={drugStatus === "Yes"}
                onChange={handleDrugStatus}
              />
              <CFormCheck
                className="mb-0"
                inline
                type="radio"
                id="drugsNo"
                value="no"
                label={<label className="form-label mb-0">No</label>}
                name="drugs"
                checked={drugStatus === "No"}
                onChange={handleDrugStatus}
              />
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

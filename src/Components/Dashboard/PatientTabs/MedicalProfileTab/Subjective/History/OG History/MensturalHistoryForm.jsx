import { CCol, CRow, CFormCheck } from "@coreui/react";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import SecondaryButton from "../../../../../../Buttons/SecondaryButton/SecondaryButton";
import PrimaryButton from "../../../../../../Buttons/PrimaryButton/PrimaryButton";
import Dropdown from "../../../../../../Dropdown/Dropdown";

const MensturalHistoryForm = ({ back, defaultValues, from }) => {
  const [date, setDate] = useState(null);
  const [date2, setDate2] = useState(null);

  useEffect(() => {
    // Function to parse date string "MM-DD-YYYY HH:mm" to Date object
    const parseDateString = (dateString) => {
      const parts = dateString?.split(" ");
      const datePart = parts[0];
      const [month, day, year] = datePart?.split("-")?.map(Number);
      return new Date(year, month - 1, day);
    };

    // Example default date string
    const defaultDateString = defaultValues?.lmp;

    // Parse default date string to Date object
    const defaultDate = defaultValues?.lmp
      ? parseDateString(defaultDateString)
      : new Date();

    // Example default date string
    const defaultDateString2 = defaultValues?.ed_date;

    // Parse default date string to Date object
    const defaultDate2 = defaultValues?.ed_date
      ? parseDateString(defaultDateString2)
      : new Date();

    // Set default date in state
    setDate(defaultDate);
    setDate2(defaultDate2);
  }, [defaultValues]);

  const options = ["Yes", "No"];
  const flow_duration = ["2-7 days", "< 2 Days", "> 7 Days"];
  const flow_type = ["Less", "Moderate", "Severe"];

  const findIndex = defaultValues?.trimster
    ? options?.indexOf(defaultValues?.trimster)
    : 1;

  const [menopause, setMenopause] = useState(defaultValues.menopause || "No");

  const handleClick = (event) => {
    setMenopause(event.target.value === "yes" ? "Yes" : "No");
  };
  const getSelected = (data) => {
    console.log(data);
    setMenopause(data);
  };
  const getSelectedValue2 = (data) => {
    console.log(data);
  };

  const getSelectedBleeding = (data) => {
    console.log(data);
  };

  const getSelectedCycle = (data) => {
    console.log(data);
  };

  const getSelectedDysmen = (data) => {
    console.log(data);
  };

  const [value, setValue] = useState(
    defaultValues?.age ? defaultValues?.age : ""
  );
  const [value1, setValue1] = useState(
    defaultValues?.age ? defaultValues?.age : ""
  );
  const [value2, setValue2] = useState(
    defaultValues?.cycle_per_year ? defaultValues?.cycle_per_year : ""
  );
  const [value3, setValue3] = useState(
    defaultValues?.cycle_in_days ? defaultValues?.cycle_in_days : ""
  );
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const input = e.target.value;

    // Remove non-digit characters and limit to two digits
    const newValue = input.replace(/[^0-9]/g, "").slice(0, 2);

    if (input.length > 2 && newValue.length > 2) {
      setError("Input should not exceed 2 digits.");
    } else {
      if (e.target.name === "MenopauseAge") {
        setValue(newValue);
      } else if (e.target.name === "MenarcheAge") {
        setValue1(newValue);
      } else if (e.target.name === "cycle_per_year") {
        setValue2(newValue);
      } else if (e.target.name === "cycle_in_days") {
        setValue3(newValue);
      }
      setError("");
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text");
    const newValue = paste.replace(/[^0-9]/g, "").slice(0, 2);

    if (newValue.length > 2) {
      setError("Input should not exceed 2 digits.");
    } else {
      if (e.target.name === "MenopauseAge") {
        setValue(newValue);
      } else if (e.target.name === "MenarcheAge") {
        setValue1(newValue);
      } else if (e.target.name === "cycle_per_year") {
        setValue2(newValue);
      } else if (e.target.name === "cycle_in_days") {
        setValue3(newValue);
      }
      setError("");
    }
  };
  return (
    <>
      <CRow className="mb-3">
        <CCol lg={4} className="mb-3">
          <div style={{ width: "100%" }}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Menarche Age *
              </label>
              <input
                type="text"
                class="form-control  pad-10"
                id="validationTooltip01"
                placeholder="00"
                // defaultValue={}
                name="MenarcheAge"
                value={value1}
                onChange={handleChange}
                onPaste={handlePaste}
                disabled={from === "Consult-Gynaec" ? true : false}
              />
            </div>
            {error && <p className="error-message">{error}</p>}
          </div>
        </CCol>
        <CCol lg={4} className="mb-3">
          <div style={{ width: "100%" }}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Cycles per Year {menopause !== "Yes" && "*"}
              </label>
              <input
                type="text"
                class="form-control  pad-10"
                id="validationTooltip01"
                placeholder="00"
                // defaultValue={defaultValues?.cycle_per_year}
                name="cycle_per_year"
                value={value2}
                onChange={handleChange}
                onPaste={handlePaste}
                disabled={from === "Consult-Gynaec" ? true : false}
              />
            </div>
          </div>
        </CCol>
        <CCol lg={4} className="mb-3">
          <div style={{ width: "100%" }}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Cycle Length in days {menopause !== "Yes" && "*"}
              </label>
              <input
                type="text"
                class="form-control  pad-10"
                id="validationTooltip01"
                placeholder="00"
                // defaultValue={defaultValues?.cycle_in_days}
                name="cycle_in_days"
                value={value3}
                onChange={handleChange}
                onPaste={handlePaste}
                disabled={from === "Consult-Gynaec" ? true : false}
              />
            </div>
          </div>
        </CCol>
        <CCol lg={4} className="mb-3">
          <div style={{ width: "100%" }}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Flow Duration {menopause !== "Yes" && "*"}
              </label>
              <div
                className="w-100"
                style={{
                  border: "1px solid #17171D33",
                  borderRadius: "5px",
                }}
              >
                <Dropdown
                  options={flow_duration}
                  getSelectedValue={getSelectedValue2}
                />
              </div>
            </div>
          </div>
        </CCol>
        <CCol lg={4} className="mb-3">
          <div style={{ width: "100%" }}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Flow Type {menopause !== "Yes" && "*"}
              </label>
              <div
                className="w-100"
                style={{
                  border: "1px solid #17171D33",
                  borderRadius: "5px",
                }}
              >
                <Dropdown
                  options={flow_type}
                  getSelectedValue={getSelectedValue2}
                />
              </div>
            </div>
          </div>
        </CCol>
        <CCol lg={4} className="mb-3">
          <p className="radio-label"> InterMenstrual Bleeding </p>
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
                id="menstrualYes"
                value="yes"
                label={<label className="form-label mb-0">Yes</label>}
                name="menstrual"
                disabled={from === "Consult-Gynaec" ? true : false}
              />
              <CFormCheck
                className="mb-0"
                inline
                type="radio"
                id="menstrualNo"
                value="no"
                label={<label className="form-label mb-0">No</label>}
                name="menstrual"
                disabled={from === "Consult-Gynaec" ? true : false}
              />
            </div>
          </div>
        </CCol>
        <CCol lg={4} className="mb-3">
          <p className="radio-label"> Cycle Irregularity </p>
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
                id="irregularityYes"
                value="yes"
                label={<label className="form-label mb-0">Yes</label>}
                name="irregularity"
                disabled={from === "Consult-Gynaec" ? true : false}
              />
              <CFormCheck
                className="mb-0"
                inline
                type="radio"
                id="irregularityNo"
                value="no"
                label={<label className="form-label mb-0">No</label>}
                name="irregularity"
                disabled={from === "Consult-Gynaec" ? true : false}
              />
            </div>
          </div>
        </CCol>
        <CCol lg={4} className="mb-3">
          <p className="radio-label">Dysmenorrhea</p>
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
                id="dysmenorrheaYes"
                value="yes"
                label={<label className="form-label mb-0">Yes</label>}
                name="dysmenorrhea"
                disabled={from === "Consult-Gynaec" ? true : false}
              />
              <CFormCheck
                className="mb-0"
                inline
                type="radio"
                id="dysmenorrheaNo"
                value="no"
                label={<label className="form-label mb-0">No</label>}
                name="dysmenorrhea"
                disabled={from === "Consult-Gynaec" ? true : false}
              />
            </div>
          </div>
        </CCol>
        <CCol lg={4} className="mb-3">
          <div class="position-relative">
            <label for="validationTooltip01" class="form-label">
              LMP Date *
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
        <CCol lg={4} className="mb-3">
          <p className="radio-label">Menopause</p>
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
                id="menopauseYes"
                value="yes"
                label={<label className="form-label mb-0">Yes</label>}
                name="menopause"
                checked={menopause === "Yes"}
                onChange={handleClick}
                disabled={from === "Consult-Gynaec" ? true : false}
              />
              <CFormCheck
                className="mb-0"
                inline
                type="radio"
                id="menopauseNo"
                value="no"
                label={<label className="form-label mb-0">No</label>}
                name="menopause"
                checked={menopause === "No"}
                onChange={handleClick}
                disabled={from === "Consult-Gynaec" ? true : false}
              />
            </div>
          </div>
        </CCol>
        {menopause === "Yes" && (
          <CCol lg={4} className="mb-3">
            <div style={{ width: "100%" }}>
              <div class="position-relative">
                <label for="validationTooltip01" class="form-label">
                  Menopause Age
                </label>
                <input
                  type="text"
                  class="form-control  pad-10"
                  id="validationTooltip01"
                  placeholder="00"
                  // defaultValue={defaultValues?.age}
                  name="MenopauseAge"
                  value={value}
                  onChange={handleChange}
                  onPaste={handlePaste}
                  disabled={from === "Consult-Gynaec" ? true : false}
                />
              </div>
            </div>
          </CCol>
        )}
      </CRow>

      {from !== "Consult-Gynaec" && (
        <CRow className="mb-1">
          <div style={{ width: "130px" }}>
            <PrimaryButton>SAVE</PrimaryButton>
          </div>
          <div style={{ width: "128px" }}>
            <SecondaryButton onClick={back}>CANCEL</SecondaryButton>
          </div>
        </CRow>
      )}
    </>
  );
};

export default MensturalHistoryForm;

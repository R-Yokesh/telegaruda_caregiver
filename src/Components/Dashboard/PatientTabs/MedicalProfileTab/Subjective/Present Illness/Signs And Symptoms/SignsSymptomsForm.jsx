import { CCol, CFormTextarea, CRow } from "@coreui/react";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { Assets } from "../../../../../../../assets/Assets";
import SecondaryButton from "../../../../../../Buttons/SecondaryButton/SecondaryButton";
import PrimaryButton from "../../../../../../Buttons/PrimaryButton/PrimaryButton";
import Dropdown from "../../../../../../Dropdown/Dropdown";
import { toast } from "react-toastify";
import { DATE_FORMAT } from "../../../../../../../Config/config";
import { isValid, parse } from "date-fns";
import { duration } from "moment";

const SignsSymptomsForm = ({ back, defaultValues }) => {

  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    // Function to parse date string "MM-DD-YYYY HH:mm" to Date and Time objects
    const parseDateString = (dateString) => {
      const parts = dateString?.split(" ");
      const datePart = parts[0];
      const timePart = parts[1];
      const [month, day, year] = datePart?.split("-")?.map(Number);
      const [hours, minutes] = timePart?.split(":")?.map(Number);

      // Create Date and Time objects
      const parsedDate = new Date(year, month - 1, day);
      const parsedTime = new Date();
      parsedTime.setHours(hours, minutes, 0, 0);

      return { parsedDate, parsedTime };
    };

    // Example default date string
    const defaultDateString = defaultValues?.date;

    // Parse default date string to Date and Time objects
    const { parsedDate, parsedTime } = defaultValues?.date
      ? parseDateString(defaultDateString)
      : { parsedDate: new Date(), parsedTime: new Date() };

    // Set default date and time in state
    setDate(parsedDate);
    setTime(parsedTime);
  }, [defaultValues]);

  const today = new Date();
  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
  const todayEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);




  const options = [
    "Normal",
    "Mild",
    "Moderate",
    "Severe",
    "Very Severe",
    "Worst",
  ];
  const getSelectedValue = (data) => {
    console.log(data);
  };
  const options1 = ["Headache", "Fracture", "Fever"];
  const getSelectedValue1 = (data) => {
    console.log(data);
  };
  const [value3, setValue3] = useState(defaultValues?.duration_days || "");
  const [error, setError] = useState("");
  const handleChange = (e) => {
    const input = e.target.value;

    // Remove non-digit characters and limit to two digits
    const newValue = input.replace(/[^0-9]/g, "").slice(0, 2);
    const newValueDuration = input.replace(/[^0-9]/g, "").slice(0, 4);

    if (
      e.target.name === "dur_in_days" &&
      input.length > 4 &&
      newValueDuration.length > 4
    ) {
      setError("Input should not exceed 4 digits.");
    } else {
      setValue3(newValueDuration);
      setError("");
    }

    if (input.length > 2 && newValue.length > 2) {
      setError("Input should not exceed 2 digits.");
    } else {
      // if (e.target.name === "dur_in_days") {
      //   setValue3(newValue);
      // }
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
      if (e.target.name === "dur_in_days") {
        setValue3(newValue);
      }
      setError("");
    }
  };



  return (
    <>
      <CRow className="mb-3">
        <CCol lg={3}>
          <div class="position-relative">
            <label for="validationTooltip01" class="form-label">
              Date *
            </label>
            <div className="date-size">
              <DatePicker
                showIcon
                selected={date}
                onChange={(date) => setDate(date)}
                dateFormat="MM-dd-yyyy"
                disabled
              />
            </div>
          </div>
        </CCol>
        <CCol lg={3}>
          <div class="position-relative">
            <label for="validationTooltip01" class="form-label">
              Time *
            </label>
            <div className="date-size">
              <DatePicker
                 showIcon
                 selected={time}
                 onChange={(time) => setTime(time)}
                 showTimeSelect
                 showTimeSelectOnly
                 timeIntervals={15}
                 timeCaption="Time"
                 dateFormat="h:mm aa"
                 
              />
            </div>
          </div>
        </CCol>
        <CCol lg={3}>
          <div style={{ width: "100%" }}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Location *
              </label>
              <input
                type="text"
                class="form-control pad-10"
                id="validationTooltip01"
                placeholder="Enter"
                defaultValue={defaultValues?.location}
                // value={location}
              />
            </div>
          </div>
        </CCol>
        <CCol lg={3}>
          <div style={{ width: "100%" }}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Duration in Days *
              </label>
              <input
                type="text"
                class="form-control  pad-10"
                id="validationTooltip01"
                placeholder="0000"
                // defaultValue={defaultValues?.duration_days}
                name="dur_in_days"
                value={duration}
                onChange={handleChange}
                onPaste={handlePaste}
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
                Symptoms *
              </label>
              {/* <input
                type="text"
                class="form-control  pad-10"
                id="validationTooltip01"
                placeholder="Enter"
                defaultValue={defaultValues?.characteristics}
              /> */}
              <div
                className="w-100"
                style={{
                  border: "1px solid #17171D33",
                  borderRadius: "5px",
                }}
              >
                <Dropdown
                  options={options1}
                  // defaultValue={options1[1]}
                  getSelectedValue={getSelectedValue1}
                />
              </div>
            </div>
          </div>
        </CCol>
        <CCol lg={4}>
          <div style={{ width: "100%" }}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Aggravating factors
              </label>
              <CFormTextarea
                type="text"
                class="form-control  pad-10"
                id="validationTooltip01"
                placeholder="Enter"
                defaultValue={defaultValues?.aggravating}
              />
            </div>
          </div>
        </CCol>
        <CCol lg={4}>
          <div style={{ width: "100%" }}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Relieving factors
              </label>
              <CFormTextarea
                type="text"
                class="form-control  pad-10"
                id="validationTooltip01"
                placeholder="Enter"
                defaultValue={defaultValues?.relieving}
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
                Temporal factors
              </label>
              <CFormTextarea
                type="text"
                class="form-control  pad-10"
                id="validationTooltip01"
                placeholder="Enter"
                defaultValue={defaultValues?.temporal}
              />
            </div>
          </div>
        </CCol>
        <CCol lg={4}>
          <div style={{ width: "100%" }}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Severity *
              </label>
              <div
                className="w-100"
                style={{
                  border: "1px solid #17171D33",
                  borderRadius: "5px",
                }}
              >
                <Dropdown
                  options={options}
                  defaultValue={options[1]}
                  getSelectedValue={getSelectedValue}
                />
              </div>
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

export default SignsSymptomsForm;

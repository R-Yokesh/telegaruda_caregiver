import { CCol, CContainer, CRow } from "@coreui/react";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PrimaryButton from "../../../../../Buttons/PrimaryButton/PrimaryButton";
import SecondaryButton from "../../../../../Buttons/SecondaryButton/SecondaryButton";
import Dropdown from "../../../../../Dropdown/Dropdown";

const HeartRate = ({ addBack, defaultData }) => {
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [type, setType] = useState("");

  useEffect(() => {
    // Function to parse date string "MM-DD-YYYY HH:mm" to Date object
    const parseDateString = (dateString) => {
      const parts = dateString?.split(" ");
      const datePart = parts[0];
      const timePart = parts[1];
      const [month, day, year] = datePart?.split("-")?.map(Number);
      const [hours, minutes] = timePart?.split(":")?.map(Number);
      return new Date(year, month - 1, day, hours, minutes);
    };

    // Example default date string
    const defaultDateString = defaultData?.date;

    // Parse default date string to Date object
    const defaultDate = defaultData
      ? parseDateString(defaultDateString)
      : new Date();

    // Set default date in state
    setSelectedDate(defaultDate);
    setSelectedTime(defaultDate);
  }, [defaultData]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (date) => {
    setSelectedTime(date);
  };
  const extractNum = (data) => {
    const numbers = parseFloat(data?.match(/\d+(\.\d+)?/)[0]); // Replace non-digits with empty string

    return numbers || "";
  };

  const options = ["Single Lead", "3 Lead", "12 Lead"];
  const findIndex = defaultData?.ecg_type
    ? options?.indexOf(defaultData?.ecg_type)
    : 0;

    const getSelectedValue = (data) => {
      setType(data);
    };
  return (
    <>
      <CContainer>
        <CRow className="mb-3">
          <CCol lg={4}>
            <div class="position-relative d-flex flex-column gap-1">
              <label for="validationTooltip01" class="form-label">
                Date *
              </label>
              <DatePicker
                showIcon
                selected={selectedDate}
                onChange={handleDateChange}
                isClearable
                closeOnScroll={true}
                wrapperClassName="date-picker-wrapper"
              />
            </div>
          </CCol>
          <CCol lg={4}>
            <div class="position-relative d-flex flex-column gap-1">
              <label for="validationTooltip01" class="form-label">
                Time *
              </label>
              <DatePicker
                showIcon
                selected={selectedTime}
                onChange={handleTimeChange}
                showTimeSelect
                showTimeSelectOnly
                isClearable
                closeOnScroll={true}
                timeIntervals={5}
                dateFormat="h:mm aa"
              />
            </div>
          </CCol>
          <CCol lg={4}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                ECG Type *
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
                  defaultValue={options[findIndex]}
                  getSelectedValue={getSelectedValue}
                />
              </div>
              {/* <input
                type="text"
                class="form-control"
                id="validationTooltip01"
                defaultValue={defaultData?.["heart_rate_(bpm)"]}
              /> */}
            </div>
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CCol lg={4}>
            <div class="position-relative d-flex flex-column gap-1">
              <label for="validationTooltip01" class="form-label">
                ECG *
              </label>
              <input type="file" id="file" />
              <label for="file">Choose file</label>

              <div class="d-flex flex-column gap-1 justify-content-center h-100">
                {defaultData?.ecg ? (
                  <span className="">
                    ECG{"("}
                    {defaultData?.ecg?.contentType}
                    {")"}
                  </span>
                ) : (
                  <span className="">No File Chosen</span>
                )}
              </div>
            </div>
          </CCol>
          {/* <CCol lg={4}>
            <div class="position-relative d-flex flex-column gap-1 justify-content-center h-100">
              {defaultData?.ecg ? (
                <span className="mt-2">{defaultData?.ecg}</span>
              ) : (
                <span className="mt-2">No File Chosen</span>
              )}
            </div>
          </CCol> */}
          <CCol lg={8}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                ECG Interpretation *
              </label>
              <input
                type="text"
                class="form-control"
                id="validationTooltip01"
                defaultValue={defaultData?.interpretation}
              />
            </div>
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CCol xs={3} md={2}>
            <PrimaryButton onClick={() => addBack()}>SAVE</PrimaryButton>
          </CCol>
          <CCol xs={3} md={2}>
            <SecondaryButton onClick={() => addBack()}>CANCEL</SecondaryButton>
          </CCol>
        </CRow>
      </CContainer>
    </>
  );
};

export default HeartRate;

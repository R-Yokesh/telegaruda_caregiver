import { CCol, CContainer, CRow } from "@coreui/react";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PrimaryButton from "../../../../../Buttons/PrimaryButton/PrimaryButton";
import SecondaryButton from "../../../../../Buttons/SecondaryButton/SecondaryButton";
import Dropdown from "../../../../../Dropdown/Dropdown";

const BSugar = ({ addBack, defaultData }) => {
  console.log("first", defaultData);
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

  const options = ["Fasting", "Random", "Post Prandial ",];
  const findIndex = defaultData?.type
  ? options?.indexOf(defaultData?.type)
  : 0;

const getSelectedValue = (data) => {
  setType(data);
};

const numWithDecimal = (e) => {
  e.target.value = e.target.value
    .replace(/[^0-9.]/g, "")               
    .replace(/^(\d{4})\d*$/, "$1")        
    .replace(/^(\d{4})\.(\d{1}).*$/, "$1.$2") 
    .replace(/(\..*)\./g, "$1");         
}

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
              Type *
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
            </div>
            
          </CCol>
        </CRow>
        <CRow className="mb-3">
          {/* <CCol lg={4}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Unit *
              </label>
              <input
                type="text"
                class="form-control"
                id="validationTooltip01"
                defaultValue={'mg/dL'}
              />
            </div>
          </CCol> */}
          <CCol lg={4}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
              Blood Sugar (mg/dL)  *
              </label>
              <input
                type="text"
                class="form-control"
                id="validationTooltip01"
                 defaultValue={defaultData?.blood_sugar_value}
               onInput={numWithDecimal}
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

export default BSugar;

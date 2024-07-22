import { CCol, CRow } from "@coreui/react";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import SecondaryButton from "../../../../../../Buttons/SecondaryButton/SecondaryButton";
import PrimaryButton from "../../../../../../Buttons/PrimaryButton/PrimaryButton";

const ScreeningHistoryForm = ({ back, defaultValues }) => {
  const [date, setDate] = useState(null);
  const [date2, setDate2] = useState(null);
  const [date3, setDate3] = useState(null);

  useEffect(() => {
    // Function to parse date string "MM-DD-YYYY HH:mm" to Date object
    const parseDateString = (dateString) => {
      const parts = dateString?.split(" ");
      const datePart = parts[0];
      const [month, day, year] = datePart?.split("-")?.map(Number);
      return new Date(year, month - 1, day);
    };

    // Example default date string
    const defaultDateString = defaultValues?.date_of_last_pap;

    // Parse default date string to Date object
    const defaultDate = defaultValues?.date_of_last_pap
      ? parseDateString(defaultDateString)
      : new Date();

    // Example default date string
    const defaultDateString2 = defaultValues?.date_of_last_mamogram;

    // Parse default date string to Date object
    const defaultDate2 = defaultValues?.date_of_last_mamogram
      ? parseDateString(defaultDateString2)
      : new Date();

    // Example default date string
    const defaultDateString3 = defaultValues?.date_of_last_breast;

    // Parse default date string to Date object
    const defaultDate3 = defaultValues?.date_of_last_breast
      ? parseDateString(defaultDateString3)
      : new Date();

    // Set default date in state
    setDate(defaultDate);
    setDate2(defaultDate2);
    setDate3(defaultDate3);
  }, [defaultValues]);

  return (
    <>
      <CRow className="mb-3">
        <CCol lg={4}>
          <div class="position-relative">
            <label for="validationTooltip01" class="form-label">
              Date of last pap smear *
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
          <div style={{ width: "100%" }}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                History of abnormal pap smear *
              </label>
              <input
                type="text"
                class="form-control  pad-10"
                id="validationTooltip01"
                placeholder="Enter"
                defaultValue={defaultValues?.history_of_abnormal}
              />
            </div>
          </div>
        </CCol>
        <CCol lg={4}>
          <div class="position-relative">
            <label for="validationTooltip01" class="form-label">
              Date of last mamogram *
            </label>
            <div className="date-size">
              <DatePicker
                showIcon
                selected={date2}
                onChange={(date) => setDate2(date)}
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
                History of mamogram *
              </label>
              <input
                type="text"
                class="form-control  pad-10"
                id="validationTooltip01"
                placeholder="Enter"
                defaultValue={defaultValues?.history_of_mamogram}
              />
            </div>
          </div>
        </CCol>
        <CCol lg={4}>
          <div class="position-relative">
            <label for="validationTooltip01" class="form-label">
              Date of last Breast Exam *
            </label>
            <div className="date-size">
              <DatePicker
                showIcon
                selected={date3}
                onChange={(date) => setDate3(date)}
              />
            </div>
          </div>
        </CCol>
        <CCol lg={4}>
          <div style={{ width: "100%" }}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                History of Breast Exam *
              </label>
              <input
                type="text"
                class="form-control  pad-10"
                id="validationTooltip01"
                placeholder="Enter"
                defaultValue={defaultValues?.history_of_breast}
              />
            </div>
          </div>
        </CCol>
      </CRow>
      <CRow className="mb-1">
        <div style={{ width: "130px" }}>
          <PrimaryButton>SAVE</PrimaryButton>
        </div>
        <div style={{ width: "128px" }}>
          <SecondaryButton onClick={back}>CANCEL</SecondaryButton>
        </div>
      </CRow>
    </>
  );
};

export default ScreeningHistoryForm;

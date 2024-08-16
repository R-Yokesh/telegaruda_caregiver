import { CCol, CFormTextarea, CFormCheck, CRow } from "@coreui/react";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import SecondaryButton from "../../../../../../Buttons/SecondaryButton/SecondaryButton";
import PrimaryButton from "../../../../../../Buttons/PrimaryButton/PrimaryButton";
import Dropdown from "../../../../../../Dropdown/Dropdown";
import { DATE_FORMAT } from "../../../../../../../Config/config";

const ScreeningHistoryForm = ({ back, defaultValues, from }) => {
  const [date, setDate] = useState(null);
  const [date2, setDate2] = useState(null);
  const [date3, setDate3] = useState(null);
  const [abnormalStatus, setAbnormalStatus] = useState(
    defaultValues?.history_of_abnormal || "No"
  );
  const [mamogramStatus, setMamogramStatus] = useState(
    defaultValues?.history_of_mamogram || "No"
  );
  const [breastStatus, setBreastStatus] = useState(
    defaultValues?.history_of_breast || "No"
  );

  const handleAbnormalStatus = (event) => {
    setAbnormalStatus(event.target.value === "yes" ? "Yes" : "No");
  };

  const handleMamogramStatus = (event) => {
    setMamogramStatus(event.target.value === "yes" ? "Yes" : "No");
  };

  const handleBreastStatus = (event) => {
    setBreastStatus(event.target.value === "yes" ? "Yes" : "No");
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
  const options = ["Yes", "No"];

  const getSelectedValue2 = (data) => {
    setAbnormalStatus(data);
  };

  const findIndex = defaultValues?.history_of_abnormal
    ? options?.indexOf(defaultValues?.history_of_abnormal)
    : 1;

  const getSelectedValue3 = (data) => {
    setMamogramStatus(data);
  };

  const getSelectedValue4 = (data) => {
    setBreastStatus(data);
  };

  const findIndex3 = defaultValues?.history_of_mamogram
    ? options?.indexOf(defaultValues?.history_of_mamogram)
    : 1;

  const findIndex4 = defaultValues?.history_of_breast
    ? options?.indexOf(defaultValues?.history_of_breast)
    : 1;
  return (
    <>
      <CRow className="mb-3">
        <CCol lg={4} className="mb-3">
          <div class="position-relative">
            <label for="validationTooltip01" class="form-label">
              Date of last pap smear
            </label>
            <div className="date-size">
              <DatePicker
                showIcon
                selected={date}
                onChange={(date) => setDate(date)}
                dateFormat={DATE_FORMAT}
                disabled={from === "Consult-Screen" ? true : false}
              />
            </div>
          </div>
        </CCol>
        <CCol lg={4} className="mb-3">
          <p className="radio-label">History of abnormal pap smear</p>
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
                id="abnormalYes"
                value="yes"
                label={<label className="form-label mb-0">Yes</label>}
                name="abnormal"
                checked={abnormalStatus === "Yes"}
                onChange={handleAbnormalStatus}
                disabled={from === "Consult-Screen" ? true : false}
              />
              <CFormCheck
                className="mb-0"
                inline
                type="radio"
                id="abnormalNo"
                value="no"
                label={<label className="form-label mb-0">No</label>}
                name="abnormal"
                checked={abnormalStatus === "No"}
                onChange={handleAbnormalStatus}
                disabled={from === "Consult-Screen" ? true : false}
              />
            </div>
          </div>
        </CCol>
        {abnormalStatus === "Yes" && (
          <CCol lg={4} className="mb-3">
            <div style={{ width: "100%" }}>
              <div class="position-relative">
                <label for="validationTooltip01" class="form-label">
                  Abnormal pap smear details
                </label>
                <CFormTextarea
                  id="exampleFormControlTextarea1"
                  // label="Example textarea"
                  rows={3}
                  // text="Must be 8-20 words long."
                  disabled={from === "Consult-Screen" ? true : false}
                ></CFormTextarea>
              </div>
            </div>
          </CCol>
        )}
        <CCol lg={4} className="mb-3">
          <div class="position-relative">
            <label for="validationTooltip01" class="form-label">
              Date of last mamogram
            </label>
            <div className="date-size">
              <DatePicker
                showIcon
                selected={date2}
                onChange={(date) => setDate2(date)}
                disabled={from === "Consult-Screen" ? true : false}
                dateFormat={DATE_FORMAT}
              />
            </div>
          </div>
        </CCol>
        <CCol lg={4} className="mb-3">
          <p className="radio-label">History of mamogram</p>
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
                id="mamogramYes"
                value="yes"
                label={<label className="form-label mb-0">Yes</label>}
                name="mamogram"
                checked={mamogramStatus === "Yes"}
                onChange={handleMamogramStatus}
                disabled={from === "Consult-Screen" ? true : false}
              />
              <CFormCheck
                className="mb-0"
                inline
                type="radio"
                id="mamogramNo"
                value="no"
                label={<label className="form-label mb-0">No</label>}
                name="mamogram"
                checked={mamogramStatus === "No"}
                onChange={handleMamogramStatus}
                disabled={from === "Consult-Screen" ? true : false}
              />
            </div>
          </div>
        </CCol>
        {mamogramStatus === "Yes" && (
          <CCol lg={4} className="mb-3">
            <div style={{ width: "100%" }}>
              <div class="position-relative">
                <label for="validationTooltip01" class="form-label">
                  Mamogram details
                </label>
                <CFormTextarea
                  id="exampleFormControlTextarea1"
                  // label="Example textarea"
                  rows={3}
                  // text="Must be 8-20 words long."
                  disabled={from === "Consult-Screen" ? true : false}
                ></CFormTextarea>
              </div>
            </div>
          </CCol>
        )}
        <CCol lg={4} className="mb-3">
          <div class="position-relative">
            <label for="validationTooltip01" class="form-label">
              Date of last breast exam
            </label>
            <div className="date-size">
              <DatePicker
                showIcon
                selected={date3}
                onChange={(date) => setDate3(date)}
                disabled={from === "Consult-Screen" ? true : false}
                dateFormat={DATE_FORMAT}
              />
            </div>
          </div>
        </CCol>
        <CCol lg={4} className="mb-3">
          <p className="radio-label">History of breast exam</p>
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
                id="breastYes"
                value="yes"
                label={<label className="form-label mb-0">Yes</label>}
                name="breast"
                checked={breastStatus === "Yes"}
                onChange={handleBreastStatus}
                disabled={from === "Consult-Screen" ? true : false}
              />
              <CFormCheck
                className="mb-0"
                inline
                type="radio"
                id="breastNo"
                value="no"
                label={<label className="form-label mb-0">No</label>}
                name="breast"
                checked={breastStatus === "No"}
                onChange={handleBreastStatus}
                disabled={from === "Consult-Screen" ? true : false}
              />
            </div>
          </div>
        </CCol>
        {breastStatus === "Yes" && (
          <CCol lg={4} className="mb-3">
            <div style={{ width: "100%" }}>
              <div class="position-relative">
                <label for="validationTooltip01" class="form-label">
                  Breast exam details
                </label>
                <CFormTextarea
                  id="exampleFormControlTextarea1"
                  // label="Example textarea"
                  rows={3}
                  // text="Must be 8-20 words long."
                  disabled={from === "Consult-Screen" ? true : false}
                ></CFormTextarea>
              </div>
            </div>
          </CCol>
        )}
      </CRow>

      {from !== "Consult-Screen" && (
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

export default ScreeningHistoryForm;

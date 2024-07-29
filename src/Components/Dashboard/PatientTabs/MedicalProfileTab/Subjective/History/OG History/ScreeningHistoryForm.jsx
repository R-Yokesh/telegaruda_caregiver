import { CCol, CFormTextarea, CRow } from "@coreui/react";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import SecondaryButton from "../../../../../../Buttons/SecondaryButton/SecondaryButton";
import PrimaryButton from "../../../../../../Buttons/PrimaryButton/PrimaryButton";
import Dropdown from "../../../../../../Dropdown/Dropdown";

const ScreeningHistoryForm = ({ back, defaultValues }) => {
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
              />
            </div>
          </div>
        </CCol>
        <CCol lg={4} className="mb-3">
          <div style={{ width: "100%" }}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                History of abnormal pap smear 
              </label>
              {/* <input
                type="text"
                class="form-control  pad-10"
                id="validationTooltip01"
                placeholder="Enter"
                defaultValue={defaultValues?.history_of_abnormal}
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
                  getSelectedValue={getSelectedValue2}
                />
              </div>
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
              />
            </div>
          </div>
        </CCol>
        <CCol lg={4} className="mb-3">
          <div style={{ width: "100%" }}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                History of mamogram 
              </label>
              {/* <input
                type="text"
                class="form-control  pad-10"
                id="validationTooltip01"
                placeholder="Enter"
                defaultValue={defaultValues?.history_of_mamogram}
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
              />
            </div>
          </div>
        </CCol>
        <CCol lg={4} className="mb-3">
          <div style={{ width: "100%" }}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                History of breast exam 
              </label>
              {/* <input
                type="text"
                class="form-control  pad-10"
                id="validationTooltip01"
                placeholder="Enter"
                defaultValue={defaultValues?.history_of_breast}
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
                  defaultValue={options[findIndex4]}
                  getSelectedValue={getSelectedValue4}
                />
              </div>
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
                ></CFormTextarea>
              </div>
            </div>
          </CCol>
        )}
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

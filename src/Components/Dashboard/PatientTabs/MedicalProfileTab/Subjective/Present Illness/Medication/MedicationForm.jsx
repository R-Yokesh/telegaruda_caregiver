import { CCol, CFormCheck, CFormSelect, CRow } from "@coreui/react";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { Assets } from "../../../../../../../assets/Assets";
import SecondaryButton from "../../../../../../Buttons/SecondaryButton/SecondaryButton";
import PrimaryButton from "../../../../../../Buttons/PrimaryButton/PrimaryButton";
import Dropdown from "../../../../../../Dropdown/Dropdown";

const MedicationForm = ({ back, defaultValues }) => {
  const [date, setDate] = useState(null);
  const [date1, setDate1] = useState(null);

  useEffect(() => {
    // Function to parse date string "MM-DD-YYYY HH:mm" to Date object
    const parseDateString = (dateString) => {
      const parts = dateString?.split(" ");
      const datePart = parts[0];
      const [month, day, year] = datePart?.split("-")?.map(Number);
      return new Date(year, month - 1, day);
    };

    // Example default date string
    const defaultDateString = defaultValues?.start_date;

    // Parse default date string to Date object
    const defaultDate = defaultValues?.start_date
      ? parseDateString(defaultDateString)
      : new Date();
    // Example default date string
    const defaultDateString2 = defaultValues?.end_date;

    // Parse default date string to Date object
    const defaultDate2 = defaultValues?.end_date
      ? parseDateString(defaultDateString2)
      : new Date();

    // Set default date in state
    setDate(defaultDate);
    setDate1(defaultDate2);
  }, [defaultValues]);

  const options = ["Taking", "Not Taking", "Discontinued", "Status Unknown"];
  const getSelectedValue = (data) => {
    console.log(data);
  };
  return (
    <>
      <CRow className="mb-3">
        <CCol lg={4} className="mb-3">
          <div style={{ width: "100%" }}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Medication Type *
              </label>
              <input
                type="text"
                class="form-control pad-10"
                id="validationTooltip01"
                placeholder="Enter"
                defaultValue={defaultValues?.name}
              />
            </div>
          </div>
        </CCol>
        <CCol lg={4} className="mb-3">
          <div style={{ width: "100%" }}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Medication Name *
              </label>
              <input
                type="text"
                class="form-control pad-10"
                id="validationTooltip01"
                placeholder="Enter"
                defaultValue={defaultValues?.name}
              />
            </div>
          </div>
        </CCol>
        <CCol lg={4} className="mb-3">
          <div style={{ width: "100%" }}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Strength & Dosage *
              </label>
              <input
                type="text"
                class="form-control pad-10"
                id="validationTooltip01"
                placeholder="Enter"
                defaultValue={defaultValues?.strength}
              />
            </div>
          </div>
        </CCol>
        <CCol lg={4} className="mb-3">
          <div style={{ width: "100%" }}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Strength measurement *
              </label>
              <CFormSelect
                size="lg"
                className="mb-3"
                aria-label="Large select example"
                name="strength"
                // defaultValue={medicine?.strength}
              >
                <option>Select</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </CFormSelect>
            </div>
          </div>
        </CCol>
        <CCol lg={4} className="mb-3">
          <div style={{ width: "100%" }}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Route of administration *
              </label>
              <CFormSelect
                size="lg"
                className="mb-3"
                aria-label="Large select example"
                name="strengthMeasurement"
              >
                <option>Select</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </CFormSelect>
            </div>
          </div>
        </CCol>
        <CCol lg={4} className="mb-3">
          <div style={{ width: "100%" }}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                No. of Day(s) *
              </label>
              <input
                type="text"
                class="form-control  pad-10"
                id="validationTooltip01"
                placeholder="Enter"
                name="days"
              />
            </div>
          </div>
        </CCol>
        <CCol lg={4} className="mb-3">
          <div style={{ width: "100%" }}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Total Qty / Taken
              </label>
              <input
                type="text"
                class="form-control  pad-10"
                id="validationTooltip01"
                placeholder="Enter"
                name="totalQty"
              />
            </div>
          </div>
        </CCol>
        <CCol lg={4} className="mb-3">
          <div class="position-relative">
            <label for="validationTooltip01" class="form-label">
              Start Date *
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
          <div class="position-relative">
            <label for="validationTooltip01" class="form-label">
              End Date *
            </label>
            <div className="date-size">
              <DatePicker
                showIcon
                selected={date1}
                onChange={(date) => setDate1(date)}
              />
            </div>
          </div>
        </CCol>
        <CCol lg={4} className="mb-3" style={{ paddingRight: "0" }}>
          <div style={{ width: "100%" }} className="d-flex gap-3">
            <div>
              <label for="validationTooltip01" class="form-label">
                M
              </label>
              <input
                type="text"
                class="form-control  pad-10 text-align-center"
                id="validationTooltip01"
                placeholder="0"
                name="m"
              />
            </div>
            <div>
              <label for="validationTooltip01" class="form-label">
                A
              </label>
              <input
                type="text"
                class="form-control  pad-10 text-align-center"
                id="validationTooltip01"
                placeholder="0"
                name="a"
              />
            </div>
            <div>
              <label for="validationTooltip01" class="form-label">
                E
              </label>
              <input
                type="text"
                class="form-control  pad-10 text-align-center"
                id="validationTooltip01"
                placeholder="0"
                name="e"
              />
            </div>
            <div>
              <label for="validationTooltip01" class="form-label">
                N
              </label>
              <input
                type="text"
                class="form-control  pad-10 text-align-center"
                id="validationTooltip01"
                placeholder="0"
                name="n"
              />
            </div>
          </div>
        </CCol>
        <CCol lg={3} className="mb-3">
          <div className="h-100 d-flex align-items-end w-100 justify-content-start">
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
                id="inlineCheckbox1"
                value="bf"
                disabled={
                  defaultValues?.lab_status === "Prescribed"
                    ? false
                    : defaultValues?.medicines?.length >= 1
                    ? true
                    : false
                }
                label={
                  <label for="validationTooltip01" class="form-label mb-0">
                    BF
                  </label>
                }
                name="food"
              />
              <CFormCheck
                className="mb-0"
                inline
                type="radio"
                id="inlineCheckbox2"
                value="af"
                label={
                  <label for="validationTooltip01" class="form-label mb-0">
                    AF
                  </label>
                }
                name="food"
              />
            </div>
          </div>
        </CCol>
        <CCol lg={5} className="mb-3">
          <div style={{ width: "100%" }}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Instruction
              </label>
              <input
                type="text"
                class="form-control  pad-10"
                id="validationTooltip01"
                placeholder="Enter"
                name="instruction"
              />
            </div>
          </div>
        </CCol>
        <CCol lg={7} className="mb-3">
          <div style={{ width: "100%" }}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Reason for medication
              </label>
              <input
                type="text"
                class="form-control  pad-10"
                id="validationTooltip01"
                placeholder="Enter"
                name="reason"
              />
            </div>
          </div>
        </CCol>
        <CCol lg={5} className="mb-3">
          <div style={{ width: "100%" }}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Status *
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

export default MedicationForm;

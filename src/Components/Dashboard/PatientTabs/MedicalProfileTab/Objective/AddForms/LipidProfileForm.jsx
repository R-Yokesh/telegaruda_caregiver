import { CCol, CContainer, CRow } from "@coreui/react";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PrimaryButton from "../../../../../Buttons/PrimaryButton/PrimaryButton";
import SecondaryButton from "../../../../../Buttons/SecondaryButton/SecondaryButton";

const LipidProfileForm = ({ addBack }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (date) => {
    setSelectedTime(date);
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
                Result *
              </label>
              <input
                type="text"
                class="form-control"
                id="validationTooltip01"
                placeholder="Enter"
              />
            </div>
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CCol lg={4}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Unit (Total) *
              </label>
              <select
                class="form-select"
                aria-label="Disabled select example"
                defaultValue={"mg/dL"}
              >
                <option value="dL">dL</option>
                <option value="mg">mg</option>
                <option value="mg/dL">mg/dL</option>
              </select>
            </div>
          </CCol>
          <CCol lg={4}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Total *
              </label>
              <input
                type="text"
                class="form-control"
                id="validationTooltip01"
              />
            </div>
          </CCol>
          <CCol lg={4}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Unit (Triglycerides) *
              </label>
              <select
                class="form-select"
                aria-label="Disabled select example"
                defaultValue={"mg/dL"}
              >
                <option value="dL">dL</option>
                <option value="mg">mg</option>
                <option value="mg/dL">mg/dL</option>
              </select>
            </div>
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CCol lg={4}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Triglycerides *
              </label>
              <input
                type="text"
                class="form-control"
                id="validationTooltip01"
              />
            </div>
          </CCol>
          <CCol lg={4}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Unit (HDL) *
              </label>
              <select
                class="form-select"
                aria-label="Disabled select example"
                defaultValue={"mg/dL"}
              >
                <option value="dL">dL</option>
                <option value="mg">mg</option>
                <option value="mg/dL">mg/dL</option>
              </select>
            </div>
          </CCol>
          <CCol lg={4}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                HDL *
              </label>
              <input
                type="text"
                class="form-control"
                id="validationTooltip01"
              />
            </div>
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CCol lg={4}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Unit (LDL) *
              </label>
              <select
                class="form-select"
                aria-label="Disabled select example"
                defaultValue={"mg/dL"}
              >
                <option value="dL">dL</option>
                <option value="mg">mg</option>
                <option value="mg/dL">mg/dL</option>
              </select>
            </div>
          </CCol>
          <CCol lg={4}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                LDL *
              </label>
              <input
                type="text"
                class="form-control"
                id="validationTooltip01"
              />
            </div>
          </CCol>
          <CCol lg={4}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                HDL/LDL *
              </label>
              <input
                type="text"
                class="form-control"
                id="validationTooltip01"
              />
            </div>
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CCol lg={4}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Unit (VLDL) *
              </label>
              <select
                class="form-select"
                aria-label="Disabled select example"
                defaultValue={"mg/dL"}
              >
                <option value="dL">dL</option>
                <option value="mg">mg</option>
                <option value="mg/dL">mg/dL</option>
              </select>
            </div>
          </CCol>
          <CCol lg={4}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                VLDL *
              </label>
              <input
                type="text"
                class="form-control"
                id="validationTooltip01"
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

export default LipidProfileForm;

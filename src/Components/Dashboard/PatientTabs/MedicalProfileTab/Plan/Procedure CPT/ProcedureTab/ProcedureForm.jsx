import { CCol, CRow } from "@coreui/react";
import React, { useState } from "react";
import PrimaryButton from "../../../../../../Buttons/PrimaryButton/PrimaryButton";
import SecondaryButton from "../../../../../../Buttons/SecondaryButton/SecondaryButton";
import DatePicker from "react-datepicker";

const ProcedureForm = ({ back, defaultValues }) => {
  const [date, setDate] = useState(new Date());

  return (
    <>
      <CRow className="mb-3">
        <CCol lg={6}>
          <div style={{ width: "100%" }}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Date *
              </label>
              <div className="date-size">
                <DatePicker
                  showIcon
                  selected={date}
                  onChange={(date) => setDate(date)}
                />
              </div>
            </div>
          </div>
        </CCol>
        <CCol lg={6}>
          <div style={{ width: "100%" }}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
              CPT Code *
              </label>
              <input
                type="text"
                class="form-control  pad-10"
                id="validationTooltip01"
                placeholder="Enter"
                defaultValue={defaultValues?.treatment}
              />
            </div>
          </div>
        </CCol>
      </CRow>
      <CRow className="mb-3">
        <CCol lg={12}>
          <div style={{ width: "100%" }}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Description *
              </label>
              <input
                type="text"
                class="form-control  pad-10"
                id="validationTooltip01"
                placeholder="Enter"
                defaultValue={defaultValues?.remark}
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

export default ProcedureForm;

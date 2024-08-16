import { CCol, CRow } from "@coreui/react";
import React, { useState } from "react";
import PrimaryButton from "../../../../../../Buttons/PrimaryButton/PrimaryButton";
import SecondaryButton from "../../../../../../Buttons/SecondaryButton/SecondaryButton";
import DatePicker from "react-datepicker";
import Dropdown from "../../../../../../Dropdown/Dropdown";
import { DATE_FORMAT } from "../../../../../../../Config/config";

const ProcedureForm = ({ back, defaultValues }) => {
  const [date, setDate] = useState(new Date());
  const [disableText, setDisableText] = useState(false);
  const gravidaoptions = ["93000", "93009", "93001", "93002", "93003"];
  const findgravidaIndex =
    defaultValues?.id &&
    gravidaoptions?.indexOf(defaultValues?.id);
  const getSelectedGravida = (data) => {
    console.log(data);
    setDisableText(true);
  };
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
                  dateFormat={DATE_FORMAT}
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
              {/* <input
                type="text"
                class="form-control  pad-10"
                id="validationTooltip01"
                placeholder="Enter"
                defaultValue={defaultValues?.treatment}
              /> */}
              <div
                className="w-100"
                style={{
                  border: "1px solid #17171D33",
                  borderRadius: "5px",
                }}
              >
                <Dropdown
                  getSelectedValue={getSelectedGravida}
                  options={gravidaoptions}
                  defaultValue={gravidaoptions[findgravidaIndex]}
                />
              </div>
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
                // defaultValue={defaultValues?.remark}
                disabled
                defaultValue={defaultValues?.description}
                value={
                  disableText
                    ? "Electrocardiogram, routine ECG with at least 12 leads; with interpretation and report."
                    : null
                }
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

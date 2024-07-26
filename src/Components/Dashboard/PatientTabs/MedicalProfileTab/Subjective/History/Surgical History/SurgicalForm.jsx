import { CCol, CRow } from "@coreui/react";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { Assets } from "../../../../../../../assets/Assets";
import SecondaryButton from "../../../../../../Buttons/SecondaryButton/SecondaryButton";
import PrimaryButton from "../../../../../../Buttons/PrimaryButton/PrimaryButton";
import Dropdown from "../../../../../../Dropdown/Dropdown";

const SurgicalForm = ({ back, defaultValues }) => {
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
    const defaultDateString = defaultValues?.date;

    // Parse default date string to Date object
    const defaultDate = defaultValues?.date
      ? parseDateString(defaultDateString)
      : new Date();

    // Set default date in state
    setDate(defaultDate);
  }, [defaultValues]);

  const gravidaoptions = ["Lorem Ipsum", "Lorem Ipsum"];
  const findgravidaIndex = defaultValues?.gravida
    ? gravidaoptions?.indexOf(defaultValues?.gravida)
    : 0;
  const getSelectedGravida = (data) => {
    console.log(data);
  };
  return (
    <>
      <CRow className="mb-3">
        <CCol lg={6}>
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
        </CCol>
        <CCol lg={6}>
          <div style={{ width: "100%" }}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Surgery Name *
              </label>
              {/* <input
                type="text"
                class="form-control pad-10"
                id="validationTooltip01"
                placeholder="Enter"
                defaultValue={defaultValues?.name}
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
        <CCol lg={6}>
          <div style={{ width: "100%" }}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Reason *
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
        <CCol lg={6}>
          <div style={{ width: "100%" }}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Notes *
              </label>
              <input
                type="text"
                class="form-control pad-10"
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

export default SurgicalForm;

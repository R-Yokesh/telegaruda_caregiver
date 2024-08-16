import { CCol, CFormCheck, CFormSelect, CRow, CFormTextarea } from "@coreui/react";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import SecondaryButton from "../../../../../../Buttons/SecondaryButton/SecondaryButton";
import PrimaryButton from "../../../../../../Buttons/PrimaryButton/PrimaryButton";
import Dropdown from "../../../../../../Dropdown/Dropdown";
import { DATE_FORMAT } from "../../../../../../../Config/config";

const AllergiesForm = ({ back, defaultValues }) => {
  const [date, setDate] = useState(null);
  const [selectedAllergy, setSelectedAllergy] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    const parseDateString = (dateString) => {
      const parts = dateString?.split(" ");
      const datePart = parts[0];
      const timePart = parts[1];
      const [month, day, year] = datePart?.split("-")?.map(Number);
      const [hours, minutes] = timePart?.split(":")?.map(Number);
      return new Date(year, month - 1, day, hours, minutes);
    };

    const defaultDateString = defaultValues?.date;
    const defaultDate = defaultValues?.date ? parseDateString(defaultDateString) : new Date();
    setDate(defaultDate);

    if (defaultValues?.allergy) {
      setSelectedAllergy(defaultValues.allergy);
      setCategory(defaultValues.allergy); // Assuming the default category is the same as the allergy name.
    }
  }, [defaultValues]);

  const options = ["One", "Two", "Three"];
  const options1 = ["Mild", "Moderate", "Severe"];
  const options2 = ["Active", "Inactive"];

  const getSelectedValue = (data) => {
    setSelectedAllergy(data);
    setCategory(data); // Autofill category based on selected allergy.
  };

  const getSelectedValue1 = (data) => {
    console.log(data);
  };

  const getSelectedValue2 = (data) => {
    console.log(data);
  };

  return (
    <>
      <CRow className="mb-3">
        <CCol lg={4}>
          <div className="position-relative">
            <label htmlFor="validationTooltip01" className="form-label">
              Onset Date *
            </label>
            <div className="date-size">
              <DatePicker showIcon selected={date} 
              onChange={(date) => setDate(date)}
              dateFormat={DATE_FORMAT}
               />
            </div>
          </div>
        </CCol>
        <CCol lg={4}>
          <div style={{ width: "100%" }}>
            <div className="position-relative">
              <label htmlFor="validationTooltip01" className="form-label">
                Allergy Name *
              </label>
              <div
                className="w-100"
                style={{
                  border: "1px solid #17171D33",
                  borderRadius: "5px",
                }}
              >
                <Dropdown options={options} getSelectedValue={getSelectedValue} />
              </div>
            </div>
          </div>
        </CCol>
        <CCol lg={4}>
          <div style={{ width: "100%" }}>
            <div className="position-relative">
              <label htmlFor="validationTooltip01" className="form-label">
                Category *
              </label>
              <input
                type="text"
                className="form-control pad-10"
                id="validationTooltip01"
                placeholder=""
                disabled
                value={category} // Autofilled value
              />
            </div>
          </div>
        </CCol>
      </CRow>
      {/* Additional form rows below */}
      <CRow className="mb-3">
        <CCol lg={4}>
          <div style={{ width: "100%" }}>
            <div className="position-relative">
              <label htmlFor="validationTooltip01" className="form-label">
                Reaction *
              </label>
              <div
                className="w-100"
                style={{
                  border: "1px solid #17171D33",
                  borderRadius: "5px",
                }}
              >
                <Dropdown options={options} getSelectedValue={getSelectedValue} />
              </div>
            </div>
          </div>
        </CCol>
        <CCol lg={4}>
          <div style={{ width: "100%" }}>
            <div className="position-relative">
              <label htmlFor="validationTooltip01" className="form-label">
                Other Reactions
              </label>
              <CFormTextarea
                type="text"
                className="form-control pad-10"
                id="validationTooltip01"
                placeholder="Enter"
                defaultValue={defaultValues?.reaction}
              />
            </div>
          </div>
        </CCol>
        <CCol lg={4}>
          <div style={{ width: "100%" }}>
            <div className="position-relative">
              <label htmlFor="validationTooltip01" className="form-label">
                Severity *
              </label>
              <div
                className="w-100"
                style={{
                  border: "1px solid #17171D33",
                  borderRadius: "5px",
                }}
              >
                <Dropdown options={options1} getSelectedValue={getSelectedValue1} />
              </div>
            </div>
          </div>
        </CCol>
      </CRow>
      <CRow className="mb-3">
        <CCol lg={4}>
          <div style={{ width: "100%" }}>
            <div className="position-relative">
              <label htmlFor="validationTooltip01" className="form-label">
                Provider *
              </label>
              <div
                className="w-100"
                style={{
                  border: "1px solid #17171D33",
                  borderRadius: "5px",
                }}
              >
                <Dropdown options={options} getSelectedValue={getSelectedValue} />
              </div>
            </div>
          </div>
        </CCol>
        <CCol lg={4}>
          <div style={{ width: "100%" }}>
            <div className="position-relative">
              <label htmlFor="validationTooltip01" className="form-label">
                Notes
              </label>
              <CFormTextarea
                type="text"
                className="form-control pad-10"
                id="validationTooltip01"
                placeholder="Enter"
                defaultValue={defaultValues?.severity}
              />
            </div>
          </div>
        </CCol>
        <CCol lg={4}>
          <div style={{ width: "100%" }}>
            <div className="position-relative">
              <label htmlFor="validationTooltip01" className="form-label">
                Status *
              </label>
              <div
                className="w-100"
                style={{
                  border: "1px solid #17171D33",
                  borderRadius: "5px",
                }}
              >
                <Dropdown options={options2} getSelectedValue={getSelectedValue2} />
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

export default AllergiesForm;

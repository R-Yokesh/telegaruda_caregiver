import { CCol, CFormCheck, CFormSelect, CRow,CFormTextarea } from "@coreui/react";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { Assets } from "../../../../../../../assets/Assets";
import SecondaryButton from "../../../../../../Buttons/SecondaryButton/SecondaryButton";
import PrimaryButton from "../../../../../../Buttons/PrimaryButton/PrimaryButton";
import Dropdown from "../../../../../../Dropdown/Dropdown";



const AllergiesForm = ({ back, defaultValues }) => {

    const [date, setDate] = useState(null);
  
    useEffect(() => {
      // Function to parse date string "MM-DD-YYYY HH:mm" to Date object
      const parseDateString = (dateString) => {
        const parts = dateString?.split(" ");
        const datePart = parts[0];
        const timePart = parts[1];
        const [month, day, year] = datePart?.split("-")?.map(Number);
        const [hours, minutes] = timePart?.split(":")?.map(Number);
        const date = new Date(year, month - 1, day, hours, minutes);
        return date;
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
    
      const options = ["One", "Two","Three",];
  
      const getSelectedValue = (data) => {
        console.log(data);
      };

      const options1 = ["Mild", "Moderate","Severe",];
      
      const getSelectedValue1 = (data) => {
        console.log(data);
      };

      const options2 = ["Active", "In Active"];
      
      const getSelectedValue2 = (data) => {
        console.log(data);
      };

  return (
     <>
    <CRow className="mb-3">
      <CCol lg={4}>
      <div class="position-relative">
            <label for="validationTooltip01" class="form-label">
            Onset Date *
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
            Allergy Name *
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
                getSelectedValue={getSelectedValue}
              />
            </div>
          </div>
        </div>
      </CCol>
      <CCol lg={4}>
      <div style={{ width: "100%" }}>
          <div class="position-relative">
            <label for="validationTooltip01" class="form-label">
            Category *
            </label>
            <input
              type="text"
              class="form-control pad-10"
              id="validationTooltip01"
              placeholder=""
              defaultValue={defaultValues?.allergy}
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
            Reaction *
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
                getSelectedValue={getSelectedValue}
              />
            </div>
          </div>
        </div>
      </CCol>
      <CCol lg={4}>
      <div style={{ width: "100%" }}>
          <div class="position-relative">
            <label for="validationTooltip01" class="form-label">
            Other Reactions
            </label>
            <CFormTextarea
                type="text"
                class="form-control  pad-10"
                id="validationTooltip01"
                placeholder="Enter"
                defaultValue={defaultValues?.reaction}
              />
          </div>
        </div>
      </CCol>
      <CCol lg={4}>
      <div style={{ width: "100%" }}>
          <div class="position-relative">
            <label for="validationTooltip01" class="form-label">
            Severity *
            </label>
            <div
              className="w-100"
              style={{
                border: "1px solid #17171D33",
                borderRadius: "5px",
              }}
            >
               <Dropdown
                options={options1}
                getSelectedValue={getSelectedValue1}
              />
            </div>
          </div>
        </div>
      </CCol>
    </CRow>
    <CRow className="mb-3">
    <CCol lg={4}>
      <div style={{ width: "100%" }}>
          <div class="position-relative">
            <label for="validationTooltip01" class="form-label">
            Provider *
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
                getSelectedValue={getSelectedValue}
              />
            </div>
          </div>
        </div>
      </CCol>
      <CCol lg={4}>
      <div style={{ width: "100%" }}>
          <div class="position-relative">
            <label for="validationTooltip01" class="form-label">
            Notes
            </label>
            <CFormTextarea
                type="text"
                class="form-control  pad-10"
                id="validationTooltip01"
                placeholder="Enter"
                defaultValue={defaultValues?.severity}
              />
          </div>
        </div>
      </CCol>
      <CCol lg={4}>
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
                options={options2}
                getSelectedValue={getSelectedValue2}
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
  )
}

export default AllergiesForm
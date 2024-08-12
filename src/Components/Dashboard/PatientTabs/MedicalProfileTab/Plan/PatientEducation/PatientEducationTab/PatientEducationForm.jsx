import { CCol, CRow } from "@coreui/react";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { Assets } from "../../../../../../../assets/Assets";
import SecondaryButton from "../../../../../../Buttons/SecondaryButton/SecondaryButton";
import PrimaryButton from "../../../../../../Buttons/PrimaryButton/PrimaryButton";
import Dropdown from "../../../../../../Dropdown/Dropdown";



const PatientEducationForm = ({ back, defaultValues }) => {

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
  
    
      const options = ["one", "Two","Three"];
      const findIndex = defaultValues?.prev_illness
        ? options?.indexOf(defaultValues?.prev_illness)
        : 0;
  
      const getSelectedValue = (data) => {
        console.log(data);
      };
  

   
  return (
    <>
    <CRow className="mb-3">
      <CCol lg={4}>
      <div class="position-relative">
            <label for="validationTooltip01" class="form-label">
              Date *
            </label>
            <div className="date-size">
              <DatePicker
               showIcon
               selected={date}
               onChange={(date) => setDate(date)}
              //  dateFormat="MM-dd-yyyy"
              />
            </div>
          </div>
      </CCol>
      <CCol lg={8}>
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

  )
}

export default PatientEducationForm
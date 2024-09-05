import { CCol, CRow, CFormTextarea } from "@coreui/react";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import SecondaryButton from "../../../../../../Buttons/SecondaryButton/SecondaryButton";
import PrimaryButton from "../../../../../../Buttons/PrimaryButton/PrimaryButton";
import Dropdown from "../../../../../../Dropdown/Dropdown";
import { DATE_FORMAT } from "../../../../../../../Config/config";
import useApi from "../../../../../../../ApiServices/useApi";
import { format } from "date-fns";
import moment from "moment";

const DietForm = ({ back, defaultValues, fetchDiet, setAddFormView }) => {
  const [date, setDate] = useState(null);
  const { loading, error, post, patch, clearCache } = useApi();
  const [selectedTime, setSelectedTime] = useState(new Date()); 
  const [selectedDate, setSelectedDate] = useState(new Date()); 
  const [dietType, setDietType] = useState(defaultValues?.act_type || ""); // Initialize diet type
  const [notes, setNotes] = useState(defaultValues?.detail?.notes || "");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Initialize the state with default values if available
    if (defaultValues) {
      setSelectedDate(parseDate(defaultValues?.details?.act_date) || new Date());
      setSelectedTime(parseTime(defaultValues.act_time)|| new Date());
      setDietType(defaultValues.act_type || ""); // Set the diet type from default values
      setNotes(defaultValues.detail?.notes || ""); // Set the notes from the new format
    }
  }, [defaultValues]);

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

  const parseDate = (dateString) => {
    if (!dateString) return null;
    const [year, month, day] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day);
  };

  const parseTime = (timeString) => {
    if (!timeString) return null;
    const [hours, minutes] = timeString.split(":").map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
  };

  const options = ["Veg", "Non-Veg", "Others"];
  const findIndex = defaultValues?.act_type
    ? options?.indexOf(defaultValues?.act_type)
    : 0;

  const getSelectedValue = (data) => {
    setDietType(data); // Set the selected diet type
  };

  const handleDateChange = (date) => {
    setSelectedDate(date || new Date());
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time || new Date());
  };

  const addDiet = async () => {
    const formattedDate = format(selectedDate, "yyyy-MM-dd"); // Format date to "YYYY-MM-DD"
    const formattedTime = moment(selectedTime).format("HH:mm"); // Format time to "HH:mm"
    try {
      // Construct the request body in the desired format
      const body = {
        patient_id: "10", // Use the appropriate patient ID
        act_catagory: "diet",
        act_date: formattedDate,
        act_time: formattedTime,
        act_type: dietType, // Assuming `dietType` is the selected diet type like "Veg", "Non-Veg", etc.
        detail: {
          notes: notes, // The notes from the form
        },
      };
  
      // Use the provided `post` function to send the request
      const response = await post(`resource/activity_wellness`, body);
  
      if (response.code === 201) {
        clearCache();
        await fetchDiet(); // Refresh the list data here
        setAddFormView(false); // Close the form view
      } else {
        console.error("Failed to fetch data:", response.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  const editDiet = async () => {
    const formattedDate = format(selectedDate, "yyyy-MM-dd"); // Format date to "YYYY-MM-DD"
    const formattedTime = moment(selectedTime).format("HH:mm"); // Format time to "HH:mm"
    try {
      // Construct the request body in the desired format
      const body = {
        act_date: formattedDate,
        act_time: formattedTime,
        act_type: dietType,
        detail: {
          notes: notes,
        },
      };
  
      // Use the provided `patch` function to send the request
      const response = await patch(`resource/activity_wellness/${defaultValues.id}`, body);
  
      if (response.code === 200) {
        clearCache();
        await fetchDiet(); // Refresh the list data here
        setAddFormView(false); // Close the form view
      } else {
        console.error("Failed to update data:", response.message);
      }
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };
  

  const validate = () => {
    // Add validation logic here if needed
    // Example: Check if all required fields are filled
    let validationErrors = {};
    if (!selectedDate) validationErrors.date = "Date is required.";
    if (!selectedTime) validationErrors.time = "Time is required.";
    if (!dietType) validationErrors.dietType = "Diet type is required.";
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const onSubmit = () => {
    if (validate()) {
      if (defaultValues?.id) {
        console.log("Edit clicked");
        editDiet(); // Call edit function if id is present
      } else {
        console.log("Add clicked");
        addDiet(); // Call add function if id is not present
      }
    }
  };

  return (
    <>
      <CRow className="mb-3">
        <CCol lg={4}>
          <div className="position-relative">
            <label htmlFor="validationTooltip01" className="form-label">
              Date *
            </label>
            <div className="date-size">
              <DatePicker
                showIcon
                selected={selectedDate}
                onChange={handleDateChange}
                isClearable
                closeOnScroll={true}
                wrapperClassName="date-picker-wrapper"
                dateFormat={DATE_FORMAT}
              />
            </div>
            {errors.date && <p className="text-danger">{errors.date}</p>}
          </div>
        </CCol>
        <CCol lg={4}>
          <div className="position-relative">
            <label htmlFor="validationTooltip01" className="form-label">
              Time *
            </label>
            <div className="date-size">
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
            {errors.time && <p className="text-danger">{errors.time}</p>}
          </div>
        </CCol>
        <CCol lg={4}>
          <div style={{ width: "100%" }}>
            <div className="position-relative">
              <label htmlFor="validationTooltip01" className="form-label">
                Type of Diet *
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
                  defaultValue={defaultValues?.act_type ? options[findIndex] : null}
                  getSelectedValue={getSelectedValue}
                />
              </div>
              {errors.dietType && <p className="text-danger">{errors.dietType}</p>}
            </div>
          </div>
        </CCol>
      </CRow>
      <CRow className="mb-3">
        <CCol lg={12}>
          <div style={{ width: "100%" }}>
            <div className="position-relative">
              <label htmlFor="validationTooltip01" className="form-label">
                Notes
              </label>
              <CFormTextarea
                id="validationTooltip01"
                placeholder="Add Notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </div>
        </CCol>
      </CRow>
      <CRow className="mb-3">
          <CCol xs={3} md={2}>
            <PrimaryButton onClick={() => onSubmit()}>SAVE</PrimaryButton>
          </CCol>
          <CCol xs={3} md={2}>
            <SecondaryButton onClick={back}>CANCEL</SecondaryButton>
          </CCol>
        </CRow>
    </>
  );
};

export default DietForm;

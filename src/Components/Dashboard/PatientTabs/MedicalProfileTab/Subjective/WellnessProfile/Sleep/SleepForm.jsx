import { CCol, CRow } from "@coreui/react";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { Assets } from "../../../../../../../assets/Assets";
import SecondaryButton from "../../../../../../Buttons/SecondaryButton/SecondaryButton";
import PrimaryButton from "../../../../../../Buttons/PrimaryButton/PrimaryButton";
import Dropdown from "../../../../../../Dropdown/Dropdown";
import { DATE_FORMAT } from "../../../../../../../Config/config";
import useApi from "../../../../../../../ApiServices/useApi";
import { format } from "date-fns";
import moment from "moment";

const SleepForm = ({ back, defaultValues, fetchSleepData, setAddFormView }) => {
  const { loading, error, post, patch, clearCache } = useApi();
  const [date, setDate] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date()); // Set default to current date
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [sleepType, setSleepType] = useState(defaultValues?.act_type || "");
  const [duration, setDuration] = useState(defaultValues?.act_duration || "");
  const [category, setCategory] = useState(defaultValues?.act_catagory || "sleep");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (defaultValues) {
      setSelectedDate(parseDate(defaultValues?.act_date) || new Date()); // Set to default today if not provided
      setSelectedTime(parseTime(defaultValues?.act_time) || new Date());
      setSleepType(defaultValues?.act_type || "");
      setCategory(defaultValues.act_catagory || "activity");
      setDuration(defaultValues.act_duration || "");
    }
  }, [defaultValues]);

  // useEffect(() => {
  //   // Function to parse date string "MM-DD-YYYY HH:mm" to Date object
  //   const parseDateString = (dateString) => {
  //     const parts = dateString?.split(" ");
  //     const datePart = parts[0];
  //     const timePart = parts[1];
  //     const [month, day, year] = datePart?.split("-")?.map(Number);
  //     const [hours, minutes] = timePart?.split(":")?.map(Number);
  //     const date = new Date(year, month - 1, day, hours, minutes);
  //     return date;
  //   };

  //   // Example default date string
  //   const defaultDateString = defaultValues?.date;

  //   // Parse default date string to Date object
  //   const defaultDate = defaultValues?.date
  //     ? parseDateString(defaultDateString)
  //     : new Date();

  //   // Set default date in state
  //   setDate(defaultDate);
  // }, [defaultValues]);

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

  const options = ["Disturbed", "Undisturbed", "Excess Dreams"];
  
  const getSelectedValue = (data) => {
    setSleepType(data); // Set the selected diet type
  };

 

  const handleDateChange = (date) => {
    setSelectedDate(date || new Date());
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time || new Date());
  };
  const addSleep = async () => {
    try {
      // Ensure the date is in ISO format, including time and timezone.
      const formattedDate = selectedDate.toISOString(); // Convert to ISO format
      const formattedTime = moment(selectedTime).format("HH:mm"); // Format time to "HH:mm"

      // Construct the request body in the desired format
      const body = {
        patient_id: "10", // Use the appropriate patient ID
        act_catagory: category,
        act_date: formattedDate, // Use the ISO formatted date
        act_time: formattedTime,
        act_type: sleepType,
        act_duration: duration,
      };

      // Use the provided `post` function to send the request
      const response = await post(`resource/activity_wellness`, body);

      if (response.code === 201) {
        clearCache();
        await fetchSleepData(); // Refresh the list data here
        setAddFormView(false); // Close the form view
      } else {
        console.error("Failed to fetch data:", response.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  const editSleep = async () => {
    const formattedDate = selectedDate.toISOString(); // Convert to ISO format
    const formattedTime = moment(selectedTime).format("HH:mm"); // Format time to "HH:mm"
    try {
      const body = {
        patient_id: "10", // Use the appropriate patient ID
        act_catagory: category,
        act_date: formattedDate, // Use the ISO formatted date
        act_time: formattedTime,
        act_type: sleepType,
        act_duration: duration,
      };

      // Use the PATCH function for editing
      const response = await patch(
        `resource/activity_wellness/${defaultValues.id}`, // Use the ID from default values
        body
      );

      if (response.code === 200) {
        clearCache();
        await fetchSleepData(); // Refresh the list data here
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
    if (!sleepType) validationErrors.sleepType = "Diet type is required.";
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const onSubmit = () => {
    if (validate()) {
      if (defaultValues?.id) {
        console.log("Edit clicked");
        editSleep(); // Call edit function if id is present
      } else {
        console.log("Add clicked");
        addSleep(); // Call add function if id is not present
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
          </div>
        </CCol>
        <CCol lg={4}>
          <div style={{ width: "100%" }}>
            <div className="position-relative">
              <label htmlFor="validationTooltip01" className="form-label">
                Type *
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
                  defaultValue={defaultValues?.act_type || null}
                  getSelectedValue={getSelectedValue}
                />
                
              </div>
            </div>
          </div>
        </CCol>
      </CRow>
      <CRow className="mb-3">
        <CCol lg={12}>
          <div style={{ width: "100%" }}>
            <div className="position-relative">
              <label htmlFor="validationTooltip01" className="form-label">
                Duration (mins)
              </label>
              <input
                type="text"
                className="form-control pad-10"
                id="validationTooltip01"
                placeholder="0000"
                maxLength={4}
                defaultValue={defaultValues?.act_duration}
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9]/g, "");
                }}
                onChange={(e) => setDuration(e.target.value)}
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

export default SleepForm;

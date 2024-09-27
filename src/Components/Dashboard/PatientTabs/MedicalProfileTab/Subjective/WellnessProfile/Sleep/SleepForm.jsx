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
import { useLocation } from "react-router-dom";
import { CustomInput } from "../../../../../../../Utils/dateUtils";

const SleepForm = ({
  back,
  defaultValues,
  fetchSleepData,
  setAddFormView,
  addSleep,
  editSleep,
  isSubmitting
}) => {
  const location = useLocation();
  const data = location.state?.PatientDetail;
  const { loading, error, post, patch, clearCache } = useApi();
  const [date, setDate] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date()); // Set default to current date
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [sleepType, setSleepType] = useState(defaultValues?.act_type || "");
  const [duration, setDuration] = useState(defaultValues?.act_duration || "");
  const [category, setCategory] = useState(
    defaultValues?.act_catagory || "sleep"
  );
  const [errors, setErrors] = useState({});
  const maxDate = new Date(); // Restrict future dates

  useEffect(() => {
    if (defaultValues) {
      setSelectedDate(parseDate(defaultValues?.act_date) || new Date()); // Set to default today if not provided
      setSelectedTime(parseTime(defaultValues?.act_time) || new Date());
      setSleepType(defaultValues?.act_type || "");
      // setCategory(defaultValues.act_catagory || "activity");
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
      const formattedTime = moment(selectedTime).format("HH:mm"); // Format time to "HH:mm"
      const body = {
        patient_id: data?.user_id, // Use the appropriate patient ID
        act_catagory: "sleep",
        act_date: format(selectedDate, "yyyy-MM-dd"), // Use the ISO formatted date
        act_time: formattedTime,
        act_type: sleepType,
        act_duration: duration,
      };
      if (defaultValues?.id) {
        console.log("Edit clicked");
        editSleep(body, defaultValues?.id); // Call edit function if id is present
      } else {
        console.log("Add clicked");
        addSleep(body); // Call add function if id is not present
      }
    }
  };
  const handleClear = () => {
    setSelectedTime(null); // Clear the selected time
  };
  const handleDateClear = () => {
    setSelectedDate(null); // Clear the selected time
    setSelectedTime(null);
  };
  return (
    <>
      <CRow className="mb-3">
        <CCol lg={4}>
          <div class="position-relative d-flex flex-column gap-1">
            <label for="validationTooltip01" class="form-label">
              Date *
            </label>
            <div className="w-100 d-flex align-items-center gap-2">
              <div style={{ width: "80%" }}>
                <DatePicker
                  showIcon
                  selected={selectedDate}
                  onChange={handleDateChange}
                  // isClearable
                  closeOnScroll={true}
                  wrapperClassName="date-picker-wrapper"
                  dateFormat={DATE_FORMAT}
                  maxDate={maxDate}
                />
              </div>
              <div style={{ width: "20%" }}>
                {selectedDate && (
                  <img
                    src={Assets.Close}
                    onClick={handleDateClear}
                    alt="close"
                    style={{
                      borderRadius: "15px",
                      height: "18px",
                    }}
                    className="cursor"
                  />
                )}
              </div>
            </div>

            {errors.date && <div className="error-text">{errors.date}</div>}
          </div>
        </CCol>
        <CCol lg={4}>
          <div class="position-relative d-flex flex-column gap-1">
            <label for="validationTooltip01" class="form-label">
              Time *
            </label>
            <div className="w-100 d-flex align-items-center gap-2">
              <div style={{ width: "80%" }}>
                <DatePicker
                  selected={selectedTime}
                  onChange={handleTimeChange}
                  showTimeSelect
                  showTimeSelectOnly
                  closeOnScroll={true}
                  timeIntervals={5}
                  dateFormat="HH:mm"
                  timeFormat="HH:mm"
                  customInput={<CustomInput />}
                  showIcon={false}
                  wrapperClassName="time-picker-style"
                />
              </div>
              <div style={{ width: "20%" }}>
                {selectedTime && (
                  <img
                    src={Assets.Close}
                    onClick={handleClear}
                    alt="close"
                    style={{
                      borderRadius: "15px",
                      height: "18px",
                    }}
                    className="cursor"
                  />
                )}
              </div>
            </div>
            {errors.time && <div className="error-text">{errors.time}</div>}
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
              {errors.sleepType && (
                <div className="error-text">{errors.sleepType}</div>
              )}
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
          <PrimaryButton onClick={onSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "SAVE"}
          </PrimaryButton>
        </CCol>
        <CCol xs={3} md={2}>
          <SecondaryButton onClick={back}>CANCEL</SecondaryButton>
        </CCol>
      </CRow>
    </>
  );
};

export default SleepForm;

import { CCol, CFormTextarea, CRow } from "@coreui/react";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { Assets } from "../../../../../../../assets/Assets";
import SecondaryButton from "../../../../../../Buttons/SecondaryButton/SecondaryButton";
import PrimaryButton from "../../../../../../Buttons/PrimaryButton/PrimaryButton";
import Dropdown from "../../../../../../Dropdown/Dropdown";
import { DATE_FORMAT } from "../../../../../../../Config/config";
import { format, isValid, parse } from "date-fns";
import { getCurrentTime } from "../../../../../../../Utils/dateUtils";
import { toast } from "react-toastify";
import useApi from "../../../../../../../ApiServices/useApi";
import {
  findItemIndex,
  getFileTypeFromMime,
  openFile,
} from "../../../../../../../Utils/commonUtils";
import { useLocation } from "react-router-dom";

const PatientEducationForm = ({ back, defaultValues, addPatientEducation, editPatientEducation }) => {


  const { loading, error, get, post, clearCache, patch } = useApi();
  const location = useLocation();
  const data = location.state?.PatientDetail;
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
   title: defaultValues?.addition_info?.title || null,
   notes: defaultValues?.addition_info?.notes || null,
  });
 
  const maxDate = new Date(); // Restrict future dates 
  
  const defaultDateTime = defaultValues?.addition_info?.date || "";
  // Split date and time
  const defaultDate = defaultDateTime.split(" ")[0] || "";
  const defaultTime = defaultValues?.addition_info?.time || getCurrentTime();
  useEffect(() => {
    // Combine default date and time into a single Date object
    let date = new Date();

    if (defaultDate) {
      const parsedDate = parse(defaultDate, "yyyy-MM-dd", new Date());
      if (isValid(parsedDate)) {
        date = parsedDate;
      }
    }

    if (defaultTime) {
      const [hours, minutes] = defaultTime.split(":").map(Number);
      date.setHours(hours);
      date.setMinutes(minutes);
      date.setSeconds(0); // Reset seconds
    }

    setSelectedDate(date);
    setSelectedTime(date); // Initialize time picker with the same Date object
  }, [defaultDate, defaultTime]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (date) {
      setSelectedTime(date); // Sync time picker with the updated date
    }
  };

  const handleTimeChange = (time) => {
    if (time) {
      const updatedDateTime = new Date(selectedDate || time);
      updatedDateTime.setHours(time.getHours());
      updatedDateTime.setMinutes(time.getMinutes());
      updatedDateTime.setSeconds(0); // Reset seconds

      setSelectedDate(updatedDateTime); // Optionally update date as well
      setSelectedTime(time);
    }
  };

  const validate = () => {
    let isValid = true;
    const newErrors = {};

    if (!selectedDate) {
      newErrors.date = "Date is required.";
      isValid = false;
    }
    if (!selectedTime) {
      newErrors.time = "Time is required.";
      isValid = false;
    }
    if (!formData.title) {
      newErrors.title = "Title is required.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };


  const onSubmit = () => {
   const values = {
      date: format(selectedDate, "yyyy-MM-dd"),
      time: format(selectedTime,  "HH:mm"),
      title: formData?.title,
      notes: formData?.notes,
    }
    if (validate()) {
      if (defaultValues.id !== undefined) {
        editPatientEducation(values,defaultValues?.id)

      }
      if (defaultValues.id === undefined) {
        addPatientEducation(values);

      }
    }
  };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
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
                selected={selectedDate}
                onChange={handleDateChange}
                closeOnScroll={true}
                wrapperClassName="date-picker-wrapper"
                dateFormat={DATE_FORMAT}
                maxDate={maxDate}
              />
              {errors.date && <div className="error-text">{errors.date}</div>}
            </div>
          </div>
        </CCol>
        <CCol lg={4}>
          <div class="position-relative">
            <label for="validationTooltip01" class="form-label">
              Time *
            </label>
            <div className="date-size">
              <DatePicker
                showIcon
                selected={selectedTime}
                onChange={handleTimeChange}
                showTimeSelect
                showTimeSelectOnly
                closeOnScroll={true}
                timeIntervals={5}
                dateFormat="h:mm aa"
              />
              {errors.time && <div className="error-text">{errors.time}</div>}
            </div>
          </div>
        </CCol>
        <CCol lg={4}>
          <div style={{ width: "100%" }}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Title *
              </label>
              <input
                type="text"
                class="form-control pad-10"
                id="validationTooltip01"
                placeholder="Enter"
                name="title"
                value={formData?.title}
                onChange={handleChange}
              />
              {errors.title && <div className="error-text">{errors.title}</div>}
            </div>
          </div>
        </CCol>
        <CCol lg={8} className="mb-3">
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
                 name="notes"
                rows={3}
                value={formData?.notes}
                onChange={handleChange}
              />
            </div>
          </div>
        </CCol>
      </CRow>

      <CRow className="mb-1">
        <div style={{ width: "128px" }}>
          <PrimaryButton onClick={() => onSubmit()}>SAVE</PrimaryButton>
        </div>
        <div style={{ width: "128px" }}>
          <SecondaryButton onClick={back}>CANCEL</SecondaryButton>
        </div>
      </CRow>
    </>
  );
};

export default PatientEducationForm;

import { CCol, CRow, CFormCheck } from "@coreui/react";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { Assets } from "../../../../../../../assets/Assets";
import SecondaryButton from "../../../../../../Buttons/SecondaryButton/SecondaryButton";
import PrimaryButton from "../../../../../../Buttons/PrimaryButton/PrimaryButton";
import Dropdown from "../../../../../../Dropdown/Dropdown";
import { DATE_FORMAT } from "../../../../../../../Config/config";
import { format } from "date-fns";
import useApi from "../../../../../../../ApiServices/useApi";

import moment from "moment";
import { CustomInput } from "../../../../../../../Utils/dateUtils";
import { useLocation } from "react-router-dom";

const MoodForm = ({
  back,
  defaultValues,
  fetchMood,
  setAddFormView,
  addMood,
  editMood,
  isSubmitting
}) => {
  const { loading, error, post, patch, clearCache, get } = useApi();
  const location = useLocation();
  const data = location.state?.PatientDetail;
  const [date, setDate] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date()); // Set default to current date
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [typeMood, setTypeMood] = useState(
    defaultValues?.details?.act_type || ""
  );
  const [patientId, setPatientId] = useState(
    defaultValues?.details?.patient_id || ""
  );
  const [category, setCategory] = useState(
    defaultValues?.details?.act_catagory || "mood"
  );
  const [errors, setErrors] = useState({});
  const maxDate = new Date(); // Restrict future dates

  useEffect(() => {
    if (defaultValues) {
      setSelectedDate(parseDate(defaultValues?.act_date) || new Date());
      setSelectedTime(parseTime(defaultValues.act_time) || new Date());
      setTypeMood(defaultValues.act_type || "");
      setCategory(defaultValues?.category);
    }
  }, [defaultValues]);

  useEffect(() => {
    const parseDateString = (dateString) => {
      const parts = dateString?.split(" ");
      const datePart = parts[0];
      const timePart = parts[1];
      const [month, day, year] = datePart?.split("-")?.map(Number);
      const [hours, minutes] = timePart?.split(":")?.map(Number);
      const date = new Date(year, month - 1, day, hours, minutes);
      return date;
    };

    const defaultDateString = defaultValues?.date;

    const defaultDate = defaultValues?.date
      ? parseDateString(defaultDateString)
      : new Date();

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

  const handleDateChange = (date) => {
    setSelectedDate(date || new Date());
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time || new Date());
  };

  const validate = () => {
    const newErrors = {};
    if (!selectedDate) newErrors.date = "Date is required";
    if (!selectedTime) newErrors.time = "Time is required";
    if (!typeMood) newErrors.typeMood = "Mood type is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = () => {
    if (validate()) {
      const formattedTime = moment(selectedTime).format("HH:mm"); // Format time to "HH:mm"
      const body = {
        patient_id: data?.user_id,
        act_catagory: "mood",
        act_date: format(selectedDate, "yyyy-MM-dd"),
        act_time: formattedTime,
        act_type: typeMood,
      };
      if (defaultValues?.id) {
        editMood(body, defaultValues?.id);
      } else {
        addMood(body);
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
      {/* ... Date and Time Picker Components ... */}
      <CRow className="mb-3">
        <CCol lg={6}>
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
        <CCol lg={6}>
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
      </CRow>

      <CRow className="mb-3">
        <p className="radio-label">Type *</p>
        <CCol lg={12}>
          <div className="d-flex align-items-end w-100">
            <div
              style={{
                boxSizing: "border-box",
                borderRadius: "5px",
                border: "1px solid #17171D33",
                padding: "10px",
              }}
            >
              {[
                "Happy",
                "Sad",
                "Angry",
                "Relaxed",
                "Excited",
                "Anxious",
                "Content",
                "Frustrated",
                "Surprised",
                "Confident",
              ].map((mood, index) => (
                <CFormCheck
                  key={index}
                  className="mb-0"
                  inline
                  type="radio"
                  id={`inlineCheckbox${index + 1}`}
                  value={mood.toLowerCase()}
                  label={
                    <label
                      htmlFor={`inlineCheckbox${index + 1}`}
                      className="form-label mb-0"
                    >
                      {mood}
                    </label>
                  }
                  name="mood"
                  checked={typeMood === mood} // Correctly set the checked state
                  onChange={() => setTypeMood(mood)} // Update state on change
                />
              ))}
            </div>
          </div>
          {errors.typeMood && (
            <div className="error-text mt-2">{errors.typeMood}</div>
          )}
        </CCol>
      </CRow>

      {/* ... Submit and Cancel Button Components ... */}
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

export default MoodForm;

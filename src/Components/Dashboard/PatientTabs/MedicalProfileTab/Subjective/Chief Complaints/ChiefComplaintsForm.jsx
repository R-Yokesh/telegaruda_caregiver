import { CCol, CFormTextarea, CRow } from "@coreui/react";
import React, { useEffect, useState, useCallback } from "react";
import DatePicker from "react-datepicker";
import PrimaryButton from "../../../../../Buttons/PrimaryButton/PrimaryButton";
import SecondaryButton from "../../../../../Buttons/SecondaryButton/SecondaryButton";
import { isValid, parse } from "date-fns";
import { DATE_FORMAT } from "../../../../../../Config/config";
import useApi from "../../../../../../ApiServices/useApi";
import { CustomInput, getCurrentTime } from "../../../../../../Utils/dateUtils";
import { format } from "date-fns";
import moment from "moment";
import { useLocation } from "react-router-dom";
import { Assets } from "../../../../../../assets/Assets";
import ChiefInput from "../../../../../Input/ChiefInput";

const ChiefComplaintsForm = ({
  back,
  addChiefComplaints,
  editChiefComplaints,
  defaultValues,
}) => {
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [complaints, setComplaints] = useState(
    defaultValues?.addition_info?.title || ""
  );
  const [notes, setNotes] = useState(defaultValues?.addition_info?.notes || "");
  const [errors, setErrors] = useState({});
  const { get } = useApi();

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

  // Validate the form
  const validate = () => {
    let valid = true;
    let newErrors = {};

    if (!selectedDate) {
      console.log("Validate");
      newErrors.date = "Date is required";
      valid = false;
    }

    if (!selectedTime) {
      console.log("Validate");
      newErrors.time = "Time is required";
      valid = false;
    }

    if (!reasonName) {
      console.log("Validate");
      newErrors.complaints = "Chief Complaints is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const onSubmit = () => {
    const values = {
      date: format(selectedDate, "yyyy-MM-dd"),
      time: format(selectedTime, "HH:mm"),
      title: reasonName?.name,
      notes: notes,
    };
    if (validate()) {
      if (defaultValues.id !== undefined) {
        console.log("Edit clicked");
        editChiefComplaints(values, defaultValues?.id);
      }
      if (defaultValues.id === undefined) {
        console.log("Add clicked");
        addChiefComplaints(values);
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
  const [reasonDetails, setReasonDetails] = useState([]);
  const [reasonkey, setReasonKey] = useState(
    defaultValues?.addition_info?.title || ""
  );
  const [reasonName, setReasonName] = useState(
    defaultValues?.addition_info?.title || {}
  );
  const getSurgeryReasons = useCallback(async () => {
    try {
      const response = await get(
        `resource/masters?slug=symptom&searchkey=${reasonkey}&limit=50&country=undefined`
      );
      const listData = response?.data?.masters; //
      setReasonDetails(listData);
    } catch (error) {
      console.error("Error fetching card data:", error);
    }
  }, [get, reasonkey]);
  const getSelectedReasonData = (data) => {
    setReasonName(data);
  };
  useEffect(() => {
    getSurgeryReasons();
  }, [getSurgeryReasons]);
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
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Chief Complaints *
              </label>
              {/* <input
                type="text"
                class="form-control pad-10"
                id="validationTooltip01"
                placeholder="Enter"
                // defaultValue={defaultValues?.complaints}
                value={complaints}
                onChange={(e) => setComplaints(e.target.value)}
              /> */}
              <ChiefInput
                data={reasonDetails}
                setSurgeryKey={setReasonKey}
                getSelectedData={getSelectedReasonData}
                defaultkey={reasonkey}
              />
              {errors.complaints && (
                <div className="error-text">{errors.complaints}</div>
              )}
            </div>
          </div>
        </CCol>
        <CCol lg={8}>
          <div style={{ width: "100%" }}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Notes
              </label>
              <CFormTextarea
                type="text"
                class="form-control pad-10"
                id="validationTooltip01"
                placeholder="Enter"
                // defaultValue={defaultValues?.notes}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
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

export default ChiefComplaintsForm;

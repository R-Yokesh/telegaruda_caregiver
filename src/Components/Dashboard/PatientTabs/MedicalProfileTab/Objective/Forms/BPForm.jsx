import { CCol, CContainer, CRow } from "@coreui/react";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PrimaryButton from "../../../../../Buttons/PrimaryButton/PrimaryButton";
import SecondaryButton from "../../../../../Buttons/SecondaryButton/SecondaryButton";
import useApi from "../../../../../../ApiServices/useApi";
import { toast } from "react-toastify";
import { format, isValid, parse } from "date-fns";
import { DATE_FORMAT } from "../../../../../../Config/config";
import { getCurrentTime } from "../../../../../../Utils/dateUtils";
import { useLocation } from "react-router-dom";

const BPForm = ({ addBack, defaultData, getTableDatas }) => {
  const location = useLocation();
  const data = location.state?.PatientDetail;

  const { post, patch } = useApi();
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [systolic, setSystolic] = useState(
    (defaultData?.systolic || "").toString()
  );
  const [diastolic, setDiastolic] = useState(
    (defaultData?.diastolic || "").toString()
  );
  const [pulse, setPulse] = useState(
    (defaultData?.["pulse_(bpm)"] || "").toString()
  );
  const [errors, setErrors] = useState({});



  const defaultDateTime = defaultData?.date || "";

  // Split date and time
  const defaultDate = defaultDateTime.split(" ")[0] || "";
  const defaultTime = defaultDateTime.split(" ")[1] || getCurrentTime();
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

  // useEffect(() => {
  //   // Function to parse date string "MM-DD-YYYY HH:mm" to Date object
  //   const parseDateString = (dateString) => {
  //     const parts = dateString?.split(" ");
  //     const datePart = parts[0];
  //     const timePart = parts[1];
  //     const [month, day, year] = datePart?.split("-")?.map(Number);
  //     const [hours, minutes] = timePart?.split(":")?.map(Number);
  //     return new Date(year, month - 1, day, hours, minutes);
  //   };

  //   // Example default date string
  //   const defaultDateString = defaultData?.date;

  //   // Parse default date string to Date object
  //   const defaultDate = defaultData
  //     ? parseDateString(defaultDateString)
  //     : new Date();

  //   // Example default date string
  //   const defaultDateString1 = defaultData?.time;

  //   // Parse default date string to Date object
  //   const defaultDate1 = defaultData ? defaultDateString1 : new Date();

  //   // Set default date in state
  //   setSelectedDate(defaultDate);
  //   // setSelectedTime(defaultDate1);
  // }, [defaultData]);

  const extractNum = (data) => {
    const numbers = parseFloat(data?.match(/\d+(\.\d+)?/)[0]); // Replace non-digits with empty string

    return numbers || "";
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
    if (!systolic?.trim()) {
      newErrors.systolic = "Systolic is required.";
      isValid = false;
    } else if (isNaN(systolic)) {
      newErrors.systolic = "Systolic must be a number.";
      isValid = false;
    }
    if (!diastolic?.trim()) {
      newErrors.diastolic = "Diastolic is required.";
      isValid = false;
    } else if (isNaN(diastolic)) {
      newErrors.diastolic = "Diastolic must be a number.";
      isValid = false;
    }
    if (!pulse?.trim()) {
      newErrors.pulse = "Pulse is required.";
      isValid = false;
    } else if (isNaN(pulse)) {
      newErrors.pulse = "Pulse must be a number.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const onSubmit = () => {
    if (validate()) {
      if (defaultData) {
        console.log("Edit clicked");
        onEdit();
      }
      if (!defaultData) {
        console.log("Add clicked");
        onAdd();
      }
    }
  };

  const onAdd = async () => {
    try {
      const url = `resource/vitals`; // Replace with your API endpoint
      const body = {
        details: {
          date: format(selectedDate, "dd-MM-yyyy"),
          time: format(selectedTime, "HH:mm"),
          systolic: Number(systolic),
          diastolic: Number(diastolic),
          pulse: Number(pulse),
        },
        user_id: data?.user_id,
        slug: "blood-pressure",
      };
      await post(url, body);
      await getTableDatas(defaultData);
      toast.success("Added successfully");
      addBack();
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };

  const onEdit = async () => {
    try {
      const url = `resource/vitals/${defaultData.id}`; // Replace with your API endpoint
      const body = {
        details: {
          date: format(selectedDate, "dd-MM-yyyy"),
          time: format(selectedTime, "HH:mm"),
          systolic: Number(systolic),
          diastolic: Number(diastolic),
          pulse: Number(pulse),
        },
        user_id: data?.user_id,
        slug: "blood-pressure",
      };
      await patch(url, body);
      await getTableDatas(defaultData);
      toast.success("Updated successfully");
      addBack();
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };
  return (
    <>
      <CContainer>
        <CRow className="mb-3">
          <CCol lg={4}>
            <div class="position-relative d-flex flex-column gap-1">
              <label for="validationTooltip01" class="form-label">
                Date *
              </label>
              <DatePicker
                showIcon
                selected={selectedDate}
                onChange={handleDateChange}
                isClearable
                closeOnScroll={true}
                wrapperClassName="date-picker-wrapper"
                dateFormat={DATE_FORMAT}
              />
              {errors.date && <div className="error-text">{errors.date}</div>}
            </div>
          </CCol>
          <CCol lg={4}>
            <div class="position-relative d-flex flex-column gap-1">
              <label for="validationTooltip01" class="form-label">
                Time *
              </label>
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
              {errors.time && <div className="error-text">{errors.time}</div>}
            </div>
          </CCol>
          <CCol lg={4}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Systolic *
              </label>
              <input
                type="text"
                class="form-control"
                id="systolic"
                value={systolic}
                onChange={(e) => setSystolic(e.target.value)}
                maxLength={3}
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9]/g, "");
                }}
              />
              {errors.systolic && (
                <div className="error-text">{errors.systolic}</div>
              )}
            </div>
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CCol lg={6}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Diastolic *
              </label>
              <input
                type="text"
                class="form-control"
                id="diastolic"
                value={diastolic}
                onChange={(e) => setDiastolic(e.target.value)}
                maxLength={3}
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9]/g, "");
                }}
              />
              {errors.diastolic && (
                <div className="error-text">{errors.diastolic}</div>
              )}
            </div>
          </CCol>
          <CCol lg={6}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Pulse (in BPM) *
              </label>
              <input
                type="text"
                class="form-control"
                id="pulse"
                value={pulse}
                onChange={(e) => setPulse(e.target.value)}
                maxLength={3}
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9]/g, "");
                }}
              />
              {errors.pulse && <div className="error-text">{errors.pulse}</div>}
            </div>
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CCol xs={3} md={2}>
            <PrimaryButton onClick={() => onSubmit()}>SAVE</PrimaryButton>
          </CCol>
          <CCol xs={3} md={2}>
            <SecondaryButton onClick={() => addBack()}>CANCEL</SecondaryButton>
          </CCol>
        </CRow>
      </CContainer>
    </>
  );
};

export default BPForm;

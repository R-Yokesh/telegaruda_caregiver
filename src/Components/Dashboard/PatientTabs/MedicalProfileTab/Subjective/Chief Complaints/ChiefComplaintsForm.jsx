import { CCol, CFormTextarea, CRow } from "@coreui/react";
import React, { useEffect, useState, useCallback } from "react";
import DatePicker from "react-datepicker";
import PrimaryButton from "../../../../../Buttons/PrimaryButton/PrimaryButton";
import SecondaryButton from "../../../../../Buttons/SecondaryButton/SecondaryButton";
import { isValid, parse } from "date-fns";
import { DATE_FORMAT } from "../../../../../../Config/config";
import useApi from "../../../../../../ApiServices/useApi";
import { getCurrentTime } from "../../../../../../Utils/dateUtils";
import { format } from "date-fns";
import moment from "moment";
import { useLocation } from "react-router-dom";

const ChiefComplaintsForm = ({ back, setAddFormView, getChiefComplaints, defaultValues }) => {

  const { loading, error, get, post, clearCache, patch } = useApi();
  const location = useLocation();
  const data = location.state?.PatientDetail;
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [complaints, setComplaints] = useState(defaultValues?.addition_info?.title || "");
  const [notes, setNotes] = useState(defaultValues?.addition_info?.notes || "");
  const [errors, setErrors] = useState({});


  const getFormattedDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  const currentDate = new Date();
  const formattedDate = getFormattedDate(currentDate);

  // console.log(formattedDate); // e.g., 25-08-2024

  const defaultDateTime = defaultValues?.date || "";

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

    if (!complaints?.trim()) {
      console.log("Validate");
      newErrors.complaints = "Chief Complaints is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const onSubmit = () => {
    if (validate()) {
      if (defaultValues.id !== undefined) {
        console.log("Edit clicked");
        editChiefComplaints();

      }
      if (defaultValues.id === undefined) {
        console.log("Add clicked");
        addChiefComplaints();

      }
    }
  };

  const addChiefComplaints = async () => {
    const formattedDate = format(selectedDate, "dd-MM-yyyy");
    const formattedTime = moment(selectedTime).format("hh:mm");
    try {
      const body = {
        addition_info: {
          date: formattedDate,
          time: formattedTime,
          title: complaints,
          notes: notes,
        },
        user_id: data?.user_id,
        document_source: "chief-complaints",
      };

      // Use the provided `post` function to send the request
      const response = await post(`resource/docs`, body);

      if (response.code === 201) {
        clearCache();
        await getChiefComplaints();
        setAddFormView(false);

      } else {
        console.error("Failed to fetch data:", response.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const editChiefComplaints = async () => {
    const formattedDate = format(selectedDate, "dd-MM-yyyy");
    const formattedTime = moment(selectedTime).format("hh:mm");
    try {
      const body = {
        addition_info: {
          date: formattedDate,
          time: formattedTime,
          title: complaints,
          notes: notes,
        },
        user_id: data?.user_id,
        document_source: "chief-complaints",
      };

      // Use the provided `post` function to send the request
      const response = await patch(`resource/docs/${defaultValues.id}`, body);

      if (response.code === 200) {
        clearCache();
        await getChiefComplaints();
        setAddFormView(false);

      } else {
        console.error("Failed to fetch data:", response.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };






  return (
    <>
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
          <div style={{ width: "100%" }}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Chief Complaints *
              </label>
              <input
                type="text"
                class="form-control pad-10"
                id="validationTooltip01"
                placeholder="Enter"
                // defaultValue={defaultValues?.complaints}
                value={complaints}
                onChange={(e) => setComplaints(e.target.value)}
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

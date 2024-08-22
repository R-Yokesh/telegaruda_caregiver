import { CCol, CFormTextarea, CRow } from "@coreui/react";
import React, { useEffect, useState,useCallback } from "react";
import DatePicker from "react-datepicker";
import PrimaryButton from "../../../../../Buttons/PrimaryButton/PrimaryButton";
import SecondaryButton from "../../../../../Buttons/SecondaryButton/SecondaryButton";
import { isValid, parse } from "date-fns";
import { DATE_FORMAT } from "../../../../../../Config/config";
import useApi from "../../../../../../ApiServices/useApi";
import { format } from "date-fns";
import moment  from "moment";

const parseDate = (dateString) => {
  if (!dateString) return null;
  const [day, month, year] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day);
};

const parseTime = (timeString) => {
  if (!timeString) return null;
  const [hours, minutes] = timeString.split(':').map(Number);
  const now = new Date();
  now.setHours(hours, minutes, 0, 0);
  return now;
};

const ChiefComplaintsForm = ({ back,setAddFormView,getChiefComplaints, defaultValues }) => {

  const { loading, error, post,clearCache } = useApi();
  const [selectedTime, setSelectedTime] = useState(
  );
  const [selectedDate, setSelectedDate] = useState(
  );
  const [complaints, setComplaints] = useState(
  );
  const [notes, setNotes] = useState(defaultValues?.addition_info?.notes || "");
  const [errors, setErrors] = useState({});
  useEffect(() => {
    // Initialize the state with default values if available
    if (defaultValues?.addition_info) {
      setSelectedDate(parseDate(defaultValues.addition_info.date));
      setSelectedTime(parseTime(defaultValues.addition_info.time));
      setComplaints(defaultValues.addition_info.title || "");
      setNotes(defaultValues.addition_info.notes || "");
    }
  }, [defaultValues]);

  // const handleDateChange = (date) => {
  //   setSelectedDate(date);
  //   if (date && selectedTime) {
  //     const updatedDateTime = new Date(date);
  //     updatedDateTime.setHours(selectedTime.getHours(), selectedTime.getMinutes(), 0, 0);
  //     setSelectedTime(updatedDateTime);
  //   }
  // };

  // const handleTimeChange = (time) => {
  //   if (time) {
  //     const updatedDateTime = new Date(selectedDate || time);
  //     updatedDateTime.setHours(time.getHours(), time.getMinutes(), 0, 0);
  //     setSelectedDate(updatedDateTime);
  //     setSelectedTime(updatedDateTime);
  //   }
  // };

  const handleDateChange = (date) => {
    if (date) {
      // const formattedDate = format(date, "dd-MM-yyyy");
      setSelectedDate(date);
    } else {
      setSelectedDate(null);
    }
  };
  
  const handleTimeChange = (time) => {
    if (time) {
      // console.log("Time-----",moment(time).format("hh:mm "))
      // const formattedTime = moment(time).format("hh:mm");
      setSelectedTime(time);
    } else {
      setSelectedTime(null);
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


  const addChiefComplaints = async () => {
    const formattedDate = format(selectedDate, "dd-MM-yyyy");
    const formattedTime = moment(selectedTime).format("hh:mm");
    try {
      const body = {
        addition_info: {
          date:formattedDate,
          time:formattedTime,
          title:complaints,
          notes:notes,
        },
        user_id: "10",
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
  

 


  const onSubmit = () => {
    if (validate()) {
      if (defaultValues.id !== undefined) {
        console.log("Edit clicked");
      
      }
      if (defaultValues.id === undefined) {
        console.log("Add clicked");
        addChiefComplaints();
        
      }
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

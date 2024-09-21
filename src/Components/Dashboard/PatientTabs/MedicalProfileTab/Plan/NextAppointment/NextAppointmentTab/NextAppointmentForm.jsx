import { CCol, CRow } from "@coreui/react";
import React, { useEffect, useState, useCallback } from "react";
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
import Select from 'react-select';
import SearchableDrop from "../../../../../../Dropdown/SearchableDrop";
import ProviderDrop from "../../../../../../Dropdown/ProviderDrop";
import { useLocation } from "react-router-dom";

const NextAppointmentForm = ({ back, defaultValues, addNextAppointment, editNextAppointment }) => {


  const { loading, error, get, post, clearCache, patch } = useApi();
  const location = useLocation();
  const data = location.state?.PatientDetail;
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [errors, setErrors] = useState({});

  const [reason, setReason] = useState(defaultValues?.reason || "");
  const [providerDetails, setproviderDetails] = useState([]);
  const [providerKey, setProviderKey] = useState(`${defaultValues?.provider?.first_name || ''} ${defaultValues?.provider?.last_name || ''}`);
  const [provider, setProvider] = useState(defaultValues?.provider || {});

  const minDate = new Date(); // Restrict past dates
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
    if (!provider) {
      newErrors.provider = "provider is required.";
      isValid = false;
    }
    if (!reason) {
      newErrors.reason = "Reason is required.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };


  const onSubmit = () => {
    const values = {
      date: `${format(selectedDate, "yyyy-MM-dd")} ${format(selectedTime, "HH:mm:ss")}`,
      reason: reason,
      provider: `${provider?.user?.first_name} ${provider?.user?.last_name}`,
    }
    if (validate()) {
      if (defaultValues.id !== undefined) {
        console.log("Edit clicked");
        editNextAppointment(values,defaultValues?.id)
      }
      if (defaultValues.id === undefined) {
        console.log("Add clicked");
        addNextAppointment(values);

      }
    }
  };

  const getSelectedValue = (data) => {
    setProvider(data);
  };

  // API integration of Provider list
  const getProvider = useCallback(async () => {
    try {
      const response = await get(
        `resource/providers?order_by=id&searchkey=${providerKey}&dir=1`
      );
      const listData = response?.data?.providers; //
      setproviderDetails(listData);
    } catch (error) {
      console.error("Error fetching card data:", error);
    }
  }, [get, providerKey]);

  useEffect(() => {
    getProvider();
  }, [getProvider]);




  // // Add NextAppointment
  // const addNextAppointment = async () => {
  //   try {
  //     const body = {
  //       patient_id: data?.user_id,
  //       provider_id: "9",
  //       date: `${format(selectedDate, "yyyy-MM-dd")} ${format(selectedTime, "HH:mm:ss")}`,
  //       reason: reason,
  //       provider: `${provider?.user?.first_name} ${provider?.user?.last_name}`,
  //     }
  //     // Use the provided `post` function to send the request
  //     const response = await post(`resource/next-appointment`, body);
  //     if (response.code === 201) {
  //       clearCache();
  //       await fetchNextAppointment();
  //       setAddFormView(false);
  //       toast.success("Added successfully");
  //     } else {
  //       console.error("Failed to fetch data:", response.message);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  // // Edit NextAppointment
  // const editNextAppointment = async () => {
  //   try {
  //     const body = {
  //       patient_id: data?.user_id,
  //       provider_id: "9",
  //       date: `${format(selectedDate, "yyyy-MM-dd")} ${format(selectedTime, "HH:mm:ss")}`,
  //       // date: format(selectedDate, "dd-MM-yyyy"),
  //       // time: format(selectedTime,"HH:mm"),
  //       reason: reason,
  //       provider: `${provider?.user?.first_name} ${provider?.user?.last_name}`,
  //     }

  //     // Use the provided `post` function to send the request
  //     const response = await patch(`resource/next-appointment/${defaultValues.id}`, body);

  //     if (response.code === 200) {
  //       clearCache();
  //       await fetchNextAppointment();
  //       setAddFormView(false);
  //       toast.success("Added successfully");

  //     } else {
  //       console.error("Failed to fetch data:", response.message);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };





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
                dateFormat="dd-MM-yyyy"
                minDate={minDate}
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
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
              />
              {errors.date && <div className="error-text">{errors.date}</div>}
            </div>
          </div>
        </CCol>
        <CCol lg={4}>
          <div style={{ width: "100%" }}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Provider Name *
              </label>
              <div
                className="w-100"
                style={{
                  border: "1px solid #17171D33",
                  borderRadius: "5px",
                }}
              >
                <ProviderDrop
                  getSelectedValue={getSelectedValue}
                  options={providerDetails}
                  defaultValue={providerKey}
                  dropKey={setProviderKey}
                />
              </div>
              {errors.provider && <div className="error-text">{errors.provider}</div>}
            </div>
          </div>
        </CCol>
      </CRow>
      <CRow className="mb-3">
        <CCol lg={12}>
          <div style={{ width: "100%" }}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Reason *
              </label>
              <input
                type="text"
                class="form-control pad-10"
                id="validationTooltip01"
                placeholder="Enter"
                name="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
              {errors.reason && <div className="error-text">{errors.reason}</div>}
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
  )
}

export default NextAppointmentForm
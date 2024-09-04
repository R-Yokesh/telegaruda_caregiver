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

const Spo2 = ({ addBack, defaultData, getTableDatas }) => {
  const location = useLocation();
  const data = location.state?.PatientDetail;
  const { post, patch } = useApi();
  function removePercent(str) {
    return str?.replace("%", "");
  }
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [spO2, setSpO2] = useState(removePercent(defaultData?.spo2) || "");
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

  const validateInputs = () => {
    let isValid = true;
    let currentErrors = {};

    if (!selectedDate) {
      currentErrors.date = "Date is required";
      isValid = false;
    }
    if (!selectedTime) {
      currentErrors.time = "Time is required";
      isValid = false;
    }
    if (!spO2) {
      currentErrors.spO2 = "SpO2 is required";
      isValid = false;
    }
    setErrors(currentErrors);
    return isValid;
  };

  const onSubmit = () => {
    if (validateInputs()) {
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
          spo2: Number(spO2),
          unit: "%",
        },
        user_id: data?.user_id,
        slug: "spO2",
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
          spo2: Number(spO2),
          unit: "%",
        },
        user_id: data?.user_id,
        slug: "spO2",
      };
      await patch(url, body);
      await getTableDatas(defaultData);
      toast.success("Updated successfully");
      addBack();
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };

  const extractNum = (data) => {
    const numbers = parseFloat(data?.match(/\d+(\.\d+)?/)[0]); // Replace non-digits with empty string

    return numbers || "";
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
          {/* <CCol lg={4}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Pulse Rate(BPM) *
              </label>
              <input
                type="text"
                class="form-control"
                id="validationTooltip01"
                defaultValue={defaultData?.["pulse_rate_(bpm)"]}
              />
            </div>
          </CCol> */}
          <CCol lg={4}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                SpO2 (%) *
              </label>
              <input
                type="text"
                class="form-control"
                id="validationTooltip01"
                defaultValue={extractNum(defaultData?.spo2)}
                maxLength={3}
                // onInput={(e) => {
                //   e.target.value = e.target.value.replace(/[^0-9]/g, "");
                // }}
                value={spO2}
                onChange={(e) => setSpO2(e.target.value.replace(/[^0-9]/g, ""))}
              />
              {errors.spO2 && <div className="error-text">{errors.spO2}</div>}
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

export default Spo2;

import { CCol, CContainer, CRow } from "@coreui/react";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PrimaryButton from "../../../../../Buttons/PrimaryButton/PrimaryButton";
import SecondaryButton from "../../../../../Buttons/SecondaryButton/SecondaryButton";
import Dropdown from "../../../../../Dropdown/Dropdown";
import { format, isValid, parse } from "date-fns";
import { toast } from "react-toastify";
import useApi from "../../../../../../ApiServices/useApi";
import { DATE_FORMAT } from "../../../../../../Config/config";
import { findItemIndex } from "../../../../../../Utils/commonUtils";
import { CustomInput, getCurrentTime } from "../../../../../../Utils/dateUtils";
import { useLocation } from "react-router-dom";
import { Assets } from "../../../../../../assets/Assets";

const BSugar = ({ addBack, defaultData, getTableDatas }) => {

  const location = useLocation();
  const data = location.state?.PatientDetail;

  const { post, patch } = useApi();
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [type, setType] = useState(defaultData?.type || "");
  const [bloodSugar, setBloodSugar] = useState(defaultData?.blood_sugar_value || "");

  const [errors, setErrors] = useState({
    date: "",
    time: "",
    type: "",
    bloodSugar: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const maxDate = new Date(); // Restrict future dates 
  const defaultDateTime = defaultData?.date || "";
  console.log("time", getCurrentTime());
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

  const options = ["Fasting", "Random", "Post Prandial "];

  const getSelectedValue = (data) => {
    setType(data);
  };

  const numWithDecimal = (e) => {
    e.target.value = e.target.value
      .replace(/[^0-9.]/g, "")
      .replace(/^(\d{4})\d*$/, "$1")
      .replace(/^(\d{4})\.(\d{1}).*$/, "$1.$2")
      .replace(/(\..*)\./g, "$1");
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
    if (!type) {
      currentErrors.type = "Type is required";
      isValid = false;
    }
    if (!bloodSugar) {
      currentErrors.bloodSugar = "Blood Sugar is required";
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
      // Set the loading state to true
      setIsSubmitting(true);
      const url = `resource/vitals`; // Replace with your API endpoint
      const body = {
        details: {
          date: format(selectedDate, "dd-MM-yyyy"),
          time: format(selectedTime, "HH:mm"),
          unit: "mg/dL",
          type: type,
          blood_sugar: bloodSugar,
        },
        user_id: data?.user_id,
        slug: "blood-sugar",
      };
      await post(url, body);
      await getTableDatas(defaultData);
      toast.success("Added successfully");
      addBack();
    } catch (error) {
      console.error("Failed to delete:", error);
    } finally {
      // Reset the loading state to false after the API call is done
      setIsSubmitting(false);
    }
  };

  const onEdit = async () => {
    try {
      // Set the loading state to true
      setIsSubmitting(true);
      const url = `resource/vitals/${defaultData.id}`; // Replace with your API endpoint
      const body = {
        details: {
          date: format(selectedDate, "dd-MM-yyyy"),
          time: format(selectedTime, "HH:mm"),
          unit: "mg/dL",
          type: type,
          blood_sugar: bloodSugar,
        },
        user_id: data?.user_id,
        slug: "blood-sugar",
      };
      await patch(url, body);
      await getTableDatas(defaultData);
      toast.success("Updated successfully");
      addBack();
    } catch (error) {
      console.error("Failed to delete:", error);
    } finally {
      // Reset the loading state to false after the API call is done
      setIsSubmitting(false);
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
      <CContainer>
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
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
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
                  defaultValue={
                    defaultData?.type
                      ? options[findItemIndex(options, defaultData?.type)]
                      : null
                  }
                  getSelectedValue={getSelectedValue}
                />
              </div>
              {errors.type && <div className="error-text">{errors.type}</div>}
            </div>
          </CCol>
        </CRow>
        <CRow className="mb-3">
          {/* <CCol lg={4}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Unit *
              </label>
              <input
                type="text"
                class="form-control"
                id="validationTooltip01"
                defaultValue={'mg/dL'}
              />
            </div>
          </CCol> */}
          <CCol lg={4}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Blood Sugar (mg/dL) *
              </label>
              <input
                type="text"
                class="form-control"
                id="validationTooltip01"
                // defaultValue={defaultData?.blood_sugar}
                onInput={numWithDecimal}
                value={bloodSugar}
                onChange={(e) => setBloodSugar(e.target.value)}
              />
              {errors.bloodSugar && (
                <div className="error-text">{errors.bloodSugar}</div>
              )}
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
            <SecondaryButton onClick={() => addBack()}>CANCEL</SecondaryButton>
          </CCol>
        </CRow>
      </CContainer>
    </>
  );
};

export default BSugar;

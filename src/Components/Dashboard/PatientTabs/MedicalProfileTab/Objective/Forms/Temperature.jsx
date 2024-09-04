import { CCol, CContainer, CRow, CFormCheck } from "@coreui/react";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PrimaryButton from "../../../../../Buttons/PrimaryButton/PrimaryButton";
import SecondaryButton from "../../../../../Buttons/SecondaryButton/SecondaryButton";
import Dropdown from "../../../../../Dropdown/Dropdown";
import { DATE_FORMAT } from "../../../../../../Config/config";
import useApi from "../../../../../../ApiServices/useApi";
import { format, isValid, parse } from "date-fns";
import { toast } from "react-toastify";
import { extractNum, findItemIndex } from "../../../../../../Utils/commonUtils";
import { getCurrentTime } from "../../../../../../Utils/dateUtils";
import { useLocation } from "react-router-dom";

const Temperature = ({ addBack, defaultData, getTableDatas }) => {
  const { post, patch } = useApi();
  const location = useLocation();
  const data = location.state?.PatientDetail;
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState(
    defaultData?.method || null
  );
  const [selectedUnit, setSelectedUnit] = useState(defaultData?.unit || null);
  const [temperature, setTemperature] = useState(
    extractNum(defaultData?.temperature) || ""
  );

  const [errors, setErrors] = useState({
    date: "",
    time: "",
    method: "",
    unit: "",
    temperature: "",
  });

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
    if (!selectedMethod) {
      currentErrors.method = "Method is required";
      isValid = false;
    }
    if (!selectedUnit) {
      currentErrors.unit = "Unit is required";
      isValid = false;
    }
    if (!temperature || isNaN(temperature)) {
      currentErrors.temperature =
        "Temperature is required and must be a number";
      isValid = false;
    }

    setErrors(currentErrors);
    return isValid;
  };

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
  const options = [
    "Oral",
    "Rectal",
    "Axillary",
    "Tympanic",
    "Temporal",
    "Skin",
  ];

  const getSelectedValue = (data) => {
    setSelectedMethod(data);
  };
  const handleUnitChange = (e) => {
    setSelectedUnit(e.target.value);
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
          type: selectedMethod,
          unit: selectedUnit,
          temperature: Number(temperature),
        },
        user_id: data?.user_id,
        slug: "temperature",
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
          type: selectedMethod,
          unit: selectedUnit,
          temperature: Number(extractNum(temperature)),
        },
        user_id: data?.user_id,
        slug: "temperature",
      };
      await patch(url, body);
      await getTableDatas(defaultData);
      toast.success("Updated successfully");
      addBack();
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };

  const numWithDecimal = (e) => {
    const nums = e.target.value
      .replace(/[^0-9.]/g, "")
      .replace(/^(\d{3})\d*$/, "$1")
      .replace(/^(\d{3})\.(\d{3}).*$/, "$1.$2")
      .replace(/(\..*)\./g, "$1");
    setTemperature(nums);
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
                Method *
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
                    defaultData?.method
                      ? options[findItemIndex(options, defaultData?.method)]
                      : null
                  }
                  getSelectedValue={getSelectedValue}
                />
              </div>
            </div>
            {errors.method && <div className="error-text">{errors.method}</div>}
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CCol lg={4}>
            {/* <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Unit *
              </label>
              <input
                type="text"
                class="form-control"
                id="validationTooltip01"
                defaultValue={'F'}
              />
            </div> */}

            <p className="radio-label">Unit *</p>
            <div className="d-flex align-items-end w-100">
              <div
                style={{
                  boxSizing: "border-box",
                  borderRadius: "5px",
                  border: "1px solid #17171D33",
                  padding: "10px",
                }}
              >
                <CFormCheck
                  className="mb-0"
                  inline
                  type="radio"
                  id="activityYes"
                  value="Celsius"
                  label={<label className="form-label mb-0">Celsius</label>}
                  name="unit"
                  checked={selectedUnit === "Celsius"} // Set the checked attribute
                  onChange={handleUnitChange} // Handle the change event
                />
                <CFormCheck
                  className="mb-0"
                  inline
                  type="radio"
                  id="activityNo"
                  value="Fahrenheit"
                  label={<label className="form-label mb-0">Fahrenheit</label>}
                  name="unit"
                  checked={selectedUnit === "Fahrenheit"} // Set the checked attribute
                  onChange={handleUnitChange} // Handle the change event
                />
              </div>
            </div>
            {errors.unit && <div className="error-text">{errors.unit}</div>}
          </CCol>
          <CCol lg={4}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Temperature *
              </label>
              <input
                type="text"
                class="form-control"
                id="validationTooltip01"
                value={temperature}
                onChange={numWithDecimal}
              />
              {errors.temperature && (
                <div className="error-text">{errors.temperature}</div>
              )}
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

export default Temperature;

import { CCol, CContainer, CRow } from "@coreui/react";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PrimaryButton from "../../../../../Buttons/PrimaryButton/PrimaryButton";
import SecondaryButton from "../../../../../Buttons/SecondaryButton/SecondaryButton";
import { toast } from "react-toastify";
import useApi from "../../../../../../ApiServices/useApi";
import { format, isValid, parse } from "date-fns";
import { getCurrentTime } from "../../../../../../Utils/dateUtils";
import { useLocation } from "react-router-dom";
import { DATE_FORMAT } from "../../../../../../Config/config";

const BMI = ({ addBack, defaultData, getTableDatas }) => {
  const location = useLocation();
  const data = location.state?.PatientDetail;
  const { post, patch } = useApi();
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

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

  const extractNum = (data) => {
    const numbers = parseFloat(data?.match(/\d+(\.\d+)?/)[0]); // Replace non-digits with empty string

    return numbers || "";
  };

  const numWithDecimal = (e) => {
    e.target.value = e.target.value
      .replace(/[^0-9.]/g, "")
      .replace(/^(\d{2})\d*$/, "$1")
      .replace(/^(\d{2})\.(\d{2}).*$/, "$1.$2")
      .replace(/(\..*)\./g, "$1");
  };
  const [height, setHeight] = useState(defaultData?.["height_(cm)"] || "");
  const [weight, setWeight] = useState(defaultData?.["weight_(kg)"] || "");
  const [heightUnit, setHeightUnit] = useState(
    defaultData?.height_unit || "cm"
  );
  const [weightUnit, setWeightUnit] = useState(
    defaultData?.weight_unit || "kg"
  );
  const [bmi, setBmi] = useState(null);
  const [errors, setErrors] = useState({});

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
    if (!height || isNaN(height) || height <= 0) {
      currentErrors.height = "Height is required";
      isValid = false;
    }
    if (!weight || isNaN(weight) || weight <= 0) {
      currentErrors.weight = "Weight is required";
      isValid = false;
    }

    // if (!heightUnit) {
    //   currentErrors.heightUnit = "Height Unit is required";
    //   isValid = false;
    // }
    // if (!weightUnit) {
    //   currentErrors.weightUnit = "Weight Unit is required";
    //   isValid = false;
    // }

    setErrors(currentErrors);
    return isValid;
  };

  // Function to handle BMI calculation
  const calculateBMI = () => {
    if (height && weight) {
      const heightInMeters = height / 100;
      const calculatedBMI = weight / (heightInMeters * heightInMeters);
      setBmi(calculatedBMI.toFixed(2));
    } else {
      setBmi(""); // Handle invalid input
    }
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
          height_unit: heightUnit,
          height: height,
          bmi: bmi,
          weight_unit: weightUnit,
          weight: weight,
        },
        user_id: data?.user_id,
        slug: "bmi",
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
          height_unit: heightUnit,
          height: height,
          bmi: bmi,
          weight_unit: weightUnit,
          weight: weight,
        },
        user_id: data?.user_id,
        slug: "bmi",
      };
      await patch(url, body);
      await getTableDatas(defaultData);
      toast.success("Updated successfully");
      addBack();
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };

  useEffect(() => {
    calculateBMI();
  }, [weight, height]);
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
                Unit (Height) *
              </label>
              <input
                type="text"
                class="form-control"
                id="validationTooltip01"
                value={heightUnit}
                onChange={(e) => setHeightUnit(e.target.value)}
              />
              {errors.heightUnit && (
                <div className="error-text">{errors.heightUnit}</div>
              )}
            </div>
          </CCol> */}
          <CCol lg={4}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Height (cm) *
              </label>
              <input
                type="text"
                class="form-control"
                id="validationTooltip01"
                defaultValue={extractNum(defaultData?.height)}
                maxLength={3}
                // onInput={(e) => {
                //   e.target.value = e.target.value.replace(/[^0-9]/g, "");
                // }}
                value={height}
                onChange={(e) =>
                  setHeight(e.target.value.replace(/[^0-9]/g, ""))
                }
              />
              {errors.height && (
                <div className="error-text">{errors.height}</div>
              )}
            </div>
          </CCol>
        </CRow>
        <CRow className="mb-3">
          {/* <CCol lg={4}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Unit (Weight)*
              </label>
              <input
                type="text"
                class="form-control"
                id="validationTooltip01"
                // defaultValue={"kg"}
                value={weightUnit}
                onChange={(e) => setWeightUnit(e.target.value)}
              />
              {errors.weightUnit && (
                <div className="error-text">{errors.weightUnit}</div>
              )}
            </div>
          </CCol> */}
          <CCol lg={4}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Weight (Kg) *
              </label>
              <input
                type="text"
                class="form-control"
                id="validationTooltip01"
                defaultValue={extractNum(defaultData?.weight)}
                maxLength={3}
                // onInput={(e) => {
                //   e.target.value = e.target.value.replace(/[^0-9]/g, "");
                // }}
                value={weight}
                onChange={(e) => {
                  setWeight(e.target.value.replace(/[^0-9]/g, ""));
                }}
              />
              {errors.weight && (
                <div className="error-text">{errors.weight}</div>
              )}
            </div>
          </CCol>
          <CCol lg={4}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                BMI (Kgm2) *
              </label>
              <input
                type="text"
                class="form-control"
                id="validationTooltip01"
                // defaultValue={defaultData?.bmi}
                defaultValue={bmi}
                onInput={numWithDecimal}
                disabled
              />
            </div>
          </CCol>
        </CRow>
        <CRow className="mb-3"></CRow>
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

export default BMI;

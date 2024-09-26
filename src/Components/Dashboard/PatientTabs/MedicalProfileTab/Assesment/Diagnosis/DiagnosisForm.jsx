import { CCol, CRow } from "@coreui/react";
import React, { useEffect, useState, useCallback } from "react";
import PrimaryButton from "../../../../../Buttons/PrimaryButton/PrimaryButton";
import SecondaryButton from "../../../../../Buttons/SecondaryButton/SecondaryButton";
import DatePicker from "react-datepicker";
import Dropdown from "../../../../../Dropdown/Dropdown";
import { DATE_FORMAT } from "../../../../../../Config/config";
import { toast } from "react-toastify";
import { format, isValid, parse } from "date-fns";
import { getCurrentTime } from "../../../../../../Utils/dateUtils";
import useApi from "../../../../../../ApiServices/useApi";
import ICDCodeDrop from "../../../../../Dropdown/ICDCodeDrop";
import { useLocation } from "react-router-dom";

const DiagnosisForm = ({
  back,
  defaultValues,
  addDiagnosis,
  editDiagnosis,
}) => {
  const { loading, error, get, post, clearCache, patch } = useApi();
  const location = useLocation();
  const data = location.state?.PatientDetail;
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [errors, setErrors] = useState({});
  const [icd10, setIcd10] = useState([]);
  const [icdkey, setIcdKey] = useState(
    defaultValues?.addition_info?.title || ""
  );
  const [icd, setIcd] = useState(defaultValues?.addition_info?.title || "");
  const [Description, setDescription] = useState([
    defaultValues?.addition_info?.notes || null,
  ]);

  const maxDate = new Date(); // Restrict past dates (today or future)
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

  const validate = () => {
    let isValid = true;
    const newErrors = {};

    if (!selectedDate) {
      newErrors.date = "Date is required.";
      isValid = false;
    }
    if (!icd) {
      newErrors.icd = "Code is required.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const onSubmit = () => {
    if (validate()) {
      const values = {
        date: format(selectedDate, "yyyy-MM-dd"),
        title: icd,
        notes: Description,
      };
      if (defaultValues.id !== undefined) {
        console.log("Edit clicked");
        editDiagnosis(values, defaultValues?.id);
      }
      if (defaultValues.id === undefined) {
        console.log("Add clicked");
        addDiagnosis(values);
      }
    }
  };

  const getSelectedIcd = (data) => {
    setIcd(data?.slug);
    setDescription(data?.name);
  };

  //api integration of ICD Code list
  const getICDCode = useCallback(async () => {
    try {
      const response = await get(
        `resource/masters?slug=icd&searchkey=${icdkey}&limit=50&country=undefined`
      );
      const listData = response?.data?.masters; //
      setIcd10(listData);
    } catch (error) {
      console.error("Error fetching card data:", error);
    }
  }, [get, icdkey]);

  useEffect(() => {
    getICDCode();
  }, [getICDCode]);

  return (
    <>
      <CRow className="mb-3">
        <CCol lg={4}>
          <div style={{ width: "100%" }}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Date *
              </label>
              {/* <input
                type="text"
                class="form-control pad-10"
                id="validationTooltip01"
                placeholder="Enter"
                defaultValue={defaultValues?.condition}
              /> */}
              <div className="date-size">
                <DatePicker
                  showIcon
                  selected={selectedDate}
                  onChange={handleDateChange}
                  dateFormat="dd-MM-yyyy"
                  maxDate={maxDate}
                />
                {errors.date && <div className="error-text">{errors.date}</div>}
              </div>
            </div>
          </div>
        </CCol>
        <CCol lg={8}>
          <div style={{ width: "100%" }}>
            <div class="position-relative dropdown-container">
              <label for="validationTooltip01" class="form-label">
                Code *
              </label>
              <ICDCodeDrop
                getSelectedValue={getSelectedIcd}
                options={icd10}
                defaultValue={icdkey}
                icdKey={setIcdKey}
              />
              {errors.icd && <div className="error-text">{errors.icd}</div>}
            </div>
          </div>
        </CCol>
      </CRow>
      <CRow className="mb-3">
        <CCol lg={12}>
          <div style={{ width: "100%" }}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Description
              </label>
              <input
                type="text"
                class="form-control  pad-10"
                id="validationTooltip01"
                // placeholder="Enter"
                disabled
                // defaultValue={defaultValues?.treatment}
                value={Description}
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

export default DiagnosisForm;

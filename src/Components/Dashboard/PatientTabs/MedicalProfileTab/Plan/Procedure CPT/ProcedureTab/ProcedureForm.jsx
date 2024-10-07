import { CCol, CRow } from "@coreui/react";
import React, { useEffect, useState, useCallback } from "react";
import PrimaryButton from "../../../../../../Buttons/PrimaryButton/PrimaryButton";
import SecondaryButton from "../../../../../../Buttons/SecondaryButton/SecondaryButton";
import DatePicker from "react-datepicker";
import Dropdown from "../../../../../../Dropdown/Dropdown";
import { DATE_FORMAT } from "../../../../../../../Config/config";
import { format, isValid, parse } from "date-fns";
import {
  CustomInput,
  getCurrentTime,
} from "../../../../../../../Utils/dateUtils";
import { toast } from "react-toastify";
import useApi from "../../../../../../../ApiServices/useApi";
import {
  findItemIndex,
  getFileTypeFromMime,
  openFile,
} from "../../../../../../../Utils/commonUtils";
import { useLocation } from "react-router-dom";
import ICDCodeDrop from "../../../../../../Dropdown/ICDCodeDrop";
import { Assets } from "../../../../../../../assets/Assets";

const ProcedureForm = ({
  back,
  defaultValues,
  addCpt,
  editCpt,
  isSubmitting,
}) => {
  const { loading, error, get, post, clearCache, patch } = useApi();
  const location = useLocation();
  const data = location.state?.PatientDetail;
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [errors, setErrors] = useState({});
  const [icd10, setIcd10] = useState([]);
  const [icdkey, setIcdKey] = useState(defaultValues?.values?.code || "");
  const [icd, setIcd] = useState(defaultValues?.values?.code || "");
  const [Description, setDescription] = useState([
    defaultValues?.values?.name || null,
  ]);

  const maxDate = new Date(); // Restrict future dates
  const defaultDateTime = defaultValues?.values?.date || "";
  // Split date and time
  const defaultDate = defaultDateTime.split(" ")[0] || "";
  const defaultTime = defaultValues?.values?.time || getCurrentTime();
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
        time: format(selectedTime, "HH:mm"),
        code: icd,
        name: Description,
      };
      const editValues = {
        date: format(selectedDate, "yyyy-MM-dd"),
        time: format(selectedTime, "HH:mm"),
        code: icd,
        name: typeof Description === "string" ? Description : Description[0],
      };
      if (defaultValues.id !== undefined) {
        console.log("Edit clicked");
        editCpt(editValues, defaultValues?.id);
      }
      if (defaultValues.id === undefined) {
        console.log("Add clicked");
        addCpt(values);
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

  const handleClear = () => {
    setSelectedTime(null); // Clear the selected time
  };
  const handleDateClear = () => {
    setSelectedDate(null); // Clear the selected time
    setSelectedTime(null);
  };
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
                Description *
              </label>
              <input
                type="text"
                class="form-control  pad-10"
                id="validationTooltip01"
                placeholder="Enter"
                // defaultValue={defaultValues?.remark}
                disabled
                value={Description}
              />
            </div>
          </div>
        </CCol>
      </CRow>
      <CRow className="mb-1">
        <div style={{ width: "128px" }}>
          <PrimaryButton onClick={onSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "SAVE"}
          </PrimaryButton>
        </div>
        <div style={{ width: "128px" }}>
          <SecondaryButton onClick={back}>CANCEL</SecondaryButton>
        </div>
      </CRow>
    </>
  );
};

export default ProcedureForm;

import { CCol, CRow } from "@coreui/react";
import React, { useEffect, useState,useCallback } from "react";
import PrimaryButton from "../../../../../../Buttons/PrimaryButton/PrimaryButton";
import SecondaryButton from "../../../../../../Buttons/SecondaryButton/SecondaryButton";
import DatePicker from "react-datepicker";
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
import { useLocation } from "react-router-dom";
import ICDCodeDrop from "../../../../../../Dropdown/ICDCodeDrop";

const ProcedureForm = ({ back, defaultValues, fetchCpt, setAddFormView }) => {

  const { loading, error, get, post, clearCache, patch } = useApi();
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [errors, setErrors] = useState({});
  const [icd10, setIcd10] = useState([]);
  const [icdkey, setIcdKey] = useState(defaultValues?.values?.code || "");
  const [icd, setIcd] = useState(defaultValues?.values?.code || "");
  const [Description, setDescription] = useState([defaultValues?.values?.name || null])
  const location = useLocation();
  const data = location.state?.PatientDetail;


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
    if (!icd ) {
      newErrors.icd = "Code is required.";
      isValid = false;
    }


    setErrors(newErrors);
    return isValid;
  };


  const onSubmit = () => {
    if (validate()) {
      if (defaultValues.id !== undefined) {
        console.log("Edit clicked");
        editCpt()

      }
      if (defaultValues.id === undefined) {
        console.log("Add clicked");
        addCpt();

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

  // Add Therapies
  const addCpt = async () => {

    try {
      const body = {
        patient_id: "263",
        slug: "procedure",
        values: {
          date: `${format(selectedDate, "yyyy-MM-dd")} ${format(selectedTime, "HH:mm")}`,
          code: icd,
          name: Description,
        }
      };
      // Use the provided `post` function to send the request
      const response = await post(`resource/patientHealth`, body);

      if (response.code === 201) {
        clearCache();
        await fetchCpt();
        setAddFormView(false);
        toast.success("Added successfully");

      } else {
        console.error("Failed to fetch data:", response.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Edit Therapies
  const editCpt = async () => {

    try {
      const body = {
        patient_id: "263",
        slug: "procedure",
        values: {
          date: `${format(selectedDate, "yyyy-MM-dd")} ${format(selectedTime, "HH:mm")}`,
          code: icd,
          name: Description,
        }
      };
      // Use the provided `post` function to send the request
      const response = await patch(`resource/patientHealth/${defaultValues.id}`, body);

      if (response.code === 200) {
        clearCache();
        await fetchCpt();
        setAddFormView(false);
        toast.success("Added successfully");

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
          <div style={{ width: "100%" }}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Date *
              </label>
              <div className="date-size">
                <DatePicker
                  showIcon
                  selected={selectedDate}
                  onChange={handleDateChange}
                  closeOnScroll={true}
                  wrapperClassName="date-picker-wrapper"
                  dateFormat={DATE_FORMAT}
                />
                {errors.date && <div className="error-text">{errors.date}</div>}
              </div>
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
                closeOnScroll={true}
                timeIntervals={5}
                dateFormat="h:mm aa"
              />
              {errors.time && <div className="error-text">{errors.time}</div>}
            </div>
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
          <PrimaryButton onClick={() => onSubmit()}>SAVE</PrimaryButton>
        </div>
        <div style={{ width: "128px" }}>
          <SecondaryButton onClick={back}>CANCEL</SecondaryButton>
        </div>
      </CRow>
    </>
  );
};

export default ProcedureForm;

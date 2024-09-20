import { CCol, CContainer, CRow } from "@coreui/react";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PrimaryButton from "../../../../../Buttons/PrimaryButton/PrimaryButton";
import SecondaryButton from "../../../../../Buttons/SecondaryButton/SecondaryButton";
import Dropdown from "../../../../../Dropdown/Dropdown";
import { format, isValid, parse } from "date-fns";
import { DATE_FORMAT } from "../../../../../../Config/config";
import {
  findItemIndex,
  getFileTypeFromMime,
  openFile,
} from "../../../../../../Utils/commonUtils";
import { toast } from "react-toastify";
import useApi from "../../../../../../ApiServices/useApi";
import { getCurrentTime } from "../../../../../../Utils/dateUtils";
import { useLocation } from "react-router-dom";

const HeartRate = ({ addBack, defaultData, getTableDatas }) => {
  const { post, patch } = useApi();
  const location = useLocation();
  const data = location.state?.PatientDetail;
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [type, setType] = useState(defaultData?.type || null);
  const [interpretation, setInterpretation] = useState(
    defaultData?.interpretation === "-"
      ? ""
      : defaultData?.interpretation || null
  );
  const [ecgFile, setEcgFile] = useState({
    name: "",
    link: "",
    contentType: "",
  });
  const [hr, setHr] = useState(defaultData?.["hr_(bpm)"] || null);
  const maxDate = new Date(); // Restrict future dates 
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
    "1 Lead ECG",
    "3 Lead ECG",
    "12 Lead ECG",
    "Auscultation",
    "Cardiac Function Test",
  ];

  const getSelectedValue = (data) => {
    setType(data);
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      handleUpload(e.target.files[0]);
    }
  };

  const handleUpload = async (file) => {
    if (file) {
      // const fileType = getFileTypeFromMime(file.type);
      setEcgFile({ name: file.name, link: "", contentType: file.type });
      const reader = new FileReader();

      reader.onloadend = () => {
        // Convert file to base64 string
        const base64 = reader.result.split(",")[1]; // Remove the data URL part
        setEcgFile((prevState) => ({
          ...prevState,
          link: base64,
        }));
      };

      // Read the file as a data URL
      reader.readAsDataURL(file);
    }
  };

  const [errors, setErrors] = useState({
    date: "",
    time: "",
    type: "",
    hr: "",
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

    if (!type) {
      currentErrors.type = "ECG Type is required";
      isValid = false;
    }
    if (!hr) {
      currentErrors.hr = "Heart Rate is required";
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
          unit: "Bpm",
          heart: Number(hr),
          type: type,
          interpretation: interpretation,
          // result_file: ecgFile,
        },
        user_id: data?.user_id,
        slug: "heart-rate",
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
          unit: "Bpm",
          heart: Number(hr),
          type: type,
          interpretation: interpretation,
          // result_file: ecgFile,
        },
        user_id: data?.user_id,
        slug: "heart-rate",
      };
      await patch(url, body);
      await getTableDatas(defaultData);
      toast.success("Updated successfully");
      addBack();
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };

  const openInNewTab = () => {
    if (ecgFile.link && ecgFile.contentType) {
      const dataUrl = `data:${ecgFile.contentType};base64,${ecgFile.link}`;
      window.open(dataUrl, "_blank");
    }
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
                maxDate={maxDate}
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
                ECG Type *
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
          <CCol lg={4}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                HR (in bpm) *
              </label>
              <input
                type="text"
                class="form-control"
                id="validationTooltip01"
                // defaultValue={defaultData?.hr}
                value={hr}
                onChange={(e) => {
                  setHr(e.target.value.replace(/[^0-9]/g, ""));
                }}
                maxLength={3}
                // onInput={(e) => {
                //   e.target.value = e.target.value.replace(/[^0-9]/g, "");
                // }}
              />
              {errors.hr && <div className="error-text">{errors.hr}</div>}
            </div>
          </CCol>
          <CCol lg={4}>
            <div class="position-relative d-flex flex-column gap-1">
              <label for="validationTooltip01" class="form-label">
                ECG
              </label>
              <input id="file" type="file" onChange={handleFileChange} />
              <label htmlFor="file">Choose file</label>

              <div class="d-flex flex-column gap-1 justify-content-center h-100">
                {ecgFile?.link !== "" ? (
                  <span className="cursor" onClick={() => openInNewTab()}>
                    ECG.{getFileTypeFromMime(ecgFile?.contentType)}
                  </span>
                ) : (
                  <span className="">No File Chosen</span>
                )}
              </div>
            </div>
          </CCol>

          <CCol lg={4}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                ECG Interpretation
              </label>
              <input
                type="text"
                class="form-control"
                id="validationTooltip01"
                // defaultValue={defaultData?.interpretation}
                value={interpretation}
                onChange={(e) => {
                  setInterpretation(e.target.value);
                }}
              />
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

export default HeartRate;

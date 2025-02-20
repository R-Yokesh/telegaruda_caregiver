import { CCol, CFormTextarea, CRow } from "@coreui/react";
import React, { useEffect, useState, useCallback } from "react";
import DatePicker from "react-datepicker";
import { Assets } from "../../../../../../../assets/Assets";
import SecondaryButton from "../../../../../../Buttons/SecondaryButton/SecondaryButton";
import PrimaryButton from "../../../../../../Buttons/PrimaryButton/PrimaryButton";
import Dropdown from "../../../../../../Dropdown/Dropdown";
import { toast } from "react-toastify";
import { DATE_FORMAT } from "../../../../../../../Config/config";
import { format, isValid, parse } from "date-fns";
import { duration } from "moment";
import {
  CustomInput,
  getCurrentTime,
} from "../../../../../../../Utils/dateUtils";
import useApi from "../../../../../../../ApiServices/useApi";
import {
  findItemIndex,
  getFileTypeFromMime,
  openFile,
} from "../../../../../../../Utils/commonUtils";
import SearchInput from "../../../../../../Input/SearchInput";
import { useLocation } from "react-router-dom";
import ChiefInput from "../../../../../../Input/ChiefInput";
import SearchableDrop from "../../../../../../Dropdown/SearchableDrop";

const SignsSymptomsForm = ({
  back,
  defaultValues,
  addSymptoms,
  editSymptoms,
  isSubmitting,
}) => {
  const { loading, error, get, post, clearCache, patch } = useApi();
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    //location: defaultValues?.values?.location || "",
    duration_days: defaultValues?.values?.duration || "",
    symptoms: defaultValues?.values?.symptoms || "",
    aggravating_factors: defaultValues?.values?.aggravating_factors || "",
    releiving_factors: defaultValues?.values?.releiving_factors || "",
    temporal_factors: defaultValues?.values?.temporal_factors || "",
    severity: defaultValues?.values?.severity || "",
    notes: defaultValues?.values?.notes || "",
  });
  const [locationDetails, setLocationDetails] = useState([]);
  const [locationKey, setLocationKey] = useState(
    defaultValues?.values?.location || ""
  );
  const [locationName, setLocationName] = useState(
    defaultValues?.values?.location || ""
  );

  const defaultDateTime = defaultValues?.values?.date || "";
  const maxDate = new Date(); // Restrict future dates
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const options = [
    "Normal",
    "Mild",
    "Moderate",
    "Severe",
    "Very Severe",
    "Worst",
  ];
  const options1 = [
    "Normal",
    "Mild",
    "Moderate",
    "Severe",
    "Very Severe",
    "Worst",
  ];

  // Function to update symptoms
  const getSelectedValue = (data) => {
    setFormData((prevState) => ({
      ...prevState,
      symptoms: data,
    }));
  };

  // Function to update severity
  const getSelectedValue1 = (data) => {
    setFormData((prevState) => ({
      ...prevState,
      severity: data,
    }));
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
    console.log(locationName, reasonName);
    if (!locationName) {
      newErrors.locationName = "Location is required.";
      isValid = false;
    }
    if (!formData.duration_days) {
      newErrors.duration_days = "Duration is required.";
      isValid = false;
    }
    if (!reasonName) {
      newErrors.symptoms = "Symptoms is required.";
      isValid = false;
    }
    if (!formData.severity) {
      newErrors.severity = "Severity is required.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleClear = () => {
    setSelectedTime(null); // Clear the selected time
  };
  const handleDateClear = () => {
    setSelectedDate(null); // Clear the selected time
    setSelectedTime(null);
  };

  const onSubmit = () => {
    if (validate()) {
      const values = {
        date: format(selectedDate, "dd-MM-yyyy"),
        time: format(selectedTime, "HH:mm"),
        location: locationName?.name || locationName,
        duration: formData.duration_days,
        symptoms: reasonName?.name || reasonName,
        aggravating_factors: formData.aggravating_factors,
        releiving_factors: formData.releiving_factors,
        temporal_factors: formData.temporal_factors,
        severity: formData.severity,
        notes: formData.notes,
        quality: "",
      };

      if (defaultValues.id !== undefined) {
        console.log("Edit clicked");
        editSymptoms(values, defaultValues?.id);
      }
      if (defaultValues.id === undefined) {
        console.log("Add clicked");
        addSymptoms(values);
      }
    }
  };

  //api integration of medical conditions list
  const getLocation = useCallback(async () => {
    try {
      const response = await get(
        `resource/masters/all?slug=hpi_location&order_by=name&dir=1&searchkey=${locationKey}`
      );
      const listData = response?.data?.masters; //
      setLocationDetails(listData);
    } catch (error) {
      console.error("Error fetching card data:", error);
    }
  }, [get, locationKey]);

  useEffect(() => {
    getLocation();
  }, [getLocation]);

  const getSymptoms = useCallback(async () => {
    try {
      const response = await get(
        `resource/masters/all?slug=hpi_location&order_by=name&dir=1&searchkey=${locationKey}`
      );
      const listData = response?.data?.masters; //
      setLocationDetails(listData);
    } catch (error) {
      console.error("Error fetching card data:", error);
    }
  }, [get, locationKey]);

  useEffect(() => {
    getSymptoms();
  }, [getSymptoms]);

  const getSelectedlocation = (data) => {
    setLocationName(data?.name);
  };

  const [reasonDetails, setReasonDetails] = useState([]);
  const [reasonkey, setReasonKey] = useState(
    defaultValues?.values?.symptoms || ""
  );
  const [reasonName, setReasonName] = useState(
    defaultValues?.values?.symptoms || ""
  );
  const getSurgeryReasons = useCallback(async () => {
    try {
      const response = await get(
        `resource/masters?slug=symptom&searchkey=${reasonkey}&limit=50&country=undefined`
      );
      const listData = response?.data?.masters; //
      setReasonDetails(listData);
    } catch (error) {
      console.error("Error fetching card data:", error);
    }
  }, [get, reasonkey]);
  const getSelectedReasonData = (data) => {
    setReasonName(data?.name);
  };
  useEffect(() => {
    getSurgeryReasons();
  }, [getSurgeryReasons]);

  return (
    <>
      <CRow className="mb-3">
        <CCol lg={3}>
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
        <CCol lg={3}>
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
        <CCol lg={3}>
          <div style={{ width: "100%" }}>
            <div class="position-relative dropdown-container">
              <label for="validationTooltip01" class="form-label">
                Location *
              </label>
              <SearchableDrop
                getSelectedValue={getSelectedlocation}
                options={locationDetails}
                defaultValue={locationKey}
                dropKey={setLocationKey}
              />
              {/* <SearchInput
                data={locationDetails}
                setSurgeryKey={setLocationKey}
                getSelectedData={getSelectedlocation}
                defaultkey={locationKey}
              /> */}

              {errors.locationName && (
                <div className="error-text">{errors.locationName}</div>
              )}
            </div>
          </div>
        </CCol>
        <CCol lg={3}>
          <div style={{ width: "100%" }}>
            <div className="position-relative">
              <label htmlFor="validationTooltip01" className="form-label">
                Duration in Days *
              </label>
              <input
                type="text"
                className="form-control pad-10"
                id="validationTooltip01"
                placeholder="0000"
                value={formData?.duration_days}
                name="duration_days"
                onChange={handleChange}
                maxLength={4}
                onInput={(e) => {
                  // Restrict input to digits
                  e.target.value = e.target.value.replace(/[^0-9]/g, "");
                  // Allow only a single zero
                  if (e.target.value === "00") {
                    e.target.value = "0";
                  }
                }}
              />
              {errors.duration_days && (
                <div className="error-text">{errors.duration_days}</div>
              )}
            </div>
          </div>
        </CCol>
      </CRow>
      <CRow className="mb-3">
        <CCol lg={4}>
          <div style={{ width: "100%" }}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Symptoms *
              </label>
              {/* <input
                type="text"
                class="form-control  pad-10"
                id="validationTooltip01"
                placeholder="Enter"
                defaultValue={defaultValues?.characteristics}
              /> */}
              {/* <div
                className="w-100"
                style={{
                  border: "1px solid #17171D33",
                  borderRadius: "5px",
                }}
              >
                <Dropdown
                  options={options}
                  defaultValue={
                    defaultValues?.values?.symptoms
                      ? options[findItemIndex(options, defaultValues?.values?.symptoms)]
                      : null
                  }
                  getSelectedValue={getSelectedValue}
                />
              </div> */}
              {/* <ChiefInput
                data={reasonDetails}
                setSurgeryKey={setReasonKey}
                getSelectedData={getSelectedReasonData}
                defaultkey={reasonkey}
              /> */}
              <SearchableDrop
                getSelectedValue={getSelectedReasonData}
                options={reasonDetails}
                defaultValue={reasonkey}
                dropKey={setReasonKey}
              />
              {errors.symptoms && (
                <div className="error-text">{errors.symptoms}</div>
              )}
            </div>
          </div>
        </CCol>
        <CCol lg={4}>
          <div style={{ width: "100%" }}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Aggravating factors
              </label>
              <CFormTextarea
                type="text"
                class="form-control  pad-10"
                id="validationTooltip01"
                placeholder="Enter"
                value={formData?.aggravating_factors}
                name="aggravating_factors"
                onChange={handleChange}
              />
            </div>
          </div>
        </CCol>
        <CCol lg={4}>
          <div style={{ width: "100%" }}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Relieving factors
              </label>
              <CFormTextarea
                type="text"
                class="form-control  pad-10"
                id="validationTooltip01"
                placeholder="Enter"
                value={formData?.releiving_factors}
                name="releiving_factors"
                onChange={handleChange}
              />
            </div>
          </div>
        </CCol>
      </CRow>
      <CRow className="mb-3">
        <CCol lg={4}>
          <div style={{ width: "100%" }}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Temporal factors
              </label>
              <CFormTextarea
                type="text"
                class="form-control  pad-10"
                id="validationTooltip01"
                placeholder="Enter"
                value={formData?.temporal_factors}
                name="temporal_factors"
                onChange={handleChange}
              />
            </div>
          </div>
        </CCol>
        <CCol lg={4}>
          <div style={{ width: "100%" }}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Severity *
              </label>
              <div
                className="w-100"
                style={{
                  border: "1px solid #17171D33",
                  borderRadius: "5px",
                }}
              >
                <Dropdown
                  options={options1}
                  defaultValue={
                    defaultValues?.values?.severity
                      ? options1[
                          findItemIndex(
                            options1,
                            defaultValues?.values?.severity
                          )
                        ]
                      : null
                  }
                  getSelectedValue={getSelectedValue1}
                />
              </div>
              {errors.severity && (
                <div className="error-text">{errors.severity}</div>
              )}
            </div>
          </div>
        </CCol>
        <CCol lg={4}>
          <div style={{ width: "100%" }}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Notes
              </label>
              <CFormTextarea
                type="text"
                class="form-control  pad-10"
                id="validationTooltip01"
                placeholder="Enter"
                value={formData?.notes}
                name="notes"
                onChange={handleChange}
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
          <SecondaryButton onClick={() => back()}>CANCEL</SecondaryButton>
        </div>
      </CRow>
    </>
  );
};

export default SignsSymptomsForm;

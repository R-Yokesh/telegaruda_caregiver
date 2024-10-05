import { CCol, CRow, CFormTextarea } from "@coreui/react";
import React, { useCallback, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { Assets } from "../../../../../../../assets/Assets";
import SecondaryButton from "../../../../../../Buttons/SecondaryButton/SecondaryButton";
import PrimaryButton from "../../../../../../Buttons/PrimaryButton/PrimaryButton";
import Dropdown from "../../../../../../Dropdown/Dropdown";
import { DATE_FORMAT } from "../../../../../../../Config/config";
import SearchInput from "../../../../../../Input/SearchInput";
import useApi from "../../../../../../../ApiServices/useApi";
import { useLocation } from "react-router-dom";
import ICDDrop from "../../../../../../Dropdown/ICDDrop";
import { CustomInput, getCurrentTime } from "../../../../../../../Utils/dateUtils";
import { format, isValid, parse } from "date-fns";

const SurgicalForm = ({ back, defaultValues, surgicalAdd, surgicalEdit,isSubmitting }) => {
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const { get, post, clearCache, patch, del, loading } = useApi();
  const location = useLocation();
  const data = location.state?.PatientDetail;
  const [surgeryDetails, setSurgeryDetails] = useState([]);
  const [surgerykey, setSurgeryKey] = useState(
    defaultValues?.values?.surgical_name?.name || ""
  );
  const [surgeryName, setSurgeryName] = useState(
    defaultValues?.values?.surgical_name || {}
  );

  const [reasonDetails, setReasonDetails] = useState([]);
  const [reasonkey, setReasonKey] = useState(
    defaultValues?.values?.pre_surgery_diagnosis?.name || ""
  );
  const [reasonName, setReasonName] = useState(
    defaultValues?.values?.pre_surgery_diagnosis || {}
  );

  const [icd10, setIcd10] = useState([]);
  const [icdkey, setIcdKey] = useState(
    defaultValues?.values?.condition?.icd ? `${defaultValues?.values?.condition?.icd?.slug} - ${defaultValues?.values?.condition?.icd?.name}` : ""
 );
  const [icd, setIcd] = useState(defaultValues?.values?.icd || {});

  const [notes, setNotes] = useState(
    defaultValues?.values?.pre_surgery_notes || ""
  );
  const [hospital, setHospital] = useState(
    defaultValues?.values?.hospital_name || ""
  );
  const [refby, setRefby] = useState(
    defaultValues?.values?.prescribed_by || ""
  );
  const [performby, setPerformby] = useState(
    defaultValues?.values?.surgery_done_by || ""
  );
  const [errors, setErrors] = useState({});
  const maxDate = new Date(); // Restrict future dates 
  const defaultDateTime = defaultValues?.values?.surgery_date || "";
  // Split date and time
  const defaultDate = defaultDateTime.split(" ")[0] || "";
  const defaultTime = defaultValues?.values?.surgery_time || getCurrentTime();
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

  const getSelectedGravida = (data) => {
    setIcd(data);
  };
 

  const getSurgeryName = useCallback(async () => {
    try {
      const response = await get(
        `resource/masters?slug=procedure&searchkey=${surgerykey}&limit=50&country=undefined`
      );
      const listData = response?.data?.masters; //
      setSurgeryDetails(listData);
    } catch (error) {
      console.error("Error fetching card data:", error);
    }
  }, [get, surgerykey]);
  const getSelectedData = (data) => {
    setSurgeryName(data);
  };

  const getSurgeryReasons = useCallback(async () => {
    try {
      const response = await get(
        `resource/masters?slug=condition&searchkey=${reasonkey}&limit=50&country=undefined`
      );
      const listData = response?.data?.masters; //
      setReasonDetails(listData);
    } catch (error) {
      console.error("Error fetching card data:", error);
    }
  }, [get, reasonkey]);

  const getSelectedReasonData = (data) => {
    setReasonName(data);
  };

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

  useEffect(() => {
    getSurgeryReasons();
  }, [getSurgeryReasons]);
  useEffect(() => {
    getSurgeryName();
  }, [getSurgeryName]);
  const validateForm = () => {
    const newErrors = {};
    if (!selectedDate) newErrors.date = "Date is required.";
    if (!selectedTime) newErrors.time = "Time is required.";
    if (!surgeryName || !surgeryName?.name)
      newErrors.surgeryName = "Surgery Name is required.";
    if (!reasonName || !reasonName?.name)
      newErrors.reasonName = "Surgery Reason is required.";
    // if (!icd || !icd?.name) newErrors.icd = "ICD Code is required.";
    if (!hospital) newErrors.hospital = "Hospital is required.";
    if (!performby) newErrors.performby = "Performed by Doctor is required.";

    setErrors(newErrors);

    // Return false if there are errors
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async () => {
    const values = {
      icd: icd,
      hospital_name: hospital,
      pre_surgery_notes: notes, // pass the notes in this field
      post_operative_problems: "",
      surgery_date: format(selectedDate, "yyyy-MM-dd"),
      surgery_time: format(selectedTime, "HH:mm"),
      surgical_name: surgeryName,
      pre_surgery_diagnosis: reasonName,
      prescribed_by: refby,
      surgery_done_by: performby,
    };
    if (validateForm()) {
      if (defaultValues?.id === undefined) {
        surgicalAdd(values);
      }
      if (defaultValues?.id !== undefined) {
        surgicalEdit(values, defaultValues?.id);
      }
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
      <CRow className="mb-3">
        <CCol lg={6}>
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
        <CCol lg={6}>
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
      </CRow>

      <CRow className="mb-3">
        <CCol lg={6}>
          <div style={{ width: "100%" }}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Surgery Name *
              </label>
              <SearchInput
                data={surgeryDetails}
                setSurgeryKey={setSurgeryKey}
                getSelectedData={getSelectedData}
                defaultkey={surgerykey}
              />
              {errors.surgeryName && (
                <div className="text-danger">{errors.surgeryName}</div>
              )}
              {/* <Dropdown
                  getSelectedValue={getSelectedGravida}
                  options={gravidaoptions}
                  // defaultValue={gravidaoptions[findgravidaIndex]}
                /> */}
            </div>
          </div>
        </CCol>
        <CCol lg={6}>
          <div style={{ width: "100%" }}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Surgery Reason *
              </label>
              {/* <input
                type="text"
                class="form-control pad-10"
                id="validationTooltip01"
                placeholder="Enter"
                defaultValue={defaultValues?.name}
              /> */}
              <SearchInput
                data={reasonDetails}
                setSurgeryKey={setReasonKey}
                getSelectedData={getSelectedReasonData}
                defaultkey={reasonkey}
              />
              {errors.reasonName && (
                <div className="text-danger">{errors.reasonName}</div>
              )}
            </div>
          </div>
        </CCol>
      </CRow>
      <CRow className="mb-3">
        <CCol lg={6}>
          <div style={{ width: "100%" }}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                ICD Code
              </label>

              <div
              // className="w-100"
              // style={{
              //   border: "1px solid #17171D33",
              //   borderRadius: "5px",
              // }}
              >
                <ICDDrop
                  getSelectedValue={getSelectedGravida}
                  options={icd10}
                  defaultValue={icdkey}
                  icdKey={setIcdKey}
                />
              </div>
            </div>
          </div>
        </CCol>
        <CCol lg={6}>
          <div style={{ width: "100%" }}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Performed by Doctor *
              </label>
              <input
                type="text"
                class="form-control pad-10"
                id="validationTooltip01"
                placeholder="Enter"
                defaultValue={performby}
                onChange={(e) => setPerformby(e.target.value)}
              />
              {errors.performby && (
                <div className="text-danger">{errors.performby}</div>
              )}
            </div>
          </div>
        </CCol>
      </CRow>
      <CRow className="mb-3">
        <CCol lg={6}>
          <div style={{ width: "100%" }}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Referred by Doctor
              </label>
              <input
                type="text"
                class="form-control pad-10"
                id="validationTooltip01"
                placeholder="Enter"
                defaultValue={refby}
                onChange={(e) => setRefby(e.target.value)}
              />
            </div>
          </div>
        </CCol>
        <CCol lg={6}>
          <div style={{ width: "100%" }}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Hospital *
              </label>
              <input
                type="text"
                class="form-control pad-10"
                id="validationTooltip01"
                placeholder="Enter"
                defaultValue={hospital}
                onChange={(e) => setHospital(e.target.value)}
              />
              {errors.hospital && (
                <div className="text-danger">{errors.hospital}</div>
              )}
            </div>
          </div>
        </CCol>
      </CRow>
      <CRow className="mb-3">
        <CCol lg={6}>
          <div style={{ width: "100%" }}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Notes
              </label>
              <CFormTextarea
                id="exampleFormControlTextarea1"
                // label="Example textarea"
                defaultValue={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
              ></CFormTextarea>
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

export default SurgicalForm;

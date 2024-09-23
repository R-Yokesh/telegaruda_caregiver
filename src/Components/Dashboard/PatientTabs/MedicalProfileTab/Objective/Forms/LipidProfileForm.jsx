import { CCol, CContainer, CRow } from "@coreui/react";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PrimaryButton from "../../../../../Buttons/PrimaryButton/PrimaryButton";
import SecondaryButton from "../../../../../Buttons/SecondaryButton/SecondaryButton";
import { extractNum } from "../../../../../../Utils/commonUtils";
import useApi from "../../../../../../ApiServices/useApi";
import { CustomInput, getCurrentTime } from "../../../../../../Utils/dateUtils";
import { format, isValid, parse } from "date-fns";
import { DATE_FORMAT } from "../../../../../../Config/config";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { Assets } from "../../../../../../assets/Assets";

const LipidProfileForm = ({ addBack, defaultData, getTableDatas }) => {

  const location = useLocation();
  const data = location.state?.PatientDetail;
  const { post, patch } = useApi();
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [ldl, setLdl] = useState(defaultData?.["ldl_(mg/dl)"] || "");
  const [hdl, setHdl] = useState(defaultData?.["hdl_(mg/dl)"] || "");
  const [vldl, setVldl] = useState(defaultData?.["vldl_(mg/dl)"] || "");
  const [ldlHdl, setLdlHdl] = useState(defaultData?.["ldl/hdl_(mg/dl)"] || 0);
  const [triglycerides, setTriglycerides] = useState(
    defaultData?.["triglycerides_(mg/dl)"] || ""
  );
  const [totalCholesterol, setTotalCholesterol] = useState(
    defaultData?.["total_cholesterol_(mg/dl)"] || ""
  );
  const [errors, setErrors] = useState({});
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

  // const convertNum = (e) => {
  //   e.target.value = e.target.value.replace(/[^0-9]/g, "");
  // };

  // Validation function
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
    if (!ldl || isNaN(ldl) || ldl < 0) {
      currentErrors.ldl = "LDL is required";
      isValid = false;
    }
    if (!hdl || isNaN(hdl) || hdl < 0) {
      currentErrors.hdl = "HDL is required";
      isValid = false;
    }
    if (!vldl || isNaN(vldl) || vldl < 0) {
      currentErrors.vldl = "VLDL is required";
      isValid = false;
    }
    if (!ldlHdl || isNaN(ldlHdl) || ldlHdl < 0) {
      currentErrors.ldlHdl = "LDL/HDL is required";
      isValid = false;
    }
    if (!triglycerides || isNaN(triglycerides) || triglycerides < 0) {
      currentErrors.triglycerides = "Triglycerides is required";
      isValid = false;
    }
    if (!totalCholesterol || isNaN(totalCholesterol) || totalCholesterol < 0) {
      currentErrors.totalCholesterol = "Total Cholesterol is required";
      isValid = false;
    }

    setErrors(currentErrors);
    return isValid;
  };

  const onSubmit = () => {
    if (validateInputs()) {
      if (defaultData) {
        onEdit();
      }
      if (!defaultData) {
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
          ldl_unit: "mg/dL",
          hdl_unit: "mg/dL",
          vldl_unit: "mg/dL",
          hdl_ldl_unit: "mg/dL",
          triglycerides_unit: "mg/dL",
          total_unit: "mg/dL",
          ldl: Number(ldl),
          vldl: Number(vldl),
          hdl: Number(hdl),
          hdl_ldl: Number(ldlHdl),
          triglycerides: Number(triglycerides),
          total: Number(totalCholesterol),
        },
        user_id: data?.user_id,
        slug: "lipid-profile",
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
          ldl_unit: "mg/dL",
          hdl_unit: "mg/dL",
          vldl_unit: "mg/dL",
          hdl_ldl_unit: "mg/dL",
          triglycerides_unit: "mg/dL",
          total_unit: "mg/dL",
          ldl: Number(ldl),
          vldl: Number(vldl),
          hdl: Number(hdl),
          hdl_ldl: Number(ldlHdl),
          triglycerides: Number(triglycerides),
          total: Number(totalCholesterol),
        },
        user_id: data?.user_id,
        slug: "lipid-profile",
      };
      await patch(url, body);
      await getTableDatas(defaultData);
      toast.success("Updated successfully");
      addBack();
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };

  // Calculate total whenever any score changes
  useEffect(() => {
    if (ldl && hdl) {
      const sum = Number(ldl) / Number(hdl);
      setLdlHdl(sum.toFixed(2));
    }
  }, [ldl, hdl]);
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
                LDL(mg/dL) *
              </label>
              <input
                type="text"
                class="form-control"
                id="validationTooltip01"
                // defaultValue={defaultData?.totalOnly}
                maxLength={3}
                // onInput={convertNum}
                value={ldl}
                onChange={(e) => {
                  setLdl(e.target?.value?.replace(/[^0-9]/g, ""));
                }}
              />
              {errors.ldl && <div className="error-text">{errors.ldl}</div>}
            </div>
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CCol lg={4}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                HDL(mg/dL) *
              </label>
              <input
                type="text"
                class="form-control"
                id="validationTooltip01"
                // defaultValue={defaultData?.totalOnly}
                maxLength={3}
                // onInput={convertNum}
                value={hdl}
                onChange={(e) => {
                  setHdl(e.target?.value?.replace(/[^0-9]/g, ""));
                }}
              />
              {errors.hdl && <div className="error-text">{errors.hdl}</div>}
            </div>
          </CCol>
          <CCol lg={4}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                VLDL(mg/dL) *
              </label>
              <input
                type="text"
                class="form-control"
                id="validationTooltip01"
                // defaultValue={defaultData?.totalOnly}
                maxLength={3}
                // onInput={convertNum}
                value={vldl}
                onChange={(e) => {
                  setVldl(e.target?.value?.replace(/[^0-9]/g, ""));
                }}
              />
              {errors.vldl && <div className="error-text">{errors.vldl}</div>}
            </div>
          </CCol>
          <CCol lg={4}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                LDL/HDL(mg/dL) *
              </label>
              <input
                type="text"
                class="form-control"
                id="validationTooltip01"
                // defaultValue={defaultData?.totalOnly}
                maxLength={3}
                // onInput={convertNum}
                value={ldlHdl}
                onChange={(e) => {
                  setLdlHdl(e.target?.value?.replace(/[^0-9]/g, ""));
                }}
                disabled
              />
              {errors.ldlHdl && (
                <div className="error-text">{errors.ldlHdl}</div>
              )}
            </div>
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CCol lg={4}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Triglycerides(mg/dL) *
              </label>
              <input
                type="text"
                class="form-control"
                id="validationTooltip01"
                // defaultValue={extractNum(defaultData?.triglycerides)}
                maxLength={3}
                // onInput={convertNum}
                value={triglycerides}
                onChange={(e) => {
                  setTriglycerides(e.target?.value?.replace(/[^0-9]/g, ""));
                }}
              />
              {errors.triglycerides && (
                <div className="error-text">{errors.triglycerides}</div>
              )}
            </div>
          </CCol>

          <CCol lg={4}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Total Cholesterol(mg/dL) *
              </label>
              <input
                type="text"
                class="form-control"
                id="validationTooltip01"
                // defaultValue={extractNum(defaultData?.hdl)}
                maxLength={3}
                // onInput={convertNum}
                value={totalCholesterol}
                onChange={(e) => {
                  setTotalCholesterol(e.target?.value?.replace(/[^0-9]/g, ""));
                }}
              />
              {errors.totalCholesterol && (
                <div className="error-text">{errors.totalCholesterol}</div>
              )}
            </div>
          </CCol>
        </CRow>
        {/* <CRow className="mb-3">
          <CCol lg={4}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Unit (LDL) *
              </label>
              <select
                class="form-select"
                aria-label="Disabled select example"
                defaultValue={"mg/dL"}
              >
                <option value="dL">dL</option>
                <option value="mg">mg</option>
                <option value="mg/dL">mg/dL</option>
              </select>
            </div>
          </CCol>
          <CCol lg={4}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                LDL *
              </label>
              <input
                type="text"
                class="form-control"
                id="validationTooltip01"
                defaultValue={extractNum(defaultData?.ldl)}
              />
            </div>
          </CCol>
          <CCol lg={4}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                LDL/HDL *
              </label>
              <input
                type="text"
                class="form-control"
                id="validationTooltip01"
                defaultValue={extractNum(defaultData?.["ldl/hdl"])}
              />
            </div>
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CCol lg={4}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Unit (VLDL) *
              </label>
              <select
                class="form-select"
                aria-label="Disabled select example"
                defaultValue={"mg/dL"}
              >
                <option value="dL">dL</option>
                <option value="mg">mg</option>
                <option value="mg/dL">mg/dL</option>
              </select>
            </div>
          </CCol>
          <CCol lg={4}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                VLDL *
              </label>
              <input
                type="text"
                class="form-control"
                id="validationTooltip01"
                defaultValue={extractNum(defaultData?.["vldl"])}
              />
            </div>
          </CCol>
        </CRow> */}
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

export default LipidProfileForm;

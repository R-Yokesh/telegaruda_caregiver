import { CCol, CRow, CFormCheck } from "@coreui/react";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import SecondaryButton from "../../../../../../Buttons/SecondaryButton/SecondaryButton";
import PrimaryButton from "../../../../../../Buttons/PrimaryButton/PrimaryButton";
import Dropdown from "../../../../../../Dropdown/Dropdown";
import { format } from "date-fns";
import { DATE_FORMAT } from "../../../../../../../Config/config";
import { findItemIndex } from "../../../../../../../Utils/commonUtils";

const MensturalHistoryForm = ({
  back,
  defaultValues,
  from,
  mensuEdit,
  mensuAdd,
  isSubmitting,
}) => {
  const [date, setDate] = useState(defaultValues?.values?.lmp || new Date());
  const maxDate = new Date(); // Restrict future dates

  const flow_duration = ["2-7 days", "< 2 Days", "> 7 Days"];
  const flow_type = ["Less", "Moderate", "Severe"];

  const [menopause, setMenopause] = useState(
    defaultValues?.values?.menopause || "no"
  );
  const [irregular, setIrregular] = useState(
    defaultValues?.values?.cycle?.irregular || "no"
  );

  const [dysmenorrhea, setDysmenorrhea] = useState(
    defaultValues?.values?.dysmenorrhea || "no"
  );
  const [bleeding, setBleeding] = useState(
    defaultValues?.values?.bleeding || "no"
  );
  const [flowType, setFlowType] = useState(
    defaultValues?.values?.flow?.type || ""
  );
  const [flowDur, setFlowDur] = useState();

  const [value, setValue] = useState(
    defaultValues?.values?.menopause_age
      ? defaultValues?.values?.menopause_age
      : ""
  );
  const [value1, setValue1] = useState(
    defaultValues?.values?.menarche_age
      ? defaultValues?.values?.menarche_age
      : ""
  );
  const [value2, setValue2] = useState(
    defaultValues?.values?.cycle?.year ? defaultValues?.values?.cycle?.year : ""
  );
  const [value3, setValue3] = useState(
    defaultValues?.values?.cycle?.days ? defaultValues?.values?.cycle?.days : ""
  );
  const [error, setError] = useState("");
  const [errors, setErrors] = useState("");

  const handleClick = (event) => {
    setMenopause(event.target.value);
  };

  const getSelectedValue = (data) => {
    setFlowType(data);
  };
  const getSelectedValue2 = (data) => {
    setFlowDur(data);
  };

  const handleChange = (e) => {
    const input = e.target.value;

    // Remove non-digit characters and limit to two digits
    const newValue = input.replace(/[^0-9]/g, "").slice(0, 2);

    if (input.length > 2 && newValue.length > 2) {
      setError("Input should not exceed 2 digits.");
    } else {
      if (e.target.name === "MenopauseAge") {
        setValue(newValue);
      } else if (e.target.name === "MenarcheAge") {
        setValue1(newValue);
      } else if (e.target.name === "cycle_per_year") {
        setValue2(newValue);
      } else if (e.target.name === "cycle_in_days") {
        setValue3(newValue);
      }
      setError("");
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text");
    const newValue = paste.replace(/[^0-9]/g, "").slice(0, 2);

    if (newValue.length > 2) {
      setError("Input should not exceed 2 digits.");
    } else {
      if (e.target.name === "MenopauseAge") {
        setValue(newValue);
      } else if (e.target.name === "MenarcheAge") {
        setValue1(newValue);
      } else if (e.target.name === "cycle_per_year") {
        setValue2(newValue);
      } else if (e.target.name === "cycle_in_days") {
        setValue3(newValue);
      }
      setError("");
    }
  };
  const validateForm = () => {
    const newErrors = {};

    // Validate Menarche Age
    if (!value1) {
      newErrors.menarcheAge = "Menarche Age is required.";
    }

    // Validate Cycle Information if Menopause is not "yes"
    if (menopause !== "yes") {
      if (!value2) {
        newErrors.cyclePerYear = "Cycle per Year is required.";
      }
      if (!value3) {
        newErrors.cycleLengthDays = "Cycle Length in days is required.";
      }
      if (!flowDur) {
        newErrors.flowdur = "Flow duration is required.";
      }
      if (!flowType) {
        newErrors.flowtype = "Flow type is required.";
      }
    }

    // Validate LMP Date
    if (!date) {
      newErrors.lmpDate = "LMP Date is required.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors); // Set errors to state
      return false;
    }

    return true;
  };

  const onSubmit = async () => {
    if (!validateForm()) {
      return; // Stop form submission if validation fails
    }
    const values = {
      lmp: format(date, "yyyy-MM-dd"),
      menarche_age: value1,
      cycle: {
        year: value2,
        days: value3,
        irregular: irregular,
      },
      flow: {
        duration: flowDur,
        type: flowType,
      },
      dysmenorrhea: dysmenorrhea,
      menopause: menopause,
      bleeding: bleeding,
      menopause_age: menopause === "yes" ? value : "",
    };
    if (defaultValues?.id === undefined) {
      await mensuAdd(values);
      setErrors({});
    }
    if (defaultValues?.id !== undefined) {
      await mensuEdit(values, defaultValues?.id);
      setErrors({});
      if (menopause === "no") {
        setValue();
      }
    }
  };

  useEffect(() => {
    setDate(defaultValues?.values?.lmp || new Date());
    setValue3(defaultValues?.values?.cycle?.days || "");
    setValue2(defaultValues?.values?.cycle?.year || "");
    setValue1(defaultValues?.values?.menarche_age || "");
    setValue(defaultValues?.values?.menopause_age || "");
    setFlowDur(defaultValues?.values?.flow?.duration || "");
    setFlowType(defaultValues?.values?.flow?.type);
    setBleeding(defaultValues?.values?.bleeding || "no");
    setDysmenorrhea(defaultValues?.values?.dysmenorrhea || "no");
    setIrregular(defaultValues?.values?.cycle?.irregular || "no");
    setMenopause(defaultValues?.values?.menopause || "no");
  }, [
    defaultValues?.values?.bleeding,
    defaultValues?.values?.cycle?.days,
    defaultValues?.values?.cycle?.irregular,
    defaultValues?.values?.cycle?.year,
    defaultValues?.values?.dysmenorrhea,
    defaultValues?.values?.flow?.duration,
    defaultValues?.values?.flow?.type,
    defaultValues?.values?.lmp,
    defaultValues?.values?.menarche_age,
    defaultValues?.values?.menopause,
    defaultValues?.values?.menopause_age,
  ]);

  return (
    <>
      <CRow className="mb-3">
        <CCol lg={4} className="mb-3">
          <div style={{ width: "100%" }}>
            <div className="position-relative">
              <label htmlFor="validationTooltip01" className="form-label">
                Menarche Age *
              </label>
              <input
                type="text"
                className="form-control  pad-10"
                id="validationTooltip01"
                placeholder="00"
                name="MenarcheAge"
                value={value1}
                onChange={handleChange}
                onPaste={handlePaste}
                disabled={from === "Consult-Gynaec" ? true : false}
              />
            </div>
            {error && <p className="text-danger">{error}</p>}
            {errors.menarcheAge && (
              <p className="text-danger">{errors.menarcheAge}</p>
            )}
          </div>
        </CCol>

        <CCol lg={4} className="mb-3">
          <div className="position-relative">
            <label htmlFor="validationTooltip01" className="form-label">
              LMP Date *
            </label>
            <div className="date-size">
              <DatePicker
                showIcon
                selected={date}
                onChange={(date) => setDate(date)}
                dateFormat={DATE_FORMAT}
                maxDate={maxDate}
              />
            </div>
            {errors.lmpDate && <p className="text-danger">{errors.lmpDate}</p>}
          </div>
        </CCol>

        <CCol lg={4} className="mb-3">
          <div style={{ width: "100%" }}>
            <div className="position-relative">
              <label htmlFor="validationTooltip01" className="form-label">
                Flow Duration {menopause !== "yes" && "*"}
              </label>
              <div
                className="w-100"
                style={{
                  border: "1px solid #17171D33",
                  borderRadius: "5px",
                }}
              >
                <Dropdown
                  options={flow_duration}
                  defaultValue={
                    defaultValues?.values?.flow?.duration
                      ? flow_duration[
                          findItemIndex(
                            flow_duration,
                            defaultValues?.values?.flow?.duration
                          )
                        ]
                      : null
                  }
                  getSelectedValue={getSelectedValue2}
                />
              </div>
              {errors.flowdur && (
                <p className="text-danger">{errors.flowdur}</p>
              )}
            </div>
          </div>
        </CCol>
        <CCol lg={4} className="mb-3">
          <div style={{ width: "100%" }}>
            <div className="position-relative">
              <label htmlFor="validationTooltip01" className="form-label">
                Flow Type {menopause !== "yes" && "*"}
              </label>
              <div
                className="w-100"
                style={{
                  border: "1px solid #17171D33",
                  borderRadius: "5px",
                }}
              >
                <Dropdown
                  options={flow_type}
                  defaultValue={
                    defaultValues?.values?.flow?.type
                      ? flow_type[
                          findItemIndex(
                            flow_type,
                            defaultValues?.values?.flow?.type
                          )
                        ]
                      : null
                  }
                  getSelectedValue={getSelectedValue}
                />
              </div>
              {errors.flowtype && (
                <p className="text-danger">{errors.flowtype}</p>
              )}
            </div>
          </div>
        </CCol>

        <CCol lg={4} className="mb-3">
          <div style={{ width: "100%" }}>
            <div className="position-relative">
              <label htmlFor="validationTooltip01" className="form-label">
                Cycle Length (in days) {menopause !== "yes" && "*"}
              </label>
              <input
                type="text"
                className="form-control  pad-10"
                id="validationTooltip01"
                placeholder="00"
                name="cycle_in_days"
                value={value3}
                onChange={handleChange}
                onPaste={handlePaste}
                disabled={from === "Consult-Gynaec" ? true : false}
              />
              {errors.cycleLengthDays && (
                <p className="text-danger">{errors.cycleLengthDays}</p>
              )}
            </div>
          </div>
        </CCol>

        <CCol lg={4} className="mb-3">
          <p className="radio-label">Cycle Irregularity</p>
          <div className="d-flex align-items-end w-100">
            <div
              style={{
                boxSizing: "border-box",
                borderRadius: "5px",
                border: "1px solid #17171D33",
                padding: "10px",
              }}
            >
              <label>
                <CFormCheck
                  className="mb-0"
                  inline
                  type="radio"
                  id="irregularityYes"
                  value="yes"
                  label={<span className="form-label mb-0">Yes</span>}
                  name="irregularity"
                  disabled={from === "Consult-Gynaec" ? true : false}
                  checked={irregular === "yes"}
                  onChange={(e) => setIrregular(e.target.value)}
                />
              </label>
              <label>
                <CFormCheck
                  className="mb-0"
                  inline
                  type="radio"
                  id="irregularityNo"
                  value="no"
                  label={<span className="form-label mb-0">No</span>}
                  name="irregularity"
                  disabled={from === "Consult-Gynaec" ? true : false}
                  checked={irregular === "no"}
                  onChange={(e) => setIrregular(e.target.value)}
                />
              </label>
            </div>
          </div>
        </CCol>

        <CCol lg={4} className="mb-3">
          <div style={{ width: "100%" }}>
            <div className="position-relative">
              <label htmlFor="validationTooltip01" className="form-label">
                Cycles per Year {menopause !== "yes" && "*"}
              </label>
              <input
                type="text"
                className="form-control  pad-10"
                id="validationTooltip01"
                placeholder="00"
                name="cycle_per_year"
                value={value2}
                onChange={handleChange}
                onPaste={handlePaste}
                disabled={from === "Consult-Gynaec" ? true : false}
              />
              {errors.cyclePerYear && (
                <p className="text-danger">{errors.cyclePerYear}</p>
              )}
            </div>
          </div>
        </CCol>

        <CCol lg={4} className="mb-3">
          <p className="radio-label">Intermenstrual Bleeding</p>
          <div className="d-flex align-items-end w-100">
            <div
              style={{
                boxSizing: "border-box",
                borderRadius: "5px",
                border: "1px solid #17171D33",
                padding: "10px",
              }}
            >
              <label>
                <CFormCheck
                  className="mb-0"
                  inline
                  type="radio"
                  id="menstrualYes"
                  value="yes"
                  label={<span className="form-label mb-0">Yes</span>}
                  name="menstrual"
                  disabled={from === "Consult-Gynaec" ? true : false}
                  onChange={(e) => setBleeding(e.target.value)}
                  checked={bleeding === "yes"}
                />
              </label>
              <label>
                <CFormCheck
                  className="mb-0"
                  inline
                  type="radio"
                  id="menstrualNo"
                  value="no"
                  label={<span className="form-label mb-0">No</span>}
                  name="menstrual"
                  disabled={from === "Consult-Gynaec" ? true : false}
                  onChange={(e) => setBleeding(e.target.value)}
                  checked={bleeding === "no"}
                />
              </label>
            </div>
          </div>
        </CCol>

        <CCol lg={4} className="mb-3">
          <p className="radio-label">Dysmenorrhea</p>
          <div className="d-flex align-items-end w-100">
            <div
              style={{
                boxSizing: "border-box",
                borderRadius: "5px",
                border: "1px solid #17171D33",
                padding: "10px",
              }}
            >
              <label>
                <CFormCheck
                  className="mb-0"
                  inline
                  type="radio"
                  id="dysmenorrheaYes"
                  value="yes"
                  label={<span className="form-label mb-0">Yes</span>}
                  name="dysmenorrhea"
                  disabled={from === "Consult-Gynaec" ? true : false}
                  onChange={(e) => setDysmenorrhea(e.target.value)}
                  checked={dysmenorrhea === "yes"}
                />
              </label>
              <label>
                <CFormCheck
                  className="mb-0"
                  inline
                  type="radio"
                  id="dysmenorrheaNo"
                  value="no"
                  label={<span className="form-label mb-0">No</span>}
                  name="dysmenorrhea"
                  disabled={from === "Consult-Gynaec" ? true : false}
                  onChange={(e) => setDysmenorrhea(e.target.value)}
                  checked={dysmenorrhea === "no"}
                />
              </label>
            </div>
          </div>
        </CCol>

        <CCol lg={4} className="mb-3">
          <p className="radio-label">Menopause</p>
          <div className="d-flex align-items-end w-100">
            <div
              style={{
                boxSizing: "border-box",
                borderRadius: "5px",
                border: "1px solid #17171D33",
                padding: "10px",
              }}
            >
              <label>
                <CFormCheck
                  className="mb-0"
                  inline
                  type="radio"
                  id="menopauseYes"
                  value="yes"
                  label={<span className="form-label mb-0">Yes</span>}
                  name="menopause"
                  checked={menopause === "yes"}
                  onChange={handleClick}
                  disabled={from === "Consult-Gynaec" ? true : false}
                />
              </label>
              <label>
                <CFormCheck
                  className="mb-0"
                  inline
                  type="radio"
                  id="menopauseNo"
                  value="no"
                  label={<span className="form-label mb-0">No</span>}
                  name="menopause"
                  checked={menopause === "no"}
                  onChange={handleClick}
                  disabled={from === "Consult-Gynaec" ? true : false}
                />
              </label>
            </div>
          </div>
        </CCol>

        {menopause === "yes" && (
          <CCol lg={4} className="mb-3">
            <div style={{ width: "100%" }}>
              <div className="position-relative">
                <label htmlFor="validationTooltip01" className="form-label">
                  Menopause Age
                </label>
                <input
                  type="text"
                  className="form-control pad-10"
                  id="validationTooltip01"
                  placeholder="00"
                  name="MenopauseAge"
                  value={value}
                  onChange={handleChange}
                  onPaste={handlePaste}
                  disabled={from === "Consult-Gynaec" ? true : false}
                />
              </div>
            </div>
          </CCol>
        )}
      </CRow>

      {from !== "Consult-Gynaec" && (
        <CRow className="mb-1">
          <div style={{ width: "130px" }}>
            <PrimaryButton onClick={onSubmit} disabled={isSubmitting}>
              {isSubmitting
                ? "Saving..."
                : defaultValues?.id !== undefined
                ? "UPDATE"
                : "ADD"}
            </PrimaryButton>
          </div>
          <div style={{ width: "128px" }}>
            <SecondaryButton onClick={back}>CANCEL</SecondaryButton>
          </div>
        </CRow>
      )}
    </>
  );
};

export default MensturalHistoryForm;

import { CCol, CFormTextarea, CFormCheck, CRow } from "@coreui/react";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import SecondaryButton from "../../../../../../Buttons/SecondaryButton/SecondaryButton";
import PrimaryButton from "../../../../../../Buttons/PrimaryButton/PrimaryButton";
import Dropdown from "../../../../../../Dropdown/Dropdown";
import { DATE_FORMAT } from "../../../../../../../Config/config";
import { format } from "date-fns";

const ScreeningHistoryForm = ({
  back,
  defaultValues,
  from,
  screeningAdd,
  screeningEdit,
  isSubmitting,
}) => {
  const [date, setDate] = useState(
    defaultValues?.values?.last_pap_smear_at || new Date()
  );
  const [date2, setDate2] = useState(
    defaultValues?.values?.last_mamogram_at || new Date()
  );
  const [date3, setDate3] = useState(
    defaultValues?.values?.last_breast_exam_at || new Date()
  );
  const [abnormalStatus, setAbnormalStatus] = useState(
    defaultValues?.values?.is_abnormal_pap_smear || "no"
  );
  const [mamogramStatus, setMamogramStatus] = useState(
    defaultValues?.values?.is_mammogram || "no"
  );
  const [breastStatus, setBreastStatus] = useState(
    defaultValues?.values?.is_breast_exam || "no"
  );
  const [abnormalDesc, setAbnormalDesc] = useState(
    defaultValues?.values?.abnormal_pap_smear_desc || ""
  );
  const [mamogramDesc, setMamogramDesc] = useState(
    defaultValues?.values?.mammogram_desc || ""
  );
  const [breastDesc, setBreastDesc] = useState(
    defaultValues?.values?.breast_exam_desc || ""
  );
  const maxDate = new Date(); // Restrict future dates

  const handleAbnormalStatus = (event) => {
    setAbnormalStatus(event.target.value);
  };

  const handleMamogramStatus = (event) => {
    setMamogramStatus(event.target.value);
  };

  const handleBreastStatus = (event) => {
    setBreastStatus(event.target.value);
  };

  const onSubmit = async () => {
    const values = {
      last_pap_smear_at: format(date, "yyyy-MM-dd"),
      is_abnormal_pap_smear: abnormalStatus,
      abnormal_pap_smear_desc: abnormalStatus === "yes" ? abnormalDesc : "",
      last_mamogram_at: format(date2, "yyyy-MM-dd"),
      is_mammogram: mamogramStatus,
      mammogram_desc: mamogramStatus === "yes" ? mamogramDesc : "",
      last_breast_exam_at: format(date3, "yyyy-MM-dd"),
      is_breast_exam: breastStatus,
      breast_exam_desc: breastStatus === "yes" ? breastDesc : "",
    };
    if (defaultValues?.id === undefined) {
      await screeningAdd(values);
    }
    if (defaultValues?.id !== undefined) {
      await screeningEdit(values, defaultValues?.id);
      if (breastStatus === "no") {
        setBreastDesc("");
      }
      if (mamogramStatus === "no") {
        setMamogramDesc("");
      }
      if (abnormalStatus === "no") {
        setAbnormalDesc("");
      }
    }
  };
  useEffect(() => {
    setDate(defaultValues?.values?.last_pap_smear_at || new Date());
    setDate2(defaultValues?.values?.last_mamogram_at || new Date());
    setDate3(defaultValues?.values?.last_breast_exam_at || new Date());
    setAbnormalStatus(defaultValues?.values?.is_abnormal_pap_smear || "no");
    setMamogramStatus(defaultValues?.values?.is_mammogram || "no");
    setBreastStatus(defaultValues?.values?.is_breast_exam || "no");
    setAbnormalDesc(defaultValues?.values?.abnormal_pap_smear_desc || "");
    setMamogramDesc(defaultValues?.values?.mammogram_desc || "");
    setBreastDesc(defaultValues?.values?.breast_exam_desc || "");
  }, [
    defaultValues?.values?.abnormal_pap_smear_desc,
    defaultValues?.values.bleeding,
    defaultValues?.values?.breast_exam_desc,
    defaultValues?.values?.cycle?.days,
    defaultValues?.values?.cycle?.irregular,
    defaultValues?.values?.cycle?.year,
    defaultValues?.values?.dysmenorrhea,
    defaultValues?.values?.flow?.duration,
    defaultValues?.values?.flow?.type,
    defaultValues?.values?.is_abnormal_pap_smear,
    defaultValues?.values?.is_breast_exam,
    defaultValues?.values?.is_mammogram,
    defaultValues?.values?.last_breast_exam_at,
    defaultValues?.values?.last_mamogram_at,
    defaultValues?.values?.last_pap_smear_at,
    defaultValues?.values?.lmp,
    defaultValues?.values?.mammogram_desc,
    defaultValues?.values?.menarche_age,
    defaultValues?.values?.menopause,
    defaultValues?.values?.menopause_age,
  ]);
  return (
    <>
      <CRow className="mb-3">
        <CCol lg={4} className="mb-3">
          <div class="position-relative">
            <label for="validationTooltip01" class="form-label">
              Date of Last Pap Smear
            </label>
            <div className="date-size">
              <DatePicker
                showIcon
                selected={date}
                onChange={(date) => setDate(date)}
                dateFormat={DATE_FORMAT}
                disabled={from === "Consult-Screen" ? true : false}
                maxDate={maxDate}
              />
            </div>
          </div>
        </CCol>
        <CCol lg={4} className="mb-3">
  <p className="radio-label">History of Abnormal Pap Smear</p>
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
        id="abnormalYes"
        value="yes"
        label={
          <label
            className="form-label mb-0"
            htmlFor="abnormalYes"
            onClick={() => setAbnormalStatus("yes")}
          >
            Yes
          </label>
        }
        name="abnormal"
        checked={abnormalStatus === "yes"}
        onChange={handleAbnormalStatus}
        disabled={from === "Consult-Screen" ? true : false}
      />
      <CFormCheck
        className="mb-0"
        inline
        type="radio"
        id="abnormalNo"
        value="no"
        label={
          <label
            className="form-label mb-0"
            htmlFor="abnormalNo"
            onClick={() => setAbnormalStatus("no")}
          >
            No
          </label>
        }
        name="abnormal"
        checked={abnormalStatus === "no"}
        onChange={handleAbnormalStatus}
        disabled={from === "Consult-Screen" ? true : false}
      />
    </div>
  </div>
</CCol>

{abnormalStatus === "yes" && (
  <CCol lg={4} className="mb-3">
    <div style={{ width: "100%" }}>
      <div class="position-relative">
        <label for="validationTooltip01" class="form-label">
          Abnormal Pap Smear Details
        </label>
        <CFormTextarea
          id="exampleFormControlTextarea1"
          rows={3}
          defaultValue={abnormalDesc}
          onChange={(e) => setAbnormalDesc(e.target.value)}
          disabled={from === "Consult-Screen" ? true : false}
        ></CFormTextarea>
      </div>
    </div>
  </CCol>
)}

<CCol lg={4} className="mb-3">
  <div class="position-relative">
    <label for="validationTooltip01" class="form-label">
      Date of Last Mammogram
    </label>
    <div className="date-size">
      <DatePicker
        showIcon
        selected={date2}
        onChange={(date) => setDate2(date)}
        disabled={from === "Consult-Screen" ? true : false}
        dateFormat={DATE_FORMAT}
        maxDate={maxDate}
      />
    </div>
  </div>
</CCol>

<CCol lg={4} className="mb-3">
  <p className="radio-label">History of Mammogram</p>
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
        id="mamogramYes"
        value="yes"
        label={
          <label
            className="form-label mb-0"
            htmlFor="mamogramYes"
            onClick={() => setMamogramStatus("yes")}
          >
            Yes
          </label>
        }
        name="mamogram"
        checked={mamogramStatus === "yes"}
        onChange={handleMamogramStatus}
        disabled={from === "Consult-Screen" ? true : false}
      />
      <CFormCheck
        className="mb-0"
        inline
        type="radio"
        id="mamogramNo"
        value="no"
        label={
          <label
            className="form-label mb-0"
            htmlFor="mamogramNo"
            onClick={() => setMamogramStatus("no")}
          >
            No
          </label>
        }
        name="mamogram"
        checked={mamogramStatus === "no"}
        onChange={handleMamogramStatus}
        disabled={from === "Consult-Screen" ? true : false}
      />
    </div>
  </div>
</CCol>

{mamogramStatus === "yes" && (
  <CCol lg={4} className="mb-3">
    <div style={{ width: "100%" }}>
      <div class="position-relative">
        <label for="validationTooltip01" class="form-label">
          Mammogram Details
        </label>
        <CFormTextarea
          id="exampleFormControlTextarea1"
          rows={3}
          defaultValue={mamogramDesc}
          onChange={(e) => setMamogramDesc(e.target.value)}
          disabled={from === "Consult-Screen" ? true : false}
        ></CFormTextarea>
      </div>
    </div>
  </CCol>
)}

<CCol lg={4} className="mb-3">
  <div class="position-relative">
    <label for="validationTooltip01" class="form-label">
      Date of Last Breast Exam
    </label>
    <div className="date-size">
      <DatePicker
        showIcon
        selected={date3}
        onChange={(date) => setDate3(date)}
        disabled={from === "Consult-Screen" ? true : false}
        dateFormat={DATE_FORMAT}
        maxDate={maxDate}
      />
    </div>
  </div>
</CCol>

<CCol lg={4} className="mb-3">
  <p className="radio-label">History of Breast Exam</p>
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
        id="breastYes"
        value="yes"
        label={
          <label
            className="form-label mb-0"
            htmlFor="breastYes"
            onClick={() => setBreastStatus("yes")}
          >
            Yes
          </label>
        }
        name="breast"
        checked={breastStatus === "yes"}
        onChange={handleBreastStatus}
        disabled={from === "Consult-Screen" ? true : false}
      />
      <CFormCheck
        className="mb-0"
        inline
        type="radio"
        id="breastNo"
        value="no"
        label={
          <label
            className="form-label mb-0"
            htmlFor="breastNo"
            onClick={() => setBreastStatus("no")}
          >
            No
          </label>
        }
        name="breast"
        checked={breastStatus === "no"}
        onChange={handleBreastStatus}
        disabled={from === "Consult-Screen" ? true : false}
      />
    </div>
  </div>
</CCol>

{breastStatus === "yes" && (
  <CCol lg={4} className="mb-3">
    <div style={{ width: "100%" }}>
      <div class="position-relative">
        <label for="validationTooltip01" class="form-label">
          Breast Exam Details
        </label>
        <CFormTextarea
          id="exampleFormControlTextarea1"
          rows={3}
          defaultValue={breastDesc}
          onChange={(e) => setBreastDesc(e.target.value)}
          disabled={from === "Consult-Screen" ? true : false}
        ></CFormTextarea>
      </div>
    </div>
  </CCol>
)}

      </CRow>

      {from !== "Consult-Screen" && (
        <CRow className="mb-1">
          <div style={{ width: "130px" }}>
            {/* <PrimaryButton onClick={onSubmit}>
              {defaultValues?.id !== undefined ? "UPDATE" : "ADD"}
            </PrimaryButton> */}
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

export default ScreeningHistoryForm;

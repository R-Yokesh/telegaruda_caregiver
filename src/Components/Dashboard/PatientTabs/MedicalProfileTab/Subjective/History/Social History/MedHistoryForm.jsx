import { CCol, CFormTextarea, CFormCheck, CRow } from "@coreui/react";
import React, { useEffect, useState } from "react";
import SecondaryButton from "../../../../../../Buttons/SecondaryButton/SecondaryButton";
import PrimaryButton from "../../../../../../Buttons/PrimaryButton/PrimaryButton";
import Dropdown from "../../../../../../Dropdown/Dropdown";
import DatePicker from "react-datepicker";

const MedHistoryForm = ({
  back,
  defaultValues,
  from,
  socialAdd,
  socialEdit,
}) => {
  const [smokingStatus, setSmokingStatus] = useState(
    defaultValues?.values?.smoking || "no"
  );
  const [smokingDesc, setSmokingDesc] = useState(
    defaultValues?.values?.smoking_desc || ""
  );
  const [alcoholStatus, setAlcoholStatus] = useState(
    defaultValues?.values?.alcohol || "no"
  );
  const [alcoholDesc, setAlcoholDesc] = useState(
    defaultValues?.values?.alcohol_desc || ""
  );
  const [drugStatus, setDrugStatus] = useState(
    defaultValues?.values?.drugs || "no"
  );
  const [drugDesc, setDrugDesc] = useState(
    defaultValues?.values?.drugs_desc || ""
  );
  const [errors, setErrors] = useState({
    smokingDesc: "",
    alcoholDesc: "",
    drugDesc: "",
  });
  const validateForm = () => {
    const newErrors = {
      smokingDesc: "",
      alcoholDesc: "",
      drugDesc: "",
    };

    if (smokingStatus === "yes" && !smokingDesc.trim()) {
      newErrors.smokingDesc = "Smoking details are required.";
    }

    if (alcoholStatus === "yes" && !alcoholDesc.trim()) {
      newErrors.alcoholDesc = "Alcohol details are required.";
    }

    if (drugStatus === "yes" && !drugDesc.trim()) {
      newErrors.drugDesc = "Drugs details are required.";
    }

    setErrors(newErrors);

    return !Object.values(newErrors).some((error) => error);
  };

  const handleSmokingStatus = (event) => {
    setSmokingStatus(event.target.value);
  };

  const handleAlcoholStatus = (event) => {
    setAlcoholStatus(event.target.value);
  };

  const handleDrugStatus = (event) => {
    setDrugStatus(event.target.value);
  };

  const onSubmit = async () => {
    const values = {
      smoking: smokingStatus,
      smoking_desc: smokingDesc,
      alcohol: alcoholStatus,
      alcohol_desc: alcoholDesc,
      drugs: drugStatus,
      drugs_desc: drugDesc,
    };
    if (validateForm()) {
      if (defaultValues?.id === undefined) {
        await socialAdd(values);
      }
      if (defaultValues?.id !== undefined) {
        await socialEdit(values, defaultValues?.id);
        if (smokingStatus === "no") {
          setSmokingDesc("");
        }
        if (alcoholStatus === "no") {
          setAlcoholDesc("");
        }
        if (drugStatus === "no") {
          setDrugDesc("");
        }
      }
    }
  };

  return (
    <>
      <CRow className="mb-3">
        <CCol lg={4}>
          <p className="radio-label">Smoking</p>
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
                id="smokingYes"
                value="yes"
                label={<label className="form-label mb-0">Yes</label>}
                name="smoking"
                checked={smokingStatus === "yes"}
                onChange={handleSmokingStatus}
                disabled={from === "Consult" ? true : false}
              />
              <CFormCheck
                className="mb-0"
                inline
                type="radio"
                id="smokingNo"
                value="no"
                label={<label className="form-label mb-0">No</label>}
                name="smoking"
                checked={smokingStatus === "no"}
                onChange={handleSmokingStatus}
                disabled={from === "Consult" ? true : false}
              />
            </div>
          </div>
        </CCol>
        {smokingStatus === "yes" && (
          <CCol lg={4} className="mb-3">
            <div style={{ width: "100%" }}>
              <div class="position-relative">
                <label for="validationTooltip01" class="form-label">
                  Smoking details*
                </label>
                <CFormTextarea
                  id="exampleFormControlTextarea1"
                  // label="Example textarea"
                  rows={1}
                  defaultValue={smokingDesc}
                  onChange={(e) => setSmokingDesc(e.target.value)}
                  // text="Must be 8-20 words long."
                  disabled={from === "Consult" ? true : false}
                ></CFormTextarea>
                {errors.smokingDesc && (
                  <div className="text-danger">{errors.smokingDesc}</div>
                )}
              </div>
            </div>
          </CCol>
        )}
        <CCol lg={4}>
          <p className="radio-label">Alcohol</p>
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
                id="alcoholYes"
                value="yes"
                label={<label className="form-label mb-0">Yes</label>}
                name="alcohol"
                checked={alcoholStatus === "yes"}
                onChange={handleAlcoholStatus}
                disabled={from === "Consult" ? true : false}
              />
              <CFormCheck
                className="mb-0"
                inline
                type="radio"
                id="alcoholNo"
                value="no"
                label={<label className="form-label mb-0">No</label>}
                name="alcohol"
                checked={alcoholStatus === "no"}
                onChange={handleAlcoholStatus}
                disabled={from === "Consult" ? true : false}
              />
            </div>
          </div>
        </CCol>
        {alcoholStatus === "yes" && (
          <CCol lg={4} className="mb-3">
            <div style={{ width: "100%" }}>
              <div class="position-relative">
                <label for="validationTooltip01" class="form-label">
                  Alcohol details*
                </label>
                <CFormTextarea
                  id="exampleFormControlTextarea1"
                  // label="Example textarea"
                  rows={1}
                  defaultValue={alcoholDesc}
                  onChange={(e) => setAlcoholDesc(e.target.value)}
                  // text="Must be 8-20 words long."
                  disabled={from === "Consult" ? true : false}
                ></CFormTextarea>
                {errors.alcoholDesc && (
                  <div className="text-danger">{errors.alcoholDesc}</div>
                )}
              </div>
            </div>
          </CCol>
        )}
        <CCol lg={4}>
          <p className="radio-label">Drugs</p>
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
                id="drugsYes"
                value="yes"
                label={<label className="form-label mb-0">Yes</label>}
                name="drugs"
                checked={drugStatus === "yes"}
                onChange={handleDrugStatus}
                disabled={from === "Consult" ? true : false}
              />
              <CFormCheck
                className="mb-0"
                inline
                type="radio"
                id="drugsNo"
                value="no"
                label={<label className="form-label mb-0">No</label>}
                name="drugs"
                checked={drugStatus === "no"}
                onChange={handleDrugStatus}
                disabled={from === "Consult" ? true : false}
              />
            </div>
          </div>
        </CCol>
        {drugStatus === "yes" && (
          <CCol lg={4} className="mb-3">
            <div style={{ width: "100%" }}>
              <div class="position-relative">
                <label for="validationTooltip01" class="form-label">
                  Drugs details*
                </label>
                <CFormTextarea
                  id="exampleFormControlTextarea1"
                  // label="Example textarea"
                  rows={1}
                  defaultValue={drugDesc}
                  onChange={(e) => setDrugDesc(e.target.value)}
                  // text="Must be 4-20 words long."
                  disabled={from === "Consult" ? true : false}
                ></CFormTextarea>
                {errors.drugDesc && (
                  <div className="text-danger">{errors.drugDesc}</div>
                )}
              </div>
            </div>
          </CCol>
        )}
      </CRow>
      {from !== "Consult" && (
        <CRow className="mb-1">
          <div style={{ width: "128px" }}>
            <PrimaryButton onClick={onSubmit}>
              {defaultValues?.id !== undefined ? "UPDATE" : "ADD"}
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

export default MedHistoryForm;

import { CCol, CFormCheck, CFormTextarea, CRow } from "@coreui/react";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import SecondaryButton from "../../../../../../Buttons/SecondaryButton/SecondaryButton";
import PrimaryButton from "../../../../../../Buttons/PrimaryButton/PrimaryButton";
import Dropdown from "../../../../../../Dropdown/Dropdown";
import { format, isValid, parse } from "date-fns";
import { getCurrentTime } from "../../../../../../../Utils/dateUtils";
import { DATE_FORMAT } from "../../../../../../../Config/config";

const ObstericHistoryForm = ({ back, defaultValues, obsAdd, obsEdit }) => {
  const [date, setDate] = useState(null);
  const [date2, setDate2] = useState(null);
  const [prev, setPrev] = useState(defaultValues?.fert_treatment || "No");
  const [trimester, setTrimester] = useState(
    defaultValues?.values?.trimester || ""
  );
  const [obstetricDesc, setObstetricDesc] = useState(
    defaultValues?.values?.boh_desc || ""
  );
  const [fertTreatmentDesc, setFertTreatmentDesc] = useState(
    defaultValues?.values?.fertility_treatment_desc || ""
  );
  const [preg, setPreg] = useState(defaultValues?.values?.pregnant || "");
  const [fertTreat, setFertTreat] = useState(
    defaultValues?.values?.fertility_treatment || "No"
  );
  const [lact, setLact] = useState(defaultValues?.values?.lactation || "No");
  const [cesarean, setCesarean] = useState(
    defaultValues?.values?.previous_cesarean_sections || ""
  );
  const [obstetric, setObsteric] = useState(defaultValues?.values?.boh || "");
  const [gravidaValue, setGravidaValue] = useState(
    defaultValues?.values?.gravida || ""
  );
  const [errors, setErrors] = useState({});
  const [paraValue, setParaValue] = useState(defaultValues?.values?.para || "");
  // This should match your expected format
  const defaultDateTime = defaultValues?.values?.lmp || "";
  const defaultDate = defaultDateTime.split(" ")[0] || "";

  const defaultDateTime1 = defaultValues?.values?.edd || "";
  const defaultDate1 = defaultDateTime1.split(" ")[0] || "";
  useEffect(() => {
    // Parse the date string into a Date object
    if (defaultDate) {
      // Define the format of the date string you are parsing
      const parsedDate = parse(defaultDate, DATE_FORMAT, new Date());
      if (isValid(parsedDate)) {
        setDate(parsedDate);
      }
      const parsedDate1 = parse(defaultDate1, DATE_FORMAT, new Date());
      if (isValid(parsedDate1)) {
        setDate2(parsedDate1);
      }
    }
  }, [defaultDate, defaultDate1]);

  const options = ["First", "Second", "Third"];
  const findIndex = defaultValues?.trimster
    ? options?.indexOf(defaultValues?.trimster)
    : 0;

  const handleChangeObste = (e) => {
    setObsteric(e.target.value);
  };

  const handleChangeCesa = (e) => {
    setCesarean(e.target.value);
  };
  const handleChangeLact = (e) => {
    setLact(e.target.value);
  };
  const handleChangeFert = (e) => {
    setFertTreat(e.target.value);
  };

  const handleChange = (e) => {
    setPreg(e.target.value);
  };

  const numCheck = (e) => {
    const input = e.target.value;
    const name = e.target.name;

    const newstrValue = input?.replace(/[^0-9]/g, "")?.slice(0, 2);

    if (name === "gravida") {
      setGravidaValue(newstrValue);
    }
    if (name === "para") {
      setParaValue(newstrValue);
    }
    if (name === "trimester") {
      setTrimester(newstrValue);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    // Validate fields
    if (!preg) {
      newErrors.preg = "Pregnant field is required";
    }
    if (preg === "Yes") {
      if (!date) {
        newErrors.date = "LMP Date is required";
      }
      if (!trimester) {
        newErrors.trimester = "Trimester is required";
      }
      if (!gravidaValue) {
        newErrors.gravidaValue = "Gravida is required";
      }
      if (!paraValue) {
        newErrors.paraValue = "Para is required";
      }
    }
    if (fertTreat === "Yes" && !fertTreatmentDesc) {
      newErrors.fertTreatmentDesc =
        "Fertility Treatment Description is required";
    }
    if (obstetric === "Yes" && !obstetricDesc) {
      newErrors.obstetricDesc = "Bad Obstetric History Description is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Handle successful form submission
    setErrors({});
    formsubmit();
  };

  const formsubmit = () => {
    const values = {
      lmp: preg === "Yes" ? format(date, "dd-MM-yyyy") : "",
      edd: preg === "Yes" ? format(date2, "dd-MM-yyyy") : "",
      trimester: preg === "Yes" ? trimester : "",
      gravida: preg === "Yes" ? gravidaValue : "",
      para: preg === "Yes" ? paraValue : "",
      lactation: preg === "Yes" ? lact : "",
      fertility_treatment: preg === "Yes" ? fertTreat : "",
      fertility_treatment_desc: preg === "Yes" ? fertTreatmentDesc : "",
      previous_cesarean_sections: cesarean,
      pregnant: preg,
      boh: obstetric,
      boh_desc: obstetric === "Yes" ? obstetricDesc : "",
    };
    if (defaultValues?.id) {
      console.log("Edit clicked");
      obsEdit(values, defaultValues?.id);
    }
    if (!defaultValues?.id) {
      obsAdd(values);
    }
    console.log("clicked");
  };

  return (
    <>
      <CRow className="mb-3">
        <CCol lg={4} className="mb-3">
          <div style={{ width: "100%" }}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Pregnant *
              </label>

              <CFormCheck
                type="radio"
                name="exampleRadios"
                id="exampleRadios1"
                label="Yes"
                value="Yes"
                checked={preg === "Yes"}
                onChange={handleChange}
              />
              <CFormCheck
                type="radio"
                label="No"
                value="No"
                checked={preg === "No"}
                onChange={handleChange}
              />
              {errors.preg && <div className="text-danger">{errors.preg}</div>}
            </div>
          </div>
        </CCol>
        {preg === "Yes" && (
          <>
            <CCol lg={4} className="mb-3">
              <div class="position-relative">
                <label for="validationTooltip01" class="form-label">
                  LMP Date *
                </label>
                <div className="date-size">
                  <DatePicker
                    showIcon
                    selected={date}
                    onChange={(date) => setDate(date)}
                    dateFormat={DATE_FORMAT}
                  />
                </div>
                {errors.date && (
                  <div className="text-danger">{errors.date}</div>
                )}
              </div>
            </CCol>
            <CCol lg={4} className="mb-3">
              <div class="position-relative">
                <label for="validationTooltip01" class="form-label">
                  ED Date
                </label>
                <div className="date-size">
                  <DatePicker
                    showIcon
                    selected={date2}
                    onChange={(date) => setDate2(date)}
                    dateFormat={DATE_FORMAT}
                  />
                </div>
              </div>
            </CCol>
            <CCol lg={4} className="mb-3">
              <div style={{ width: "100%" }}>
                <div class="position-relative">
                  <label for="validationTooltip01" class="form-label">
                    Trimester *
                  </label>
                  <input
                    type="text"
                    class="form-control  pad-10"
                    id="validationTooltip01"
                    name="trimester"
                    placeholder="00"
                    // defaultValue={defaultValues?.trimster}
                    value={trimester}
                    onChange={numCheck}
                  />
                  {/* <div
                    className="w-100"
                    style={{
                      border: "1px solid #17171D33",
                      borderRadius: "5px",
                    }}
                  >
                    <Dropdown
                      options={options}
                      defaultValue={options[findIndex]}
                      getSelectedValue={getSelectedTrimster}
                    />
                  </div> */}
                  {errors.trimester && (
                    <div className="text-danger">{errors.trimester}</div>
                  )}
                </div>
              </div>
            </CCol>
            <CCol lg={4} className="mb-3">
              <div style={{ width: "100%" }}>
                <div class="position-relative">
                  <label for="validationTooltip01" class="form-label">
                    Gravida *
                  </label>
                  <input
                    type="text"
                    class="form-control  pad-10"
                    id="validationTooltip01"
                    name="gravida"
                    placeholder="00"
                    // defaultValue={defaultValues?.gravida}
                    value={gravidaValue}
                    onChange={numCheck}
                  />
                  {/* <div
                    className="w-100"
                    style={{
                      border: "1px solid #17171D33",
                      borderRadius: "5px",
                    }}
                  >
                    <Dropdown
                      getSelectedValue={getSelectedGravida}
                      options={gravidaoptions}
                      defaultValue={gravidaoptions[findgravidaIndex]}
                    />
                  </div> */}
                  {errors.gravidaValue && (
                    <div className="text-danger">{errors.gravidaValue}</div>
                  )}
                </div>
              </div>
            </CCol>
            <CCol lg={4} className="mb-3">
              <div style={{ width: "100%" }}>
                <div class="position-relative">
                  <label for="validationTooltip01" class="form-label">
                    Para *
                  </label>
                  <input
                    type="text"
                    class="form-control  pad-10"
                    id="validationTooltip01"
                    placeholder="00"
                    defaultValue={defaultValues?.para}
                    name="para"
                    value={paraValue}
                    onChange={numCheck}
                  />
                  {/* <div
                    className="w-100"
                    style={{
                      border: "1px solid #17171D33",
                      borderRadius: "5px",
                    }}
                  >
                    <Dropdown
                      getSelectedValue={getSelectedPara}
                      options={gravidaoptions}
                      defaultValue={gravidaoptions[findparaIndex]}
                    />
                  </div> */}
                  {errors.paraValue && (
                    <div className="text-danger">{errors.paraValue}</div>
                  )}
                </div>
              </div>
            </CCol>
            <CCol lg={4} className="mb-3">
              <div style={{ width: "100%" }}>
                <div class="position-relative">
                  <label for="validationTooltip01" class="form-label">
                    Fertility Treament
                  </label>
                  {/* <input
                type="text"
                class="form-control  pad-10"
                id="validationTooltip01"
                placeholder="Enter"
                defaultValue={defaultValues?.fert_treatment}
              /> */}
                  {/* <div
                    className="w-100"
                    style={{
                      border: "1px solid #17171D33",
                      borderRadius: "5px",
                    }}
                  >
                    <Dropdown
                      options={lacatingoptions}
                      defaultValue={lacatingoptions[findtreatmentIndex]}
                      getSelectedValue={getSelectedFertValue}
                    />
                  </div> */}
                  <CFormCheck
                    type="radio"
                    label="Yes"
                    value="Yes"
                    checked={fertTreat === "Yes"}
                    onChange={handleChangeFert}
                  />
                  <CFormCheck
                    type="radio"
                    label="No"
                    value="No"
                    checked={fertTreat === "No"}
                    onChange={handleChangeFert}
                  />
                </div>
              </div>
            </CCol>
            {fertTreat === "Yes" && (
              <CCol lg={4} className="mb-3">
                <div style={{ width: "100%" }}>
                  <div class="position-relative">
                    <label for="validationTooltip01" class="form-label">
                      Treament Description*
                    </label>
                    <CFormTextarea
                      type="text"
                      class="form-control  pad-10"
                      id="validationTooltip01"
                      placeholder="Enter"
                      // defaultValue={defaultValues?.fert_treatment}
                      value={fertTreatmentDesc}
                      onChange={(e) => setFertTreatmentDesc(e.target.value)}
                    />
                    {errors.fertTreatmentDesc && (
                      <div className="text-danger">
                        {errors.fertTreatmentDesc}
                      </div>
                    )}
                  </div>
                </div>
              </CCol>
            )}
            <CCol lg={4} className="mb-3">
              <div style={{ width: "100%" }}>
                <div class="position-relative">
                  <label for="validationTooltip01" class="form-label">
                    Lacatating
                  </label>
                  {/* <input
                type="text"
                class="form-control  pad-10"
                id="validationTooltip01"
                placeholder="Enter"
                defaultValue={defaultValues?.lacating}
              /> */}
                  {/* <div
                    className="w-100"
                    style={{
                      border: "1px solid #17171D33",
                      borderRadius: "5px",
                    }}
                  >
                    <Dropdown
                      getSelectedValue={getSelectedLacating}
                      options={lacatingoptions}
                      defaultValue={lacatingoptions[findlacatingIndex]}
                    />
                  </div> */}
                  <CFormCheck
                    type="radio"
                    label="Yes"
                    value="Yes"
                    checked={lact === "Yes"}
                    onChange={handleChangeLact}
                  />
                  <CFormCheck
                    type="radio"
                    label="No"
                    value="No"
                    checked={lact === "No"}
                    onChange={handleChangeLact}
                  />
                </div>
              </div>
            </CCol>
          </>
        )}
      </CRow>
      <CRow>
        <CCol lg={6} className="mb-3">
          <div style={{ width: "100%" }}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Previous Cesarean Sections
              </label>
              <CFormCheck
                type="radio"
                label="Yes"
                value="Yes"
                checked={cesarean === "Yes"}
                onChange={handleChangeCesa}
              />
              <CFormCheck
                type="radio"
                label="No"
                value="No"
                checked={cesarean === "No"}
                onChange={handleChangeCesa}
              />
            </div>
          </div>
        </CCol>
      </CRow>
      <CRow>
        <CCol lg={6} className="mb-3">
          <div style={{ width: "100%" }}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Bad Obstetric History
              </label>
              <CFormCheck
                type="radio"
                label="Yes"
                value="Yes"
                checked={obstetric === "Yes"}
                onChange={handleChangeObste}
              />
              <CFormCheck
                type="radio"
                label="No"
                value="No"
                checked={obstetric === "No"}
                onChange={handleChangeObste}
              />
            </div>
          </div>
        </CCol>
        {obstetric === "Yes" && (
          <CCol lg={6} className="mb-3">
            <div style={{ width: "100%" }}>
              <div class="position-relative">
                <label for="validationTooltip01" class="form-label">
                  Bad Obstetric History Description*
                </label>
                <CFormTextarea
                  type="text"
                  class="form-control  pad-10"
                  id="validationTooltip01"
                  placeholder="Enter"
                  // defaultValue={defaultValues?.fert_treatment}
                  value={obstetricDesc}
                  onChange={(e) => setObstetricDesc(e.target.value)}
                />
                {errors.obstetricDesc && (
                  <div className="text-danger">{errors.obstetricDesc}</div>
                )}
              </div>
            </div>
          </CCol>
        )}
      </CRow>
      <CRow className="mb-1">
        <div style={{ width: "130px" }}>
          <PrimaryButton onClick={handleSubmit}>SAVE</PrimaryButton>
        </div>
        <div style={{ width: "128px" }}>
          <SecondaryButton onClick={back}>CANCEL</SecondaryButton>
        </div>
      </CRow>
    </>
  );
};

export default ObstericHistoryForm;

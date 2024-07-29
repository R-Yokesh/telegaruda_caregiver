import { CCol, CFormTextarea, CRow } from "@coreui/react";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import SecondaryButton from "../../../../../../Buttons/SecondaryButton/SecondaryButton";
import PrimaryButton from "../../../../../../Buttons/PrimaryButton/PrimaryButton";
import Dropdown from "../../../../../../Dropdown/Dropdown";

const ObstericHistoryForm = ({ back, defaultValues }) => {
  const [date, setDate] = useState(null);
  const [date2, setDate2] = useState(null);
  const [fert_treatment, setFert_treatment] = useState(
    defaultValues?.fert_treatment || "No"
  );
  const [para, setPara] = useState("");
  const [lacating, setLacating] = useState("");
  const [gravida, setGravida] = useState("");
  const [trimester, setTrimester] = useState("");

  const getSelectedTrimster = (data) => {
    setTrimester(data);
  };

  const getSelectedGravida = (data) => {
    setGravida(data);
  };
  const getSelectedLacating = (data) => {
    setLacating(data);
  };
  const getSelectedPara = (data) => {
    setPara(data);
  };
  const getSelectedFertValue = (data) => {
    setFert_treatment(data);
  };

  useEffect(() => {
    // Function to parse date string "MM-DD-YYYY HH:mm" to Date object
    const parseDateString = (dateString) => {
      const parts = dateString?.split(" ");
      const datePart = parts[0];
      const [month, day, year] = datePart?.split("-")?.map(Number);
      return new Date(year, month - 1, day);
    };

    // Example default date string
    const defaultDateString = defaultValues?.lmp_date;

    // Parse default date string to Date object
    const defaultDate = defaultValues?.lmp_date
      ? parseDateString(defaultDateString)
      : new Date();

    // Example default date string
    const defaultDateString2 = defaultValues?.ed_date;

    // Parse default date string to Date object
    const defaultDate2 = defaultValues?.ed_date
      ? parseDateString(defaultDateString2)
      : new Date();

    // Set default date in state
    setDate(defaultDate);
    setDate2(defaultDate2);
  }, [defaultValues]);
  const options = [1, 2, 3];
  const findIndex = defaultValues?.trimster
    ? options?.indexOf(defaultValues?.trimster)
    : 0;

  const lacatingoptions = ["Yes", "No"];
  const findlacatingIndex = defaultValues?.lacating
    ? lacatingoptions?.indexOf(defaultValues?.lacating)
    : 1;
  const findtreatmentIndex = defaultValues?.fert_treatment
    ? lacatingoptions?.indexOf(defaultValues?.fert_treatment)
    : 1;
  const gravidaoptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  const findgravidaIndex = defaultValues?.gravida
    ? gravidaoptions?.indexOf(defaultValues?.gravida)
    : 0;
  const findparaIndex = defaultValues?.para
    ? gravidaoptions?.indexOf(defaultValues?.para)
    : 0;
  const findingIndex5 = defaultValues?.lacating
    ? lacatingoptions?.indexOf(defaultValues?.lacating)
    : 1;
  const getSelectedValue5 = (data) => {
    console.log(data);
  };
  const [bad, setBad] = useState("No");
  const findingIndex6 = defaultValues?.bad
    ? lacatingoptions?.indexOf(defaultValues?.bad)
    : 1;
  const getSelectedValue6 = (data) => {
    setBad(data);
  };

  const [preg, setPreg] = useState("No");
  const findingIndex7 = defaultValues?.bad
    ? lacatingoptions?.indexOf(defaultValues?.bad)
    : 1;
  const getSelectedValue7 = (data) => {
    setPreg(data);
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
              <div
                className="w-100"
                style={{
                  border: "1px solid #17171D33",
                  borderRadius: "5px",
                }}
              >
                <Dropdown
                  options={lacatingoptions}
                  defaultValue={lacatingoptions[findingIndex7]}
                  getSelectedValue={getSelectedValue7}
                />
              </div>
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
                  />
                </div>
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
                  {/* <input
                type="text"
                class="form-control  pad-10"
                id="validationTooltip01"
                placeholder="Enter"
                defaultValue={defaultValues?.trimster}
              /> */}
                  <div
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
                  </div>
                </div>
              </div>
            </CCol>
            <CCol lg={4} className="mb-3">
              <div style={{ width: "100%" }}>
                <div class="position-relative">
                  <label for="validationTooltip01" class="form-label">
                    Gravida *
                  </label>
                  {/* <input
                type="text"
                class="form-control  pad-10"
                id="validationTooltip01"
                placeholder="Enter"
                defaultValue={defaultValues?.gravida}
              /> */}
                  <div
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
                  </div>
                </div>
              </div>
            </CCol>
            <CCol lg={4} className="mb-3">
              <div style={{ width: "100%" }}>
                <div class="position-relative">
                  <label for="validationTooltip01" class="form-label">
                    Para *
                  </label>
                  {/* <input
                type="text"
                class="form-control  pad-10"
                id="validationTooltip01"
                placeholder="Enter"
                defaultValue={defaultValues?.para}
              /> */}
                  <div
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
                  </div>
                </div>
              </div>
            </CCol>
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
                  <div
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
                  </div>
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
                  <div
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
                  </div>
                </div>
              </div>
            </CCol>
            {fert_treatment === "Yes" && (
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
                    />
                  </div>
                </div>
              </CCol>
            )}
          </>
        )}
        <CCol lg={4} className="mb-3">
          <div style={{ width: "100%" }}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Previous Cesarean Sections
              </label>
              <div
                className="w-100"
                style={{
                  border: "1px solid #17171D33",
                  borderRadius: "5px",
                }}
              >
                <Dropdown
                  options={lacatingoptions}
                  defaultValue={lacatingoptions[findingIndex5]}
                  getSelectedValue={getSelectedValue5}
                />
              </div>
            </div>
          </div>
        </CCol>
        <CCol lg={4} className="mb-3">
          <div style={{ width: "100%" }}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Bad Obstetric History
              </label>
              <div
                className="w-100"
                style={{
                  border: "1px solid #17171D33",
                  borderRadius: "5px",
                }}
              >
                <Dropdown
                  options={lacatingoptions}
                  defaultValue={lacatingoptions[findingIndex6]}
                  getSelectedValue={getSelectedValue6}
                />
              </div>
            </div>
          </div>
        </CCol>
        {bad === "Yes" && (
          <CCol lg={4} className="mb-3">
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
                />
              </div>
            </div>
          </CCol>
        )}
      </CRow>
      <CRow className="mb-1">
        <div style={{ width: "130px" }}>
          <PrimaryButton>SAVE</PrimaryButton>
        </div>
        <div style={{ width: "128px" }}>
          <SecondaryButton onClick={back}>CANCEL</SecondaryButton>
        </div>
      </CRow>
    </>
  );
};

export default ObstericHistoryForm;

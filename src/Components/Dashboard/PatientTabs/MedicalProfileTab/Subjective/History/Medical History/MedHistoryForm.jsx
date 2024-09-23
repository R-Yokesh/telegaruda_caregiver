import { CCol, CFormCheck, CFormTextarea, CRow } from "@coreui/react";
import React, { useEffect, useState, useCallback } from "react";
import SecondaryButton from "../../../../../../Buttons/SecondaryButton/SecondaryButton";
import PrimaryButton from "../../../../../../Buttons/PrimaryButton/PrimaryButton";
import Dropdown from "../../../../../../Dropdown/Dropdown";
import DatePicker from "react-datepicker";
import { DATE_FORMAT } from "../../../../../../../Config/config";
import useApi from "../../../../../../../ApiServices/useApi";
import { format, isValid, parse } from "date-fns";
import { useLocation } from "react-router-dom";
import ICDDrop from "../../../../../../Dropdown/ICDDrop";
import SearchInput from "../../../../../../Input/SearchInput";
import { Assets } from "../../../../../../../assets/Assets";

const MedHistoryForm = ({
  back,
  defaultValues,
  getMedicalLists,
  setAddFormView,
  medicalHistoryForm,
  editMedicalHistory,
}) => {
  const { loading, error, get, post, clearCache } = useApi();
  // const [date, setDate] = useState(null);
  const [conditions, setConditions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectChronic, setSelectChronic] = useState(
    defaultValues?.values?.condition?.chronic_illness === "yes" ? true : false
  );
  const [selectPreviousIllness, setSelectPreviousIllness] = useState(
    defaultValues?.values?.condition?.previous_illness === "yes" ? true : false
  );
  const [selectedDate, setSelectedDate] = useState(null);
  const [errors, setErrors] = useState({});
  const [notes, setNotes] = useState(defaultValues?.values?.condition?.notes || "");
  const location = useLocation();
  const data = location.state?.PatientDetail;
  console.log("icked", defaultValues);

  const maxDate = new Date(); // Restrict future dates
  const defaultDateTime = defaultValues?.values?.onset_date || "";

  // Split date and time
  const defaultDate = defaultDateTime.split(" ")[0] || "";
  useEffect(() => {
    // Combine default date and time into a single Date object
    let date = new Date();

    if (defaultDate) {
      const parsedDate = parse(defaultDate, "yyyy-MM-dd", new Date());
      if (isValid(parsedDate)) {
        date = parsedDate;
      }
    }

    setSelectedDate(date);
  }, [defaultDate]);
  // useEffect(() => {
  //   if (defaultValues?.values) {
  //     // Set initial state for editing
  //     console.log("Default Values:", defaultValues.values);
  //     setSelectedDate(parseDate(defaultValues.values.onset_date));
  //     setNotes(defaultValues.values.notes || "");
  //     setSearchTerm(defaultValues.values.condition.name || "");
  //     setSelectChronic(defaultValues.values.chronic_illness === "yes");
  //     setSelectPreviousIllness(defaultValues.values.previous_illness === "yes");
  //   }
  // }, [defaultValues]);

  const parseDate = (dateString) => {
    if (!dateString) return null;
    const [day, month, year] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day);
  };
  // const defaultDateTime = defaultValues?.values?.onset_date || "";
  // // Split date and time
  // const defaultDate = defaultDateTime.split(" ")[0] || "";
  // useEffect(() => {
  //   // Combine default date and time into a single Date object
  //   let date = new Date();

  //   if (defaultDate) {
  //     const parsedDate = parse(defaultDate, "yyyy-MM-dd", new Date());
  //     if (isValid(parsedDate)) {
  //       date = parsedDate;
  //     }
  //   }

  //   setSelectedDate(date);
  // }, [defaultDate]);

  const icdoptions = [
    "E11.5 - Type 2 diabetes mellitus without complications",
    "E11.6 - Type 2 diabetes mellitus without complications",
    "E11.7 - Type 2 diabetes mellitus without complications",
  ];

  const findIndex2 = defaultValues?.icd10
    ? icdoptions?.indexOf(defaultValues?.icd10)
    : 0;

  const [trimester, setTrimester] = useState("");

  const getSelectedValue = (data) => {
    setTrimester(data);
  };

  //api integration of medical conditions list
  useEffect(() => {
    const getMedicalConditions = async () => {
      if (searchTerm) {
        try {
          const response = await get(
            `resource/masters?slug=condition&searchkey=${searchTerm}&limit=50&country=undefined`
          );
          if (response.code === 200) {
            console.log("data", response.data.masters);
            setConditions(response.data.masters);
          } else {
            console.error("Failed to fetch data:", response.message);
            setConditions([]);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
          setConditions([]);
        }
      } else {
        setConditions([]);
      }
    };

    getMedicalConditions();
  }, [searchTerm, get]);

  // useEffect(() => {
  //   // console.log("Conditions:", conditions);
  // }, [conditions]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
  };

  // Validate the form
  const validate = () => {
    console.log("first", selectedDate);
    let valid = true;
    let newErrors = {};

    if (!selectedDate) {
      newErrors.date = "Date is required";
      valid = false;
    }

    if (!reasonName.name) {
      // console.log("Validate");
      newErrors.name = "Condition is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChronicChange = (event) => {
    setSelectChronic(event.target.value === "Yes");
  };

  const handlePreviousIllnessChange = (event) => {
    setSelectPreviousIllness(event.target.value === "Yes");
  };

  const handleDateChange = (date) => {
    if (date) {
      setSelectedDate(date);
    }
  };
  const [icd10, setIcd10] = useState([]);
  const [icdkey, setIcdKey] = useState(
    defaultValues?.values?.condition?.icd?.name || ""
  );
  const [icd, setIcd] = useState(defaultValues?.values?.condition?.icd || {});

  const onSubmit = () => {
    const formattedDate = selectedDate
      ? format(selectedDate, "dd-MM-yyyy")
      : null;
    const body = {
      values: {
        condition: {
          ...reasonName,
          chronic_illness: selectChronic ? "yes" : "no",
          previous_illness: selectPreviousIllness ? "yes" : "no",
          // icd: {
          //   code: icd?.slug,
          //   description: icd?.name,
          // },
          icd: icd,
          notes: notes,
        },
        treated_by: "",
        onset_date: formattedDate,
        recovered_on: "",
        treatment: "",
        is_active: 1,
      },
      patient_id: data?.user_id,
      slug: "medical-history",
    };
    if (validate()) {
      if (defaultValues.id !== undefined) {
        console.log("Edit clicked");
        editMedicalHistory(body, defaultValues.id);
      }
      if (defaultValues.id === undefined) {
        medicalHistoryForm(body);
      }
    }
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
  const getSelectedGravida = (data) => {
    setIcd(data);
  };
  const [reasonDetails, setReasonDetails] = useState([]);
  const [reasonkey, setReasonKey] = useState(
    defaultValues?.values?.condition?.name || ""
  );
  const [reasonName, setReasonName] = useState(
    defaultValues?.values?.condition?.name || {}
  );
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
  useEffect(() => {
    getSurgeryReasons();
  }, [getSurgeryReasons]);
  const handleDateClear = () => {
    setSelectedDate(null);
  };
  return (
    <>
      <CRow className="mb-3">
        <CCol lg={4}>
          <div class="position-relative d-flex flex-column gap-1">
            <label for="validationTooltip01" class="form-label">
              Onset Date *
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
          <div style={{ width: "100%" }}>
            <div class="position-relative dropdown-container">
              <label for="validationTooltip01" class="form-label">
                Conditions *
              </label>
              {/* <input
                type="text"
                class="form-control pad-10"
                id="validationTooltip01"
                placeholder="Enter"
                value={searchTerm}
                onChange={handleInputChange}
              />
              {loading ? (
                <p>Loading...</p>
              ) : error ? (
                <p>{error}</p>
              ) : conditions.length > 0 ? (
                <ul className="dropdown-list">
                  {conditions.map((condition) => (
                    <li
                      key={condition.id}
                      className="list-group-item"
                      onClick={() => {
                        setSearchTerm(condition.name);
                        setConditions([]);
                      }}
                    >
                      {condition.name}
                    </li>
                  ))}
                </ul>
              ) : null} */}
              <SearchInput
                data={reasonDetails}
                setSurgeryKey={setReasonKey}
                getSelectedData={getSelectedReasonData}
                defaultkey={reasonkey}
              />
              {errors.name && <div className="error-text">{errors.name}</div>}
            </div>
          </div>
        </CCol>
        <CCol lg={4}>
          <div style={{ width: "100%" }}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                ICD
              </label>
              {/* <div
                className="w-100"
                style={{
                  border: "1px solid #17171D33",
                  borderRadius: "5px",
                }}
              >
                <Dropdown
                  options={icdoptions}
                  defaultValue={
                    defaultValues?.icd10 ? icdoptions[findIndex2] : null
                  }
                  getSelectedValue={getSelectedValue}
                />
              </div> */}
              <ICDDrop
                getSelectedValue={getSelectedGravida}
                options={icd10}
                defaultValue={icdkey}
                icdKey={setIcdKey}
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
                Chronic
              </label>
              <CFormCheck
                type="radio"
                label="Yes"
                value="Yes"
                checked={selectChronic}
                onChange={handleChronicChange}
              />
              <CFormCheck
                type="radio"
                label="No"
                value="No"
                checked={!selectChronic}
                onChange={handleChronicChange}
              />
            </div>
          </div>
        </CCol>
        <CCol lg={4}>
          <div style={{ width: "100%" }}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Previous Illness
              </label>
              <CFormCheck
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
                label="Yes"
                value="Yes"
                checked={selectPreviousIllness}
                onChange={handlePreviousIllnessChange}
              />
              <CFormCheck
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault2"
                label="No"
                value="No"
                checked={!selectPreviousIllness}
                onChange={handlePreviousIllnessChange}
              />
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
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
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

export default MedHistoryForm;

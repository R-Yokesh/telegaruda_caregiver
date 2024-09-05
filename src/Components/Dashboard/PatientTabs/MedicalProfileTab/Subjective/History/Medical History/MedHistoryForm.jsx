import { CCol, CFormCheck, CFormTextarea, CRow } from "@coreui/react";
import React, { useEffect, useState, useCallback } from "react";
import SecondaryButton from "../../../../../../Buttons/SecondaryButton/SecondaryButton";
import PrimaryButton from "../../../../../../Buttons/PrimaryButton/PrimaryButton";
import Dropdown from "../../../../../../Dropdown/Dropdown";
import DatePicker from "react-datepicker";
import { DATE_FORMAT } from "../../../../../../../Config/config";
import useApi from "../../../../../../../ApiServices/useApi";
import { format } from "date-fns";


const MedHistoryForm = ({ back, defaultValues, getMedicalLists, setAddFormView }) => {
  const { loading, error, get, post, clearCache } = useApi();
  // const [date, setDate] = useState(null);
  const [conditions, setConditions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectChronic, setSelectChronic] = useState(true);
  const [selectPreviousIllness, setSelectPreviousIllness] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  const [errors, setErrors] = useState({});
  const [notes, setNotes] = useState("");


  useEffect(() => {
    if (defaultValues?.values) {
      // Set initial state for editing
      console.log("Default Values:", defaultValues.values);
      setSelectedDate(parseDate(defaultValues.values.onset_date));
      setNotes(defaultValues.values.notes || "");
      setSearchTerm(defaultValues.values.condition.name || "");
      setSelectChronic(defaultValues.values.chronic_illness === "yes");
      setSelectPreviousIllness(defaultValues.values.previous_illness === "yes");
    }
  }, [defaultValues]);

  const parseDate = (dateString) => {
    if (!dateString) return null;
    const [day, month, year] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
  };


  // useEffect(() => {
  //   // Function to parse date string "MM-DD-YYYY HH:mm" to Date object
  //   const parseDateString = (dateString) => {
  //     const parts = dateString?.split(" ");
  //     const datePart = parts[0];
  //     const [month, day, year] = datePart?.split("-")?.map(Number);
  //     return new Date(year, month - 1, day);
  //   };

  //   // Example default date string
  //   const defaultDateString = defaultValues?.onset;

  //   // Parse default date string to Date object
  //   const defaultDate = defaultValues?.onset
  //     ? parseDateString(defaultDateString)
  //     : new Date();

  //   // Set default date in state
  //   setDate(defaultDate);
  // }, [defaultValues?.onset]);

  // const options = ["Yes", "No"];
  // const findIndex = defaultValues?.prev_illness
  //   ? options?.indexOf(defaultValues?.prev_illness)
  //   : 0;

  // const findIndex1 = defaultValues?.chronic
  //   ? options?.indexOf(defaultValues?.chronic)
  //   : 0;

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
    let valid = true;
    let newErrors = {};

    if (!selectedDate) {
      // console.log("Validate");
      newErrors.date = "Date is required";
      valid = false;
    }

    if (!searchTerm) {
      // console.log("Validate");
      newErrors.name = "Condition is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // api integration of medical history form submit
  const medicalHistoryForm = async () => {
    const formattedDate = format(selectedDate, "dd-MM-yyyy");
    try {
      const body = {
        values: {
          condition: {
            name: searchTerm,
            chronic_illness: selectChronic ? "yes" : "no",
            previous_illness: selectPreviousIllness ? "yes" : "no",
            icd: "fever",
          },
          onset_date: formattedDate,
          notes: notes,
        },
        patient_id: "10",
        slug: "medical-history",
      };

      console.log("Form Data:", body);

      const response = await post(`resource/patientHistories`, body)

      if (response.code === 201) {
        clearCache();
        await getMedicalLists();
        setAddFormView(false);
      } else {
        console.error("Failed to fetch data:", response.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChronicChange = (event) => {
    setSelectChronic(event.target.value === "Yes");
  }

  const handlePreviousIllnessChange = (event) => {
    setSelectPreviousIllness(event.target.value === "Yes");
  }

  const handleDateChange = (date) => {
    if (date) {
      setSelectedDate(date);
    } else {
      setSelectedDate(null);
    }
  };

  // api integration of edit form
  const editMedicalHistory = async () => {
    const formattedDate = format(selectedDate, "dd-MM-yyyy");
    try {
      const body = {
        values: {
          condition: {
            name: searchTerm,
            chronic_illness: selectChronic ? "yes" : "no",
            previous_illness: selectPreviousIllness ? "yes" : "no",
            icd: "fever",
          },
          onset_date: formattedDate,
          notes: notes,
        },
        patient_id: "10",
        slug: "medical-history",
      };

      console.log("Editing Form Data:", body);

      const response = await post(`resource/patientHistories/${defaultValues.id}`, body);

      if (response.code === 200) {
        clearCache();
        await getMedicalLists();
        setAddFormView(false);
      } else {
        console.error("Failed to edit data:", response.message);
      }
    } catch (error) {
      console.error("Error editing data:", error);
    }
  };

  const onSubmit = () => {
    if (validate()) {
      if (defaultValues.id !== undefined) {
        console.log("Edit clicked");
        editMedicalHistory();
      }
      if (defaultValues.id === undefined) {
        console.log("Add clicked");
        medicalHistoryForm();
      }
    }
  };

  return (
    <>
      <CRow className="mb-3">
        <CCol lg={4}>
          <div style={{ width: "100%" }}>
            <div class="position-relative d-flex flex-column gap-1">
              <label htmlFor="validationTooltip01" className="form-label">
                Onset Date *
              </label>
              <div className="date-size">
                <DatePicker
                  showIcon
                  selected={selectedDate}
                  onChange={handleDateChange}
                  isClearable
                  closeOnScroll={true}
                  wrapperClassName="date-picker-wrapper"
                  dateFormat={DATE_FORMAT}
                />
                {errors.onset_date && <div className="error-text">{errors.onset_date}</div>}
              </div>
            </div>
          </div>
        </CCol>
        <CCol lg={4}>
          <div style={{ width: "100%" }}>
            <div class="position-relative dropdown-container">
              <label for="validationTooltip01" class="form-label">
                Conditions *
              </label>
              <input
                type="text"
                class="form-control pad-10"
                id="validationTooltip01"
                placeholder="Enter"
                value={searchTerm}
                onChange={handleInputChange}
              />
              {errors.name && <div className="error-text">{errors.name}</div>}
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
              ) : null}

            </div>
          </div>
        </CCol>
        <CCol lg={4}>
          <div style={{ width: "100%" }}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                ICD
              </label>
              <div
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
              </div>
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

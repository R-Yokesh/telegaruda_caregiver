import { CCol, CRow } from "@coreui/react";
import React, { useEffect, useState } from "react";
import PrimaryButton from "../../../../../Buttons/PrimaryButton/PrimaryButton";
import SecondaryButton from "../../../../../Buttons/SecondaryButton/SecondaryButton";
import DatePicker from "react-datepicker";
import Dropdown from "../../../../../Dropdown/Dropdown";
import { DATE_FORMAT } from "../../../../../../Config/config";
import { toast } from "react-toastify";
import { format, isValid, parse } from "date-fns";
import { getCurrentTime } from "../../../../../../Utils/dateUtils";
import useApi from "../../../../../../ApiServices/useApi";
import { useLocation } from "react-router-dom";

const DiagnosisForm = ({ back, defaultValues, setAddFormView, fetchDiagnosis }) => {

  const { loading, error, get, post, clearCache, patch } = useApi();
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [errors, setErrors] = useState({});
  const [icd, setIcd] = useState([]);
  const [Description, setDescription] = useState([defaultValues?.addition_info?.notes || null])
  const [searchTerm, setSearchTerm] = useState([defaultValues?.addition_info?.title || null]);
  const location = useLocation();
  const data = location.state?.PatientDetail;

  const getFormattedDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  const currentDate = new Date();
  const formattedDate = getFormattedDate(currentDate);

  // console.log(formattedDate); // e.g., 25-08-2024

  const defaultDateTime = defaultValues?.date || "";

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



  const validate = () => {
    let isValid = true;
    const newErrors = {};

    if (!selectedDate) {
      newErrors.date = "Date is required.";
      isValid = false;
    }
    if (!searchTerm) {
      newErrors.searchTerm = "ICD Code is required.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };


  const onSubmit = () => {

    if (validate()) {
      if (defaultValues.id !== undefined) {
        console.log("Edit clicked");
        editDiagnosis()

      }
      if (defaultValues.id === undefined) {
        console.log("Add clicked");
        addDiagnosis();

      }
    }
  };


  //api integration of ICD Code list
  useEffect(() => {
    const getIcdCode = async () => {
      if (searchTerm) {
        try {
          const response = await get(
            `resource/masters?slug=procedure&searchkey=${searchTerm}&limit=50&country=undefine`
          );
          if (response.code === 200) {
            setIcd(response.data.masters);
          } else {
            console.error("Failed to fetch data:", response.message);
            setIcd([]);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
          setIcd([]);
        }
      } else {
        setIcd([]);
      }
    };

    getIcdCode();
  }, [searchTerm, get]);


  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
  };

  // Add API 
  const addDiagnosis = async () => {

    try {
      const body = {
        user_id: "10",
        document_source: "icd",
        addition_info: {
          date: format(selectedDate, "dd-MM-yyyy"),
          title: searchTerm,
          notes: Description,
        },
      };

      // Use the provided `post` function to send the request
      const response = await post(`resource/docs`, body);

      if (response.code === 201) {
        clearCache();
        await fetchDiagnosis();
        setAddFormView(false);
        toast.success("Added successfully");

      } else {
        console.error("Failed to fetch data:", response.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  // Edit API
  const editDiagnosis = async () => {
    try {
      const body = {
        user_id: "10",
        document_source: "icd",
        addition_info: {
          date: format(selectedDate, "dd-MM-yyyy"),
          title: searchTerm,
          notes: Description,
        },
      };

      // Use the provided `post` function to send the request
      const response = await patch(`resource/docs/${defaultValues.id}`, body);

      if (response.code === 200) {
        clearCache();
        await fetchDiagnosis();
        setAddFormView(false);
        toast.success("Updated successfully");
      } else {
        console.error("Failed to fetch data:", response.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }

  };



  return (
    <>
      <CRow className="mb-3">
        <CCol lg={4}>
          <div style={{ width: "100%" }}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Date *
              </label>
              {/* <input
                type="text"
                class="form-control pad-10"
                id="validationTooltip01"
                placeholder="Enter"
                defaultValue={defaultValues?.condition}
              /> */}
              <div className="date-size">
                <DatePicker
                  showIcon
                  selected={selectedDate}
                  onChange={handleDateChange}
                  dateFormat="MM-dd-yyyy"
                />
              {errors.date && <div className="error-text">{errors.date}</div>}
              </div>
            </div>
          </div>
        </CCol>
        <CCol lg={8}>
          <div style={{ width: "100%" }}>
            <div class="position-relative dropdown-container">
              <label for="validationTooltip01" class="form-label">
                ICD Code *
              </label>
              <input
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
              ) : icd?.length > 0 ? (
                <ul className="dropdown-list">
                  {icd?.map((icd) => (
                    <li
                      key={icd?.id}
                      className="list-group-item"
                      onClick={() => {
                        setSearchTerm(icd?.slug);
                        setIcd([]);
                        setDescription(icd?.name)
                      }}
                    >
                      {icd?.slug}
                    </li>
                  ))}
                </ul>
              ) : null}
              {errors.searchTerm && <div className="error-text">{errors.searchTerm}</div>}

            </div>
          </div>
        </CCol>
      </CRow>
      <CRow className="mb-3">
        <CCol lg={12}>
          <div style={{ width: "100%" }}>
            <div class="position-relative">
              <label for="validationTooltip01" class="form-label">
                Description
              </label>
              <input
                type="text"
                class="form-control  pad-10"
                id="validationTooltip01"
                // placeholder="Enter"
                disabled
                // defaultValue={defaultValues?.treatment}
                value={Description}
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

export default DiagnosisForm;

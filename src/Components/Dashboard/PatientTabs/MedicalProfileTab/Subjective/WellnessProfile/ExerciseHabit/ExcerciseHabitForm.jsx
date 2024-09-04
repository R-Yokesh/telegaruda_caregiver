import { CCol, CRow } from "@coreui/react";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import SecondaryButton from "../../../../../../Buttons/SecondaryButton/SecondaryButton";
import PrimaryButton from "../../../../../../Buttons/PrimaryButton/PrimaryButton";
import Dropdown from "../../../../../../Dropdown/Dropdown";
import { DATE_FORMAT } from "../../../../../../../Config/config";
import useApi from "../../../../../../../ApiServices/useApi";
import moment from "moment";
import Form from 'react-bootstrap/Form'; // Import Bootstrap Form component

const ExerciseHabitForm = ({ back, defaultValues, setAddFormView, fetchExciseHabit }) => {
  const { loading, error, post, patch, clearCache, get } = useApi();
  const [selectedDate, setSelectedDate] = useState(new Date()); // Set default to current date
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [type, setType] = useState(defaultValues?.details?.act_type || "");
  const [patientId, setPatientId] = useState(defaultValues?.details?.patient_id || "");
  const [category, setCategory] = useState(defaultValues?.details?.act_catagory || "activity");
  const [duration, setDuration] = useState(defaultValues?.details?.act_duration || "");
  const [intensity, setIntensity] = useState(defaultValues?.details?.act_intensity || "");
  const [errors, setErrors] = useState({});
  const [dropdownOptions, setDropdownOptions] = useState([]);

  useEffect(() => {
    if (defaultValues?.details) {
      setSelectedDate(parseDate(defaultValues?.details?.act_date) || new Date()); // Set to default today if not provided
      setSelectedTime(parseTime(defaultValues?.details?.act_time) || new Date());
      setType(defaultValues?.details?.act_type || "");
      setCategory(defaultValues.details?.act_catagory || "activity");
      setDuration(defaultValues.details?.act_duration || "");
      setIntensity(defaultValues.details?.act_intensity || "");
    }
  }, [defaultValues]);

  useEffect(() => {
    const fetchDropdownOptions = async () => {
      try {
        const response = await get('resource/masters/all?slug=activity&order_by=id&dir=1');
        console.log("Dropdown props:", { response });

        if (response.code === 200) {
          const options = response.data.masters
            .filter(item => item.is_active) // Filter out inactive items
            .map(item => ({
              value: item.slug,
              label: item.name
            }));
          setDropdownOptions(options);
        } else {
          console.error("Failed to fetch dropdown options:", response.message);
        }
      } catch (error) {
        console.error("Error fetching dropdown options:", error);
      }
    };

    fetchDropdownOptions();
  }, [get]);

  const getSelectedValue = (data) => {
    setIntensity(data); // Set the selected intensity
  };

  const options = ["High", "Moderate", "Low"];
  const findIndex = defaultValues?.act_intensity
    ? options.indexOf(defaultValues?.act_intensity)
    : 0;

  const parseDate = (dateString) => {
    if (!dateString) return null;
    return new Date(dateString);
  };

  const parseTime = (timeString) => {
    if (!timeString) return null;
    const [hours, minutes] = timeString.split(":").map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
  };

  const handleDateChange = (date) => {
    setSelectedDate(date || new Date()); // Default to current date if cleared
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time || new Date());
  };

  const handleChange = (value) => {
    setType(value);
  };

  const addHabits = async () => {
    try {
      const body = {
        details: [{
          patient_id: "10",
          act_catagory: category,
          act_date: selectedDate.toISOString(),
          act_time: moment(selectedTime).format("HH:mm"),
          act_type: type,
          act_duration: Number(duration),
          act_intensity: intensity,
          act_intake: "",
          unit: "",
        }],
      };

      const response = await post('resource/activity_wellness', body);

      if (response.code === 201) {
        clearCache();
        await fetchExciseHabit();
        setAddFormView(false);
      } else {
        console.error("Failed to fetch data:", response.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const editDiet = async () => {
    // Formatting the date and time to match the required format
    const formattedDate = selectedDate.toISOString();
    const formattedTime = moment(selectedTime).format("HH:mm");
  
    try {
      const body = {
        act_date: formattedDate,
        act_time: formattedTime,
        act_type: type || defaultValues.details?.act_type,
        act_catagory: category || defaultValues.details?.act_catagory,
        act_duration: Number(duration) || defaultValues.details?.act_duration,
        act_intensity: intensity || defaultValues.details?.act_intensity,
        // Add any additional fields needed here
      };
  
      // Making the PATCH request to update the details
      const response = await patch(`resource/activity_wellness/${defaultValues.id}`, body);
  
      if (response.code === 200) {
        clearCache(); // Clear cache to refresh data
        await fetchExciseHabit(); // Fetch updated data after edit
        setAddFormView(false); // Hide the form after successful edit
      } else {
        console.error("Failed to update data:", response.message); // Error handling
      }
    } catch (error) {
      console.error("Error updating data:", error); // Error handling for request
    }
  };
  

  const validate = () => {
    let validationErrors = {};

    if (!selectedDate) validationErrors.date = "Date is required.";
    if (!selectedTime) validationErrors.time = "Time is required.";
    if (!type) validationErrors.type = "Type is required.";
    if (!duration) validationErrors.duration = "Duration is required.";
    if (!intensity) validationErrors.intensity = "Intensity is required.";

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const onSubmit = () => {
    if (validate()) {
      if (defaultValues?.id) {
        editDiet();
      } else {
        addHabits();
      }
    }
  };

  return (
    <>
      <div>
        <CRow className="mb-3">
          <CCol lg={12}>
            <div className="vertical-line"></div>
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CCol lg={4}>
            <div style={{ width: "100%" }}>
              <div className="position-relative">
                <label htmlFor="validationTooltip01" className="form-label">
                  Date *
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
                </div>
                {errors.date && <p className="text-danger">{errors.date}</p>}
              </div>
            </div>
          </CCol>
          <CCol lg={4}>
            <div className="position-relative">
              <label htmlFor="validationTooltip01" className="form-label">
                Time *
              </label>
              <div className="date-size">
                <DatePicker
                  showIcon
                  selected={selectedTime}
                  onChange={handleTimeChange}
                  showTimeSelect
                  showTimeSelectOnly
                  isClearable
                  closeOnScroll={true}
                  timeIntervals={5}
                  dateFormat="h:mm aa"
                />
              </div>
              {errors.time && <p className="text-danger">{errors.time}</p>}
            </div>
          </CCol>
          <CCol lg={4}>
            <div style={{ width: "100%" }}>
              <div className="position-relative">
                <label htmlFor="validationTooltip01" className="form-label">
                  Type *
                </label>
                <div
                  className="w-100"
                  style={{
                    border: "1px solid #17171D33",
                    borderRadius: "5px",
                  }}
                >
                  {/* Updated Type Dropdown using Form.Select from Bootstrap */}
                  <Form.Select
                    aria-label="Select Type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option value="">Select Type</option>
                    {dropdownOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Form.Select>
                </div>
                {errors.type && <p className="text-danger">{errors.type}</p>}
              </div>
            </div>
          </CCol>
        </CRow>
        <CRow className="mb-3">
         
        <CCol lg={3}>
            <div className="mb-3">
              <div className="d-flex flex-column">
                <label htmlFor="validationTooltip01" className="form-label">
                  Duration *
                </label>
                <input
                  type="text"
                  className="form-control pad-10"
                  id="validationTooltip01"
                  placeholder="Enter duration"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                />
                {errors.duration && <p className="text-danger">{errors.duration}</p>}
              </div>
            </div>
          </CCol>

          <CCol lg={6}>
              <div style={{ width: "100%" }}>
                <div className="position-relative">
                  <label htmlFor="validationTooltip01" className="form-label">
                    Intensity *
                  </label>
                  <div
                    className="w-100"
                    style={{
                      border: "1px solid #17171D33",
                      borderRadius: "5px",
                    }}
                  >
                    <Dropdown
                    //  options={options.map((option) => ({ value: option, label: option }))}
                     value={intensity}
                    //  getSelectedValue={getSelectedIntensity}
                      options={options}
                      defaultValue={defaultValues?.act_intensity ? options[findIndex] : null}
                      getSelectedValue={getSelectedValue}
                    />
                  </div>
                  {errors.intensity && <p className="text-danger">{errors.intensity}</p>}
                </div>
              </div>
            
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CCol xs={3} md={2}>
            <PrimaryButton onClick={() => onSubmit()}>SAVE</PrimaryButton>
          </CCol>
          <CCol xs={3} md={2}>
            <SecondaryButton onClick={back}>CANCEL</SecondaryButton>
          </CCol>
        </CRow>
      </div>
    </>
  );
};

export default ExerciseHabitForm;

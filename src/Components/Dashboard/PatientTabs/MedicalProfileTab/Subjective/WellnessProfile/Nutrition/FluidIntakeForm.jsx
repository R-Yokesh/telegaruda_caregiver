import { CCol, CRow } from "@coreui/react";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import SecondaryButton from "../../../../../../Buttons/SecondaryButton/SecondaryButton";
import PrimaryButton from "../../../../../../Buttons/PrimaryButton/PrimaryButton";
import Dropdown from "../../../../../../Dropdown/Dropdown";
import { DATE_FORMAT } from "../../../../../../../Config/config";
import useApi from "../../../../../../../ApiServices/useApi";
import { format } from "date-fns";
import moment from "moment";

const FluidIntakeForm = ({ back, defaultValues, setAddFormView, fetchFluid }) => {
  const [date, setDate] = useState(null);
  const { loading, error, post, patch, clearCache } = useApi();
  const [selectedTime, setSelectedTime] = useState(new Date()); 
  const [selectedDate, setSelectedDate] =  useState(new Date()); 
  const [fluidType, setFluidType] = useState(defaultValues?.act_type || "");
  const [water, setWater] = useState("");
  const [intake, setIntake] = useState(defaultValues?.act_intake || "");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Initialize the state with default values if available
    if (defaultValues) {
      setSelectedDate(parseDate(defaultValues?.details?.act_date) || new Date());
      setSelectedTime(parseTime(defaultValues.act_time)|| new Date());
      setFluidType(defaultValues.act_type || "");
      setWater(defaultValues.act_intake?.water || ""); // Set water for add mode
      setIntake(defaultValues.act_intake || ""); // Set intake for edit mode
    }
  }, [defaultValues]);

  const parseDate = (dateString) => {
    if (!dateString) return null;
    const [year, month, day] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day);
  };

  const parseTime = (timeString) => {
    if (!timeString) return null;
    const [hours, minutes] = timeString.split(":").map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
  };

  const options = [
    "Water", "Oral Rehydration Solutions", "Clear Broth", "Milk",
    "Fruit Juices", "Herbal Teas", "Coffee", "Tea", "Sports Drinks",
    "Soft Drinks", "Energy Drinks", "Coconut Water", "Infused Water",
    "Soup", "Electrolyte Solutions", "Alcoholic Beverages",
  ];

  const getSelectedValue = (data) => {
    setFluidType(data); // Update the fluid type when selected
  };

  const handleDateChange = (date) => {
    setSelectedDate(date || new Date());
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time || new Date());
  };

  const addFluid = async () => {
    const formattedDate = format(selectedDate, "yyyy-MM-dd"); // Format date to "YYYY-MM-DD"
    const formattedTime = moment(selectedTime).format("HH:mm"); // Format time to "HH:mm"
    try {
      const body = {
        patient_id: "10", // Use the appropriate patient ID
        act_catagory: "fluid",
        act_date: formattedDate,
        act_time: formattedTime,
        actual_value: true, // New field for add
        act_intake: {
          [fluidType.toLowerCase()]: water, // Use fluid type as key
        },
        unit: "ml",
      };

      const response = await post(`resource/activity_wellness`, body);

      if (response.code === 201) {
        clearCache();
        await fetchFluid(); // Refresh the list data here
        setAddFormView(false); // Close the form view
      } else {
        console.error("Failed to fetch data:", response.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const editFluid = async () => {
    const formattedDate = format(selectedDate, "yyyy-MM-dd"); // Format date to "YYYY-MM-DD"
    const formattedTime = moment(selectedTime).format("HH:mm"); // Format time to "HH:mm"
    try {
      const body = {
        patient_id: "10",
        act_catagory: "fluid",
        act_date: formattedDate,
        act_time: formattedTime,
        act_type: fluidType.toLowerCase(), // Assuming `act_type` is required
        act_intake: intake, // Use intake for editing
        unit: "ml",
      };

      // Use the PATCH function for editing
      const response = await patch(
        `resource/activity_wellness/${defaultValues.id}`, // Use the ID from default values
        body
      );

      if (response.code === 200) {
        clearCache();
        await fetchFluid(); // Refresh the list data here
        setAddFormView(false); // Close the form view
      } else {
        console.error("Failed to update data:", response.message);
      }
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!selectedDate) newErrors.date = "Date is required";
    if (!selectedTime) newErrors.time = "Time is required";
    if (!fluidType) newErrors.fluidType = "Fluid type is required";
    if (!water && !intake) newErrors.intake = "Intake is required"; // Validate based on edit mode
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = () => {
    if (validate()) {
      if (defaultValues?.id) {
        console.log("Edit clicked");
        editFluid(); // Call edit function if id is present
      } else {
        console.log("Add clicked");
        addFluid(); // Call add function if id is not present
      }
    }
  };

  return (
    <>
      <CRow className="mb-3">
        <CCol lg={4}>
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
              {errors.date && <div className="text-danger">{errors.date}</div>}
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
              {errors.time && <div className="text-danger">{errors.time}</div>}
            </div>
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
                <Dropdown
                  options={options}
                  defaultValue={defaultValues?.act_type || null}
                  getSelectedValue={getSelectedValue}
                />
                {errors.fluidType && <div className="text-danger">{errors.fluidType}</div>}
              </div>
            </div>
          </div>
        </CCol>
      </CRow>
      <CRow className="mb-3">
        <CCol lg={12}>
          <div className="position-relative">
            <label htmlFor="validationTooltip01" className="form-label">
              Intake *
            </label>
            <input
              type="text"
              className="form-control"
              value={defaultValues?.id ? intake : water} // Adjust based on mode
              onChange={(e) =>
                defaultValues?.id ? setIntake(e.target.value) : setWater(e.target.value)
              }
            />
            {errors.intake && <div className="text-danger">{errors.intake}</div>}
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
    </>
  );
};

export default FluidIntakeForm;

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
import { useLocation } from "react-router-dom";
import { Assets } from "../../../../../../../assets/Assets";
import { CustomInput } from "../../../../../../../Utils/dateUtils";

const FluidIntakeForm = ({
  back,
  defaultValues,
  setAddFormView,
  fetchFluid,
  addFluid,
  editFluid,
  isSubmitting
}) => {
  const location = useLocation();
  const data = location.state?.PatientDetail;

  const [date, setDate] = useState(null);
  const { loading, error, post, patch, clearCache } = useApi();
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [fluidType, setFluidType] = useState(defaultValues?.act_type || "");
  const [water, setWater] = useState("");
  const [intake, setIntake] = useState(defaultValues?.act_intake || "");
  const [errors, setErrors] = useState({});
  const maxDate = new Date(); // Restrict future dates

  useEffect(() => {
    // Initialize the state with default values if available
    if (defaultValues) {
      setSelectedDate(
        parseDate(defaultValues?.details?.act_date) || new Date()
      );
      setSelectedTime(parseTime(defaultValues.act_time) || new Date());
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
    "Water",
    "Oral Rehydration Solutions",
    "Clear Broth",
    "Milk",
    "Fruit Juices",
    "Herbal Teas",
    "Coffee",
    "Tea",
    "Sports Drinks",
    "Soft Drinks",
    "Energy Drinks",
    "Coconut Water",
    "Infused Water",
    "Soup",
    "Electrolyte Solutions",
    "Alcoholic Beverages",
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

  const validate = () => {
    const newErrors = {};
    if (!selectedDate) newErrors.date = "Date is required";
    if (!selectedTime) newErrors.time = "Time is required";
    if (!fluidType) newErrors.fluidType = "Fluid type is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  

  const onSubmit = () => {
    if (validate()) {
      const formattedDate = format(selectedDate, "yyyy-MM-dd"); // Format date to "YYYY-MM-DD"
      const formattedTime = moment(selectedTime).format("HH:mm"); // Format time to "HH:mm"
      const Addbody = {
        patient_id: data?.user_id, // Use the appropriate patient ID
        act_catagory: "fluid",
        act_date: formattedDate,
        act_time: formattedTime,
        actual_value: true, // New field for add
        act_intake: {
          [fluidType.toLowerCase()]: water, // Use fluid type as key
        },
        unit: "ml",
      };
      const Editbody = {
        patient_id: data?.user_id,
        act_catagory: "fluid",
        act_date: formattedDate,
        act_time: formattedTime,
        act_type: fluidType.toLowerCase(), // Assuming `act_type` is required
        act_intake: intake, // Use intake for editing
        unit: "ml",
      };
      if (defaultValues?.id) {
        console.log("Edit clicked");
        editFluid(Editbody, defaultValues.id); // Call edit function if id is present
      } else {
        console.log("Add clicked");
        addFluid(Addbody); // Call add function if id is not present
      }
    }
  };
  const handleClear = () => {
    setSelectedTime(null); // Clear the selected time
  };
  const handleDateClear = () => {
    setSelectedDate(null); // Clear the selected time
    setSelectedTime(null);
  };
  const handleChange = (e) => {
    const inputValue = e.target.value;

    // Regular expression to match the desired format
    const regex = /^\d{0,4}(\.\d{0,2})?$/;

    // Check if the input value matches the regex
    if (regex.test(inputValue) || inputValue === "") {
      if (defaultValues?.id) {
        setIntake(inputValue);
      } else {
        setWater(inputValue);
      }
    }
  };
  return (
    <>
      <CRow className="mb-3">
        <CCol lg={4}>
          <div class="position-relative d-flex flex-column gap-1">
            <label for="validationTooltip01" class="form-label">
              Date *
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
          <div class="position-relative d-flex flex-column gap-1">
            <label for="validationTooltip01" class="form-label">
              Time *
            </label>
            <div className="w-100 d-flex align-items-center gap-2">
              <div style={{ width: "80%" }}>
                <DatePicker
                  selected={selectedTime}
                  onChange={handleTimeChange}
                  showTimeSelect
                  showTimeSelectOnly
                  closeOnScroll={true}
                  timeIntervals={5}
                  dateFormat="HH:mm"
                  timeFormat="HH:mm"
                  customInput={<CustomInput />}
                  showIcon={false}
                  wrapperClassName="time-picker-style"
                />
              </div>
              <div style={{ width: "20%" }}>
                {selectedTime && (
                  <img
                    src={Assets.Close}
                    onClick={handleClear}
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
            {errors.time && <div className="error-text">{errors.time}</div>}
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
              </div>
              {errors.fluidType && (
                <div className="text-danger">{errors.fluidType}</div>
              )}
            </div>
          </div>
        </CCol>
      </CRow>
      <CRow className="mb-3">
        <CCol lg={12}>
          <div className="position-relative">
            <label htmlFor="validationTooltip01" className="form-label">
              Intake(ml)
            </label>
            <input
              type="text"
              className="form-control"
              value={defaultValues?.id ? intake : water} // Adjust based on mode
              // onChange={(e) =>
              //   defaultValues?.id
              //     ? setIntake(e.target.value)
              //     : setWater(e.target.value)
              // }
              onChange={handleChange}
              placeholder="0000"
            />
            {/* {errors.intake && (
              <div className="text-danger">{errors.intake}</div>
            )} */}
          </div>
        </CCol>
      </CRow>
      <CRow className="mb-3">
        <CCol xs={3} md={2}>
          <PrimaryButton onClick={onSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "SAVE"}
          </PrimaryButton>
        </CCol>
        <CCol xs={3} md={2}>
          <SecondaryButton onClick={back}>CANCEL</SecondaryButton>
        </CCol>
      </CRow>
    </>
  );
};

export default FluidIntakeForm;

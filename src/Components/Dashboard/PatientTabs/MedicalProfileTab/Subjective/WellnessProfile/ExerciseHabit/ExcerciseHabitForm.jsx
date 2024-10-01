import { CCol, CRow } from "@coreui/react";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import SecondaryButton from "../../../../../../Buttons/SecondaryButton/SecondaryButton";
import PrimaryButton from "../../../../../../Buttons/PrimaryButton/PrimaryButton";
import Dropdown from "../../../../../../Dropdown/Dropdown";
import { DATE_FORMAT } from "../../../../../../../Config/config";
import useApi from "../../../../../../../ApiServices/useApi";
import moment from "moment";
import Form from "react-bootstrap/Form";
import { Assets } from "../../../../../../../assets/Assets";
import ActiveButton from "../../../../../../Buttons/ActiveButton/ActiveButton";
import { useLocation } from "react-router-dom";
import { format } from "date-fns";
import { CustomInput } from "../../../../../../../Utils/dateUtils";

const ExerciseHabitForm = ({
  back,
  defaultValues,
  setAddFormView,
  fetchExciseHabit,
  addHabits,
  isSubmitting
}) => {
  const { loading, error, post, patch, clearCache, get } = useApi();
  const location = useLocation();
  const data = location.state?.PatientDetail;
  const [formEntries, setFormEntries] = useState([
    {
      selectedDate: new Date(),
      selectedTime: new Date(),
      type: defaultValues?.details?.act_type || "",
      category: defaultValues?.details?.act_catagory || "activity",
      duration: defaultValues?.details?.act_duration || "",
      intensity: defaultValues?.details?.act_intensity || "",
    },
  ]);
  const [errors, setErrors] = useState({});
  const [dropdownOptions, setDropdownOptions] = useState([]);

  useEffect(() => {
    const fetchDropdownOptions = async () => {
      try {
        const response = await get(
          "resource/masters/all?slug=activity&order_by=id&dir=1"
        );
        if (response.code === 200) {
          const options = response.data.masters
            .filter((item) => item.is_active)
            .map((item) => ({
              value: item.slug,
              label: item.name,
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

  const addFormEntry = () => {
    setFormEntries([
      ...formEntries,
      {
        selectedDate: new Date(),
        selectedTime: new Date(),
        type: "",
        category: "activity",
        duration: "",
        intensity: "",
      },
    ]);
  };

  const handleChangeEntry = (index, field, value) => {
    const updatedEntries = [...formEntries];
    updatedEntries[index][field] = value;
    setFormEntries(updatedEntries);
  };

  const deleteFormEntry = (index) => {
    const updatedEntries = formEntries.filter((_, i) => i !== index);
    setFormEntries(updatedEntries);
  };

  const validate = () => {
    let validationErrors = {};
    formEntries.forEach((entry, index) => {
      if (!entry.selectedDate)
        validationErrors[`date_${index}`] = "Date is required.";
      if (!entry.selectedTime)
        validationErrors[`time_${index}`] = "Time is required.";
      if (!entry.type) validationErrors[`type_${index}`] = "Type is required.";
      if (!entry.duration)
        validationErrors[`duration_${index}`] = "Duration is required.";
      if (!entry.intensity)
        validationErrors[`intensity_${index}`] = "Intensity is required.";
    });
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  // const addHabits = async () => {
  //   try {
  //     const body = {
  //       details: formEntries.map((entry) => ({
  //         patient_id: data?.user_id,
  //         act_catagory: entry.category,
  //         act_date: entry.selectedDate.toISOString(),
  //         act_time: moment(entry.selectedTime).format("HH:mm"),
  //         act_type: entry.type,
  //         act_duration: Number(entry.duration),
  //         act_intensity: entry.intensity,
  //         act_intake: "",
  //         unit: "",
  //       })),
  //     };
  //     console.log(body);
  //     const response = await post("resource/activity_wellness",body);
  //     if (response.code === 201) {
  //       clearCache();
  //       await fetchExciseHabit();
  //       setAddFormView(false);
  //     } else {
  //       console.error("Failed to fetch data:", response.message);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  const onSubmit = () => {
    if (validate()) {
      const body = {
        details: formEntries.map((entry) => ({
          patient_id: data?.user_id,
          act_catagory: entry.category,
          act_date: moment(entry.selectedDate).format("yyyy-MM-DD"),
          act_time: moment(entry.selectedTime).format("HH:mm"),
          act_type: entry.type,
          act_duration: Number(entry.duration),
          act_intensity: entry.intensity,
          act_intake: "",
          unit: "",
        })),
      };
      addHabits(body);
    }
  };
  const maxDate = new Date();
  return (
    <>
      <div>
        <CRow className="mb-3">
          <CCol lg={12}>
            <div className="vertical-line"></div>
          </CCol>
        </CRow>

        {formEntries.map((entry, index) => (
          <CRow className="mb-3" key={index}>
            <CCol lg={4}>
              <div style={{ width: "100%" }}>
                <div className="position-relative">
                  <label htmlFor={`date_${index}`} className="form-label">
                    Date *
                  </label>
                  <div className="date-size">
                    <DatePicker
                      showIcon
                      selected={entry.selectedDate}
                      onChange={(date) =>
                        handleChangeEntry(index, "selectedDate", date)
                      }
                      isClearable
                      closeOnScroll={true}
                      wrapperClassName="date-picker-wrapper"
                      dateFormat={DATE_FORMAT}
                      maxDate={maxDate}
                    />
                  </div>
                  {errors[`date_${index}`] && (
                    <p className="text-danger">{errors[`date_${index}`]}</p>
                  )}
                </div>
              </div>
            </CCol>
            <CCol lg={4}>
              <div className="position-relative">
                <label htmlFor={`time_${index}`} className="form-label">
                  Time *
                </label>
                <div className="date-size">
                  <DatePicker
                    showIcon
                    selected={entry.selectedTime}
                    onChange={(time) =>
                      handleChangeEntry(index, "selectedTime", time)
                    }
                    showTimeSelect
                    showTimeSelectOnly
                    isClearable
                    closeOnScroll={true}
                    timeIntervals={5}
                    dateFormat="HH:mm"
                    timeFormat="HH:mm"
                    // customInput={<CustomInput />}
                  />
                </div>
                {errors[`time_${index}`] && (
                  <p className="text-danger">{errors[`time_${index}`]}</p>
                )}
              </div>
            </CCol>
            <CCol lg={4}>
              <div style={{ width: "100%" }}>
                <div className="position-relative">
                  <label htmlFor={`type_${index}`} className="form-label">
                    Type *
                  </label>
                  <div
                    className="w-100"
                    style={{
                      border: "1px solid #17171D33",
                      borderRadius: "5px",
                    }}
                  >
                    <Form.Select
                      aria-label="Select Type"
                      value={entry.type}
                      onChange={(e) =>
                        handleChangeEntry(index, "type", e.target.value)
                      }
                    >
                      <option value="">Select Type</option>
                      {dropdownOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Form.Select>
                  </div>
                  {errors[`type_${index}`] && (
                    <p className="text-danger">{errors[`type_${index}`]}</p>
                  )}
                </div>
              </div>
            </CCol>   <CCol lg={4} className="mt-3">
              <div className="mb-3">
                <div className="d-flex flex-column">
                  <label htmlFor={`duration_${index}`} className="form-label">
                    Duration *
                  </label>
                  <input
                    type="text"
                    className="form-control pad-10"
                    id={`duration_${index}`}
                    placeholder="Enter duration"
                    value={entry.duration}
                    onChange={(e) =>
                      handleChangeEntry(index, "duration", e.target.value)
                    }
                  />
                  {errors[`duration_${index}`] && (
                    <p className="text-danger">{errors[`duration_${index}`]}</p>
                  )}
                </div>
              </div>
            </CCol>
            <CCol lg={4} className="mt-3">
              <div style={{ width: "100%" }}>
                <div className="position-relative">
                  <label htmlFor={`intensity_${index}`} className="form-label">
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
                      value={entry.intensity}
                      options={["High", "Moderate", "Low"]}
                      getSelectedValue={(data) =>
                        handleChangeEntry(index, "intensity", data)
                      }
                    />
                  </div>
                  {errors[`intensity_${index}`] && (
                    <p className="text-danger">
                      {errors[`intensity_${index}`]}
                    </p>
                  )}
                </div>
              </div>
            </CCol>
            {index !== 0 && (
              <CCol
                xs={1}
                className="d-flex align-items-start justify-content-start mt-3"
              >
                <div style={{ width: "40px", marginTop: "2rem" }}>
                  <ActiveButton onClick={() => deleteFormEntry(index)}>
                    <div className="d-flex align-items-center gap-2">
                      <img src={Assets.whiteDel} alt="add" />
                    </div>
                  </ActiveButton>
                </div>
              </CCol>
            )}
            <CCol
              xs={2}
              className="d-flex align-items-start justify-content-start mt-3"
            >
              <div style={{ width: "40px", marginTop: "2rem" }}>
                <ActiveButton onClick={addFormEntry}>
                  <div className="d-flex align-items-center gap-2">
                    <img src={Assets.whiteAdd} alt="add" />
                  </div>
                </ActiveButton>
              </div>
            </CCol>
          </CRow>
        ))}

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
      </div>
    </>
  );
};

export default ExerciseHabitForm;

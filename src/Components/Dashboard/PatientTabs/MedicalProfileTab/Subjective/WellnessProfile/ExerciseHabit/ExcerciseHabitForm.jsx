import { CCol, CRow } from "@coreui/react";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { Assets } from "../../../../../../../assets/Assets";
import SecondaryButton from "../../../../../../Buttons/SecondaryButton/SecondaryButton";
import PrimaryButton from "../../../../../../Buttons/PrimaryButton/PrimaryButton";
import Dropdown from "../../../../../../Dropdown/Dropdown";
import ActiveButton from "../../../../../../Buttons/ActiveButton/ActiveButton";

const ExcerciseHabitForm = ({ back, defaultValues }) => {
  const [exercises, setExercises] = useState([
    {
      id: 1,
      type: "",
      date: null,
      time: "",
      duration: "",
      intensity: "",
    },
  ]);

  const handleAddExercise = () => {
    const newExercises = [
      ...exercises,
      {
        id: exercises.length + 1,
        type: "",
        date: null,
        time: "",
        duration: "",
        intensity: "",
      },
    ];
    setExercises(newExercises);
  };

  const handleRemoveExercise = (id) => {
    const newExercises = exercises.filter((exercise) => exercise.id !== id);
    setExercises(newExercises);
  };

  const handleChange = (id, updatedData) => {
    const newExercises = exercises.map((ex) =>
      ex.id === id ? { ...ex, ...updatedData } : ex
    );
    setExercises(newExercises);
  };

  return (
    <>
      {exercises.map((exercise, index) => (
        <div key={index}>
          <CRow className="mb-3">
            <CCol lg={4}>
              <div className="position-relative">
                <label htmlFor="validationTooltip01" className="form-label">
                  Date *
                </label>
                <div className="date-size">
                  <DatePicker
                    showIcon
                    selected={exercise.date}
                    onChange={(date) => handleChange(exercise.id, { date })}
                  />
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
                    selected={exercise.date}
                    onChange={(date) => handleChange(exercise.id, { date })}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                  />
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
                      options={["One", "Two"]}
                      defaultValue={exercise.type}
                      getSelectedValue={(value) =>
                        handleChange(exercise.id, { type: value })
                      }
                    />
                  </div>
                </div>
              </div>
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol lg={6}>
              <div style={{ width: "100%" }}>
                <div className="position-relative">
                  <label htmlFor="validationTooltip01" className="form-label">
                    Duration (in minutes)
                  </label>
                  <input
                    type="text"
                    className="form-control pad-10"
                    id="validationTooltip01"
                    placeholder="000"
                    value={exercise.duration}
                    onChange={(e) =>
                      handleChange(exercise.id, { duration: e.target.value })
                    }
                  />
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
                      options={["One", "Two"]}
                      defaultValue={exercise.intensity}
                      getSelectedValue={(value) =>
                        handleChange(exercise.id, { intensity: value })
                      }
                    />
                  </div>
                </div>
              </div>
            </CCol>
          </CRow>
          {index > 0 && (
            <>
            <CRow className="mb-3">
              <CCol lg={1}>
                    <div style={{ width: "40px" }}>
                      <ActiveButton hgdf
                        onClick={() => handleRemoveExercise(exercise.id)}
                      >
                        <div className="d-flex align-items-center gap-2">
                          <img src={Assets.whiteDel} alt="add" />
                        </div>
                      </ActiveButton>
                    </div>
                  </CCol>
            </CRow>
            <CRow className="mb-3">
             <CCol lg={12}>
               <div className="vertical-line"></div>
             </CCol>
           </CRow>
           </>
            
          )}
        </div>
      ))}

      
      <>
            <CRow className="mb-3">
              <CCol lg={12}>
                <div style={{ width: "40px" }}>
                  <ActiveButton onClick={handleAddExercise}>
                    <div className="d-flex align-items-center gap-2">
                      <img src={Assets.whiteAdd} alt="add" />
                    </div>
                  </ActiveButton>
                </div>
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol lg={12}>
                <div className="vertical-line"></div>
              </CCol>
            </CRow>
          </>

      <CRow className="mb-1">
        <div style={{ width: "128px" }}>
          <PrimaryButton>SAVE</PrimaryButton>
        </div>
        <div style={{ width: "128px" }}>
          <SecondaryButton onClick={back}>CANCEL</SecondaryButton>
        </div>
      </CRow>
    </>
  );
};

export default ExcerciseHabitForm;

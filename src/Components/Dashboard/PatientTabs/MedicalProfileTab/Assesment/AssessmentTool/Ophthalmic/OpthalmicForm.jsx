import { CCol, CFormCheck, CRow } from "@coreui/react";
import React, { useEffect, useState } from "react";
import SecondaryButton from "../../../../../../Buttons/SecondaryButton/SecondaryButton";
import PrimaryButton from "../../../../../../Buttons/PrimaryButton/PrimaryButton";
import { capitalizeFirstLetter } from "../../../../../../../Utils/commonUtils";

const OpthalmicForm = ({
  back,
  defaultValues,
  questions,
  formTitle,
  onAdd,
  latest_form_submission,
  isEditMode,
}) => {
  const [formData, setFormData] = useState({});
  // Initialize formData with latest_form_submission
  useEffect(() => {
    if (latest_form_submission?.answers) {
      const initializedData = {};
      Object.keys(latest_form_submission.answers).forEach((key) => {
        const answer = latest_form_submission.answers[key];
        initializedData[key] = { answer: answer };
      });
      setFormData(initializedData);
    }
  }, [latest_form_submission]);
  const handleChange = (event, question) => {
    const { name, value } = event.target;
    const questionId = parseInt(name, 10);

    // Find the selected option object
    const selectedOption = question?.answers?.find(
      (answer) => answer.answer.name === value
    );

    // Update formData with the selected option object
    setFormData((prevData) => ({
      ...prevData,
      [questionId]: selectedOption || null,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Add your submit logic here
    onAdd(formData);
  };
  return (
    <>
      <form>
        <div className="d-flex align-items-center justify-content-between">
          <h5 className="Assess-Head">{capitalizeFirstLetter(formTitle)}</h5>
          <div style={{ width: "128px" }}>
            <PrimaryButton onClick={back}>BACK</PrimaryButton>
          </div>
        </div>
        <hr />
        {!defaultValues || !defaultValues.questions ? (
          <>
            <p>No questions available</p>
          </>
        ) : (
          <>
            {defaultValues?.questions?.map((question, index) => (
              <CRow key={index} className="mb-3">
                <CCol>
                  <h6 className="Assess-ques">{index + 1}. {question?.question?.name}</h6>
                  {question?.answers?.map((option, cIndex) => (
                    <CFormCheck
                      key={cIndex}
                      type="radio"
                      name={question?.question?.id} // Use question ID as the name
                      id={`question${question?.question?.id}_choice${option?.id}`}
                      // name={`question${index + 1}`}
                      // id={`question${index + 1}_choice${cIndex + 1}`}
                      value={option?.answer?.name}
                      label={option?.answer?.name}
                      onChange={(e) => handleChange(e, question)}
                      checked={
                        formData[question?.question?.id]?.answer?.name ===
                        option?.answer?.name
                      }
                      disabled={isEditMode}
                    />
                  ))}
                </CCol>
              </CRow>
            ))}
          </>
        )}
      </form>
      {isEditMode ? null : (
        <CRow className="mb-1">
          <div style={{ width: "128px" }}>
            <PrimaryButton onClick={handleSubmit}>SAVE</PrimaryButton>
          </div>
          <div style={{ width: "128px" }}>
            <SecondaryButton onClick={back}>CANCEL</SecondaryButton>
          </div>
        </CRow>
      )}
    </>
  );
};

export default OpthalmicForm;

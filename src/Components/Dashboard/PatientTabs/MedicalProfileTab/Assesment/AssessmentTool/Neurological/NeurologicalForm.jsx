import { CCol, CFormCheck, CRow } from "@coreui/react";
import React, { useEffect, useState } from "react";
import SecondaryButton from "../../../../../../Buttons/SecondaryButton/SecondaryButton";
import PrimaryButton from "../../../../../../Buttons/PrimaryButton/PrimaryButton";
import { capitalizeFirstLetter } from "../../../../../../../Utils/commonUtils";

const NeurologicalForm = ({
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

  const handleInputChange = (event, question) => {
    const { name, value } = event.target;
    const questionId = parseInt(name, 10);

    // Find the selected option object
    const selectedOption = question?.answers?.find(
      (answer) => answer.answer.name === value
    );

    // Update formData with the selected option object
    setFormData((prevData) => ({
      ...prevData,
      [questionId]: value || null,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Add your submit logic here
    onAdd(formData);
  };
  console.log(formData);
  return (
    <>
      <form>
        <div className="d-flex align-items-center justify-content-between">
          <h4 className="Assess-Head">{capitalizeFirstLetter(formTitle)}</h4>
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
              <>
                <CRow key={index} className="mb-3">
                  <CCol>
                    <h5 className="Assess-ques">
                      {index + 1}. {question?.question?.name}
                    </h5>
                    {question?.question?.type === "radio"
                      ? question?.answers?.map((option, cIndex) => (
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
                        ))
                      : null}
                    {question?.question?.type === "instructions" ? (
                      <img
                        alt="img"
                        src={
                          "https://telegaruda.a2zhealth.in/hospital/assets/media/assessment/" +
                          question?.question?.additional_info?.image_url
                        }
                      />
                    ) : null}
                    {question?.question?.type === "input" ? (
                      <input
                        name={question?.question?.id} // Use question ID as the name
                        id={`question${question?.question?.id}`}
                        onChange={(e) => handleInputChange(e, question)}
                        disabled={isEditMode}
                        defaultValue={formData[question?.question?.id]?.answer}
                        class="form-control  pad-10"
                      />
                    ) : null}
                    {question?.question?.type === "sub_question"
                      ? question?.question?.sub_questions?.map((data, i) => (
                          <>
                            <CRow key={index} className="mb-3">
                              <CCol>
                                <div
                                  style={{
                                    marginLeft: "20px",
                                  }}
                                >
                                  <h6>
                                    {i + 1}. {data?.name}
                                  </h6>
                                  {data?.type === "radio"
                                    ? question?.answers?.map(
                                        (option, cIndex) => (
                                          <CFormCheck
                                            key={cIndex}
                                            type="radio"
                                            name={data?.id} // Use question ID as the name
                                            id={`question${data?.id}_choice${option?.id}`}
                                            // name={`question${index + 1}`}
                                            // id={`question${index + 1}_choice${cIndex + 1}`}
                                            value={option?.answer?.name}
                                            label={option?.answer?.name}
                                            onChange={(e) =>
                                              handleChange(e, question)
                                            }
                                            checked={
                                              formData[data?.id]?.answer
                                                ?.name === option?.answer?.name
                                            }
                                            disabled={isEditMode}
                                          />
                                        )
                                      )
                                    : null}
                                </div>
                              </CCol>
                            </CRow>
                          </>
                        ))
                      : null}
                  </CCol>
                </CRow>
              </>
            ))}
          </>
        )}
      </form>
      {isEditMode ? null : defaultValues?.id === 27 ||
        defaultValues?.id === 28 ? null : (
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

export default NeurologicalForm;

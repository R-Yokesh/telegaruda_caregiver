import { CCol, CFormCheck, CRow } from "@coreui/react";
import React, { useState } from "react";
import SecondaryButton from "../../../../../../Buttons/SecondaryButton/SecondaryButton";
import PrimaryButton from "../../../../../../Buttons/PrimaryButton/PrimaryButton";

const PsychiatricForm = ({ back, defaultValues, questions,formTitle }) => {
    const [formData, setFormData] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        // Add your submit logic here
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <h3>{formTitle}</h3>
                <hr />
                {questions?.map((question, index) => (
                    <CRow key={index} className="mb-3">
                        <CCol>
                            <h5>{question?.label}</h5>
                            {question?.options.map((option, cIndex) => (
                                <CFormCheck
                                    key={cIndex}
                                    type="radio"
                                    name={`question${index + 1}`}
                                    id={`question${index + 1}_choice${cIndex + 1}`}
                                    value={option}
                                    label={option}
                                    onChange={handleChange}
                                    checked={formData[`question${index + 1}`] === option}
                                />
                            ))}
                        </CCol>
                    </CRow>
                ))}
            </form>
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

export default PsychiatricForm;

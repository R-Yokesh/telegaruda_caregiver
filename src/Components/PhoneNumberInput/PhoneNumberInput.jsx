import React, { useState } from "react";
import { CForm, CFormInput, CFormSelect, CInputGroup } from "@coreui/react";

const PhoneNumberInput = ({ getPhone }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [inputValue, setInputValue] = useState("");

  // Array of options
  const optionsArray = [
    { id: "1", label: "+91" },
    { id: "2", label: "+93" },
    { id: "3", label: "+213" },
  ];

  // Event handler for dropdown change
  const handleDropdownChange = (event) => {
    setSelectedOption(event.target.value);
    getPhone(event.target.value, inputValue);
  };

  // Event handler for input change
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    getPhone(selectedOption, event.target.value);
  };

  return (
    <CForm>
      <CInputGroup className="input-dropdown-group">
        <div className="input-dropdown-25">
          <CFormSelect
            aria-label="Select an option"
            value={selectedOption}
            onChange={handleDropdownChange}
            className="border-none pad-10"
          >
            {/* <option value="">Select an option</option> */}
            {optionsArray.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </CFormSelect>
        </div>
        <div className="input-dropdown-75">
          <CFormInput
            placeholder="Enter"
            value={inputValue}
            onChange={handleInputChange}
            className="border-none pad-10"
          />
        </div>
      </CInputGroup>
    </CForm>
  );
};

export default PhoneNumberInput;

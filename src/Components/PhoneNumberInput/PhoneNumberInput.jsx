import React, { useEffect, useState } from "react";
import { CForm, CFormInput, CFormSelect, CInputGroup } from "@coreui/react";
import useApi from "../../ApiServices/useApi";

const PhoneNumberInput = ({ getPhone }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [isoOpt, setIsoOpt] = useState([]);
  const { get } = useApi();

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

  const getISOCode = async () => {
    try {
      const response = await get(
        `resource/masters/all?slug=country&order_by=name&dir=1`
      );
      console.log(response); // Handle the data as needed
      if (response.code === 200) {
        setIsoOpt(response?.data?.masters);
      } else {
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };
  useEffect(() => {
    getISOCode();
  }, []);

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
            {isoOpt?.map((option, i) => (
              <option key={i} value={option?.attributes?.phonecode}>
                {option?.attributes?.phonecode}
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

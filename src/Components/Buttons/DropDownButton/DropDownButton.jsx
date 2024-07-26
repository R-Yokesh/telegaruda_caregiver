import React, { useState } from "react";
import { Assets } from "../../../assets/Assets";

const DropdownButton = () => {
  const [buttonText, setButtonText] = useState("SAVE");
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (text) => {
    setButtonText(text);
    setIsOpen(false);
  };

  return (
    <div className="dropdown">
      <button className="dropdown-button button" >
        <div className="d-flex align-items-center justify-content-between">
          <div className="w-100">
            <span className="fs-16 fw-600">{buttonText}</span>
          </div>
          <div onClick={toggleDropdown}>
            {!isOpen ? <img src={Assets.cDown} alt="down"/> : <img src={Assets.cUp} alt="up"/>}
          </div>
        </div>
      </button>
      {isOpen && (
        <div className="dropdown-content">
          {buttonText === "SEND TO PHARMACY" && (
            <span
              onClick={() => handleItemClick("SAVE")}
              className="fs-14 fw-600"
            >
              SAVE
            </span>
          )}
          {buttonText === "SAVE" && (
            <span
              onClick={() => handleItemClick("SEND TO PHARMACY")}
              className="fs-14 fw-600"
            >
              SEND TO PHARMACY
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default DropdownButton;

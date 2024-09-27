import React from "react";
import "./PrimaryButton.css";

const PrimaryButton = ({ children, onClick, disabled }) => {
  return (
    <button
      className={`button ${disabled ? "disabled" : ""}`}
      onClick={onClick}
      disabled={disabled}  
    >
      {children}
    </button>
  );
};

export default PrimaryButton;

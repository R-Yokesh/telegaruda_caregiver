import React from "react";
import "./PrimaryButton.css";

const PrimaryButton = ({ children, onClick }) => {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
};

export default PrimaryButton;

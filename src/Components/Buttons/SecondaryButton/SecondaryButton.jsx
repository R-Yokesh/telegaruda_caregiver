import React from "react";
import "./SecondaryButton.css";

const SecondaryButton = ({ children, onClick }) => {
  return (
    <button className="secondary-button fw-600" onClick={onClick}>
      {children}
    </button>
  );
};

export default SecondaryButton;


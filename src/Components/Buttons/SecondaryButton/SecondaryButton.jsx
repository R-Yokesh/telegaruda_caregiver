import React from "react";
import "./SecondaryButton.css";

const SecondaryButton = ({ children, onClick }) => {
  return (
    <button className="secondary-button" onClick={onClick}>
      {children}
    </button>
  );
};

export default SecondaryButton;


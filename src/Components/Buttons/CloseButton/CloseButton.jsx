import React from "react";
import "./CloseButton.css";

const CloseButton = ({ children, onClick }) => {
  return (
    <button className="close-button" onClick={onClick}>
      {children}
    </button>
  );
};

export default CloseButton;


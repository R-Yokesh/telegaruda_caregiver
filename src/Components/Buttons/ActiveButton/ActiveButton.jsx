import React from "react";
import "./ActiveButton.css";

const ActiveButton = ({ children, onClick }) => {
  return (
    <button className="act-button" onClick={onClick}>
      {children}
    </button>
  );
};

export default ActiveButton;

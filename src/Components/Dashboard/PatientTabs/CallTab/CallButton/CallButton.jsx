import React, { useState } from "react";
import "./CallButton.css";

const CallButton = ({ callStatus, onClick }) => {
  const [isCalling, setIsCalling] = useState(callStatus ? callStatus : false);

  const toggleCallStatus = () => {
    setIsCalling((prev) => !prev);
  };

  return (
    <button
      className={`call-button ${isCalling ? "calling" : ""}`}
      onClick={onClick}
    >
      <span className="button-text">
        {isCalling ? "Call in Progress..." : "Call"}
      </span>
      <span className={`spinner ${isCalling ? "show" : ""}`}></span>
    </button>
  );
};

export default CallButton;

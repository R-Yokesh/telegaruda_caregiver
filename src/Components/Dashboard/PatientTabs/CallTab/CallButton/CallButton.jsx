// import React, { useState } from "react";
// import "./CallButton.css";

// const CallButton = ({ callStatus, onClick }) => {
//   const [isCalling, setIsCalling] = useState(callStatus ? callStatus : false);

//   const toggleCallStatus = () => {
//     setIsCalling((prev) => !prev);
//   };

//   return (
//     <button
//       className={`call-button ${isCalling ? "calling" : ""}`}
//       onClick={onClick}
//     >
//       <span className="button-text">
//         {isCalling ? "Call in Progress..." : "Call"}
//       </span>
//       <span className={`spinner ${isCalling ? "show" : ""}`}></span>
//     </button>
//   );
// };

// export default CallButton;
import React, { useState } from "react";
import "./CallButton.css";

const CallButton = ({ callStatus, onClick }) => {
  const [isCalling, setIsCalling] = useState(callStatus ? callStatus : false);

  const toggleCallStatus = () => {
    setIsCalling((prev) => !prev);
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      type="button"
      className={`call-button ${isCalling ? "calling" : ""}`}
      onClick={toggleCallStatus}
    >
      <span className="button__text">Call in progress... </span>
      <span className="button__icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
          viewBox="0 0 24 24"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
          stroke="white"
          fill="none"
        >
          <line x1="4" y1="4" x2="20" y2="20" strokeWidth={4}></line>
          <line x1="20" y1="4" x2="4" y2="20" strokeWidth={4}></line>
        </svg>
      </span>
    </button>
  );
};

export default CallButton;

import React, { useState } from "react";

const OptionItem = ({ label, onSelect }) => {
  const [isSelected, setIsSelected] = useState(false);

  const toggleSelected = () => {
    setIsSelected(!isSelected);
    onSelect(label, !isSelected); // Notify parent component of selection change
  };

  return (
    <div
      className={`option-item ${isSelected ? "selected" : ""}`}
      onClick={toggleSelected}
    >
      {label}
    </div>
  );
};

export default OptionItem;

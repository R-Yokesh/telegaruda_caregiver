import React, { useEffect, useState } from "react";

const OptionItem = ({ label, onSelect, selected, disabled }) => {
  const [isSelected, setIsSelected] = useState(selected);
  useEffect(() => {
    setIsSelected(selected);
  }, [selected]);
  const toggleSelected = () => {
    setIsSelected(!isSelected);
    onSelect(label, !isSelected); // Notify parent component of selection change
  };

  return (
    <div
      className={`option-item ${isSelected ? "selected" : ""} ${
        disabled ? "disabled" : ""
      }`}
      onClick={toggleSelected}
    >
      {label}
    </div>
  );
};

export default OptionItem;

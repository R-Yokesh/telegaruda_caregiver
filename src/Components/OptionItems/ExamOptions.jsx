import React, { useEffect, useState } from "react";

const ExamOptions = ({ label, onSelect, selected, disabled }) => {
  const [isSelected, setIsSelected] = useState(selected);

  useEffect(() => {
    setIsSelected(selected);
  }, [selected]);

  const toggleSelected = () => {
    if (!disabled) {
      const newSelected = !isSelected;
      setIsSelected(newSelected);
      onSelect(label, newSelected); // Notify parent component of selection change
    }
  };

  return (
    <div
      className={`option-item ${isSelected ? "selected" : ""} ${disabled ? "disabled" : ""}`}
      onClick={toggleSelected}
    >
      {label?.name}
    </div>
  );
};


export default ExamOptions;

import React from "react";

const Badge = ({ label, color }) => {
  return <div className={`badge badge-${color} fs-14 fw-500`}>{label}</div>;
};

export default Badge;

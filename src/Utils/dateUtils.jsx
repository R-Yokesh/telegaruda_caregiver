import { format, isValid, parse, parseISO } from "date-fns";
import React from "react";

// Function to format date as DD-MM-YYYY HH:mm AM/PM
export function formatDateTime(originalDateStr) {
  const date = new Date(originalDateStr);

  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  return date.toLocaleString("en-GB", options).replace(",", "");
}

// Function to format date as DD-MM-YYYY
export function formatDate(originalDateStr) {
  const date = new Date(originalDateStr);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}

// Function to format time as HH:mm AM/PM
export function formatTime(originalDateStr) {
  const date = new Date(originalDateStr);
  const options = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  return date.toLocaleTimeString("en-GB", options);
}

export function tableDateTime(dateTimeString) {
  if (!dateTimeString) {
    return "Invalid date-time"; // Handle empty or invalid input
  }

  // Parse the date and time string
  const parsedDate = parse(dateTimeString, "yyyy-MM-dd HH:mm", new Date());

  // Check if the parsed date is valid
  if (!isValid(parsedDate)) {
    return "Invalid date-time"; // Handle invalid date
  }

  // Format the date and time into 'dd-MM-yyyy HH:mm'
  return format(parsedDate, "dd-MM-yyyy HH:mm");
}

export function getCurrentTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

export const formatFetchDate = (dateString) => {
  if (!dateString) return ""; // Handle cases where dateString might be null or undefined

  try {
    const parsedDate = parseISO(dateString); // Convert the ISO string to a Date object
    return format(parsedDate, "dd-MM-yyyy"); // Format the Date object
  } catch (error) {
    console.error("Error formatting date:", error);
    return ""; // Return an empty string or handle the error as needed
  }
};

export const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
  <div
    // className="custom-datepicker-input"
    onClick={onClick}
    ref={ref}
    style={{
      display: "flex",
      alignItems: "center",
      padding: "7px", // Optional: padding for better spacing
      cursor: "pointer",
      background: "transparent",
      border: "none",
    }}
  >
    <img
      src={
        "https://i.pinimg.com/736x/63/e0/3a/63e03aec93a5d17485bdc5a0d970a709.jpg"
      }
      alt="Clock"
      style={{ width: "20px", marginRight: "5px" }}
    />
    {value}
  </div>
));

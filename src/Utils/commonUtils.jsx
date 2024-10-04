import { addHours, format } from "date-fns";
export const findItemIndex = (options, value) => {
  // Use findIndex to get the index of the item with the specified id
  const index = options.findIndex((item) => item === value);
  return index;
};

export const extractNum = (data) => {
  const numbers = parseFloat(data?.match(/\d+(\.\d+)?/)[0]); // Replace non-digits with empty string

  return numbers || "";
};

export const getFileTypeFromMime = (mimeType) => {
  const mimeTypes = {
    "application/pdf": "pdf",
    "image/jpeg": "jpg",
    "image/png": "png",
    "text/plain": "txt",
    // Add more MIME types as needed
  };

  return mimeTypes[mimeType] || "unknown";
};

export const openFile = (contentUrl) => {
  window.open(contentUrl, "_blank");
};

export const getSerialNumber = (itemPerPage, pageNumber, index) => {
  // Calculate the starting serial number for the given page
  const startingSerialNumber = (pageNumber - 1) * itemPerPage + 1;
  // Add the index of the item on the page to the starting serial number
  return startingSerialNumber + index;
};

export const capitalizeFirstLetter = (text) => {
  if (!text) return text;
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

export const isWithin24Hours = (date) => {
  // Parse the date (JavaScript handles ISO 8601 automatically)
  let recDate = new Date(date);
  // If the date is invalid, throw an error
  if (isNaN(recDate)) {
    throw new Error("Invalid date format");
  }
  console.log("Parsed Date:", recDate);
  const now = new Date();
  const difference = now.getTime() - recDate.getTime();
  console.log("Time Difference in ms:", difference);
  return difference <= 24 * 60 * 60 * 1000 && difference >= 0;
};

// Function to convert Celsius to Fahrenheit
export const celsiusToFahrenheit = (celsius) => {
  return ((9 / 5) * celsius + 32).toFixed(2);
};

// Function to convert Fahrenheit to Celsius
export const fahrenheitToCelsius = (fahrenheit) => {
  return ((fahrenheit - 32) * (5 / 9)).toFixed(2);
};

export const removeQuotes = (input) => {
  // Remove leading and trailing quotes
  return typeof input === "string" ? input?.replace(/^"|"$/g, "").trim() : "";
};

export const filterFiles = (files) => {
  const allowedExtensions = [".pdf", ".png", ".jpg", ".jpeg"];
  const filteredFiles = [];

  for (let file of files) {
    const fileExtension = file
      ?.slice(file?.lastIndexOf(".") || file?.length)
      .toLowerCase();
    if (allowedExtensions?.includes(fileExtension)) {
      filteredFiles?.push(file);
    }
  }
  console.log(files, "first", filteredFiles);
  return filteredFiles;
};

export const getFileExtensionFromUrl = (url) => {
  // Use a regular expression to match the extension
  const extensionMatch = url?.match(/\.(\w+)$/);
  return extensionMatch ? extensionMatch[1]?.toLowerCase() : null; // Return the extension or null if not found
};

export function getSpeGraLabel(value) {
  // Define the concentration ranges and their corresponding labels and colors
  const ranges = [
    {
      min: 1.001,
      max: 1.005,
      label: "Very-Dilute",
      color: "#89d4f5",
    },
    { min: 1.006, max: 1.01, label: "Dilute", color: "#0000ff" },
    { min: 1.011, max: 1.015, label: "Normal", color: "#008000" },
    { min: 1.016, max: 1.02, label: "Concentrated", color: "#fff707" },
    {
      min: 1.021,
      max: 1.025,
      label: "Very-Concentrated",
      color: "#FFC107",
    },
    {
      min: 1.026,
      max: 1.03,
      label: "Highly-Concentrated",
      color: "#FF0000",
    },
  ];

  // Iterate through the ranges to find the matching label
  for (const range of ranges) {
    if (value >= range.min && value <= range.max) {
      return range.label; // Return the corresponding label
    }
  }

  return ""; // Return "None" if value is out of range
}
export function getGlucoseLabel(value) {
  // Define the glucose levels and their corresponding labels and colors
  const glucoseLevels = {
    Negative: { label: "Negative-Glucose", color: "#008000" },
    Trace: { label: "Below-Normal-Glucose", color: "#89d4f5" },
    "+": { label: "Moderately-High-Glucose", color: "#fff707" },
    "++": { label: "High-Glucose", color: "#FFC107" },
    "+++": { label: "Very-High-Glucose", color: "#FF0000" },
    "++++": { label: "Extremely-High-Glucose", color: "#8B0000" },
  };

  // Return the label and color based on the input value
  const result = glucoseLevels[value];
  return result ? result.label : ""; // Return "Unknown" if the value doesn't match
}

export const getCurrentDateTime = () => {
  const now = new Date();

  const consult_date = format(now, 'yyyy-MM-dd');
  const consult_time = format(now, 'HH:mm');
  const consult_date_time = format(now, 'yyyy-MM-dd HH:mm:ss');
  
  // Set end time to 23:59:00 of the same day
  const endOfDay = addHours(now, 23 - now.getHours());
  const consult_end_time = format(endOfDay, 'yyyy-MM-dd HH:mm:ss');

  return {
    consult_date,
    consult_time,
    consult_date_time,
    consult_end_time,
  };
};
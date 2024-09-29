import { format } from "date-fns";
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
  console.log(files,"first", filteredFiles);
  return filteredFiles;
};

export const getFileExtensionFromUrl = (url) => {
  // Use a regular expression to match the extension
  const extensionMatch = url?.match(/\.(\w+)$/);
  return extensionMatch ? extensionMatch[1]?.toLowerCase() : null; // Return the extension or null if not found
};
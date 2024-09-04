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
    'application/pdf': 'pdf',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'text/plain': 'txt',
    // Add more MIME types as needed
  };

  return mimeTypes[mimeType] || 'unknown';
};

export const openFile = (contentUrl) => {
  window.open(contentUrl, "_blank");
};
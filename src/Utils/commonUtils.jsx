export const findItemIndex = (options, value) => {
  // Use findIndex to get the index of the item with the specified id
  const index = options.findIndex((item) => item === value);
  return index;
};

export const extractNum = (data) => {
  const numbers = parseFloat(data?.match(/\d+(\.\d+)?/)[0]); // Replace non-digits with empty string

  return numbers || "";
};

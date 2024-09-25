import React, { useState, useEffect, useRef } from "react";
import "./input.css"; // Import the CSS file

const SearchInput = ({
  data,
  setSurgeryKey,
  getSelectedData,
  defaultkey,
  view,
}) => {
  const [searchTerm, setSearchTerm] = useState(defaultkey || "");
  const [filteredData, setFilteredData] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isSelect, setIsSelect] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isSelect === false) {
      // Ensure searchTerm is always a string
      const term = String(searchTerm).toLowerCase();
      if (term === "") {
        setFilteredData([]);
        setIsDropdownVisible(false);
      } else {
        // const results = data?.filter((item) =>
        //   item?.name?.toLowerCase()?.includes(term)
        // );
        setFilteredData(data);
        setIsDropdownVisible(true);
      }
    }
  }, [searchTerm, data, isSelect]);
  // Handle clicks outside of the component
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setSurgeryKey(value);
    setIsSelect(false);
    setSelectedItem(null); // Clear selected item if the user is typing
  };

  const handleSelect = (item) => {
    setIsDropdownVisible(false);
    setSearchTerm(item?.name || ""); // Ensure the selected value is a string
    setFilteredData([]);
    setIsSelect(true);
    setSelectedItem(item);
    getSelectedData(item);
  };
  useEffect(() => {
    if (searchTerm && !selectedItem) {
      const term = String(searchTerm).toLowerCase();
      const matchedItem = data?.find(
        (item) => item?.name?.toLowerCase() === term
      );
      if (matchedItem) {
        getSelectedData(matchedItem);
      } else {
        getSelectedData({});
      }
    } else if (searchTerm === "") {
      getSelectedData({});
    }
  }, [searchTerm, data, selectedItem]);
  return (
    <div className={`search-container ${view === true ? "disabled" : ""}`} ref={inputRef}>
      <input
        type="text"
        placeholder="Enter"
        value={searchTerm}
        onChange={handleChange}
        className="form-control pad-10"
      />
      {isDropdownVisible && (
        <ul className="dropdown-list">
          {filteredData?.length > 0 ? (
            filteredData?.map((item, index) => (
              <li key={index} onClick={() => handleSelect(item)}>
                {item?.name}
              </li>
            ))
          ) : (
            <li>No results found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchInput;

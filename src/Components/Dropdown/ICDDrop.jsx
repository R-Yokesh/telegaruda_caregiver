import React, { useEffect, useRef, useState } from "react";
import "./ICDDrop.css"; // Make sure to create or update this CSS file

const ICDDrop = ({ options, defaultValue, getSelectedValue, icdKey }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(defaultValue || "");
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [selectedOption, setSelectedOption] = useState(
    defaultValue || options[0] || "Select"
  );
  const dropdownRef = useRef(null);

  useEffect(() => {
    setFilteredOptions(
      // options?.filter((option) =>
      //   option?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase())
      // )
      options
    );
  }, [searchTerm, options]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setSearchTerm(option?.name || ""); // Set searchTerm to the selected option's name
    setIsOpen(false); // Close the dropdown after selecting an option
    getSelectedValue(option);
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    icdKey(e.target.value);
  };

  useEffect(() => {
    // Attach the event listener for clicks outside
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="dropdown-container" ref={dropdownRef}>
      <div className="dropdown-header-1" onClick={toggleDropdown}>
        <input
          type="text"
          placeholder="Search"
          value={searchTerm} // Use searchTerm for the value of the input
          onChange={handleSearchChange}
          className="dropdown-search-input"
          style={{ outline: "none", border: "none" }}
        />
        <span className={`arrow ${isOpen ? "open" : ""}`}></span>
      </div>
      {isOpen && (
        <div className="dropdown-body">
          <ul className="dropdown-list">
            {filteredOptions?.length > 0 ? (
              filteredOptions?.map((option, index) => (
                <li key={index} onClick={() => handleOptionClick(option)}>
                  {option?.slug ?? ""} - {option?.name}
                </li>
              ))
            ) : (
              <li>No results found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ICDDrop;

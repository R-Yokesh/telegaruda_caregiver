import React, { useEffect, useRef, useState } from "react";
import "./ICDDrop.css";

const ProviderDrop = ({ options, defaultValue, getSelectedValue, dropKey }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(defaultValue || "");
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [selectedOption, setSelectedOption] = useState(
    defaultValue || options[0] || "Select"
  );
  const dropdownRef = useRef(null);

  // Update filtered options based on search term
  useEffect(() => {
    setFilteredOptions(
      options?.filter((option) =>
        `${option?.user?.first_name} ${option?.user?.last_name}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, options]);

  // Watch for changes in defaultValue to update selectedOption and searchTerm
  useEffect(() => {
    setSearchTerm(defaultValue || "");
    const matchedOption = options?.find(
      (option) =>
        `${option?.user?.first_name} ${option?.user?.last_name}` === defaultValue
    );
    setSelectedOption(matchedOption || defaultValue || "Select");
  }, [defaultValue, options]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    const fullName = `${option?.user?.first_name} ${option?.user?.last_name}`;
    setSelectedOption(option);
    setSearchTerm(fullName);
    setIsOpen(false);
    getSelectedValue(option);
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    dropKey(e.target.value);
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
          value={searchTerm}
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
                  {option?.user?.first_name} {option?.user?.last_name}
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
}

export default ProviderDrop;
